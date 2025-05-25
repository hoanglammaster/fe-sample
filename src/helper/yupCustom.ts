import { i18n, useTranslation } from 'next-i18next'
import { StringSchema } from 'yup'
import * as yup from 'yup'
import { formatNumber } from './formatNumber'
import { useEffect } from 'react'

const REGEX_FOR_YUP = {
  FULL_NAME: /^[^0-9`~!@#\$%\^&*\(\)_\-\+=\{\}\[\]\|\\:;\"'<,>\.?\/]+$/,
  ID: /^[a-zA-Z0-9 _-]+$/,
  CODE: /^[a-zA-Z]+$/,
  USERNAME: /^[a-zA-Z0-9_]+$/,
  CONTENT: /^[a-zA-Z0-9,]+$/,
  ACCOUNT_NUMBER: /^[a-zA-Z0-9]+$/,
  ACCOUNT_NAME: /^[a-zA-Z ]+$/,
  TAX_CODE: /^[A-Z.()'\-/]+$/,
  EVIDENT_PAPER: /^[a-zA-Z0-9.()'\-/]+$/,
  MESSAGE: /^[a-zA-Z0-9]+$/,
}
declare module 'yup' {
  interface StringSchema {
    arabicOrEnglish(): StringSchema
    stringOnly(): StringSchema
    id(): StringSchema
    fullName(): StringSchema
    username(): StringSchema
    code(): StringSchema
    content(): StringSchema
    required(): StringSchema
    accountNumber(): StringSchema
    accountName(): StringSchema
    taxCode(): StringSchema
    evidentPaper(): StringSchema
    message(): StringSchema
    channelName(): StringSchema
  }
}

export const useYupConfig = () => {
  const { t } = useTranslation('common')

  const changeYupLocale = () => {
    yup.setLocale({
      mixed: {
        required: t('validation.required'),
        notType: t('validation.required'),
      },
      string: {
        email: t('validation.email'),
        max: ({ max }) => t('validation.max', { number: max }),
        min: ({ min }) => t('validation.min', { number: min }),
      },
      date: {
        min: t('validation.invalid'),
        max: t('validation.invalid'),
      },
      array: {
        min: t('validation.required'),
      },
      number: {
        min: ({ min }) =>
          t('validation.number_min', { min: formatNumber(min, '.') }),
        max: ({ max }) =>
          t('validation.number_max', { max: formatNumber(max, '.') }),
        moreThan: ({ more }) => t('validation.more_than', { more }),
        integer: () => t('validation.integer'),
      },
    })
  }

  StringSchema.prototype.fullName = function () {
    return this.test('fullName', t('validation.fullName'), function (value) {
      if (!value) {
        return true // Skip validation for undefined values
      }
      return REGEX_FOR_YUP.FULL_NAME.test(value)
    })
  }

  StringSchema.prototype.id = function () {
    return this.test('id', t('validation.id'), function (value) {
      if (!value) {
        return true // Skip validation for undefined values
      }
      return REGEX_FOR_YUP.ID.test(value)
    })
  }
  StringSchema.prototype.code = function () {
    return this.test('code', t('validation.code'), function (value) {
      if (!value) {
        return true // Skip validation for undefined values
      }
      return REGEX_FOR_YUP.CODE.test(value)
    })
  }
  StringSchema.prototype.username = function () {
    return this.test('username', t('validation.code'), function (value) {
      if (!value) {
        return true // Skip validation for undefined values
      }
      return REGEX_FOR_YUP.USERNAME.test(value)
    })
  }

  StringSchema.prototype.required = function () {
    return this.test('required', t('validation.required'), function (value) {
      return !value || !value?.length
    })
  }

  StringSchema.prototype.content = function () {
    return this.test('content', t('validation.content'), function (value) {
      if (!value) {
        return true // Skip validation for undefined values
      }
      return REGEX_FOR_YUP.CONTENT.test(value)
    })
  }
  StringSchema.prototype.accountNumber = function () {
    return this.test(
      'accountNumber',
      t('validation.accountNumber'),
      function (value) {
        if (!value) {
          return true // Skip validation for undefined values
        }
        return REGEX_FOR_YUP.ACCOUNT_NUMBER.test(value)
      }
    )
  }
  StringSchema.prototype.accountName = function () {
    return this.test(
      'accountNumber',
      t('validation.accountName'),
      function (value) {
        if (!value) {
          return true // Skip validation for undefined values
        }
        return REGEX_FOR_YUP.ACCOUNT_NAME.test(value)
      }
    )
  }

  StringSchema.prototype.taxCode = function () {
    return this.test('taxCode', t('validation.taxCode'), function (value) {
      if (!value) {
        return true // Skip validation for undefined values
      }
      return REGEX_FOR_YUP.TAX_CODE.test(value)
    })
  }

  StringSchema.prototype.evidentPaper = function () {
    return this.test(
      'evidentPaper',
      t('validation.evidentPaper'),
      function (value) {
        if (!value) {
          return true // Skip validation for undefined values
        }
        return REGEX_FOR_YUP.EVIDENT_PAPER.test(value)
      }
    )
  }

  StringSchema.prototype.message = function () {
    return this.test('message', t('validation.message'), function (value) {
      if (!value) {
        return true // Skip validation for undefined values
      }
      return REGEX_FOR_YUP.MESSAGE.test(value)
    })
  }

  StringSchema.prototype.channelName = function () {
    return this.test('channelName', t('validation.message'), function (value) {
      if (!value) {
        return true // Skip validation for undefined values
      }
      return REGEX_FOR_YUP.MESSAGE.test(value)
    })
  }

  useEffect(() => {
    changeYupLocale()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return yup
}
