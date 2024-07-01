document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('user-form');
    const userTableBody = document.getElementById('user-table-body');
    let editingUserId = null;
  
    // Obtener usuarios y mostrarlos en la tabla
    const fetchUsers = async () => {
      const response = await fetch('http://127.0.0.1:5500/users');
      const users = await response.json();
      userTableBody.innerHTML = '';
      users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${user.id}</td>
          <td>${user.nombre}</td>
          <td>${user.apellidos}</td>
          <td>${user.fecha}</td>
          <td>${user.productos}</td>
          <td>${user.cantidad}</td>
          <td>${user.informacion}</td>
          <td>
            <button onclick="editUser(${user.id}, '${user.nombres}', '${user.apellidos}','${user.fecha}','${user.productos}','${user.cantidad}','${user.informacion}')">Editar</button>
            <button onclick="deleteUser(${user.id})">Eliminar</button>
          </td>
        `;
        userTableBody.appendChild(row);
      });
    };
     // Agregar o editar usuario
     form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nombres = document.getElementById('nombres').value;
      const apellidos= document.getElementById('apellidos').value;
      const fecha = document.getElementById('fecha').value;
      const productos = document.getElementById('productos').value;
      const cantidad = document.getElementById('cantidad').value;
      const informacion = document.getElementById('informacion').value;
      
  
      if (editingUserId) {
        await fetch(`http://127.0.0.1:5500/users/${editingUserId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nombres, apellidos, fecha, productos, cantidad, informacion })
        });
        editingUserId = null;
      } else {
        await fetch('http://127.0.0.1:5500/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nombres, apellidos, fecha, productos, cantidad, informacion})
        });
      }
  
      form.reset();
      fetchUsers();
    });

  });