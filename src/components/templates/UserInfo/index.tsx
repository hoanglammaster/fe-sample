import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import UserInfoForm from './components/UserInfoForm'
import useUser from './useUser'

const UserPage = (props: any) => {
  console.log('propsCheckError222', props)
  const userInfo = useUser()

  return (
    <PageContainer title='Account Infomation'>
      <UserInfoForm {...userInfo} />
      {/* <UserPassword {...userInfo} /> */}
    </PageContainer>
  )
}

export default UserPage
