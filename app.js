// ── Referencias al DOM ──────────────────────────────────
const listaDias       = document.getElementById('listaDias');
const botonAgregarDia = document.getElementById('botonAgregarDia');
const botonCerrar     = document.getElementById('botonCerrar');
const templateDia     = document.getElementById('template-dia');
const templateFranja  = document.getElementById('template-franja');

const DIAS_SEMANA = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'];

// ── Helpers: días usados / disponibles ──────────────────
function diasUsados() {
  return [...listaDias.querySelectorAll('.tarjeta-dia')].map(t => t.dataset.dia);
}

function actualizarBotonAgregar() {
  const disponibles = DIAS_SEMANA.filter(d => !diasUsados().includes(d));
  botonAgregarDia.disabled = disponibles.length === 0;
}

// ── Agregar una franja a una tarjeta ────────────────────
function agregarFranja(tarjeta) {
  const franja = templateFranja.content.cloneNode(true).querySelector('.franja-horaria');

  franja.querySelector('.boton-eliminar-franja').addEventListener('click', () => {
    franja.remove();
  });

  tarjeta.querySelector('.contenedor-franjas').appendChild(franja);
}

// ── Agregar un día ──────────────────────────────────────
function agregarDia(nombreDia) {
  const tarjeta = templateDia.content.cloneNode(true).querySelector('.tarjeta-dia');

  tarjeta.dataset.dia = nombreDia;
  tarjeta.querySelector('.nombre-dia').textContent = nombreDia;

  // Toggle activo/inactivo
  tarjeta.querySelector('.check-activo').addEventListener('change', e => {
    tarjeta.classList.toggle('inactivo', !e.target.checked);
  });

  // Botón agregar franja
  tarjeta.querySelector('.boton-agregar-franja').addEventListener('click', () => {
    agregarFranja(tarjeta);
  });

  // Botón eliminar día
  tarjeta.querySelector('.boton-eliminar-dia').addEventListener('click', () => {
    tarjeta.remove();
    actualizarBotonAgregar();
  });

  // Franja inicial
  agregarFranja(tarjeta);

  listaDias.appendChild(tarjeta);
  actualizarBotonAgregar();
}

// ── Evento: agregar día ─────────────────────────────────
botonAgregarDia.addEventListener('click', () => {
  const disponibles = DIAS_SEMANA.filter(d => !diasUsados().includes(d));
  if (disponibles.length > 0) agregarDia(disponibles[0]);
});

// ── Evento: cerrar ──────────────────────────────────────
botonCerrar.addEventListener('click', () => {
  const resultado = [...listaDias.querySelectorAll('.tarjeta-dia')].map(tarjeta => ({
    dia:    tarjeta.dataset.dia,
    activo: tarjeta.querySelector('.check-activo').checked,
    franjas: [...tarjeta.querySelectorAll('.franja-horaria')].map(f => ({
      entrada: f.querySelector('.entrada').value,
      salida:  f.querySelector('.salida').value,
    }))
  }));

  console.log('Horario:', JSON.stringify(resultado, null, 2));
  alert('Horario guardado. Revisa la consola.');
});

// ── Inicializar con Lunes por defecto ───────────────────
agregarDia('Lunes');
