
async function logout() {
    try{
        const {data}=await api.get('/api/auth/logout')
    }
    catch(err){
        console.log(err)
    }
}

export default logout
