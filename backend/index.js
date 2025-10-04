const app= require('./app')

require('./database')

app.listen(app.get('puerto'), ()=>{
 console.log('Nombre de la App',app.get('nombreApp'));
 console.log('Puerto del servidor',app.get('puerto'));
})
