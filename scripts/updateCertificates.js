const fs = require('fs');
const path = require('path');

// Plantilla para una nueva certificación
const certificateTemplate = {
  title: "",
  date: "",
  imageUrl: "",
  certificateUrl: "",
  organization: "",
  description: ""
};

// Función para actualizar las certificaciones
function updateCertificates() {
  const filePath = path.join(__dirname, '../src/app/api/linkedin-certificates/route.ts');
  
  // Leer el archivo actual
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Encontrar el array CERTIFICATES
  const match = content.match(/const CERTIFICATES = \[([\s\S]*?)\];/);
  
  if (match) {
    console.log('Certificaciones actuales:');
    console.log(match[1]);
    
    console.log('\nPara agregar una nueva certificación, ejecuta:');
    console.log('node scripts/updateCertificates.js add "Título" "2024" "URL de la imagen" "URL del certificado" "Organización" "Descripción"');
    
    // Si se proporcionaron argumentos para agregar una nueva certificación
    if (process.argv[2] === 'add' && process.argv.length >= 8) {
      const newCert = {
        title: process.argv[3],
        date: process.argv[4],
        imageUrl: process.argv[5],
        certificateUrl: process.argv[6],
        organization: process.argv[7],
        description: process.argv[8] || "Certificación profesional"
      };
      
      // Convertir la nueva certificación a string
      const certString = `  {
    title: "${newCert.title}",
    date: "${newCert.date}",
    imageUrl: "${newCert.imageUrl}",
    certificateUrl: "${newCert.certificateUrl}",
    organization: "${newCert.organization}",
    description: "${newCert.description}"
  },\n`;
      
      // Insertar la nueva certificación al principio del array
      const newContent = content.replace(
        /const CERTIFICATES = \[/,
        `const CERTIFICATES = [\n${certString}`
      );
      
      // Guardar el archivo actualizado
      fs.writeFileSync(filePath, newContent);
      console.log('\nCertificación agregada exitosamente!');
    }
  } else {
    console.error('No se encontró el array CERTIFICATES en el archivo');
  }
}

updateCertificates(); 