import { NextResponse } from 'next/server';

// Certificaciones predefinidas que mantendremos actualizadas manualmente
const CERTIFICATES = [
  {
    title: "Inteligencia Artificial con Machine Learning en Java",
    date: "2025",
    imageUrl: "/images/certificates/oracle-ai.png",
    certificateUrl: "https://diplomasuao.anahuac.mx/b812ac9c-af86-4f29-a948-5583275696ec#acc.2Wv4bQHy",
    organization: "Oracle Academy",
    description: "Certificación especializada en Inteligencia Artificial y Machine Learning utilizando Java. Curso intensivo de 60 horas enfocado en el desarrollo de modelos de aprendizaje automático, implementación de algoritmos de IA y aplicación de técnicas avanzadas de programación para soluciones inteligentes."
  },
  {
    title: "Voluntariado Social",
    date: "2023",
    imageUrl: "/images/amigos-para-siempre.png",
    certificateUrl: "#",
    organization: "Amigos para Siempre",
    description: "Participación activa en programa de voluntariado social enfocado en crear espacios de diversión y aprendizaje para niños. Desarrollo de habilidades de liderazgo, trabajo en equipo y gestión de actividades recreativas con impacto social directo."
  },
  {
    title: "Data Structures in Python",
    date: "2024",
    imageUrl: "/images/certificates/google-project.png",
    certificateUrl: "https://www.coursera.org/account/accomplishments/verify/TSY5XNDKVB81",
    organization: "Universidad Católica de Chile",
    description: "Curso avanzado de estructuras de datos y algoritmos en Python. Especialización en optimización de código, implementación de árboles binarios, grafos y desarrollo de soluciones eficientes mediante análisis de complejidad algorítmica."
  },
  {
    title: "Python Programming",
    date: "2024",
    imageUrl: "/images/certificates/google-project-init.png",
    certificateUrl: "https://www.coursera.org/account/accomplishments/verify/UJZ6GL68A6WR",
    organization: "Google",
    description: "Certificación profesional de Google en programación Python. Dominio de POO y patrones de diseño. Implementación de scripts de automatización y análisis de datos con bibliotecas como Pandas y NumPy."
  },
  {
    title: "Java OOP Development",
    date: "2024",
    imageUrl: "/images/certificates/google-project-planning.png",
    certificateUrl: "https://www.coursera.org/account/accomplishments/verify/72WEWJSNHAZ6",
    organization: "University of California San Diego",
    description: "Especialización en desarrollo orientado a objetos con Java. Enfoque en patrones de diseño y principios SOLID. Desarrollo de aplicaciones empresariales aplicando las mejores prácticas de la industria."
  }
];

export async function GET() {
  try {
    // Intentar obtener certificaciones de LinkedIn primero
    const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
    
    if (accessToken) {
      try {
        const profileResponse = await fetch('https://api.linkedin.com/v2/me', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'X-Restli-Protocol-Version': '2.0.0',
          },
        });

        if (profileResponse.ok) {
          // Si tenemos acceso a LinkedIn, podríamos expandir esto en el futuro
          console.log('LinkedIn API access successful');
        }
      } catch (error) {
        console.error('LinkedIn API error:', error);
      }
    }

    // Por ahora, devolver las certificaciones predefinidas
    return NextResponse.json(CERTIFICATES);
    
  } catch (error: any) {
    console.error('Error in certificates endpoint:', error);
    return NextResponse.json(
      { error: 'Failed to fetch certifications', details: error.message },
      { status: 500 }
    );
  }
} 