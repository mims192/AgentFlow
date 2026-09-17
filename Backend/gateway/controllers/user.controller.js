 const getCurrentUser = async (req, res) => {
    try{
        res.status(200).json({user:req.user})
    }
    catch(err){
        res.status(500).json({message:`Get current user error ${err.message}`})
    }
}
export default getCurrentUser