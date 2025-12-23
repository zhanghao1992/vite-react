const getUser =async () => {
    console.log('get user');
    const response = await fetch('/api/mock/public/users')

    return response.json()
}

const updateUser = (user) => {
    console.log('user', user);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(user)
        }, 2000)
    })
}

export { getUser, updateUser }