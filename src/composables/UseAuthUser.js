import { ref } from 'vue'
import { api } from 'boot/axios'

// o usuário é definido fora da função useAuthUser para que atue como um estado global
// e sempre se refira a um único usuário
const user = ref(null)


export default function useAuthUser () {
  /**
  * whoami
  */
  const whoami = async () => {

    const url = '/api/accounts/whoami'

    user.value = await api.get(url)

    return user.value
  }

  /**
  * Check if the user is logged in or not
  */
  const isLoggedIn = async () => {

    // const url = '/api/accounts/whoami'

    // user.value = await api.get(url)

    return !!user.value
  }

  /**
   * Login
   */
  const login = async (username, password) => {

    const url = '/api/accounts/login'

    const data = { username, password }

    const headers = {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
    }

    user.value = await api.post(url, data, headers)

    console.log(user.value.data['username'])

    return user
  };


  /**
   * Logout
   */
  const logout = async () => {
    const url = '/api/accounts/logout'

    user.value = await api.post(url)

    console.log(user.value)

    return user.data
  }

  return {
    user,
    isLoggedIn,
    login,
    logout,
    whoami
  }
}
