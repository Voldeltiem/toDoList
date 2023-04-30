// declaracion de variables globales
const totalTarea = document.getElementById("totalTarea");
const btnAgregar = document.getElementById("btnAgregar");
const templateBody = document.getElementById("templateDatos");
const totalRealizadas = document.getElementById('realizada')

// creacion de arreglo para guardar las tareas
const tareas=[
    {id:1, descripcion:"cama",isDone:false},
    {id:2, descripcion:"pala",isDone:true},
    {id:3, descripcion:"ropa",isDone:false},
];

const cargaDeTareas = (arregloAuxiliar) =>{
    const arregloTemporal =[];
    for (iterador of arregloAuxiliar) {
        const html = `
        <tr>
            <td>${iterador.id}</td>
            <td>${iterador.descripcion}</td>
            <td><input type="checkbox" ${iterador.isDone ? 'checked' : ''} onchange=realizadas(${iterador.id})></td>
            <td><i onclick=eliminar(${iterador.id}) class="fa-solid fa-xmark"></i></td>
        </tr>
        `;
        arregloTemporal.push(html);
    }
    // aqui ocupo el join para que agregue unacadena vacia entre cada objeto y no 
    //megenere una coma por defecto
    templateBody.innerHTML = arregloTemporal.join("");
    totalTarea.innerHTML = arregloTemporal.length;
}
cargaDeTareas(tareas);

btnAgregar.addEventListener('click',()=>{
    /**se llama al inputTarea dentro de la funcion ya que si se deja como variable global
     * tomara el valor de la carga de pagina (nada)*/
    const inputTarea = document.getElementById("inputTarea").value;
    /**Este código toma el resultado de Date.now(), lo divide por 10000,
     * dependiendo la cantidad ceros puede variar el tamano del numero
     * ocupar el metodo slice mas concatenacion de 00 puede ayudar a mantener un mayor control
     * aunque dprovoca porblemas en la funcion eliminar
     * id:(000 +(Date.now() % 10000)).slice(-4)*/
    if (inputTarea === "") {
        alert("Ingrese una tarea en el parametro antes de agregar");
    }else{
        tareas.push({id:(Date.now() % 10000), descripcion:inputTarea, isDone:false});
        cargaDeTareas(tareas);
    };
    // se vacia el input para que este uede en blanco
    //inputTarea.value = "";
})

//quiero declarar que aunque el codigo de abajo funciona no lo entiendo al 100% xd
const realizadas = (id) => {
    const tareaIndex = tareas.findIndex((tarea) => tarea.id === id);
    tareas[tareaIndex] = {...tareas[tareaIndex], isDone: !tareas[tareaIndex].isDone};
    const contador = tareas.filter((tarea) => tarea.isDone).length;
    totalRealizadas.innerHTML = contador;
};
  
const eliminar = (id) =>{
    const indice = tareas.findIndex((tarea) => tarea.id === id);
    tareas.splice(indice, 1);
    cargaDeTareas(tareas);
    const contador = tareas.filter((tarea) => tarea.isDone).length;
    totalRealizadas.innerHTML = contador;
};
