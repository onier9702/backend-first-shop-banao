const { response } = require("express");




const isAdminRole =  async(req, res = response, next) => {

    if ( !req.user ) {
        return res.status(500).json({
            msg: 'Verificacion de Role antes de verificar JWT, no es correcto'
        });
    };

    // console.log(req);
    const { role, name } = req.user;    
    if ( role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `Usuario ${name} no es Administrador, por lo que no tiene permiso para hacer esto`
        })
    }

    next();
};

const isSaleRole = ( req, res = response, next ) => {

    if ( !req.user ) {
        return res.status(500).json({
            msg: 'Verificacion de Role antes de verificar JWT, no es correcto'
        });
    };
    
    const { role, name } = req.user;    
    if ( role !== 'SALE_ROLE' && role !== 'ADMIN_ROLE' ){
        return res.status(401).json({
            msg: `Usuario ${name} no tiene permiso para entrar en ventas o productos, contacte con Administrador +53 54474824 para que te de permiso `
        })
    }

    next();
};

module.exports = {
    isAdminRole,
    isSaleRole
}