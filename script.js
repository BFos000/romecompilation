document.addEventListener("DOMContentLoaded", () => {
  const imageContainer = document.getElementById('image-container');
  const currentYearLabel = document.getElementById('current-year');
  const yearElements = document.querySelectorAll('.year');
  const rightPanel = document.querySelector('.right-panel');

  
  const people = {}; // Stores people keyed by UID
const offices = []; // Stores office stints


function addPerson(uid, name, isPatrician, deathYear, violentDeath, image) {
  people[uid] = {
    uid,
    name,
    isPatrician,
    deathYear,
    violentDeath,
	image,
    offices: [] // Initialize an empty array for offices
  };
}

function addOffice(officeName, personUid, startYear, endYear) {
	if (endYear - startYear > 70){
	return;
}

  if (!people[personUid]) {
    console.error(`Person with UID ${personUid} not found.`);
    return;
  }

  // Add the office stint to the offices array
  offices.push({
    officeName,
    personUid,
    startYear,
    endYear
  });

  // Add the office stint to the person
  people[personUid].offices.push({
    officeName,
    startYear,
    endYear
  });
}

function findFiguresByOffice(officeName, year) {
  let figures = [];

  if (officeName === "Senator") {
    // Include magistracy office holders automatically in the Senate
    const magistracyOffices = 

	["Princeps Senatus", // Only applies if currently held
    "Consul", "Suffect Consul", "Decemvir", "Consular Tribune",
    "Praetor", "Suffect Praetor",
    "Curule Aedile", "Plebeian Aedile", "Aedile",
    "Quaestor",
    "Senator", "Dictator", "Master of the Horse"];




    const eligibilityYears = 20; // Magistracy office holders from the last 20 years

    magistracyOffices.forEach((magistracy) => {
      offices.forEach((office) => {
        if (
          office.officeName === magistracy &&
          office.startYear <= year &&
          office.endYear >= year - eligibilityYears
        ) {
          const person = people[office.personUid];
          if (person && ((!person.deathYear && office.startYear > year - 20) || person.deathYear >= year)) {
            figures.push({ ...person, officeName: office.officeName });
          }
        }
      });
    });

    // Deduplicate Senate members
    const uniqueFigures = new Map();
    figures.forEach((figure) => {
      if (!uniqueFigures.has(figure.uid)) {
        uniqueFigures.set(figure.uid, figure);
      }
    });

    figures = Array.from(uniqueFigures.values());
  } else {
    // For regular offices, find active figures directly
    figures = offices
      .filter(
        (office) =>
          office.officeName === officeName &&
          office.startYear <= year &&
          office.endYear >= year
      )
      .map((office) => people[office.personUid])
      .filter(
        (person) => !person.deathYear || person.deathYear >= year // Exclude dead figures
      );
figures.forEach((f)=>{f.officeName = officeName});
  }

  return figures;
}



// Function to find a figure in figureData by name
function findFigureByName(name) {
for (const year in figureData) {
  for (const figure of figureData[year]) {
    if (figure.name === name) return figure;
  }
}
return null;
}

function addRelation(name1, image1, name2, image2, year, type) {
 // if (type == "spouse")
 //   return;
  // Create or retrieve figure1
  const key1 = `${name1}-${image1}`;
  let figure1 = figures.get(key1);
  if (!figure1) {
    figure1 = { name: name1, image: image1 };
    figures.set(key1, figure1);
  }

  // Create or retrieve figure2
  const key2 = `${name2}-${image2}`;
  let figure2 = figures.get(key2);
  if (!figure2) {
    figure2 = { name: name2, image: image2 };
    figures.set(key2, figure2);
  }

  // Add the relationship to the relations array
  relations.push({ figure1, figure2, year, type });
}


      //const photoElement = document.getElementById('photo');
     // const photoCaptionElement = document.getElementById('photo-caption');
    
const defaultPortraits = {
  "King of Rome": "default-king.jpg",
  "Senator": "romanaristocrat.webp",
  "Pontifex Maximus": "PontifexMaximus.png",
  "Flamen": "flamen.jpg",
  "Vestal Virgin": "vestalvirgin.png",
  "Fetial": "fetial.png",
  "Tribune of the Celeres": "tribuneceleres.png",
  "Tribune of the Plebs": "tribuneplebs.png",
  "Crowd": "crowd.png",
  "Plebeian Aedile": "aedile.png",
  "Praetor": "praetor.png",
  "Quaestor": "quaestor.png",
};

const stateStructures = [


  // Romulan Constitution

  {
    startYear: -753,
    endYear: -716,
    structure: {
      type: "group",
      title: "",
      layout: "column", // Stack vertically
      children: [
{
          type: "group",
          title: "",
          layout: "column", // Portraits in a row
		  children: [
		  {
			  type: "group",
			  title: "King of Rome",
			  layout: "row", // Portraits in a row
			  maxPortraitsPerRow: 1,
			  expectedCount: [[-753,1]],
			  members: ["King of Rome"],
			  },
		  {
			  type: "group",
			  title: "Tribunus Celerum",
			  layout: "row", // Portraits in a row
			  maxPortraitsPerRow: 1,
			  expectedCount: [[-753,1]],
			  members: ["Tribune of the Celeres"],
			  }
			  
		  ],
        },
        {
          type: "group",
          layout: "row", // Place Senate and Priesthood side by side
          children: [
            {
              type: "group",
              title: "Senate",
              layout: "row",
              maxPortraitsPerRow: 4,
              expectedCount: [[-753,100],[-752,200]], // Expect 4 senators
              members: ["Senator"],
            },
          ],
        },
      ],
    },
  },
  
  
  
  // Numus Pompilius
  
  {
    startYear: -715,
    endYear: -673,
    structure: {
      type: "group",
      title: "",
      layout: "column", // Stack vertically
      children: [

        {
          type: "group",
          title: "",
          layout: "column", // Portraits in a row
		  children: [
		  {
			  type: "group",
			  title: "King of Rome",
			  layout: "row", // Portraits in a row
			  maxPortraitsPerRow: 1,
			  expectedCount: [[-715,1]],
			  members: ["King of Rome"],
			  },
		  {
			  type: "group",
			  title: "Tribunus Celerum",
			  layout: "row", // Portraits in a row
			  maxPortraitsPerRow: 1,
			  expectedCount: [[-715,1]],
			  members: ["Tribune of the Celeres"],
			  }
			  
		  ],
        },
        {
          type: "group",
	  noborder: true,
          layout: "row", // Place Senate and Priesthood side by side
          children: [
            {
              type: "group",
              title: "Senate",
              layout: "row",
              maxPortraitsPerRow: 4,
              expectedCount: [[-715,100]], // Expect 4 senators
              members: ["Senator"],
            },
            {
              type: "group",
              title: "Priesthood",
              layout: "column",
              children: [
                {
                  type: "group",
                  title: "Pontifex Maximus",
                  layout: "row",
                  maxPortraitsPerRow: 1,
                  expectedCount: [[-715,1]], // Expect 1 pontifex
                  members: ["Pontifex Maximus"],
                },
				{
      type: "group",
      title: "",
      layout: "row", // Stack vertically
	    noborder: true,
      children: [
	  {
                  type: "group",
                  title: "Flamens",
                  layout: "row",
                  maxPortraitsPerRow: 3,
                  expectedCount: [[-715,3]], // Expect 3 flamens
                  members: ["Flamen"],
                },
                {
                  type: "group",
                  title: "Vestal Virgins",
                  layout: "row",
                  maxPortraitsPerRow: 1,
                  expectedCount: [[-715, 5,]], // Expect 3 flamens
                  members: ["Vestal Virgin"],
                },
	  ]
				},
                
              ],
            },
          ],
        },
      ],
    },
  },
  
  
  // Fetials are mentioned for the first time
  
  {
    startYear: -672,
    endYear: -578,
    structure: {
      type: "group",
      title: "",
      layout: "column", // Stack vertically
      children: [
        {
		type: "group",
          title: "",
          layout: "column", // Portraits in a row
		  children: [
		  {
			  type: "group",
			  title: "King of Rome",
			  layout: "row", // Portraits in a row
			  maxPortraitsPerRow: 1,
			  expectedCount: [[-672,1]],
			  members: ["King of Rome"],
			  },
		  {
			  type: "group",
			  title: "Tribunus Celerum",
			  layout: "row", // Portraits in a row
			  maxPortraitsPerRow: 1,
			  expectedCount: [[-672,1]],
			  members: ["Tribune of the Celeres"],
			  }
			  
		  ],
        },
        {
          type: "group",
	  noborder: true,
          layout: "row", // Place Senate and Priesthood side by side
          children: [
            {
              type: "group",
              title: "Senate",
              layout: "row",
              maxPortraitsPerRow: 4,
              expectedCount: [[-672,200],[-616,300],[-533,100]], 
              members: ["Senator"],
            },
            {
              type: "group",
              title: "Priesthood",
              layout: "column",
              children: [
                {
                  type: "group",
                  title: "Pontifex Maximus",
                  layout: "row",
                  maxPortraitsPerRow: 1,
                  expectedCount: [[-672,1]], // Expect 1 pontifex
                  members: ["Pontifex Maximus"],
                },
				{
      type: "group",
      title: "",
      layout: "row", // Stack vertically
	    noborder: true,
      children: [
	  {
                  type: "group",
                  title: "Flamens",
                  layout: "row",
                  maxPortraitsPerRow: 3,
                  expectedCount: [[-672,3]], // Expect 3 flamens
                  members: ["Flamen"],
                },
                {
                  type: "group",
                  title: "Vestal Virgins",
                  layout: "row",
                  maxPortraitsPerRow: 1,
                  expectedCount: [[-672,5]], // Expect 3 flamens
                  members: ["Vestal Virgin"],
                },
                {
                  type: "group",
                  title: "Fetials",
                  layout: "row",
                  maxPortraitsPerRow: 1,
                  expectedCount: [[-672,4]], // Expect 3 flamens
                  members: ["Fetial"],
                },
	  ]
				},
                
              ],
            },
          ],
        },
      ],
    },
  },
  
  
  
  // Servian constitution
  
  {
    startYear: -577,
    endYear: -510,
    structure: {
      type: "group",
      title: "",
      layout: "column", // Stack vertically
      children: [
        {
		type: "group",
          title: "",
          layout: "column", // Portraits in a row
		  children: [
		  {
			  type: "group",
			  title: "King of Rome",
			  layout: "row", // Portraits in a row
			  maxPortraitsPerRow: 1,
			  expectedCount: [[-577,1]],
			  members: ["King of Rome"],
			  },
		  {
			  type: "group",
			  title: "Tribunus Celerum",
			  layout: "row", // Portraits in a row
			  maxPortraitsPerRow: 1,
			  expectedCount: [[-577,1]],
			  members: ["Tribune of the Celeres"],
			  }
			  
		  ],
        },
        {
          type: "group",
	  noborder: true,
          layout: "row", // Place Senate and Priesthood side by side
          children: [
            {
              type: "group",
              title: "Senate",
              layout: "row",
              maxPortraitsPerRow: 4,
              expectedCount: [[-577,200],[-577,300],[-577,100]], 
              members: ["Senator"],
            },
            {
              type: "group",
              title: "Centuriate Assembly",
              layout: "row",
              maxPortraitsPerRow: 4,
              expectedCount: [[-577,-1]], 
              members: ["Crowd"],
            },
            {
              type: "group",
              title: "Priesthood",
              layout: "column",
              children: [
                {
                  type: "group",
                  title: "Pontifex Maximus",
                  layout: "row",
                  maxPortraitsPerRow: 1,
                  expectedCount: [[-577,1]], // Expect 1 pontifex
                  members: ["Pontifex Maximus"],
                },
				{
      type: "group",
      title: "",
      layout: "row", // Stack vertically
	    noborder: true,
      children: [
	  {
                  type: "group",
                  title: "Flamens",
                  layout: "row",
                  maxPortraitsPerRow: 3,
                  expectedCount: [[-577,3]], // Expect 3 flamens
                  members: ["Flamen"],
                },
                {
                  type: "group",
                  title: "Vestal Virgins",
                  layout: "row",
                  maxPortraitsPerRow: 1,
                  expectedCount: [[-577,5]], // Expect 3 flamens
                  members: ["Vestal Virgin"],
                },
                {
                  type: "group",
                  title: "Fetials",
                  layout: "row",
                  maxPortraitsPerRow: 1,
                  expectedCount: [[-577,4]], // Expect 3 flamens
                  members: ["Fetial"],
                },
	  ]
				},
                
              ],
            },
          ],
        },
      ],
    },
  },
  
  
  // Republic
{
    startYear: -509,
    endYear: -494,
    structure: {
      type: "group",
      title: "",
      layout: "column", // Stack vertically
      children: [
	  {  type: "group",
		  title: "Dictator",
		  layout: "row", // Portraits in a row
		  maxPortraitsPerRow: 1,
		  expectedCount: [[-509,1]],
		  members: ["Dictator"],
		  hideIfEmpty: true,
	  },
	  {  type: "group",
		  title: "Magister Equitum",
		  layout: "row", // Portraits in a row
		  maxPortraitsPerRow: 1,
		  expectedCount: [[-509,1]],
		  members: ["Magister Equitum"],
		  hideIfEmpty: true,
	  },
        {
		  type: "group",
		  title: "Consuls",
		  layout: "row", // Portraits in a row
		  maxPortraitsPerRow: 5,
		  expectedCount: [[-509,2]],
		  members: ["Consul", "Suffect Consul"],
		  },
        {
          type: "group",
	  noborder: true,
          layout: "row", // Place Senate and Priesthood side by side
          children: [
            {
              type: "group",
              title: "Senate",
              layout: "row",
			  scale: 0.66,
              maxPortraitsPerRow: 6,
              expectedCount: [[-509,300]], 
              members: ["Senator"],
            },
            {
              type: "group",
              title: "Centuriate Assembly",
              layout: "row",
              maxPortraitsPerRow: 4,
              expectedCount: [[-577,-1]], 
              members: ["Crowd"],
            },
            {
              type: "group",
              title: "Priesthood",
              layout: "column",
              children: [
                {
                  type: "group",
                  title: "Pontifex Maximus",
                  layout: "row",
                  maxPortraitsPerRow: 1,
                  expectedCount: [[-577,1]], // Expect 1 pontifex
                  members: ["Pontifex Maximus"],
                },
				{
      type: "group",
      title: "",
      layout: "row", // Stack vertically
	    noborder: true,
      children: [
	  {
                  type: "group",
                  title: "Flamens",
                  layout: "row",
                  maxPortraitsPerRow: 3,
                  expectedCount: [[-577,3]], // Expect 3 flamens
                  members: ["Flamen"],
                },
                {
                  type: "group",
                  title: "Vestal Virgins",
                  layout: "row",
                  maxPortraitsPerRow: 1,
                  expectedCount: [[-577,5]], // Expect 3 flamens
                  members: ["Vestal Virgin"],
                },
                {
                  type: "group",
                  title: "Fetials",
                  layout: "row",
                  maxPortraitsPerRow: 1,
                  expectedCount: [[-577,4]], // Expect 3 flamens
                  members: ["Fetial"],
                },
	  ]
				},
                
              ],
            },
          ],
        },
      ],
    },
  },

	
	// Tribune of the Plebs is created
	
	{
    startYear: -493,
    endYear: -444,
    structure: {
      type: "group",
      title: "",
      layout: "column", // Stack vertically
      children: [
	  {
		  type: "group",
	  noborder: true,
          layout: "row", // Place Senate and Priesthood side by side
          children: [
		  
	  {  type: "group",
		  title: "Dictator",
		  layout: "row", // Portraits in a row
		  maxPortraitsPerRow: 3,
		  expectedCount: [[-509,1]],
		  members: ["Dictator"],
		  hideIfEmpty: true,
	  },
	  {  type: "group",
		  title: "Magister Equitum",
		  layout: "row", // Portraits in a row
		  maxPortraitsPerRow: 5,
		  expectedCount: [[-509,1]],
		  members: ["Master of the Horse", "Suffect Master of the Horse"],
		  hideIfEmpty: true,
	  },
        {
		  type: "group",
		  title: "Consuls",
		  layout: "row", // Portraits in a row
		  maxPortraitsPerRow: 5,
		  expectedCount: [[-509,2]],
		  hideIfEmpty: true,
		  members: ["Consul", "Suffect Consul"],
		  },

        {
		  type: "group",
		  title: "Consular Tribunes",
		  layout: "row", // Portraits in a row
		  maxPortraitsPerRow: 6,
		  expectedCount: [[-509,2]],
		  hideIfEmpty: true,
		  members: ["Consular Tribune"],
	  },
        {
		  type: "group",
		  title: "Decemvirs",
		  layout: "row", // Portraits in a row
		  maxPortraitsPerRow: 5,
		  expectedCount: [[-509,2]],
		  hideIfEmpty: true,
		  members: [ "Decemvir"],
	  },
		  ]
	  },
		  {
		  type: "group",
	  noborder: true,
          layout: "row", // Place Senate and Priesthood side by side
          children: [
		  {
		  type: "group",
		  title: "Praetors",
		  layout: "row", // Portraits in a row
		  maxPortraitsPerRow: 6,
		  expectedCount: [[-509,20]],
		  members: ["Praetor", "Suffect Praetor"],
		  },

		  {
		  type: "group",
		  title: "Aediles",
		  layout: "row", // Portraits in a row
		  maxPortraitsPerRow: 4,
		  expectedCount: [[-509,4]],
		  members: ["Curule Aedile", "Plebeian Aedile", "Aedile"],
		  }, 		  
		  {
		  type: "group",
		  title: "Quaestors",
		  layout: "row", // Portraits in a row
		  maxPortraitsPerRow: 6,
		  expectedCount: [[-509,2],[-421,4],[-267,8],[-81,20]],
		  members: ["Quaestor"],
		  },   
		  
		   {
		  type: "group",
		  title: "Tribune of the Plebs",
		  layout: "row", // Portraits in a row
		  maxPortraitsPerRow: 7,
		  expectedCount: [[-509,1]],
		  members: ["Tribune of the Plebs", "Suffect Tribune of the Plebs"],
		  },
		     
		  {
                  type: "group",
                  title: "Pontifex Maximus",
                  layout: "row",
                  maxPortraitsPerRow: 2,
                  expectedCount: [[-577,1]], // Expect 1 pontifex
                  members: ["Pontifex Maximus"],
                },
		],
		
		  },
	
       
        {
          type: "group",
	  noborder: true,
          layout: "row", // Place Senate and Priesthood side by side
          children: [
            {
              type: "group",
              title: "Senate",
              layout: "row",
			  scale: 0.66,
              maxPortraitsPerRow: 16,
              expectedCount: [[-509,300]], 
              members: ["Senator"],
            },
            /*{
              type: "group",
              title: "Centuriate Assembly",
              layout: "row",
              maxPortraitsPerRow: 4,
              expectedCount: [[-577,-1]], 
              members: ["Crowd"],
            },*/
            
          ],
        },
      ],
    },
  },






// Censor is created 


	{
    startYear: -443,
    endYear: -1,
    structure: {
      type: "group",
      title: "",
      layout: "column", // Stack vertically
      children: [
	  {
		  type: "group",
	  noborder: true,
          layout: "row", // Place Senate and Priesthood side by side
          children: [
		  
    {  type: "group",
      title: "Augustus",
      layout: "row", // Portraits in a row
      maxPortraitsPerRow: 1,
      expectedCount: [[-509,1]],
      members: ["Augustus"],
      hideIfEmpty: true,
    },
    {  type: "group",
      title: "Dictator",
      layout: "row", // Portraits in a row
      maxPortraitsPerRow: 3,
      expectedCount: [[-509,1]],
      members: ["Dictator"],
      hideIfEmpty: true,
    },
	  {  type: "group",
		  title: "Magister Equitum",
		  layout: "row", // Portraits in a row
		  maxPortraitsPerRow: 5,
		  expectedCount: [[-509,1]],
		  members: ["Master of the Horse", "Suffect Master of the Horse"],
		  hideIfEmpty: true,
	  },
        {
		  type: "group",
		  title: "Consuls",
		  layout: "row", // Portraits in a row
		  maxPortraitsPerRow: 5,
		  expectedCount: [[-509,2]],
		  hideIfEmpty: true,
		  members: ["Consul", "Suffect Consul"],
		  },

        {
		  type: "group",
		  title: "Consular Tribunes",
		  layout: "row", // Portraits in a row
		  maxPortraitsPerRow: 6,
		  expectedCount: [[-509,2]],
		  hideIfEmpty: true,
		  members: ["Consular Tribune"],
	  },
        {
		  type: "group",
		  title: "Decemvirs",
		  layout: "row", // Portraits in a row
		  maxPortraitsPerRow: 5,
		  expectedCount: [[-509,2]],
		  hideIfEmpty: true,
		  members: [ "Decemvir"],
	  },
        {
		  type: "group",
		  title: "Interrex",
		  layout: "row", // Portraits in a row
		  maxPortraitsPerRow: 5,
		  expectedCount: [[-509,2]],
		  hideIfEmpty: true,
		  members: [ "Interrex"],
	  },
        {
      type: "group",
      title: "Proconsuls",
      layout: "row", // Portraits in a row
      maxPortraitsPerRow: 5,
      expectedCount: [[-509,0]],
      hideIfEmpty: true,
      members: [ "Proconsul"],
    },,
        {
      type: "group",
      title: "Honors",
      layout: "row", // Portraits in a row
      maxPortraitsPerRow: 5,
      expectedCount: [[-509,2]],
      hideIfEmpty: true,
    showTitles: true,
      members: [ "Grass Crown", "Triumph", "Naval", "Ovation"],
    },
		  ]
	  },
		  {
		  type: "group",
	  noborder: true,
          layout: "row", // Place Senate and Priesthood side by side
          children: [
		  {
		  type: "group",
		  title: "Censor",
		  layout: "row", // Portraits in a row
		  maxPortraitsPerRow: 4,
		  expectedCount: [[-509,2]],
		  members: ["Censor", "Suffect Censor"],
		  },  
		  {
		  type: "group",
		  title: "Praetors",
		  layout: "row", // Portraits in a row
		  maxPortraitsPerRow: 4,
		  expectedCount: [[-509,20]],
		  members: ["Praetor", "Suffect Praetor", "Praetor Pro Consule"],
		  },  
		  
		  {
		  type: "group",
		  title: "Aediles",
		  layout: "row", // Portraits in a row
		  maxPortraitsPerRow: 4,
		  expectedCount: [[-509,4]],
		  members: ["Curule Aedile", "Plebeian Aedile", "Aedile"],
		  },    
		  {
		  type: "group",
		  title: "Quaestors",
		  layout: "row", // Portraits in a row
		  maxPortraitsPerRow: 4,
		  expectedCount: [[-509,2],[-421,4],[-267,8],[-81,20]],
		  members: ["Quaestor", "Quaestor De Virginibus", "Quaestor Pro Consule", "Quaestor Pro Praetore"],
		  },   
		  
		   {
		  type: "group",
		  title: "Tribune of the Plebs",
		  layout: "row", // Portraits in a row
		  maxPortraitsPerRow: 4,
		  expectedCount: [[-509,1]],
		  members: ["Tribune of the Plebs", "Suffect Tribune of the Plebs", "Tribunus Plebis Pro Praetore"],
		  },
		  
		  {
                  type: "group",
                  title: "Pontifex Maximus",
                  layout: "row",
                  maxPortraitsPerRow: 2,
                  expectedCount: [[-577,1]], // Expect 1 pontifex
                  members: ["Pontifex Maximus"],
                }, 
		],
		
		  },
	
       
        {
          type: "group",
	  noborder: true,
          layout: "row", // Place Senate and Priesthood side by side
          children: [
            {
              type: "group",
              title: "Senate",
              layout: "row",
			  scale: 0.66,
              maxPortraitsPerRow: 18,
              expectedCount: [[-509,300]], 
              members: ["Senator"],
            },
            /*{
              type: "group",
              title: "Centuriate Assembly",
              layout: "row",
              maxPortraitsPerRow: 4,
              expectedCount: [[-577,-1]], 
              members: ["Crowd"],
            },*/
            
          ],
        },{
          type: "group",
	  noborder: true,
          layout: "row", // Place Senate and Priesthood side by side
          children: [
           

            {
              type: "group",
              title: "Civic Officials",
              layout: "row",
        scale: 0.66,
              maxPortraitsPerRow: 4,
    showTitles: true,
              expectedCount: [[-509,0]], 
              members: ["Curator - Unspecified",
"Curator Denariorum Flandorum",
"Curator Frumenti",
"Curator Restituendi Capitolii",
"Curator Viis Sternendis",
"Divisor",
"Duovir - Unspecified",
"Duovir Aquae Perducendae",
"Magister Scripturae",
"Magister Societatis",
"Monetalis",
"Moneyer",
"Praefectus",
"Praefectus Aerario",
"Praefectus Annonae",
"Praefectus Capuam Cumas",
"Publicanus",
"Quattuorvir Argento Publico Feriundo",
"Quattuorvir Monetalis",
"Quinquevir Finibus Cognoscendis Statuendisque",
"Quinquevir Mensarius",
"Redemptor",
"Scriba",
"Scriba Quaestoris",
"Triumvir - Unspecified",
"Triumvir Ad Colonos Scribendos",
"Triumvir Aed. Refic.",
"Triumvir Capitalis",
"Triumvir Mensarius",
"Triumvir Monetalis",
"Triumvir Nocturnus",
"Triumvir Rei Publicae Constituendae",
"Viocurus",

// Land Commissioners
"Triumvir Agris Dandis",
"Triumvir Agris Dandis Assignandis",
"Triumvir Agris Dividendis",
"Triumvir Agris Iudicandis Assignandis",
"Triumvir Agro Dando",
"Vigintivir Agris Dandis Assignandis",
"Decemvir Agris Assignandis",
"Decemvir Agris Dandis Assignandis",
"Decemvir Agris Dandis Attribuendis Iudicandis",
"Praefectus Agris Dandis Assignandis",
"Praefectus Agris Dividundis",
"Quinquevir Agris Dandis Assignandis",
"Quinquevir Agris Dandis Assignandis Iudicandis",
"Septemvir Agris Dividendis",
"Special Commissioners",
"Triumvir Coloniis Deducendis",],
            },


            {
              type: "group",
              title: "Military Officials",
              layout: "row",
        scale: 0.66,
              maxPortraitsPerRow: 6,
    showTitles: true,
              expectedCount: [[-509,0]], 
              members: ["Praefectus Classis",
"Praefectus Equitum",
"Praefectus Evocatorum",
"Praefectus Fabrum",
"Praefectus Navium",
"Praefectus Oppidi",
"Praefectus Socii",
"Praefectus Turmae",
"Centurio",
"Centurio Primus Pilus",
"Decurio Equitum",
"Legatus",
"Legatus (Lieutenant)",
"Legatus Fisci Castrensis",
"Legatus Pro Praetore",
"Legatus Pro Quaestore",
"Navarchus Princeps",
"Officer (Title Not Preserved)",
"Tribunus Militum",],
            },


            {
              type: "group",
              title: "Priesthood",
              layout: "row",
        scale: 0.66,
              maxPortraitsPerRow: 4,
    showTitles: true,
              expectedCount: [[-509,0]], 
              members: ["Aedituus Fortuna-Obsequens-Tempel",
"Aedituus Tellus-Tempel",
"Augur",
"Curio",
"Curio Maximus",
"Decemvir Sacris Faciundis",
"Decemvir Sacris Faciundis - Magister",
"Duovir Aedi Dedicandae",
"Duovir Aedi Locandae",
"Duovir Sacris Faciundis",
"Epulo",
"Fetialis",
"Flamen Carmentalis",
"Flamen Dialis",
"Flamen Floralis",
"Flamen Iulialis",
"Flamen Martialis",
"Flamen Quirinalis",
"Flaminica Martialis",
"Haruspex",
"Haruspex Ex L",
"Lupercus",
"Lupercus Iulianus",
"Lupercus Iulianus - Magister",
"Matrona Imagini Dedicandi",
"Pontifex",
"Pontifex Maximus",
"Pontifex Minor",
"Quindecemvir Sacris Faciundis",
"Rex Sacrorum",
"Sacerdos Cereris Publicae",
"Sacerdos Collegiorum Ignotorum",
"Sacerdos Fortuna Muliebris",
"Sacerdos Isidis",
"Sacerdos Matris Magnae",
"Salius",
"Salius Magister",
"Scriba (Pontifex Minor)",
"Septemvir Epulonum",
"Sodalis Sacris Idaeis Magnae Matris",
"Sodalis Titii",
"Vates",
"Virgo Vestalis",],
            },


            {
              type: "group",
              title: "Promagistrates",
              layout: "row",
        scale: 0.66,
              maxPortraitsPerRow: 4,
    showTitles: true,
              expectedCount: [[-509,0]], 
              members: ["Promagister",
"Promagistrate",
"Proconsul",
"Propraetor",
"Propraetor Praefectus Classis",
"Proquaestor",
"Proquaestor Pro Propraetore",],
            },
            
          ],
        },{
          type: "group",  // second layer of extras
    noborder: true,
          layout: "row", // Place Senate and Priesthood side by side
          children: [
            
         {
              type: "group",
              title: "Judicial Offices",
              layout: "row",
        scale: 0.66,
              maxPortraitsPerRow: 4,
    showTitles: true,
              expectedCount: [[-509,0]], 
              members: ["Quattuorvir Capitalis",
"Accusator",
"Decemvir Stlitibus Iudicandis",
"Duovir Perduellionis",
"Iudex",
"Iudex Quaestionis",
"Quaesitor",],
            },
         {
              type: "group",
              title: "Diplomats",
              layout: "row",
        scale: 0.66,
              maxPortraitsPerRow: 4,
    showTitles: true,
              expectedCount: [[-509,0]], 
              members: ["A Committee Of Former Legates To The Peloponnese, Appointed By The Senate To Hear The Arguments Of Four Groups Of Lacedaemonian Envoys",
"Legatus (Ambassador)",
"Legatus (Envoy)",],
            },
         {
              type: "group",
              title: "Election Results",
              layout: "row",
        scale: 0.66,
              maxPortraitsPerRow: 4,
    showTitles: true,
              expectedCount: [[-509,0]], 
              members: ["Consul Designatus",
"Magister Equitum Designatus",
"Praetor Designatus",
"Quaestor Designatus",
"Repulsa",
"Repulsa (Aed.)",
"Repulsa (Cens.)",
"Repulsa (Cos.)",
"Repulsa (Pr.)",
"Repulsa (Q.)",
"Repulsa (Tr. Pl.)",
"Tribunus Plebis Designatus",],
            },
         {
              type: "group",
              title: "Other Offices",
              layout: "row",
        scale: 0.66,
              maxPortraitsPerRow: 4,
    showTitles: true,
              expectedCount: [[-509,0]], 
              members: ["Other"],
            },
          ]
        }
      ],
    },
  },

];


addPerson("IUNI0001","Lucius Iunius Brutus","True",-509,"True","luciusjuniusbrutus.jpg");
addPerson("TARQ0002","Lucius Tarquinius Collatinus","True",-450,"","luciustarquiniuscollatinus.jpg");
addPerson("VALE0003","Publius Valerius Poplicola","True",-503,"","pvpoplicola.png");
addPerson("LUCR0010","Titus Lucretius Tricipitinus","True",-450,"","romanaristocrat.png");
addPerson("HORA0005","Marcus Horatius Pulvillus","True",-450,"","romanaristocrat.png");
addPerson("LARC0012","Spurius Larcius Rufus or Flavus","True",-425,"","romanaristocrat.png");
addPerson("HERM0011","Titus Herminius Aquilinus","True",-499,"True","romanaristocrat.png");
addPerson("LUCR0014","Publius Lucretius","True",-450,"","romanaristocrat.png");
addPerson("VALE0013","Marcus Valerius (Volusus)","True",-499,"True","romanaristocrat.png");
addPerson("POST0015","Publius Postumius Tubertus","True",-425,"","romanaristocrat.png");
addPerson("MENE0018","Agrippa Menenius Lanatus","True",-493,"","agrippameneniuslanatus.jpg");
addPerson("VERG0019","Opiter Verginius Tricostus","True",-425,"","romanaristocrat.png");
addPerson("CASS0020","Spurius Cassius Vecellinus","True",-485,"True","spuriuscassiusvecellinus.png");
addPerson("COMI0021","Postumus Cominius Auruncus","True",-425,"","romanaristocrat.png");
addPerson("LARC0017","Titus Larcius Flavus or Rufus","True",-425,"","romanaristocrat.png");
addPerson("SULP0023","Servius Sulpicius Camerinus Cornutus","True",-463,"","romanaristocrat.png");
addPerson("TULL0024","Manius Tullius Longus","True",-450,"","romanaristocrat.png");
addPerson("AEBU0025","Titus Aebutius Helva","True",-425,"","romanaristocrat.png");
addPerson("VETU0007","Publius Veturius Geminus Cicurinus","True",-425,"","romanaristocrat.png");
addPerson("CLOE0029","Quintus Cloelius Siculus","True",-425,"","romanaristocrat.png");
addPerson("SEMP0028","Aulus Sempronius Atratinus","True",-425,"","romanaristocrat.png");
addPerson("MINU0030","Marcus Minucius Augurinus","True",-425,"","romanaristocrat.png");
addPerson("POST0027","Aulus Postumius Albus Regillensis","True",-425,"","romanaristocrat.png");
addPerson("VERG0031","Titus Verginius Tricostus Caeliomontanus","True",-425,"","romanaristocrat.png");
addPerson("CLAU0032","Appius Claudius Sabinus Inregillensis","True",-425,"","romanaristocrat.png");
addPerson("SERV0033","Publius Servilius Priscus Structus","True",-425,"","romanaristocrat.png");
addPerson("VERG0035","Aulus Verginius Tricostus Caeliomontanus","True",-425,"","romanaristocrat.png");
addPerson("VETU0036","Titus Veturius Geminus Cicurinus","True",-425,"","romanaristocrat.png");
addPerson("GEGA0048","Titus Geganius Macerinus","True",-425,"","romanaristocrat.png");
addPerson("MINU0049","Publius Minucius Augurinus","True",-425,"","romanaristocrat.png");
addPerson("SULP0055","Quintus Sulpicius Camerinus Cornutus","True",-425,"","romanaristocrat.png");
addPerson("IULI0056","Gaius Iulius Iullus","True",-425,"","romanaristocrat.png");
addPerson("PINA0057","Publius Pinarius Mamertinus Rufus","True",-425,"","romanaristocrat.png");
addPerson("NAUT0058","Spurius Nautius Rutilus","True",-425,"","romanaristocrat.png");
addPerson("FURI0059","Sextus Furius (Medullinus) (Fusus)","True",-425,"","romanaristocrat.png");
addPerson("SICI0061","Titus Sicinius (Sabinus)","True",-425,"","romanaristocrat.png");
addPerson("AQUI0062","Gaius Aquillius (Tuscus)","True",-425,"","romanaristocrat.png");
addPerson("VERG0063","Proculus Verginius Tricostus Rutilus","True",-425,"","romanaristocrat.png");
addPerson("CORN0076","Servius Cornelius Maluginensis Tricostus","True",-453,"","romanaristocrat.png");
addPerson("FABI0077","Quintus Fabius Vibulanus","True",-480,"True","romanaristocrat.png");
addPerson("AEMI0080","Lucius Aemilius Mamercus","True",-400,"","romanaristocrat.png");
addPerson("FABI0078","Caeso Fabius Vibulanus","True",-425,"","romanaristocrat.png");
addPerson("FABI0082","Marcus Fabius Vibulanus","True",-477,"","romanaristocrat.png");
addPerson("VALE0079","Lucius Valerius Potitus","True",-400,"","romanaristocrat.png");
addPerson("IULI0085","Gaius Iulius Iullus","True",-375,"","romanaristocrat.png");
addPerson("FURI0086","Spurius Furius Fusus","True",-425,"","romanaristocrat.png");
addPerson("MANL0088","Gnaeus Manlius Cincinnatus","True",-480,"True","romanaristocrat.png");
addPerson("VERG0091","Titus Verginius Tricostus Rutilus","True",-463,"","romanaristocrat.png");
addPerson("SERV0092","Gaius Servilius Structus Ahala","True",-478,"","romanaristocrat.png");
addPerson("MENE0096","Titus Menenius Lanatus","True",-476,"True","romanaristocrat.png");
addPerson("HORA0165","Gaius Horatius Pulvillus","True",-453,"","romanaristocrat.png");
addPerson("VERG0097","Aulus Verginius Tricostus Rutilus","True",-425,"","romanaristocrat.png");
addPerson("SERV0098","Spurius Servilius Structus","True",-425,"","romanaristocrat.png");
addPerson("VALE0051","Publius Valerius Poplicola","True",-460,"True","romanaristocrat.png");
addPerson("NAUT0101","Gaius Nautius Rutilus","True",-400,"","romanaristocrat.png");
addPerson("FURI0104","Lucius Furius Medullinus","True",-400,"","romanaristocrat.png");
addPerson("MANL0105","Aulus Manlius Vulso","True",-400,"","romanaristocrat.png");
addPerson("IULI0106","Vopiscus Iulius Iullus","True",-400,"","romanaristocrat.png");
addPerson("VERG0107","Opiter Verginius Esquilinus","True",-400,"","romanaristocrat.png");
addPerson("PINA0109","Lucius Pinarius Mamercinus Rufus","True",-400,"","romanaristocrat.png");
addPerson("FURI0110","Publius Furius Medullinus Fusus","True",-464,"True","romanaristocrat.png");
addPerson("CLAU0113","Appius Claudius Crassinus Inregillensis Sabinus","True",-449,"True","romanaristocrat.png");
addPerson("QUIN0114","Titus Quinctius Capitolinus Barbatus","True",-375,"","romanaristocrat.png");
addPerson("AEMI0116","Tiberius Aemilius Mamercus","True",-400,"","romanaristocrat.png");
addPerson("NUMI0121","Titus Numicius Priscus","True",-400,"","romanaristocrat.png");
addPerson("VERG0122","Aulus Verginius (Tricostus) Caeliomontanus","True",-400,"","romanaristocrat.png");
addPerson("SERV0123","Quintus Servilius Structus Priscus","True",-400,"","romanaristocrat.png");
addPerson("FABI0124","Quintus Fabius Vibulanus","True",-375,"","romanaristocrat.png");
addPerson("POST0125","Spurius Postumius Albus Regillensis","True",-439,"","romanaristocrat.png");
addPerson("POST0126","Aulus Postumius Albus Regillensis","True",-400,"","romanaristocrat.png");
addPerson("FURI0127","Spurius Furius Medullinus Fusus","True",-453,"","romanaristocrat.png");
addPerson("SERV0129","Publius Servilius Priscus","True",-463,"","romanaristocrat.png");
addPerson("AEBU0130","Lucius Aebutius Helva","True",-463,"","romanaristocrat.png");
addPerson("LUCR0133","Lucius Lucretius Tricipitinus","True",-400,"","romanaristocrat.png");
addPerson("VETU0134","Titus Veturius Geminus Cicurinus","True",-400,"","romanaristocrat.png");
addPerson("VOLU0137","Publius Volumnius Amintinus Gallus","True",-400,"","romanaristocrat.png");
addPerson("SULP0138","Servius Sulpicius Camerinus Cornutus","True",-375,"","romanaristocrat.png");
addPerson("CLAU0141","Gaius Claudius Crassus Inregillensis Sabinus","True",-460,"True","romanaristocrat.png");
addPerson("CORN0143","Lucius Cornelius Maluginensis Uritinus","True",-400,"","romanaristocrat.png");
addPerson("FURI0146","? (Furius?) Carve(tus)","True",-458,"","romanaristocrat.png");
addPerson("MINU0151","Quintus Minucius Esquilinus","True",-400,"","romanaristocrat.png");
addPerson("QUIN0142","Lucius Quinctius Cincinnatus","True",-375,"","cincinnatus.png");
addPerson("FABI0152","Marcus Fabius Vibulanus","True",-400,"","romanaristocrat.png");
addPerson("VALE0149","Marcus Valerius Maximus (Lactuca)","True",-400,"","romanaristocrat.png");
addPerson("VERG0153","Spurius Verginius Tricostus Caeliomontanus","True",-400,"","romanaristocrat.png");
addPerson("ROMI0156","Titus Romilius Rocus Vaticanus","True",-400,"","romanaristocrat.png");
addPerson("VETU0157","Gaius Veturius Cicurinus","True",-400,"","romanaristocrat.png");
addPerson("TARP0158","Spurius Tarpeius Montanus Capitolinus","True",-375,"","romanaristocrat.png");
addPerson("ATER0159","Aulus Aternius Varus Fontinalis","True",-400,"","romanaristocrat.png");
addPerson("QUIN0163","Sextus Quinctilius","True",-453,"","romanaristocrat.png");
addPerson("CURI0164","Publius Curiatius Fistus Trigeminus","True",-400,"","romanaristocrat.png");
addPerson("MENE0166","Titus Menenius Lanatus","True",-375,"","romanaristocrat.png");
addPerson("SEST0172","Publius Sestius Capito(linus) (Vaticanus)","True",-400,"","romanaristocrat.png");
addPerson("GENU0168","Titus Genucius Augurinus","True",-400,"","romanaristocrat.png");
addPerson("VALE0180","Lucius Valerius Potitus Potitus","True",-375,"","romanaristocrat.png");
addPerson("HORA0181","Marcus Horatius (Tu)rrinus Barbatus","True",-375,"","romanaristocrat.png");
addPerson("HERM0195","Lars Herminius Coritinesanus","True",-375,"","romanaristocrat.png");
addPerson("VERG0196","Titus Verginius Tricostus Caeliomontanus","True",-375,"","romanaristocrat.png");
addPerson("GEGA0199","Marcus Geganius Macerinus","True",-375,"","romanaristocrat.png");
addPerson("IULI0200","Gaius Iulius (Iullus)","True",-375,"","romanaristocrat.png");
addPerson("FURI0201","Agrippa Furius Fusus","True",-375,"","romanaristocrat.png");
addPerson("GENU0205","Marcus Genucius Augurinus","True",-375,"","romanaristocrat.png");
addPerson("CURT0206","Gaius Curtius Philo (or Chilo)","True",-375,"","romanaristocrat.png");
addPerson("FABI0214","Marcus Fabius Vibulanus","True",-375,"","romanaristocrat.png");
addPerson("AEBU0215","Postumus Aebutius Helva Cornicen","True",-375,"","romanaristocrat.png");
addPerson("FURI0219","Gaius Furius Pacilus Fusus","True",-375,"","romanaristocrat.png");
addPerson("PAPI0220","Marcus Papirius Crassus","True",-375,"","romanaristocrat.png");
addPerson("GEGA0222","Proculus Geganius Macerinus","True",-375,"","romanaristocrat.png");
addPerson("MENE0223","Lucius Menenius Lanatus","True",-375,"","romanaristocrat.png");
addPerson("MENE0292","Agrippa Menenius Lanatus","True",-350,"","romanaristocrat.png");
addPerson("SERG0237","Lucius Sergius Fidenas","True",-350,"","romanaristocrat.png");
addPerson("PAPI0240","Lucius Papirius Crassus","True",-375,"","romanaristocrat.png");
addPerson("CORN0241","Marcus Cornelius Maluginensis","True",-375,"","romanaristocrat.png");
addPerson("VERG0243","Lucius Verginius Tricostus","True",-375,"","romanaristocrat.png");
addPerson("VERG3285","Proculus Verginius Tricostus","True",-375,"","romanaristocrat.png");
addPerson("MANL0245","Marcus Manlius Capitolinus (Vulso)","True",-375,"","romanaristocrat.png");
addPerson("SULP0246","Quintus Sulpicius Camerinus Praetextatus","True",-375,"","romanaristocrat.png");
addPerson("QUIN0254","Titus Quinctius Pennus Cincinnatus","True",-350,"","romanaristocrat.png");
addPerson("IULI0255","Gnaeus Iulius Mento","True",-375,"","romanaristocrat.png");
addPerson("PAPI0260","Gaius Papirius Crassus","True",-375,"","romanaristocrat.png");
addPerson("IULI0261","Lucius Iulius Iullus","True",-375,"","romanaristocrat.png");
addPerson("LUCR0264","Hostus Lucretius Tricipitinus","True",-375,"","romanaristocrat.png");
addPerson("CORN0239","Aulus Cornelius Cossus","True",-375,"","AulusCorneliusCossus.png");
addPerson("QUIN0231","Lucius Quinctius Cincinnatus","True",-350,"","romanaristocrat.png");
addPerson("SEMP0269","Aulus Sempronius Atratinus","True",-350,"","romanaristocrat.png");
addPerson("SERV0266","Gaius Servilius Structus Ahala","True",-350,"","romanaristocrat.png");
addPerson("PAPI0267","Lucius Papirius Mugillanus","True",-350,"","romanaristocrat.png");
addPerson("FABI0275","Quintus Fabius Vibulanus","True",-350,"","romanaristocrat.png");
addPerson("SEMP0274","Gaius Sempronius Atratinus","True",-350,"","romanaristocrat.png");
addPerson("FABI0311","Quintus Fabius Vibulanus","True",-350,"","romanaristocrat.png");
addPerson("FABI0329","Numerius Fabius Vibulanus","True",-350,"","romanaristocrat.png");
addPerson("QUIN0285","Titus Quinctius Capitolinus Barbatus","True",-350,"","romanaristocrat.png");
addPerson("CORN0310","Aulus Cornelius Cossus","True",-350,"","romanaristocrat.png");
addPerson("FURI0252","Lucius Furius Medullinus","True",-325,"","romanaristocrat.png");
addPerson("FURI0312","Gaius Furius Pacilus","True",-350,"","romanaristocrat.png");
addPerson("PAPI0314","Marcus Papirius Mugillanus (or Atratinus)","True",-350,"","romanaristocrat.png");
addPerson("NAUT0294","Spurius Nautius Rutilus","True",-350,"","romanaristocrat.png");
addPerson("AEMI0316","Manius Aemilius Mamercinus","True",-350,"","romanaristocrat.png");
addPerson("VALE0301","Gaius Valerius Potitus Volusus","True",-325,"","romanaristocrat.png");
addPerson("CORN0305","Gnaeus Cornelius Cossus","True",-350,"","romanaristocrat.png");
addPerson("VALE0306","Lucius Valerius Potitus","True",-325,"","romanaristocrat.png");
addPerson("CORN0373","Publius Cornelius Maluginensis","True",-325,"","romanaristocrat.png");
addPerson("CORN0426","Servius Cornelius Maluginensis","True",-300,"","romanaristocrat.png");
addPerson("MANL0391","Marcus Manlius Capitolinus","True",-384,"True","MarcusManliusCapitolinus.png");
addPerson("AEMI0484","Lucius Aemilius Mamercinus (or Mamercus)","True",-300,"","romanaristocrat.png");
addPerson("SEXT0469","Lucius Sextius Sextinus Lateranus","",-300,"","plebeian.png");
addPerson("GENU0489","Lucius Genucius Aventinensis","",-362,"True","plebeian.png");
addPerson("SERV0490","Quintus Servilius Ahala","True",-275,"","romanaristocrat.png");
addPerson("SULP0445","Gaius Sulpicius Peticus","True",-300,"","romanaristocrat.png");
addPerson("LICI0468","Gaius Licinius Stolo","",-300,"","plebeian.png");
addPerson("LICI0481","Gaius Licinius Calvus","",-300,"","plebeian.png");
addPerson("GENU0492","Gnaeus Genucius Aventinensis","",-300,"","plebeian.png");
addPerson("FABI0498","Marcus Fabius Ambustus","True",-250,"","romanaristocrat.png");
addPerson("POET0499","Gaius Poetelius Libo Visolus","",-275,"","plebeian.png");
addPerson("POPI0491","Marcus Popillius Laenas","",-275,"","plebeian.png");
addPerson("MANL0500","Gnaeus Manlius Capitolinus Imperiosus","True",-275,"","romanaristocrat.png");
addPerson("FABI0501","Gaius Fabius Ambustus","True",-300,"","romanaristocrat.png");
addPerson("PLAU0502","Gaius Plautius Proculus","",-300,"","plebeian.png");
addPerson("MARC0505","Gaius Marcius Rutilus","",-275,"","plebeian.png");
addPerson("VALE0503","Marcus Valerius Poplicola","True",-300,"","romanaristocrat.png");
addPerson("QUIN0483","Titus Quinctius Pennus Capitolinus Crispinus","True",-275,"","romanaristocrat.png");
addPerson("VALE0511","Publius Valerius Poplicola","True",-275,"","romanaristocrat.png");
addPerson("CORN0513","Lucius Cornelius Scipio","True",-275,"","romanaristocrat.png");
addPerson("FURI0414","Lucius Furius Camillus","True",-275,"","romanaristocrat.png");
addPerson("CLAU0335","Appius Claudius Crassus Inregillensis","True",-349,"","romanaristocrat.png");
addPerson("AEMI0520","Marcus Aemilius","",-275,"","plebeian.png");
addPerson("QUIN0521","Titus Quinctius","",-275,"","plebeian.png");
addPerson("VALE0522","Marcus Valerius Maximus Corvus","True",-225,"","marcusvaleriuscorvus.png");
addPerson("PLAU0523","Gaius Plautius Venox or Venno","",-275,"","plebeian.png");
addPerson("MANL0497","Titus Manlius Imperiosus Torquatus","True",-250,"","manliustorquatus.png");
addPerson("FABI0524","Marcus Fabius Dorsuo","True",-275,"","romanaristocrat.png");
addPerson("SULP0525","Servius Sulpicius Camerinus Rufus","True",-275,"","romanaristocrat.png");
addPerson("CORN0510","Aulus Cornelius Cossus Arvina","True",-250,"","romanaristocrat.png");
addPerson("AEMI0529","Lucius Aemilius Mamercinus Privernas","True",-250,"","romanaristocrat.png");
addPerson("DECI0515","Publius Decius Mus","",-340,"True","plebeian.png");
addPerson("AEMI0538","Tiberius Aemilius Mamercinus","True",-275,"","romanaristocrat.png");
addPerson("PUBL0517","Quintus Publilius Philo","",-250,"","plebeian.png");
addPerson("FURI0526","Lucius Furius Camillus","True",-275,"","romanaristocrat.png");
addPerson("MAEN0540","Gaius Maenius","",-250,"","plebeian.png");
addPerson("SULP0541","Gaius Sulpicius Longus","True",-250,"","romanaristocrat.png");
addPerson("AELI0542","Publius Aelius Paetus","",-250,"","plebeian.png");
addPerson("PAPI0533","Lucius Papirius Crassus","True",-275,"","romanaristocrat.png");
addPerson("DUIL0546","Caeso Duillius","",-275,"","plebeian.png");
addPerson("ATIL0547","Marcus Atilius Regulus Calenus","",-275,"","plebeian.png");
addPerson("POST0548","Spurius Postumius Albinus (Caudinus)","True",-300,"","romanaristocrat.png");
addPerson("VETU0549","Titus Veturius Calvinus","",-300,"","plebeian.png");
addPerson("DOMI0552","Gnaeus Domitius Calvinus","",-275,"","plebeian.png");
addPerson("VALE0556","Gaius Valerius Potitus","True",-275,"","romanaristocrat.png");
addPerson("CLAU0557","Marcus Claudius Marcellus","",-275,"","plebeian.png");
addPerson("PLAU0560","Lucius Plautius Venox or Venno","",-250,"","plebeian.png");
addPerson("PLAU0561","Gaius Plautius Decianus","",-275,"","plebeian.png");
addPerson("PLAU0562","Publius Plautius Proculus","",-275,"","plebeian.png");
addPerson("CORN0563","Publius Cornelius Scapula","True",-301,"","romanaristocrat.png");
addPerson("CORN0612","Publius Cornelius Scipio Barbatus","True",-250,"","romanaristocrat.png");
addPerson("POST0564","Aulus Postumius","True",-275,"","romanaristocrat.png");
addPerson("CORN0565","Lucius Cornelius Lentulus","True",-250,"","romanaristocrat.png");
addPerson("PAPI0534","Lucius Papirius Cursor","True",-250,"","LuciusPapiriusCursor.png");
addPerson("IUNI0539","Decimus Iunius Brutus Scaeva","",-250,"","plebeian.png");
addPerson("AULI0571","Quintus Aulius Cerretanus","",-315,"True","plebeian.png");
addPerson("FABI0559","Quintus Fabius Maximus Rullianus","True",-225,"","QuintusFabiusMaximusRullianus.png");
addPerson("FULV0572","Lucius Fulvius Curvus","",-250,"","plebeian.png");
addPerson("FOLI0579","Marcus Folius Flaccinator","True",-250,"","romanaristocrat.png");
addPerson("PLAU0584","Lucius Plautius Venox or Venno or Venno","",-250,"","plebeian.png");
addPerson("IUNI0587","Gaius Iunius Bubulcus Brutus","",-250,"","plebeian.png");
addPerson("AEMI0588","Quintus Aemilius Barbula","True",-250,"","romanaristocrat.png");
addPerson("NAUT0589","Spurius Nautius Rutilus","True",-250,"","romanaristocrat.png");
addPerson("POPI0590","Marcus Popillius Laenas","",-250,"","plebeian.png");
addPerson("POET0593","Marcus Poetelius Libo","",-250,"","plebeian.png");
addPerson("VALE0570","Marcus Valerius Maximus Corvinus","True",-271,"","romanaristocrat.png");
addPerson("DECI0596","Publius Decius Mus","",-295,"True","plebeian.png");
addPerson("MARC0601","Gaius Marcius Rutilus Censorinus","",-260,"","plebeian.png");
addPerson("CLAU0591","Appius Claudius Caecus","True",-225,"","AppiusClaudiusCaecus.png");
addPerson("VOLU0608","Lucius Volumnius Flamma Violens","",-225,"","plebeian.png");
addPerson("MARC0610","Quintus Marcius Tremulus","",-225,"","plebeian.png");
addPerson("CORN0611","Publius Cornelius Arvina","True",-225,"","romanaristocrat.png");
addPerson("POST0609","Lucius Postumius Megellus","True",-225,"","romanaristocrat.png");
addPerson("MINU0614","Tiberius Minucius Augurinus","",-305,"True","plebeian.png");
addPerson("SEMP0603","Publius Sempronius Sophus","",-225,"","plebeian.png");
addPerson("SULP0617","Publius Sulpicius Saverrio","True",-225,"","romanaristocrat.png");
addPerson("CORN0622","Servius Cornelius Lentulus","True",-250,"","romanaristocrat.png");
addPerson("GENU0623","Lucius Genucius Aventinensis","",-250,"","plebeian.png");
addPerson("LIVI0624","Marcus Livius Denter","",-294,"","plebeian.png");
addPerson("AEMI0625","Marcus Aemilius Paullus","True",-250,"","romanaristocrat.png");
addPerson("APPU0630","Quintus Appuleius Pansa","",-250,"","plebeian.png");
addPerson("FULV0636","Marcus Fulvius Paetinus","",-225,"","plebeian.png");
addPerson("MANL0637","Titus Manlius Torquatus","True",-299,"","romanaristocrat.png");
addPerson("CORN0628","Lucius Cornelius Scipio Barbatus","True",-225,"","romanaristocrat.png");
addPerson("FULV0629","Gnaeus Fulvius Maximus Centumalus","",-200,"","plebeian.png");
addPerson("ATIL0647","Marcus Atilius Regulus","",-225,"","plebeian.png");
addPerson("PAPI0640","Lucius Papirius Cursor","True",-200,"","romanaristocrat.png");
addPerson("CARV0649","Spurius Carvilius Maximus","",-200,"","plebeian.png");
addPerson("FABI0642","Quintus Fabius Maximus Gurges","True",-200,"","romanaristocrat.png");
addPerson("IUNI0652","Decimus Iunius Brutus Scaeva","",-225,"","plebeian.png");
addPerson("IUNI0657","Gaius Iunius Bubulcus Brutus","",-225,"","plebeian.png");
addPerson("CORN0658","Publius Cornelius Rufinus","True",-275,"","romanaristocrat.png");
addPerson("CURI0641","Manius Curius Dentatus","",-270,"","ManiusCuriusDentatus.png");
addPerson("CAED0660","Quintus Caedicius Noctua","",-225,"","plebeian.png");
addPerson("CORN0661","Publius Cornelius Arvina","True",-225,"","romanaristocrat.png");
addPerson("CLAU0662","Marcus Claudius Marcellus","",-225,"","plebeian.png");
addPerson("NAUT0663","Gaius Nautius Rutilus","True",-225,"","romanaristocrat.png");
addPerson("VALE0665","Marcus Valerius Maximus (Potitus)","True",-225,"","romanaristocrat.png");
addPerson("AELI0666","Gaius Aelius Paetus","",-225,"","plebeian.png");
addPerson("CLAU0668","Gaius Claudius Canina","",-200,"","plebeian.png");
addPerson("AEMI0669","Marcus Aemilius Lepidus","True",-225,"","romanaristocrat.png");
addPerson("SERV0672","Gaius Servilius Tucca","True",-225,"","romanaristocrat.png");
addPerson("CAEC0673","Lucius Caecilius Metellus Denter","",-283,"True","plebeian.png");
addPerson("CORN0674","Publius Cornelius Dolabella","True",-282,"True","romanaristocrat.png");
addPerson("DOMI0638","Gnaeus Domitius Calvinus Maximus","",-225,"","plebeian.png");
addPerson("FABR0675","Gaius Fabricius Luscinus","",-225,"","plebeian.png");
addPerson("AEMI0676","Quintus Aemilius Papus","True",-225,"","romanaristocrat.png");
addPerson("AEMI0680","Lucius Aemilius Barbula","True",-200,"","romanaristocrat.png");
addPerson("MARC0681","Quintus Marcius Philippus","",-200,"","plebeian.png");
addPerson("VALE0682","Publius Valerius Laevinus","True",-280,"","romanaristocrat.png");
addPerson("CORU0683","Tiberius Coruncanius","",-243,"","plebeian.png");
addPerson("SULP0684","Publius Sulpicius Saverrio","True",-225,"","romanaristocrat.png");
addPerson("DECI0685","Publius Decius Mus","",-279,"True","plebeian.png");
addPerson("GENU0687","Gaius Genucius Clepsina","",-200,"","plebeian.png");
addPerson("CORN0688","Lucius Cornelius Lentulus Caudinus","True",-225,"","romanaristocrat.png");
addPerson("CORN0689","Servius Cornelius Merenda","True",-200,"","romanaristocrat.png");
addPerson("FABI0691","Gaius Fabius Licinus","True",-200,"","romanaristocrat.png");
addPerson("QUIN0696","Caeso Quinctius Claudus","True",-200,"","romanaristocrat.png");
addPerson("GENU0697","Lucius Genucius Clepsina","",-200,"","plebeian.png");
addPerson("OGUL0632","Quintus Ogulnius Gallus","",-200,"","plebeian.png");
addPerson("FABI0700","Gaius Fabius Pictor","True",-200,"","romanaristocrat.png");
addPerson("SEMP0701","Publius Sempronius Sophus","",-200,"","plebeian.png");
addPerson("CLAU0702","Appius Claudius Russus","True",-268,"","romanaristocrat.png");
addPerson("ATIL0703","Marcus Atilius Regulus","",-255,"True","marcusatiliusregulus.png");
addPerson("IULI0704","Lucius Iulius Libo","True",-200,"","romanaristocrat.png");
addPerson("IUNI0707","Decimus Iunius Pera","",-200,"","plebeian.png");
addPerson("FABI0692","Numerius Fabius Pictor","True",-200,"","romanaristocrat.png");
addPerson("FABI0709","Quintus Fabius Maximus Gurges","True",-265,"True","romanaristocrat.png");
addPerson("MAMI0710","Lucius Mamilius Vitulus","",-200,"","plebeian.png");
addPerson("CORN0698","Gnaeus Cornelius Blasio","True",-175,"","romanaristocrat.png");
addPerson("CLAU0713","Appius Claudius Caudex","True",-200,"","romanaristocrat.png");
addPerson("FULV0699","Marcus Fulvius Flaccus","",-175,"","plebeian.png");
addPerson("VALE0716","Manius Valerius Maximus Messalla","True",-175,"","romanaristocrat.png");
addPerson("OTAC0759","Manius Otacilius Crassus","",-175,"","plebeian.png");
addPerson("POST0718","Lucius Postumius Megellus","True",-253,"","romanaristocrat.png");
addPerson("MAMI0719","Quintus Mamilius Vitulus","",-200,"","plebeian.png");
addPerson("VALE0720","Lucius Valerius Flaccus","True",-200,"","romanaristocrat.png");
addPerson("OTAC0721","Titus Otacilius Crassus","",-200,"","plebeian.png");
addPerson("CORN0723","Gnaeus Cornelius Scipio Asina","True",-260,"True","romanaristocrat.png");
addPerson("DUIL0724","Gaius Duillius","",-175,"","gaiusduilius.png");
addPerson("CORN0722","Lucius Cornelius Scipio","True",-200,"","romanaristocrat.png");
addPerson("AQUI0726","Gaius Aquillius Florus","",-200,"","plebeian.png");
addPerson("ATIL0727","Aulus Atilius Caiatinus","",-175,"","plebeian.png");
addPerson("SULP0728","Gaius Sulpicius Paterculus","True",-200,"","romanaristocrat.png");
addPerson("ATIL0732","Gaius Atilius Regulus","",-200,"","plebeian.png");
addPerson("MANL0734","Lucius Manlius Vulso Longus","True",-200,"","LuciusManliusVulso.png");
addPerson("CAED0735","Quintus Caedicius","",-256,"","plebeian.png");
addPerson("FULV0738","Servius Fulvius Paetinus Nobilior","True",-200,"","romanaristocrat.png");
addPerson("AEMI0739","Marcus Aemilius Paullus","True",-200,"","romanaristocrat.png");
addPerson("SERV0742","Gnaeus Servilius Caepio","True",-200,"","romanaristocrat.png");
addPerson("SEMP0743","Gaius Sempronius Blaesus","",-175,"","plebeian.png");
addPerson("AURE0746","Gaius Aurelius Cotta","",-175,"","plebeian.png");
addPerson("SERV0747","Publius Servilius Geminus","True",-175,"","romanaristocrat.png");
addPerson("CAEC0751","Lucius Caecilius Metellus","",-221,"","LuciusCaeciliusMetellus.png");
addPerson("FURI0745","Gaius Furius Pacilus","True",-200,"","romanaristocrat.png");
addPerson("CLAU0744","Publius Claudius Pulcher","True",-246,"","romanaristocrat.png");
addPerson("IUNI0753","Lucius Iunius Pullus","",-249,"True","plebeian.png");
addPerson("FABI0757","Numerius Fabius Buteo","True",-150,"","romanaristocrat.png");
addPerson("FABI0760","Marcus Fabius Licinus","True",-175,"","romanaristocrat.png");
addPerson("FABI0762","Marcus Fabius Buteo","True",-150,"","romanaristocrat.png");
addPerson("ATIL0763","Gaius Atilius Bulbus","",-175,"","plebeian.png");
addPerson("MANL0758","Aulus Manlius Torquatus Atticus","True",-150,"","romanaristocrat.png");
addPerson("FUND0755","Gaius Fundanius Fundulus","",-175,"","plebeian.png");
addPerson("SULP0764","Gaius Sulpicius Galus","True",-175,"","romanaristocrat.png");
addPerson("LUTA0765","Gaius Lutatius Catulus","",-175,"","plebeian.png");
addPerson("POST0766","Aulus Postumius Albinus","True",-215,"","romanaristocrat.png");
addPerson("LUTA0768","Quintus Lutatius Cerco","",-236,"","plebeian.png");
addPerson("CLAU0776","Gaius Claudius Centho","True",-150,"","romanaristocrat.png");
addPerson("SEMP0777","Marcus Sempronius Tuditanus","",-175,"","plebeian.png");
addPerson("MAMI0778","Gaius Mamilius Turrinus","",-175,"","plebeian.png");
addPerson("VALE0767","Quintus Valerius Falto","True",-175,"","romanaristocrat.png");
addPerson("SEMP0761","Tiberius Sempronius Gracchus","",-175,"","plebeian.png");
addPerson("VALE0779","Publius Valerius Falto","True",-175,"","romanaristocrat.png");
addPerson("CORN0780","Lucius Cornelius Lentulus Caudinus","True",-213,"","romanaristocrat.png");
addPerson("FULV0781","Quintus Fulvius Flaccus","",-150,"","plebeian.png");
addPerson("CORN0782","Publius Cornelius Lentulus Caudinus","True",-175,"","romanaristocrat.png");
addPerson("LICI0783","Gaius Licinius Varus","",-175,"","plebeian.png");
addPerson("MANL0787","Titus Manlius Torquatus","True",-202,"","romanaristocrat.png");
addPerson("POST0788","Lucius Postumius Albinus","True",-216,"True","romanaristocrat.png");
addPerson("CARV0789","Spurius Carvilius Maximus (Ruga)","",-211,"","plebeian.png");
addPerson("FABI0712","Quintus Fabius Maximus Ovicula Verrucosus Cunctator","True",-203,"","QuintusFabiusMaximusVerrucosus.png");
addPerson("POMP0791","Manius Pomponius Matho","",-211,"","plebeian.png");
addPerson("AEMI0792","Marcus Aemilius Lepidus","True",-216,"","romanaristocrat.png");
addPerson("PUBL0771","Marcus Publicius Malleolus","",-175,"","plebeian.png");
addPerson("POMP0853","Marcus Pomponius Matho","",-204,"","plebeian.png");
addPerson("PAPI4665","Gaius Papirius Maso","True",-213,"","romanaristocrat.png");
addPerson("AEMI0796","Marcus Aemilius Barbula","True",-175,"","romanaristocrat.png");
addPerson("IUNI0797","Marcus Iunius Pera","True",-150,"","romanaristocrat.png");
addPerson("FULV0803","Gnaeus Fulvius Centumalus","",-175,"","plebeian.png");
addPerson("VALE0805","Publius Valerius Flaccus","True",-200,"","romanaristocrat.png");
addPerson("ATIL0806","Marcus Atilius Regulus","",-216,"True","plebeian.png");
addPerson("VALE0808","Marcus Valerius (Maximus) Messalla","True",-150,"","romanaristocrat.png");
addPerson("APUS0809","Lucius Apustius Fullo","",-175,"","plebeian.png");
addPerson("AEMI0812","Lucius Aemilius Papus","True",-150,"","romanaristocrat.png");
addPerson("ATIL0813","Gaius Atilius Regulus","",-225,"True","plebeian.png");
addPerson("FLAM0793","Gaius Flaminius","",-217,"True","GaiusFlaminius.png");
addPerson("FURI0814","Publius Furius Philus","True",-214,"","romanaristocrat.png");
addPerson("CLAU0810","Marcus Claudius Marcellus","",-208,"True","publiuscorneliuslentulus.png");
addPerson("CORN0817","Gnaeus Cornelius Scipio Calvus","True",-211,"True","romanaristocrat.png");
addPerson("CORN0819","Publius Cornelius Scipio Asina","True",-200,"","romanaristocrat.png");
addPerson("MINU0820","Marcus Minucius Rufus","",-216,"True","plebeian.png");
addPerson("VALE0807","Marcus Valerius Laevinus","True",-200,"","romanaristocrat.png");
addPerson("MUCI0822","Quintus Mucius Scaevola","",-209,"","plebeian.png");
addPerson("LUTA0823","Gaius Lutatius Catulus","",-150,"","plebeian.png");
addPerson("VETU0824","Lucius Veturius Philo","True",-209,"","romanaristocrat.png");
addPerson("AEMI0826","Lucius Aemilius Paullus","True",-216,"True","LuciusAemiliusPaullusCannae.png");
addPerson("LIVI0827","Marcus Livius Salinator","",-200,"","plebeian.png");
addPerson("CORN0832","Publius Cornelius Scipio","True",-211,"True","PubliusCorneliusScipio.png");
addPerson("SEMP0833","Tiberius Sempronius Longus","",-210,"","SemproniusLongus.png");
addPerson("SERV0852","Gnaeus Servilius Geminus","True",-216,"True","romanaristocrat.png");
addPerson("TERE0818","Gaius Terentius Varro","",-150,"","plebeian.png");
addPerson("SEMP0866","Tiberius Sempronius Gracchus","",-212,"True","plebeian.png");
addPerson("FABI0879","Quintus Fabius Maximus","True",-204,"","QuintusFabiusMaximus.png");
addPerson("CLAU0858","Appius Claudius Pulcher","True",-211,"True","romanaristocrat.png");
addPerson("FULV0904","Gnaeus Fulvius Centumalus","",-210,"True","plebeian.png");
addPerson("SULP0936","Publius Sulpicius Galba Maximus","True",-125,"","romanaristocrat.png");
addPerson("QUIN0916","Titus Quinctius Crispinus","True",-208,"True","romanaristocrat.png");
addPerson("CLAU0908","Gaius Claudius Nero","True",-125,"","GaiusClaudiusNero.png");
addPerson("VETU0949","Lucius Veturius Philo","True",-150,"","romanaristocrat.png");
addPerson("CAEC0891","Quintus Caecilius Metellus","",-125,"","plebeian.png");
addPerson("CORN0878","Publius Cornelius Scipio Africanus Maior","True",-183,"","scipioafricanus.png");
addPerson("LICI0926","Publius Licinius Crassus Dives","",-183,"","plebeian.png");
addPerson("CORN0815","Marcus Cornelius Cethegus","True",-196,"","romanaristocrat.png");
addPerson("SEMP0882","Publius Sempronius Tuditanus","",-125,"","plebeian.png");
addPerson("SERV0919","Gnaeus Servilius Caepio","True",-174,"","romanaristocrat.png");
addPerson("SERV0931","Gaius Servilius Geminus","",-180,"","plebeian.png");
addPerson("SERV0953","Marcus Servilius Pulex Geminus","",-100,"","plebeian.png");
addPerson("CLAU1032","Tiberius Claudius Nero","True",-100,"","romanaristocrat.png");
addPerson("CORN0877","Gnaeus Cornelius Lentulus","True",-184,"","romanaristocrat.png");
addPerson("AELI1006","Publius Aelius Paetus","",-174,"","plebeian.png");
addPerson("AURE1054","Gaius Aurelius Cotta","",-150,"","plebeian.png");
addPerson("CORN1023","Lucius Cornelius Lentulus","True",-173,"","romanaristocrat.png");
addPerson("VILL1034","Publius Villius Tappulus","",-125,"","plebeian.png");
addPerson("AELI1074","Sextus Aelius Paetus Catus","",-125,"","plebeian.png");
addPerson("QUIN0999","Titus Quinctius Flamininus","True",-125,"","romanaristocrat.png");
addPerson("CORN1065","Gaius Cornelius Cethegus","True",-125,"","romanaristocrat.png");
addPerson("MINU1062","Quintus Minucius Rufus","",-125,"","plebeian.png");
addPerson("FURI0967","Lucius Furius Purpurio","True",-125,"","romanaristocrat.png");
addPerson("CLAU0997","Marcus Claudius Marcellus","",-177,"","plebeian.png");
addPerson("VALE0930","Lucius Valerius Flaccus","True",-180,"","romanaristocrat.png");
addPerson("PORC0907","Marcus Porcius Cato 'Censorius'","",-149,"","catoelder.png");
addPerson("SEMP0976","Tiberius Sempronius Longus","",-174,"","plebeian.png");
addPerson("CORN1091","Lucius Cornelius Merula","True",-125,"","romanaristocrat.png");
addPerson("MINU1064","Quintus Minucius Thermus","",-187,"True","plebeian.png");
addPerson("QUIN0977","Lucius Quinctius Flamininus","True",-170,"","romanaristocrat.png");
addPerson("DOMI1110","Gnaeus Domitius Ahenobarbus","",-125,"","plebeian.png");
addPerson("CORN1077","Publius Cornelius Scipio Nasica","True",-100,"","romanaristocrat.png");
addPerson("ACIL1063","Manius Acilius Glabrio","",-175,"","ManiusAciliusGlabrio.png");
addPerson("CORN1016","Lucius Cornelius Scipio Asiaticus","True",-125,"","LuciusCorneliusScipioAsiaticus.png");
addPerson("LAEL0992","Gaius Laelius","",-151,"","plebeian.png");
addPerson("FULV1109","Marcus Fulvius Nobilior","",-125,"","plebeian.png");
addPerson("MANL1103","Gnaeus Manlius Vulso","True",-125,"","romanaristocrat.png");
addPerson("VALE1201","Marcus Valerius Messalla","True",-100,"","romanaristocrat.png");
addPerson("LIVI0952","Gaius Livius Salinator","",-170,"","plebeian.png");
addPerson("AEMI1067","Marcus Aemilius Lepidus","True",-152,"","MarcusAemiliusLepidus2.png");
addPerson("FLAM0989","Gaius Flaminius","",-218,"True","plebeian.png");
addPerson("POST1170","Spurius Postumius Albinus","True",-180,"","romanaristocrat.png");
addPerson("MARC1205","Quintus Marcius Philippus","",-100,"","plebeian.png");
addPerson("CLAU1118","Appius Claudius Pulcher","True",-100,"","romanaristocrat.png");
addPerson("SEMP1157","Marcus Sempronius Tuditanus","",-174,"","plebeian.png");
addPerson("CLAU1191","Publius Claudius Pulcher","True",-125,"","romanaristocrat.png");
addPerson("PORC1154","Lucius Porcius Licinus","",-125,"","plebeian.png");
addPerson("CLAU1229","Marcus Claudius Marcellus","",-169,"","plebeian.png");
addPerson("FABI1117","Quintus Fabius Labeo","True",-100,"","romanaristocrat.png");
addPerson("BAEB1035","Gnaeus Baebius Tamphilus","",-125,"","plebeian.png");
addPerson("AEMI1134","Lucius Aemilius Paullus Macedonicus","True",-160,"","aemiliuspaullus.png");
addPerson("CORN1212","Publius Cornelius Cethegus","True",-100,"","romanaristocrat.png");
addPerson("BAEB1163","Marcus Baebius Tamphilus","",-125,"","plebeian.png");
addPerson("POST1172","Aulus Postumius Albinus (Luscus)","True",-100,"","romanaristocrat.png");
addPerson("CALP1222","Gaius Calpurnius Piso","",-180,"","plebeian.png");
addPerson("FULV1242","Quintus Fulvius Flaccus","",-172,"True","plebeian.png");
addPerson("MANL1204","Lucius Manlius Acidinus Fulvianus","True",-125,"","romanaristocrat.png");
addPerson("IUNI1131","Marcus Iunius Brutus","",-100,"","plebeian.png");
addPerson("MANL1151","Aulus Manlius Vulso","True",-125,"","romanaristocrat.png");
addPerson("CLAU1125","Gaius Claudius Pulcher","True",-167,"","romanaristocrat.png");
addPerson("SEMP1182","Tiberius Sempronius Gracchus","",-100,"","plebeian.png");
addPerson("CORN1090","Gnaeus Cornelius Scipio Hispallus","True",-176,"","romanaristocrat.png");
addPerson("PETI1219","Quintus Petillius Spurinus","",-176,"True","plebeian.png");
addPerson("MUCI1288","Publius Mucius Scaevola","",-100,"","plebeian.png");
addPerson("POST1251","Spurius Postumius Albinus (Paullulus)","True",-100,"","romanaristocrat.png");
addPerson("MUCI1289","Quintus Mucius Scaevola","",-100,"","plebeian.png");
addPerson("POST1278","Lucius Postumius Albinus","True",-100,"","romanaristocrat.png");
addPerson("POPI1283","Marcus Popillius Laenas","",-100,"","plebeian.png");
addPerson("POPI1328","Gaius Popillius Laenas","True",-100,"","romanaristocrat.png");
addPerson("AELI1324","Publius Aelius Ligus","",-100,"","plebeian.png");
addPerson("LICI1321","Publius Licinius Crassus","",-100,"","plebeian.png");
addPerson("CASS1304","Gaius Cassius Longinus","",-100,"","plebeian.png");
addPerson("HOST1275","Aulus Hostilius Mancinus","",-100,"","plebeian.png");
addPerson("ATIL1140","Aulus Atilius Serranus","",-100,"","plebeian.png");
addPerson("SERV1291","Gnaeus Servilius Caepio","True",-100,"","romanaristocrat.png");
addPerson("LICI1354","Gaius Licinius Crassus","",-100,"","plebeian.png");
addPerson("AELI1312","Quintus Aelius Paetus","",-100,"","plebeian.png");
addPerson("IUNI1353","Marcus Iunius Pennus","True",-100,"","romanaristocrat.png");
addPerson("CLAU1318","Marcus Claudius Marcellus","",-148,"","plebeian.png");
addPerson("SULP1173","Gaius Sulpicius Galus","True",-100,"","romanaristocrat.png");
addPerson("MANL1384","Titus Manlius Torquatus","True",-75,"","romanaristocrat.png");
addPerson("OCTA1356","Gnaeus Octavius","",-162,"True","plebeian.png");
addPerson("MANL1442","Aulus Manlius Torquatus","True",-100,"","romanaristocrat.png");
addPerson("CASS1439","Quintus Cassius Longinus","",-164,"","plebeian.png");
addPerson("IUVE1387","Manius Iuventius Thalna","",-163,"","plebeian.png");
addPerson("CORN1396","Publius Cornelius Scipio Nasica Corculum","True",-141,"","PubliusCorneliusScipioNasicaCorculum.png");
addPerson("MARC1395","Gaius Marcius Figulus","",-100,"","plebeian.png");
addPerson("VALE1460","Marcus Valerius Messalla","True",-100,"","romanaristocrat.png");
addPerson("FANN1461","Gaius Fannius Strabo","",-100,"","plebeian.png");
addPerson("ANIC1408","Lucius Anicius Gallus","",-100,"","plebeian.png");
addPerson("CORN1377","Marcus Cornelius Cethegus","True",-100,"","romanaristocrat.png");
addPerson("CORN1457","Gnaeus Cornelius Dolabella","True",-100,"","romanaristocrat.png");
addPerson("FULV1369","Marcus Fulvius Nobilior","",-100,"","plebeian.png");
addPerson("AEMI1471","Marcus Aemilius Lepidus","True",-75,"","romanaristocrat.png");
addPerson("IULI1265","Sextus Iulius Caesar","True",-75,"","romanaristocrat.png");
addPerson("AURE1468","Lucius Aurelius Orestes","",-75,"","plebeian.png");
addPerson("CORN1465","Lucius Cornelius Lentulus Lupus","True",-124,"","romanaristocrat.png");
addPerson("OPIM1476","Quintus Opimius","",-100,"","plebeian.png");
addPerson("POST1406","Lucius Postumius Albinus","True",-154,"True","romanaristocrat.png");
addPerson("FULV1248","Quintus Fulvius Nobilior","",-75,"","plebeian.png");
addPerson("ANNI1404","Titus Annius Luscus","",-125,"","plebeian.png");
addPerson("VALE1466","Lucius Valerius Flaccus","True",-152,"","romanaristocrat.png");
addPerson("LICI1484","Lucius Licinius Lucullus","",-100,"","plebeian.png");
addPerson("POST1420","Aulus Postumius Albinus","True",-75,"","romanaristocrat.png");
addPerson("QUIN1449","Titus Quinctius Flamininus","True",-100,"","romanaristocrat.png");
addPerson("ACIL1494","Manius Acilius Balbus","",-100,"","plebeian.png");
addPerson("MARC1475","Lucius Marcius Censorinus","",-75,"","plebeian.png");
addPerson("MANI1480","Manius Manilius","",-75,"","plebeian.png");
addPerson("POST1502","Spurius Postumius Albinus Magnus","True",-75,"","romanaristocrat.png");
addPerson("CALP1483","Lucius Calpurnius Piso Caesoninus","",-75,"","plebeian.png");
addPerson("CORN1504","Publius Cornelius Scipio Africanus Aemilianus","True",-129,"","scipioaemilianus.png");
addPerson("LIVI1519","Gaius Livius Drusus","",-75,"","plebeian.png");
addPerson("CORN1474","Gnaeus Cornelius Lentulus","True",-75,"","romanaristocrat.png");
addPerson("MUMM1495","Lucius Mummius Achaicus","",-75,"","plebeian.png");
addPerson("FABI1422","Quintus Fabius Maximus Aemilianus","True",-130,"","romanaristocrat.png");
addPerson("HOST1508","Lucius Hostilius Mancinus","",-75,"","plebeian.png");
addPerson("SULP1417","Servius Sulpicius Galba","True",-130,"","romanaristocrat.png");
addPerson("AURE1485","Lucius Aurelius Cotta","",-75,"","plebeian.png");
addPerson("CLAU1452","Appius Claudius Pulcher","True",-130,"","romanaristocrat.png");
addPerson("CAEC1424","Quintus Caecilius Metellus Macedonicus","",-115,"","plebeian.png");
addPerson("CAEC1544","Lucius Caecilius Metellus Calvus","",-75,"","plebeian.png");
addPerson("FABI1545","Quintus Fabius Maximus Servilianus","True",-75,"","romanaristocrat.png");
addPerson("SERV1552","Gnaeus Servilius Caepio","True",-50,"","romanaristocrat.png");
addPerson("POMP1551","Quintus Pompeius","",-75,"","plebeian.png");
addPerson("LAEL1524","Gaius Laelius Sapiens","",-125,"","plebeian.png");
addPerson("SERV1556","Quintus Servilius Caepio","True",-75,"","romanaristocrat.png");
addPerson("CALP1561","Gnaeus Calpurnius Piso","",-75,"","plebeian.png");
addPerson("POPI1563","Marcus Popillius Laenas","",-75,"","plebeian.png");
addPerson("CORN1513","Publius Cornelius Scipio Nasica Serapio","True",-132,"","romanaristocrat.png");
addPerson("IUNI1565","Decimus Iunius Brutus Callaicus","",-75,"","plebeian.png");
addPerson("AEMI1553","Marcus Aemilius Lepidus Porcina","True",-100,"","romanaristocrat.png");
addPerson("HOST1569","Gaius Hostilius Mancinus","",-75,"","plebeian.png");
addPerson("FURI1573","Lucius Furius Philus","True",-75,"","romanaristocrat.png");
addPerson("ATIL1572","Sextus Atilius Serranus","",-75,"","plebeian.png");
addPerson("FULV1576","Servius Fulvius Flaccus","",-75,"","plebeian.png");
addPerson("CALP1575","Quintus Calpurnius Piso","",-75,"","plebeian.png");
addPerson("FULV1581","Gaius Fulvius Flaccus","",-75,"","plebeian.png");
addPerson("MUCI1567","Publius Mucius Scaevola","",-114,"","plebeian.png");
addPerson("CALP1510","Lucius Calpurnius Piso Frugi","",-50,"","plebeian.png");
addPerson("POPI1590","Publius Popillius Laenas","",-100,"","plebeian.png");
addPerson("RUPI1591","Publius Rupilius","",-131,"","plebeian.png");
addPerson("LICI1500","Publius Licinius Crassus Dives Mucianus","",-130,"","plebeian.png");
addPerson("VALE1492","Lucius Valerius Flaccus","True",-75,"","romanaristocrat.png");
addPerson("CORN3363","? Cornelius Lentulus","True",-75,"","praetor.png");
addPerson("CORN1568","Lucius Cornelius Lentulus","True",-130,"","praetor.png");
addPerson("PERP1600","Marcus Perperna","",-129,"","plebeian.png");
addPerson("SEMP1548","Gaius Sempronius Tuditanus","",-75,"","plebeian.png");
addPerson("AQUI1614","Manius Aquillius","",-75,"","plebeian.png");
addPerson("OCTA1617","Gnaeus Octavius","",-75,"","plebeian.png");
addPerson("ANNI1616","Titus Annius Rufus","",-75,"","plebeian.png");
addPerson("CASS1583","Lucius Cassius Longinus Ravilla","",-50,"","plebeian.png");
addPerson("CORN1620","Lucius Cornelius Cinna","True",-75,"","romanaristocrat.png");
addPerson("AEMI1626","Marcus Aemilius Lepidus","True",-75,"","romanaristocrat.png");
addPerson("AURE1627","Lucius Aurelius Orestes","",-50,"","plebeian.png");
addPerson("PLAU1632","Marcus Plautius Hypsaeus","",-75,"","plebeian.png");
addPerson("FULV1624","Marcus Fulvius Flaccus","",-121,"True","plebeian.png");
addPerson("CASS1633","Gaius Cassius Longinus","",-50,"","plebeian.png");
addPerson("SEXT1634","Gaius Sextius Calvinus","",-50,"","plebeian.png");
addPerson("CAEC1635","Quintus Caecilius Metellus Balearicus","",-50,"","plebeian.png");
addPerson("QUIN1636","Titus Quinctius Flamininus","True",-50,"","TitusQuinctiusFlamininus.png");
addPerson("FANN1523","Gaius Fannius","",-50,"","plebeian.png");
addPerson("DOMI1630","Gnaeus Domitius Ahenobarbus","",-103,"","plebeian.png");
addPerson("OPIM1639","Lucius Opimius","",-57,"","plebeian.png");
addPerson("FABI1594","Quintus Fabius Maximus Allobrogicus","True",-100,"","romanaristocrat.png");
addPerson("MANI1643","Publius Manilius","",-50,"","plebeian.png");
addPerson("PAPI1623","Gaius Papirius Carbo","",-119,"True","plebeian.png");
addPerson("CAEC1649","Lucius Caecilius Metellus Delmaticus","",-103,"","plebeian.png");
addPerson("AURE1648","Lucius Aurelius Cotta","",-50,"","plebeian.png");
addPerson("PORC1656","Marcus Porcius Cato","",-118,"","plebeian.png");
addPerson("MARC1655","Quintus Marcius Rex","",-50,"","plebeian.png");
addPerson("CAEC1665","Lucius Caecilius Metellus Diadematus","",-50,"","plebeian.png");
addPerson("MUCI1613","Quintus Mucius Scaevola 'Augur'","",-87,"","plebeian.png");
addPerson("LICI1674","Gaius Licinius Geta","",-50,"","plebeian.png");
addPerson("FABI1615","Quintus Fabius Maximus Eburnus","True",-100,"","romanaristocrat.png");
addPerson("AEMI1645","Marcus Aemilius Scaurus","True",-88,"","romanaristocrat.png");
addPerson("CAEC1677","Marcus Caecilius Metellus","",-50,"","plebeian.png");
addPerson("ACIL1680","Manius Acilius Balbus","",-50,"","plebeian.png");
addPerson("PORC1682","Gaius Porcius Cato","",-100,"","plebeian.png");
addPerson("CAEC1701","Gaius Caecilius Metellus Caprarius","",-50,"","plebeian.png");
addPerson("PAPI1689","Gnaeus Papirius Carbo","",-50,"","plebeian.png");
addPerson("LIVI1651","Marcus Livius Drusus","",-109,"","plebeian.png");
addPerson("CALP1712","Lucius Calpurnius Piso Caesoninus","",-107,"True","plebeian.png");
addPerson("CORN1695","Publius Cornelius Scipio Nasica Serapio","True",-111,"","PubliusCorneliusScipioNasica.png");
addPerson("CALP1663","Lucius Calpurnius Bestia","",-50,"","plebeian.png");
addPerson("MINU1686","Marcus Minucius Rufus","",-50,"","plebeian.png");
addPerson("POST1703","Spurius Postumius Albinus","True",-50,"","romanaristocrat.png");
addPerson("CAEC1693","Quintus Caecilius Metellus Numidicus","",-75,"","plebeian.png");
addPerson("IUNI0885","Marcus Iunius Silanus","",-50,"","plebeian.png");
addPerson("SULP1718","Servius Sulpicius Galba","True",-50,"","romanaristocrat.png");
addPerson("HORT1716","Lucius Hortensius","",-50,"","plebeian.png");
addPerson("HORT1670","Quintus Hortensius","",-50,"","plebeian.png");
addPerson("CASS1715","Lucius Cassius Longinus","",-107,"True","plebeian.png");
addPerson("MARI1660","Gaius Marius","",-86,"","marius.png");
addPerson("SERV1629","Quintus Servilius Caepio","True",-50,"","romanaristocrat.png");
addPerson("ATIL1730","Gaius Atilius Serranus","",-50,"","plebeian.png");
addPerson("RUTI1596","Publius Rutilius Rufus","",-75,"","plebeian.png");
addPerson("MALL1739","Gnaeus Mallius Maximus","",-100,"","plebeian.png");
addPerson("FLAV1743","Gaius Flavius Fimbria","",-75,"","plebeian.png");
addPerson("AURE1749","Lucius Aurelius Orestes","",-103,"","plebeian.png");
addPerson("LUTA1731","Quintus Lutatius Catulus","",-87,"True","plebeian.png");
addPerson("AQUI1757","Manius Aquillius","",-88,"True","plebeian.png");
addPerson("VALE1815","Lucius Valerius Flaccus","True",-71,"","romanaristocrat.png");
addPerson("ANTO1705","Marcus Antonius","",-87,"True","plebeian.png");
addPerson("POST1728","Aulus Postumius Albinus","True",-89,"True","romanaristocrat.png");
addPerson("CAEC1787","Quintus Caecilius Metellus Nepos","",-25,"","plebeian.png");
addPerson("DIDI1776","Titus Didius","",-89,"True","plebeian.png");
addPerson("CORN1792","Gnaeus Cornelius Lentulus","True",-25,"","romanaristocrat.png");
addPerson("LICI1780","Publius Licinius Crassus (Dives)","",-87,"True","plebeian.png");
addPerson("DOMI1763","Gnaeus Domitius Ahenobarbus","",-89,"","plebeian.png");
addPerson("CASS1801","Gaius Cassius Longinus","",-25,"","plebeian.png");
addPerson("LICI1679","Lucius Licinius Crassus","",-91,"","plebeian.png");
addPerson("MUCI1692","Quintus Mucius Scaevola 'Pontifex'","",-82,"True","plebeian.png");
addPerson("DOMI1816","Lucius Domitius Ahenobarbus","",-82,"True","plebeian.png");
addPerson("COEL1744","Gaius Coelius Caldus","",-25,"","GaiusCoeliusCaldus.png");
addPerson("VALE1821","Gaius Valerius Flaccus","True",-25,"","romanaristocrat.png");
addPerson("HERE1819","Marcus Herennius","",-25,"","plebeian.png");
addPerson("CLAU1753","Gaius Claudius Pulcher","True",-91,"","romanaristocrat.png");
addPerson("PERP1826","Marcus Perperna","",-49,"","plebeian.png");
addPerson("MARC1764","Lucius Marcius Philippus","",-25,"","plebeian.png");
addPerson("IULI1828","Sextus Iulius Caesar","True",-90,"","SextusJuliusCaesar.png");
addPerson("IULI1825","Lucius Iulius Caesar","True",-25,"","romanaristocrat.png");
addPerson("RUTI1837","Publius Rutilius Lupus","",-90,"True","plebeian.png");
addPerson("POMP1767","Gnaeus Pompeius Strabo 'Menogenes'","",-87,"","plebeian.png");
addPerson("PORC1841","Lucius Porcius Cato","",-89,"True","LuciusPorciusCato.png");
addPerson("CORN1746","Lucius Cornelius Sulla Felix ('Epaphroditus')","True",-78,"","sulla.png");
addPerson("POMP1805","Quintus Pompeius Rufus","",-88,"True","QuintusPompeiusRufus.png");
addPerson("OCTA1873","Gnaeus Octavius","",-87,"True","plebeian.png");
addPerson("CORN1871","Lucius Cornelius Cinna","True",-84,"True","romanaristocrat.png");
addPerson("PAPI1843","Gnaeus Papirius Carbo","",-82,"True","plebeian.png");
addPerson("CORN1882","Lucius Cornelius Scipio Asiaticus (Asiagenus)","True",-25,"","romanaristocrat.png");
addPerson("NORB1777","Gaius Norbanus (Balbus)","",-82,"True","plebeian.png");
addPerson("MARI1983","Gaius Marius","",-82,"True","mariustheyounger.jpg");
addPerson("TULL2005","Marcus Tullius Decula","",-25,"","plebeian.png");
addPerson("CORN1979","Gnaeus Cornelius Dolabella","True",-25,"","romanaristocrat.png");
addPerson("CAEC1889","Quintus Caecilius Metellus Pius","",-64,"","plebeian.png");
addPerson("SERV1814","Publius Servilius Vatia Isauricus","",-44,"","plebeian.png");
addPerson("CLAU1807","Appius Claudius Pulcher","True",-76,"","romanaristocrat.png");
addPerson("AEMI1993","Marcus Aemilius Lepidus","True",-77,"","romanaristocrat.png");
addPerson("LUTA1949","Quintus Lutatius Catulus","",-59,"","plebeian.png");
addPerson("IUNI2023","Decimus Iunius Brutus","",-25,"","plebeian.png");
addPerson("AEMI1865","Mamercus Aemilius Lepidus Livianus","True",-59,"","romanaristocrat.png");
addPerson("OCTA2031","Gnaeus Octavius","",-25,"","plebeian.png");
addPerson("SCRI1876","Gaius Scribonius Curio 'Burbuleius'","",-53,"","plebeian.png");
addPerson("OCTA2036","Lucius Octavius","",-74,"","plebeian.png");
addPerson("AURE1866","Gaius Aurelius Cotta","",-73,"","plebeian.png");
addPerson("LICI1903","Lucius Licinius Lucullus Ponticus","",-56,"","Lucullus.png");
addPerson("AURE2026","Marcus Aurelius Cotta","",0,"","plebeian.png");
addPerson("TERE1982","Marcus Terentius Varro Lucullus","",0,"","plebeian.png");
addPerson("CASS2050","Gaius Cassius Longinus","",0,"","plebeian.png");
addPerson("GELL1822","Lucius Gellius Poplicola","",-50,"","plebeian.png");
addPerson("CORN2064","Gnaeus Cornelius Lentulus Clodianus","True",0,"","GnaeusCorneliusLentulus.png");
addPerson("CORN2012","Publius Cornelius Lentulus Sura","True",-63,"True","romanaristocrat.png");
addPerson("AUFI2032","Gnaeus Aufidius Orestes","",0,"","plebeian.png");
addPerson("POMP1976","Gnaeus Pompeius Magnus","",-48,"True","pompey.png");
addPerson("LICI1981","Marcus Licinius Crassus","",-53,"True","crassus.png");
addPerson("HORT1902","Quintus Hortensius Hortalus","",-50,"","plebeian.png");
addPerson("CAEC2078","Quintus Caecilius Metellus Creticus","",0,"","plebeian.png");
addPerson("CAEC2150","Lucius Caecilius Metellus","",-68,"","plebeian.png");
addPerson("MARC2151","Quintus Marcius Rex","",-61,"","plebeian.png");
addPerson("CALP2164","Gaius Calpurnius Piso","",-50,"","plebeian.png");
addPerson("ACIL2119","Manius Acilius Glabrio","",-54,"","plebeian.png");
addPerson("AEMI2038","Manius Aemilius Lepidus","True",-50,"","romanaristocrat.png");
addPerson("VOLC2178","Lucius Volcacius Tullus","",-25,"","plebeian.png");
addPerson("AURE2163","Lucius Aurelius Cotta","",25,"","plebeian.png");
addPerson("MANL2205","Lucius Manlius Torquatus","True",-46,"","romanaristocrat.png");
addPerson("IULI2044","Lucius Iulius Caesar","True",-40,"","romanaristocrat.png");
addPerson("MARC2226","Gaius Marcius Figulus","",-44,"","plebeian.png");
addPerson("TULL2072","Marcus Tullius Cicero","",-43,"True","cicero.jpg");
addPerson("ANTO1969","Gaius Antonius Hybrida","",25,"","plebeian.png");
addPerson("IUNI2120","Decimus Iunius Silanus","",-56,"","DecimusJuniusSilanus.png");
addPerson("LICI2085","Lucius Licinius Murena","",0,"","plebeian.png");
addPerson("PUPI1974","Marcus Pupius Piso Frugi Calpurnianus","",-46,"","plebeian.png");
addPerson("VALE2107","Marcus Valerius Messalla Niger 'Menogenes'","True",0,"","romanaristocrat.png");
addPerson("CAEC2040","Quintus Caecilius Metellus Celer","",-59,"","plebeian.png");
addPerson("AFRA2074","Lucius Afranius","",-46,"True","plebeian.png");
addPerson("IULI1957","Gaius Iulius Caesar","True",-44,"True","juliuscaesar.png");
addPerson("CALP2272","Marcus Calpurnius Bibulus","",-48,"","plebeian.png");
addPerson("CALP2168","Lucius Calpurnius Piso Caesoninus","",25,"","LuciusCalpurniusPiso.png");
addPerson("GABI2234","Aulus Gabinius","",-47,"","plebeian.png");
addPerson("CORN2290","Publius Cornelius Lentulus Spinther","True",-47,"True","romanaristocrat.png");
addPerson("CAEC2247","Quintus Caecilius Metellus Nepos 'Pamphilus'","",0,"","plebeian.png");
addPerson("MARC2303","Lucius Marcius Philippus","",25,"","plebeian.png");
addPerson("CORN2082","Gnaeus Cornelius Lentulus Marcellinus","True",-45,"","romanaristocrat.png");
addPerson("DOMI2264","Lucius Domitius Ahenobarbus","",-48,"True","plebeian.png");
addPerson("CLAU2140","Appius Claudius Pulcher","True",-48,"","romanaristocrat.png");
addPerson("DOMI2313","Gnaeus Domitius Calvinus","",-20,"","plebeian.png");
addPerson("VALE2536","Marcus Valerius Messalla Rufus","True",-26,"","romanaristocrat.png");
addPerson("CAEC2347","Quintus Caecilius Metellus Pius Scipio","",-46,"True","QuintusCaeciliusMetellusPiusScipio.png");
addPerson("SULP2088","Servius Sulpicius Rufus","True",-43,"","romanaristocrat.png");
addPerson("CLAU2398","Marcus Claudius Marcellus","",-45,"True","MarcusClaudiusMarcellus.png");
addPerson("AEMI2350","Lucius Aemilius (Lepidus) Paullus","True",25,"","LuciusAemiliusPaullus.png");
addPerson("CLAU2396","Gaius Claudius Marcellus","",-40,"","plebeian.png");
addPerson("CLAU2397","Gaius Claudius Marcellus","",-44,"","plebeian.png");
addPerson("CORN2356","Lucius Cornelius Lentulus Crus","True",-48,"True","romanaristocrat.png");
addPerson("SERV2433","Publius Servilius Isauricus","True",25,"","romanaristocrat.png");
addPerson("FUFI2321","Quintus Fufius Calenus","",-40,"","QuintusFufiusCalenus.png");
addPerson("VATI2297","Publius Vatinius","",-41,"","plebeian.png");
addPerson("AEMI2341","Marcus Aemilius Lepidus","True",-13,"","MarcusAemiliusLepidus.png");
addPerson("ANTO2392","Marcus Antonius","",-30,"True","markantony.png");
addPerson("VIBI2495","Gaius Vibius Pansa Caetronianus","",-43,"True","plebeian.png");
addPerson("HIRT2449","Aulus Hirtius","",-43,"True","plebeian.png");
addPerson("MUNA2450","Lucius Munatius Plancus","",0,"","LuciusMunatiusPlancus.jpg");
addPerson("ANTO2523","Lucius Antonius Pietas","",25,"","luciusantonius.png");
addPerson("ASIN2553","Gaius Asinius Pollio","",4,"","plebeian.png");
addPerson("MARC2711","Lucius Marcius Censorinus","",0,"","plebeian.png");
addPerson("CALV2584","Gaius Calvisius Sabinus","",25,"","plebeian.png");
addPerson("CLAU2867","Appius Claudius Pulcher","True",0,"","romanaristocrat.png");
addPerson("NORB2713","Gaius Norbanus Flaccus","",0,"","plebeian.png");
addPerson("VIPS2808","Marcus Vipsanius Agrippa","",-12,"","MarcusVipsaniusAgrippa.jpg");
addPerson("CANI2821","Lucius Caninius Gallus","",25,"","plebeian.png");
addPerson("GELL2802","Lucius Gellius Poplicola","",25,"","plebeian.png");
addPerson("COCC2806","Marcus Cocceius Nerva","True",0,"","romanaristocrat.png");
addPerson("POMP3286","Sextus Pompeius","",25,"","plebeian.png");
addPerson("CORN2717","Lucius Cornificius","",25,"","plebeian.png");
addPerson("SCRI2518","Lucius Scribonius Libo","True",0,"","romanaristocrat.png");
addPerson("IULI2597","Gaius Iulius Caesar Octavianus","True",14,"","augustus.png");
addPerson("VOLC2609","Lucius Volcacius Tullus","",25,"","plebeian.png");
addPerson("DOMI2699","Gnaeus Domitius Ahenobarbus","",-31,"","GnaeusDomitiusAhenobarbus.png");
addPerson("SOSI2840","Gaius Sosius","",0,"","gaiussosius.png");
addPerson("SILI4366","Publius Silius","",25,"","plebeian.png");
addPerson("LUCR0004","Spurius Lucretius Tricipitinus","True",-509,"","spuriuslucretius.png");
addPerson("MINU0147","Lucius Minucius Esquilinus Augurinus","True",-375,"","romanaristocrat.png");
addPerson("PAPI0212","Lucius Papirius Mugillanus","True",-350,"","romanaristocrat.png");
addPerson("SEMP0213","Lucius Sempronius Atratinus","True",-375,"","romanaristocrat.png");
addPerson("VALE0238","Marcus Valerius Lactuca (or Lactucinus) Maximus","True",-375,"","romanaristocrat.png");
addPerson("LUCR0387","Lucius Lucretius Tricipitinus Flavus","True",-325,"","romanaristocrat.png");
addPerson("SULP0388","Servius Sulpicius Camerinus Rufus","True",-325,"","romanaristocrat.png");
addPerson("FULV0615","Marcus Fulvius Curvus Paetinus","",-250,"","plebeian.png");
addPerson("FULV1194","Quintus Fulvius Flaccus","",-125,"","plebeian.png");
addPerson("VALE1200","Gaius Valerius Laevinus","True",-100,"","romanaristocrat.png");
addPerson("CORN1362","Publius Cornelius Lentulus","True",-121,"","romanaristocrat.png");
addPerson("DOMI1366","Gnaeus Domitius Ahenobarbus","",-125,"","plebeian.png");
addPerson("ACIL1270","Manius Acilius Glabrio","",-100,"","plebeian.png");
addPerson("CLAU1599","Appius Claudius Pulcher","True",-75,"","romanaristocrat.png");
addPerson("AURE1683","Marcus Aurelius Scaurus","",-105,"True","plebeian.png");
addPerson("CORN1872","Lucius Cornelius Merula","True",-87,"True","romanaristocrat.png");
addPerson("VALE1802","Lucius Valerius Flaccus","True",-85,"True","romanaristocrat.png");
addPerson("SERV2203","? Servilius Vatia","",0,"","plebeian.png");
addPerson("FABI2379","Quintus Fabius Maximus (Sanga?)","True",-45,"","romanaristocrat.png");
addPerson("TREB2336","Gaius Trebonius","",-43,"True","plebeian.png");
addPerson("CANI2486","Gaius Caninius Rebilus","",25,"","plebeian.png");
addPerson("CORN2515","Publius Cornelius Dolabella","True",-43,"True","romanaristocrat.png");
addPerson("PEDI2370","Quintus Pedius","",-43,"","plebeian.png");
addPerson("CARR2608","Gaius Carrinas","",25,"","plebeian.png");
addPerson("VENT2638","Publius Ventidius Bassus","",-37,"","plebeian.png");
addPerson("CORN2819","Lucius Cornelius Balbus","",-25,"","plebeian.png");
addPerson("CANI2741","Publius Canidius Crassus","",-30,"","plebeian.png");
addPerson("COCC2767","Gaius Cocceius Balbus","",25,"","plebeian.png");
addPerson("ALFE2766","Publius Alfenus Varus","",25,"","plebeian.png");
addPerson("CORN2664","Lucius Cornelius Lentulus","True",25,"","romanaristocrat.png");
addPerson("MARC2534","Lucius Marcius Philippus","",25,"","plebeian.png");
addPerson("STAT2822","Titus Statilius Taurus","",0,"","titusstatiliustaurus.jpg");
addPerson("NONI2598","Lucius Nonius Asprenas","",25,"","plebeian.png");
addPerson("MARC2865","? Marcius","",25,"","plebeian.png");
addPerson("MARC2389","Quintus Marcius Crispus","",25,"","plebeian.png");
addPerson("PEDU2885","Titus Peducaeus","",25,"","plebeian.png");
addPerson("CORN3783","Publius Cornelius Scipio Pomponianus Salvitto","True",25,"","romanaristocrat.png");
addPerson("SEMP2823","Lucius Sempronius Atratinus","",7,"","plebeian.png");
addPerson("AEMI2895","Lucius Aemilius Lepidus Paullus","True",-13,"","romanaristocrat.png");
addPerson("MEMM2896","Gaius Memmius","",25,"","plebeian.png");
addPerson("HERE2911","Marcus Herennius Picens","",25,"","plebeian.png");
addPerson("AUTR2905","Lucius Autronius Paetus","",25,"","plebeian.png");
addPerson("FLAV2906","Lucius Flavius -","",25,"","plebeian.png");
addPerson("FONT2861","Gaius Fonteius Capito","",25,"","plebeian.png");
addPerson("ACIL2907","Marcus Acilius Glabrio","",25,"","plebeian.png");
addPerson("VINI2496","Lucius Vinicius","",25,"","plebeian.png");
addPerson("LARO2908","Quintus Laronius","",25,"","plebeian.png");
addPerson("CORN2912","Lucius Cornelius (Cinna)","True",25,"","romanaristocrat.png");
addPerson("VALE2913","Marcus Valerius Messalla","True",-20,"","romanaristocrat.png");
addPerson("VALE2758","Marcus Valerius Messalla Corvinus","True",13,"","romanaristocrat.png");
addPerson("TITI2834","Marcus Titius","",0,"","plebeian.png");
addPerson("POMP4667","Gnaeus Pompeius","",14,"","plebeian.png");
addPerson("SAEN3838","Lucius Saenius (Balbinus)","",25,"","plebeian.png");
addPerson("SEST2729","Lucius Sestius Quirinalis Alb-","",50,"","plebeian.png");
addPerson("MINU0006","Marcus Minucius (Augurinus)","True",-450,"","quaestor.png");
addPerson("AEMI3039","? Aemilius","True",25,"","quaestor.png");
addPerson("CORN0144","Aulus Cornelius","",-400,"","quaestor.png");
addPerson("SERV0145","Quintus Servilius (Structus) (Priscus)","True",-400,"","quaestor.png");
addPerson("AEMI0203","Mamercus Aemilius Mamercinus","True",-375,"","quaestor.png");
addPerson("SEXT0309","Publius Sextius","",-414,"True","quaestor.png");
addPerson("AELI0321","Publius Aelius","",-350,"","quaestor.png");
addPerson("FABI0322","Caeso Fabius Ambustus","True",-325,"","quaestor.png");
addPerson("PAPI0323","Publius Papius","",-350,"","quaestor.png");
addPerson("SILI0324","Quintus Silius","",-350,"","quaestor.png");
addPerson("CARV0395","Spurius Carvilius","",-325,"","quaestor.png");
addPerson("AEMI2940","Marcus Aemilius","True",-150,"","quaestor.png");
addPerson("ANNI3451","Gaius Annius","",-150,"","quaestor.png");
addPerson("OPIM0648","Lucius Opimius Pansa","",-294,"True","quaestor.png");
addPerson("SERG3060","Marcus Sergius","",-175,"","quaestor.png");
addPerson("OCTA0798","Gnaeus Octavius Rufus","",-175,"","quaestor.png");
addPerson("FULV0838","Gaius Fulvius","",-150,"","quaestor.png");
addPerson("LUCR0839","Lucius Lucretius","",-150,"","quaestor.png");
addPerson("SEMP0860","Tiberius Sempronius Blaesus","",-217,"True","quaestor.png");
addPerson("ATIL0875","Lucius Atilius","",-216,"True","quaestor.png");
addPerson("FURI0876","Lucius Furius Bibaculus","True",-216,"True","quaestor.png");
addPerson("CAEC0905","Lucius Caecilius Metellus","",-150,"","tribuneplebs.png");
addPerson("TREM1021","Gnaeus Tremellius Flaccus","",-150,"","praetor.png");
addPerson("VALE1022","Marcus Valerius Falto","True",-150,"","praetor.png");
addPerson("ANON3064","Marcus Se-","",50,"","quaestor.png");
addPerson("AURE1116","Lucius Aurelius","",-125,"","quaestor.png");
addPerson("POST1143","Lucius Postumius Tympanus","True",-194,"True","quaestor.png");
addPerson("FURI1179","Gaius Furius Aculeo","",-125,"","quaestor.png");
addPerson("FABI1208","Quintus Fabius (Buteo)","True",-125,"","praetor.png");
addPerson("FABI1209","Quintus Fabius Maximus","True",-125,"","praetor.png");
addPerson("MANL1413","Lucius Manlius (Acidinus)","True",-100,"","quaestor.png");
addPerson("STER1414","Lucius Stertinius","",-100,"","quaestor.png");
addPerson("CORN1415","Lucius Cornelius Scipio","True",-161,"","quaestor.png");
addPerson("TERE1486","? Terentius Varro","",-154,"True","quaestor.png");
addPerson("CORN1506","Gnaeus Cornelius Scipio Hispanus","True",-75,"","praetor.png");
addPerson("FULC1518","Lucius Fulcinnius","",-75,"","quaestor.png");
addPerson("PUBL1536","Gaius Publilius","",-75,"","quaestor.png");
addPerson("TREM1558","Lucius Tremellius Scrofa","",-75,"","praetor.png");
addPerson("SEMP1525","Tiberius Sempronius Gracchus","",-133,"True","tiberiusgracchus.png");
addPerson("AQUI3047","Lucius Aquillius Florus","",-75,"","quaestor.png");
addPerson("SEMP1598","Gaius Sempronius Gracchus","",-121,"True","gaiusgracchus.png");
addPerson("ALBI1667","Publius Albius","",-25,"","quaestor.png");
addPerson("ANNI1676","Marcus Annius","",-50,"","quaestor.png");
addPerson("SEXT1723","Publius Sextius","",-50,"","quaestor.png");
addPerson("VETT3642","Publius Vettius Sabinus","",-25,"","quaestor.png");
addPerson("SERV1734","Gaius Servilius Glaucia","",-100,"True","praetor.png");
addPerson("LUTA1878","Quintus Lutatius Cerco","",-50,"","quaestor.png");
addPerson("BILL1742","Gaius Billienus","",-50,"","praetor.png");
addPerson("OCTA1754","Gnaeus Octavius Ruso","",-25,"","praetor.png");
addPerson("SERV1755","Gnaeus Servilius Caepio","True",-50,"","quaestor.png");
addPerson("APPU1766","Lucius Appuleius Saturninus","",-100,"True","tribuneplebs.png");
addPerson("CALP1795","Lucius Calpurnius Piso (Caesoninus)","",-25,"","praetor.png");
addPerson("LIVI1756","Marcus Livius Drusus","",-91,"True","aedile.png");
addPerson("VETU1782","Lucius (Veturius) or (Publilius) Philo","",-50,"","quaestor.png");
addPerson("GABI1790","Aulus Gabinius","",-50,"","quaestor.png");
addPerson("OCTA4682","Gnaeus Octavius","",25,"","quaestor.png");
addPerson("FUND5159","Gaius Fundanius","",-75,"","quaestor.png");
addPerson("CORN1794","Lucius Cornelius Lentulus","True",-50,"","quaestor.png");
addPerson("SERV1796","Quintus Servilius Caepio","True",-90,"True","praetor.png");
addPerson("SAUF1809","Gaius Saufeius","",-100,"True","quaestor.png");
addPerson("ANON3054","Marcus -","",50,"","quaestor.png");
addPerson("PAVU3055","Publius Tubitanus Pavus","",25,"","quaestor.png");
addPerson("MANL3463","Titus Manlius","",-25,"","quaestor.png");
addPerson("EGNA3449","Gaius Egnatuleius","",-25,"","quaestor.png");
addPerson("IULI1798","Gaius Iulius Caesar Strabo Vopiscus","True",-87,"True","aedile.png");
addPerson("CLOE3676","Titus Cloelius (Cloulius)","",-75,"","praetor.png");
addPerson("MANL1833","Lucius Manlius Torquatus","True",-25,"","quaestor.png");
addPerson("SERG1834","Marcus Sergius Silus","",-25,"","quaestor.png");
addPerson("ANON1832","? - Aesillas","",-25,"","quaestor.png");
addPerson("SERT1818","Quintus Sertorius","",-71,"True","praetor.png");
addPerson("MINU1901","Quintus Minucius Thermus","",-25,"","quaestor.png");
addPerson("VIBI3063","Titus Vibius Temudinus","",-25,"","quaestor.png");
addPerson("CLAU2021","Gaius Claudius Marcellus","",-50,"","praetor.png");
addPerson("HERE3051","Marcus Herennius Rufus","",-25,"","quaestor.png");
addPerson("TREM2157","Gnaeus Tremellius Scrofa","",0,"","praetor.png");
addPerson("HIRT1960","? Hirtuleius","",-75,"True","quaestor.png");
addPerson("TERE1963","Marcus Terentius Varro Reatinus","",-27,"","praetor.png");
addPerson("FONT1965","Marcus Fonteius","",-50,"","praetor.png");
addPerson("IUNI1966","Marcus Iunius Silanus","",-25,"","praetor.png");
addPerson("VERR1967","Gaius Verres","",-41,"True","praetor.png");
addPerson("CAEC3045","Gaius Caecilius Metellus","",-25,"","quaestor.png");
addPerson("MANL2250","Aulus Manlius Torquatus","True",-25,"","praetor.png");
addPerson("FABI2013","Lucius Fabius Hispaniensis","",-71,"True","quaestor.png");
addPerson("MANL2014","Aulus Manlius","True",-25,"","quaestor.png");
addPerson("TARQ2015","Gaius Tarquitius","",-25,"","quaestor.png");
addPerson("POMP3776","Aulus Pompeius","",0,"","quaestor.png");
addPerson("VALE2117","Gaius Valerius Triarius","",0,"","praetor.png");
addPerson("PUBL2025","Gaius Publicius Malleolus","",-25,"","quaestor.png");
addPerson("PUBL3504","Gaius Publicius Malleolus","",-25,"","quaestor.png");
addPerson("HIRT2033","Lucius Hirtuleius","",-75,"True","quaestor.png");
addPerson("POMP3053","Gaius Pomponius","",-25,"","quaestor.png");
addPerson("SEPT3057","Publius Septimius","",25,"","quaestor.png");
addPerson("AELI2045","Gaius Aelius Paetus","",-25,"","quaestor.png");
addPerson("MARI2053","Marcus Marius","",-73,"True","quaestor.png");
addPerson("MEMM2020","Gaius Memmius","",-75,"True","quaestor.png");
addPerson("AUTR2070","Publius Autronius Paetus","",-46,"","plebeian.png");
addPerson("URBI2089","Gaius Urbinius","",0,"","quaestor.png");
addPerson("CASS2257","Lucius Cassius Longinus","",0,"","praetor.png");
addPerson("OPPI2086","Publius Oppius","",0,"","quaestor.png");
addPerson("AXIU2128","Quintus Axius","",-50,"","quaestor.png");
addPerson("POMP2287","Quintus Pompeius Rufus","",0,"","praetor.png");
addPerson("CLAU2134","Lucius Claudius","True",0,"","quaestor.png");
addPerson("VISE2027","Gaius Visellius Varro","",-58,"","aedile.png");
addPerson("RANC2135","Quintus Rancius","",-50,"","quaestor.png");
addPerson("MAEN2133","Titus Maenius","",-50,"","quaestor.png");
addPerson("PUBL2132","Marcus Publicius Scaeva","",-50,"","quaestor.png");
addPerson("MINU2131","Quintus Minucius Thermus","",25,"","praetor.png");
addPerson("OCTA2104","Gaius Octavius","",0,"","praetor.png");
addPerson("POST2105","Marcus Postumius","",0,"","quaestor.png");
addPerson("TORA2106","Gaius Toranius","",-41,"True","praetor.png");
addPerson("CAEC2137","Quintus Caecilius Niger","",0,"","tribuneplebs.png");
addPerson("CAES2138","Publius Caesetius","",0,"","quaestor.png");
addPerson("VETT2344","Titus Vettius Sabinus","",0,"","praetor.png");
addPerson("COEL2154","Gaius Coelius","",0,"","quaestor.png");
addPerson("CURI2155","Quintus Curius","",-50,"","quaestor.png");
addPerson("CURT2156","? Curtius Postumus","",0,"","quaestor.png");
addPerson("VALE1992","Lucius Valerius Flaccus","True",0,"","praetor.png");
addPerson("AURE1909","Marcus Aurelius Scaurus","",0,"","quaestor.png");
addPerson("CREP2184","Marcus Crepereius","",0,"","quaestor.png");
addPerson("TREM3401","Gnaeus Tremellius Scrofa","",25,"","praetor.png");
addPerson("AQUI4686","? Aquillius Florus","",0,"","quaestor.png");
addPerson("PLAE2169","Marcus Plaetorius Cestianus","",0,"","praetor.png");
addPerson("QUIN3291","Titus (Quinctius) Crispinus","",25,"","quaestor.png");
addPerson("SICI2170","Gaius Sicinius","",0,"","quaestor.png");
addPerson("CAEP3041","Gaius Caepasius","",-48,"","quaestor.png");
addPerson("CAEP3042","Lucius Caepasius","",0,"","quaestor.png");
addPerson("POPI2159","Gaius Popillius","",0,"","tribuneplebs.png");
addPerson("VERG2267","Gaius Vergilius Balbus","",25,"","praetor.png");
addPerson("SULP2182","Publius Sulpicius Rufus","True",25,"","quaestor.png");
addPerson("TULL2216","Quintus Tullius Cicero","",-43,"True","praetor.png");
addPerson("SENT3034","Gnaeus Sentius Saturninus","",0,"","quaestor.png");
addPerson("PLAE2087","Lucius Plaetorius Cestianus","",0,"","quaestor.png");
addPerson("SERV3917","Quintus Servilius Caepio","True",-67,"","quaestor.png");
addPerson("AEMI2262","Marcus Aemilius Scaurus","True",0,"","praetor.png");
addPerson("CAEC2263","Lucius Caecilius Rufus","",0,"","praetor.png");
addPerson("PLAU2265","Publius Plautius Hypsaeus","",-44,"","praetor.png");
addPerson("SOSI2266","Gaius Sosius","",25,"","praetor.png");
addPerson("ANCH2110","Quintus Ancharius","",0,"","praetor.png");
addPerson("LOLL2284","Marcus Lollius","",0,"","quaestor.png");
addPerson("PORC2241","Marcus Porcius Cato (Uticensis)","",-46,"True","catoyounger.png");
addPerson("ATIL2294","Sextus Atilius Serranus Gavianus","",0,"","tribuneplebs.png");
addPerson("FADI2295","Titus Fadius Gallus","",-25,"","praetor.png");
addPerson("SEST2296","Publius Sestius","",-25,"","praetor.png");
addPerson("ALLI2324","Aulus Allienus","",25,"","praetor.png");
addPerson("IUVE2308","Marcus Iuventius Laterensis","",-43,"True","praetor.png");
addPerson("CLOD2219","Publius Clodius Pulcher","True",-52,"True","aedile.png");
addPerson("SEXT2323","Publius Sextilius","",0,"","quaestor.png");
addPerson("CURT3402","Marcus Curtius Peducaeanus","",25,"","praetor.png");
addPerson("NUME2334","Quintus Numerius Rufus","",0,"","tribuneplebs.png");
addPerson("APPU3037","Sextus Appuleius","",100,"","praetor.png");
addPerson("CLAU2952","Publius Claudius Pulcher","True",25,"","praetor.png");
addPerson("CAEC2953","Lucius Caecina","",100,"","praetor.png");
addPerson("SERV3059","Lucius Servilius","",25,"","quaestor.png");
addPerson("CAEC2351","? Caecilius","",0,"","quaestor.png");
addPerson("FAVO2352","Marcus Favonius","",-42,"True","praetor.png");
addPerson("CALP2366","Gaius Calpurnius Piso Frugi","",-57,"","quaestor.png");
addPerson("PLAN2312","Gnaeus Plancius","",-25,"","aedile.png");
addPerson("FURF2498","Titus Furfanius Postumus","",25,"","praetor.png");
addPerson("CANI3422","? Canidius","",0,"","quaestor.png");
addPerson("NONI2403","Marcus Nonius Sufenas","",25,"","praetor.png");
addPerson("CAEL2417","Marcus Caelius Rufus","",-48,"True","praetor.png");
addPerson("COEL2408","Marcus Coelius Vinicianus","",25,"","praetor.png");
addPerson("SERV3255","Marcus Servilius","",0,"","quaestor.png");
addPerson("SULP2430","Publius Sulpicius Rufus","True",25,"","praetor.png");
addPerson("LICI2372","Publius Licinius Crassus","",-53,"True","quaestor.png");
addPerson("MINU2466","Lucius Minucius Basilus","",25,"","praetor.png");
addPerson("SALL2429","Gaius Sallustius Crispus","",-35,"","sallust.png");
addPerson("SCRI2443","Gaius Scribonius Curio","",-49,"True","tribuneplebs.png");
addPerson("CASS2458","Gaius Cassius Longinus","",-42,"True","praetor.png");
addPerson("CASS2481","Quintus Cassius Longinus","",-47,"","tribuneplebs.png");
addPerson("IUNI2459","Marcus Iunius Brutus","True",-42,"True","brutus.png");
addPerson("CORN2300","Faustus Cornelius Sulla","True",-46,"True","quaestor.png");
addPerson("LICI2328","Marcus Licinius Crassus","",25,"","quaestor.png");
addPerson("LIGA2442","Titus Ligarius","",-41,"True","quaestor.png");
addPerson("SEST2444","Lucius Sestius Pansa","",0,"","quaestor.png");
addPerson("SEXT2468","Titus Sextius","",25,"","praetor.png");
addPerson("ATEI2479","Lucius Ateius Capito","",25,"","praetor.png");
addPerson("CAEC2480","Lucius Caecilius Metellus","",25,"","tribuneplebs.png");
addPerson("EPPI2482","Marcus Eppius","",25,"","quaestor.png");
addPerson("SERV3056","? Servaeus","",0,"","tribuneplebs.png");
addPerson("ANTO2497","Gaius Antonius","",-42,"True","praetor.png");
addPerson("FURI2499","? Furius Crassipes","",0,"","quaestor.png");
addPerson("MESC2500","Lucius Mescinius Rufus","",25,"","quaestor.png");
addPerson("CLAU3066","Marcus (Claudius) Mar(cellus)","",0,"","quaestor.png");
addPerson("ACIL3067","Manius Acil(ius)","",0,"","quaestor.png");
addPerson("PUBL2228","Quintus Publicius","",0,"","praetor.png");
addPerson("ANNI3069","Lucius Anni-","",0,"","quaestor.png");
addPerson("ANN-3070","Publius Ann- or Ani-","",0,"","quaestor.png");
addPerson("AN-3071","? An-","",25,"","quaestor.png");
addPerson("ATIL3072","Publius At(ilius)","",0,"","quaestor.png");
addPerson("CALP3073","Gaius Calp(urnius)","",0,"","quaestor.png");
addPerson("CORN3074","Publius Cornelius","",25,"","quaestor.png");
addPerson("ANON2667","Publius - Naso","",-41,"True","praetor.png");
addPerson("D-3076","Gaius D-","",0,"","quaestor.png");
addPerson("D-3077","Decimus D-","",0,"","quaestor.png");
addPerson("GN-3078","Lucius Gn-","",0,"","quaestor.png");
addPerson("OPPI3079","? Oppius","",0,"","quaestor.png");
addPerson("SCRI3080","Lucius Scribonius Libo","",-25,"","praetor.png");
addPerson("PORC2404","Gaius Porcius Cato","",0,"","praetor.png");
addPerson("RU-3083","Publius Ru-","",0,"","quaestor.png");
addPerson("TE-3084","Publius Te-","",0,"","quaestor.png");
addPerson("TRI-3085","Gaius Tri-","",0,"","quaestor.png");
addPerson("TRI-3086","? Tri-","",0,"","quaestor.png");
addPerson("POMP2633","Aulus Pompeius Bithynicus","",-42,"True","praetor.png");
addPerson("POS-3090","Lucius Pos-","",0,"","quaestor.png");
addPerson("POS-3091","Spurius Pos-","",0,"","quaestor.png");
addPerson("P-3093","Aulus P- N-","",0,"","quaestor.png");
addPerson("ANNI3293","Sextus Ann(ius?)","",25,"","quaestor.png");
addPerson("CANI3294","? Canini Sallustius","",25,"","quaestor.png");
addPerson("ANNI3322","Lucius Annius","",25,"","quaestor.png");
addPerson("HORT2554","Quintus Hortensius Hortalus","",-42,"True","praetor.png");
addPerson("ANTI2522","Titus Antistius","",-47,"","quaestor.png");
addPerson("COEL2524","Gaius Coelius Caldus","",25,"","quaestor.png");
addPerson("MARI2525","Lucius Marius","",25,"","quaestor.png");
addPerson("AMPU2979","Marcus Ampudius","",50,"","aedile.png");
addPerson("APPU2941","Gaius Appuleius Tappo","",50,"","praetor.png");
addPerson("SANQ2968","Quintus Sanquinius","",50,"","praetor.png");
addPerson("CALP2543","Gnaeus Calpurnius Piso Frugi","",0,"","quaestor.png");
addPerson("FONT3471","? Fonteius","",50,"","quaestor.png");
addPerson("IUNI2489","Decimus Iunius Brutus Albinus","",-43,"True","plebeian.png");
addPerson("IULI2559","Lucius Iulius Caesar","True",-46,"True","quaestor.png");
addPerson("PUPI2661","Marcus Pupius Piso Frugi","",25,"","praetor.png");
addPerson("LUCR3808","Quintus Lucretius","",25,"","quaestor.png");
addPerson("RAES3340","Quintus Raesius (or Caesius)","",25,"","quaestor.png");
addPerson("MARC2540","? Marcius Rufus","",25,"","quaestor.png");
addPerson("NERI2541","Gnaeus Nerius","",25,"","quaestor.png");
addPerson("QUIN2542","Sextus Quinctilius Varus","True",-42,"True","praetor.png");
addPerson("SEXT2602","Gaius Sextilius Rufus","",-25,"","quaestor.png");
addPerson("POMP3777","Titus Pompeius Longinus","",25,"","quaestor.png");
addPerson("APPU2716","Publius Appuleius","",25,"","tribuneplebs.png");
addPerson("APPU2612","? Appuleius","",25,"","quaestor.png");
addPerson("CLAU2570","Marcus Claudius Marcellus Aeserninus","",25,"","quaestor.png");
addPerson("CLAU2571","Tiberius Claudius Nero","True",-33,"","praetor.png");
addPerson("CORN2572","Publius Cornelius Lentulus Marcellinus","True",-48,"True","quaestor.png");
addPerson("CORN2573","Quintus Cornificius","",-42,"True","praetor.png");
addPerson("IULI2374","Sextus Iulius Caesar","True",-46,"True","quaestor.png");
addPerson("PLAE2574","Gaius Plaetorius","",25,"","quaestor.png");
addPerson("SERV4606","? Servius Cordus","",25,"","quaestor.png");
addPerson("GALL2605","Quintus Gallius","",-43,"True","praetor.png");
addPerson("IULI2600","Gnaeus Iulius (Caesar)","True",25,"","quaestor.png");
addPerson("POMP2601","? Pomponius Victor","",25,"","quaestor.png");
addPerson("DECI2628","Gaius Decimius","",25,"","quaestor.png");
addPerson("TULL3062","? Tullius Rufus","",-46,"","quaestor.png");
addPerson("TERE2611","Marcus Terentius Varro Gibba","",-42,"True","varro.jpg");
addPerson("APPU2639","Marcus Appuleius","",0,"","quaestor.png");
addPerson("ANTI2640","Gaius Antistius Vetus","",-25,"","tribuneplebs.png");
addPerson("CASC2130","Aulus Cascellius","",25,"","praetor.png");
addPerson("CORN4704","Quintus Cornelius","",25,"","quaestor.png");
addPerson("CORN2550","Lucius Cornelius Balbus ('Balbillus')","",0,"","quaestor.png");
addPerson("CORN2689","? Cornelius Cinna","",25,"","quaestor.png");
addPerson("CORN2394","Publius Cornelius Lentulus Spinther","True",-42,"True","quaestor.png");
addPerson("EGNA2690","Lucius Egnatuleius","",25,"","quaestor.png");
addPerson("RUTI2691","Quintus Rutilius","",25,"","quaestor.png");
addPerson("TURU2692","Decimus Turullius","",-30,"True","quaestor.png");
addPerson("APPU3040","Lucius Ap(puleius) Dec(ianus)","",25,"","quaestor.png");
addPerson("CORN4703","? Cornelius","",-44,"","quaestor.png");
addPerson("CNOR5118","Lucius Cnorius","",25,"","quaestor.png");
addPerson("CASS2723","Gaius Cassius Parmensis","",-30,"True","quaestor.png");
addPerson("TITI2724","Sextus Titius","",25,"","quaestor.png");
addPerson("MANL2725","Aulus Manlius Torquatus","True",0,"","quaestor.png");
addPerson("ALLI3087","Gaius Allius Bala","",25,"","quaestor.png");
addPerson("B-3088","Quintus B-","",25,"","quaestor.png");
addPerson("ANNI3092","Quintus Anni(us)","",25,"","quaestor.png");
addPerson("FURI3096","? (Furius) Crassipes","",25,"","quaestor.png");
addPerson("TULL2632","Quintus Tullius Cicero","",-43,"True","quaestor.png");
addPerson("PLAE2773","Lucius Plaetorius Cestianus","",25,"","quaestor.png");
addPerson("BARB2800","Marcus Barbatius Pollio","",25,"","praetor.png");
addPerson("DECI2801","? Decidius Saxa","",25,"","quaestor.png");
addPerson("PEDI2803","Quintus Pedius","",25,"","quaestor.png");
addPerson("LIVI3050","Lucius Livius Ocella","",25,"","quaestor.png");
addPerson("MEMM3015","Lucius Memmius","",25,"","tribuneplebs.png");
addPerson("ATIN3044","Titus Atinius Turannus (or Tyrannus)","",25,"","plebeian.png");
addPerson("HEDI3049","Gaius Hedius Thorus","",25,"","quaestor.png");
addPerson("SEST3249","Publius Sestuillius","",25,"","plebeian.png");
addPerson("VOCO3061","Quintus Voconius Vitulus","",25,"","quaestor.png");
addPerson("SEMP3052","Tiberius Sempronius Gracchus","",25,"","quaestor.png");
addPerson("VALE3849","Lucius Valerius Laevinus","True",25,"","quaestor.png");
addPerson("VALE2914","Potitus Valerius Messalla","True",0,"","romanaristocrat.png");
addPerson("CAER2945","Quintus Caerellius","",25,"","praetor.png");
addPerson("PAQU3458","Publius Paquius Scaeva","",50,"","quaestor.png");
addPerson("ACIL3035","Marcus Acilius Caninus","",25,"","quaestor.png");
addPerson("AEMI0131","Gaius (Aemilius)","True",-400,"","romanaristocrat.png");
addPerson("SERV0342","Quintus Servilius Fidenas","True",-325,"","romanaristocrat.png");
addPerson("FURI0340","Marcus Furius Camillus","True",-365,"","marcusfurius.png");
addPerson("CORN0376","Publius Cornelius Scipio","True",-325,"","romanaristocrat.png");
addPerson("LIVI3403","Lucius Livineius Regulus","",25,"","praetor.png");
addPerson("MAEC2850","Gaius Maecenas","",-8,"","plebeian.png");
addPerson("PAPI0009","Manius Papirius","True",-450,"","PontifexMaximus.png");
addPerson("POST0690","Lucius Postumius Albinus","True",-250,"","PontifexMaximus.png");
addPerson("MARC0975","Marcus Marcius","True",-210,"","PontifexMaximus.png");
addPerson("CORN0980","Gnaeus Cornelius Dolabella","True",-180,"","romanaristocrat.png");
addPerson("CLOE1287","Publius Cloelius Siculus","True",-125,"","PontifexMaximus.png");
addPerson("CLAU2190","Lucius Claudius","True",0,"","PontifexMaximus.png");
addPerson("VALE0022","Manius Valerius","True",-450,"","romanaristocrat.png");
addPerson("VALE0037","Manius Valerius Maximus","True",-463,"","romanaristocrat.png");
addPerson("SERV0244","Quintus Servilius Priscus Fidenas","True",-390,"","romanaristocrat.png");
addPerson("POST0249","Aulus Postumius Tubertus","True",-375,"","romanaristocrat.png");
addPerson("CORN0328","Publius Cornelius Rutilus Cossus","True",-350,"","romanaristocrat.png");
addPerson("CORN0432","Aulus Cornelius Cossus","True",-325,"","romanaristocrat.png");
addPerson("QUIN0415","Titus Quinctius Cincinnatus Capitolinus","True",-325,"","romanaristocrat.png");
addPerson("MANL0450","Publius Manlius Capitolinus","True",-300,"","romanaristocrat.png");
addPerson("MANL0493","Lucius Manlius Capitolinus Imperiosus","True",-300,"","romanaristocrat.png");
addPerson("IULI0512","Gaius Iulius (Iullus)","True",-300,"","romanaristocrat.png");
addPerson("CLAU0543","Gaius Claudius Crassus) Inregillensis","True",-275,"","romanaristocrat.png");
addPerson("CORN0550","Publius Cornelius Rufinus","True",-275,"","romanaristocrat.png");
addPerson("PAPI0553","Marcus Papirius Crassus","True",-275,"","romanaristocrat.png");
addPerson("QUIN0487","Gnaeus Quinctius Capitolinus","True",-275,"","aedile.png");
addPerson("FABI0528","Quintus Fabius Ambustus","True",-250,"","romanaristocrat.png");
addPerson("AEMI0576","Marcus Aemilius Papus","True",-250,"","romanaristocrat.png");
addPerson("POET4611","Gaius Poetelius Libo Visolus","",-250,"","plebeian.png");
addPerson("HORT0664","Quintus Hortensius","",-287,"","plebeian.png");
addPerson("AEMI0671","Marcus Aemilius Barbula","True",-225,"","romanaristocrat.png");
addPerson("CLAU0754","Marcus Claudius Glicia","",-175,"","plebeian.png");
addPerson("SERV0038","Quintus Servilius Priscus Structus","True",-425,"","romanaristocrat.png");
addPerson("TARQ0148","Lucius Tarquitius Flaccus","True",-400,"","romanaristocrat.png");
addPerson("SERV0226","Gaius Servilius Ahala","True",-375,"","romanaristocrat.png");
addPerson("SERV0327","Gaius Servilius Ahala","True",-350,"","romanaristocrat.png");
addPerson("VALE0381","Lucius Valerius Poplicola","True",-325,"","romanaristocrat.png");
addPerson("SERV0411","Gaius Servilius Ahala","True",-325,"","romanaristocrat.png");
addPerson("SEMP0448","Aulus Sempronius Atratinus","True",-325,"","romanaristocrat.png");
addPerson("QUIN0476","Titus Quinctius Cincinnatus Capitolinus","True",-300,"","romanaristocrat.png");
addPerson("PINA0494","Lucius Pinarius Natta","True",-275,"","praetor.png");
addPerson("CORN0495","? (Cornelius or Mucius) Sca.u.la (Scapula or Scaevola)","",-300,"","plebeian.png");
addPerson("CORN0519","Publius Cornelius Scipio","True",-275,"","aedile.png");
addPerson("CLAU0544","Gaius Claudius Hortator","True",-275,"","romanaristocrat.png");
addPerson("ANTO0551","Marcus Antonius","",-275,"","plebeian.png");
addPerson("VALE0429","Publius Valerius Potitus Poplicola","True",-275,"","romanaristocrat.png");
addPerson("VALE0577","Lucius Valerius Flaccus","True",-250,"","romanaristocrat.png");
addPerson("TITI0626","Marcus Titinius","",-250,"","plebeian.png");
addPerson("LAET0733","Marcus Laetorius Plancianus","",-200,"","plebeian.png");
addPerson("APPU2998","? Appuleius","",25,"","tribuneplebs.png");
addPerson("CICE3003","? Cicereius","",25,"","tribuneplebs.png");
addPerson("FURI3004","? Furius","",25,"","tribuneplebs.png");
addPerson("CREP3005","? Crepereius","",25,"","tribuneplebs.png");
addPerson("GLIT3010","? Glitius","",25,"","tribuneplebs.png");
addPerson("LICI3013","? Licinius","",25,"","tribuneplebs.png");
addPerson("OLLI3020","? Ollinius","",25,"","tribuneplebs.png");
addPerson("PAPI3027","? Papius","",25,"","tribuneplebs.png");
addPerson("ALBI0039","Lucius Albinius Paterculus","",-425,"","tribuneplebs.png");
addPerson("IUNI0040","Lucius Iunius Brutus","",-425,"","aedile.png");
addPerson("LICI0041","Gaius Licinius","",-425,"","tribuneplebs.png");
addPerson("LICI0042","Publius Licinius","",-425,"","tribuneplebs.png");
addPerson("SICI0043","Lucius Sicinius Vellutus (Bellutus)","",-425,"","aedile.png");
addPerson("VISC0044","Gaius Viscellius (or Visellius) Ruga","",-425,"","aedile.png");
addPerson("SICI0050","Spurius Sicinius","",-425,"","tribuneplebs.png");
addPerson("DECI0046","Marcus Decius","",-425,"","tribuneplebs.png");
addPerson("RABU0064","Gaius Rabuleius","",-425,"","tribuneplebs.png");
addPerson("MUCI0065","Publius Mucius Scaevola","",-425,"","tribuneplebs.png");
addPerson("MAEN0083","Gaius Maenius","",-425,"","tribuneplebs.png");
addPerson("LICI0087","Spurius Licinius","",-425,"","tribuneplebs.png");
addPerson("PONT0089","Tiberius Pontificius","",-425,"","tribuneplebs.png");
addPerson("CONS0099","Quintus Considius","",-425,"","tribuneplebs.png");
addPerson("GENU0100","Titus Genucius","",-425,"","tribuneplebs.png");
addPerson("CAED0102","Lucius Caedicius","",-425,"","tribuneplebs.png");
addPerson("STAT0103","Titus Statius","",-425,"","tribuneplebs.png");
addPerson("GENU0108","Gnaeus Genucius","",-473,"","tribuneplebs.png");
addPerson("PUBL0111","Volero Publilius","",-400,"","tribuneplebs.png");
addPerson("LAET0115","Gaius Laetorius","",-400,"","tribuneplebs.png");
addPerson("DUIL0117","Marcus Duillius","",-375,"","tribuneplebs.png");
addPerson("ICIL0047","Spurius Icilius","",-400,"","tribuneplebs.png");
addPerson("MECI0118","Lucius Mecilius","",-400,"","tribuneplebs.png");
addPerson("NUMI0119","Lucius Numitorius","",-400,"","tribuneplebs.png");
addPerson("SICC0120","Gnaeus Siccius","",-400,"","tribuneplebs.png");
addPerson("TERE0135","Gaius Terentilius Harsa","",-400,"","tribuneplebs.png");
addPerson("TITI0136","Sextus Titius","",-400,"","tribuneplebs.png");
addPerson("VERG0139","Aulus Verginius","",-400,"","tribuneplebs.png");
addPerson("VOLS0140","Marcus Volscius Fictor","",-400,"","tribuneplebs.png");
addPerson("ICIL0154","Lucius Icilius","",-375,"","tribuneplebs.png");
addPerson("ALIE0155","Lucius Alienus","",-400,"","aedile.png");
addPerson("CALV0160","Gaius Calvius Cicero","",-400,"","tribuneplebs.png");
addPerson("SICC0161","Lucius Siccius Dentatus 'Achilles Romanus'","",-449,"True","tribuneplebs.png");
addPerson("HOST3011","? Hostilius","",-50,"","tribuneplebs.png");
addPerson("APRO0182","Gaius Apronius","",-375,"","tribuneplebs.png");
addPerson("NUMI0183","Publius Numitorius","",-375,"","tribuneplebs.png");
addPerson("OPPI0184","Gaius Oppius","",-375,"","tribuneplebs.png");
addPerson("POMP0185","Marcus Pomponius","",-375,"","tribuneplebs.png");
addPerson("SICI0186","Gaius Sicinius","",-375,"","tribuneplebs.png");
addPerson("TITI0187","Marcus Titinius","",-375,"","tribuneplebs.png");
addPerson("VERG0188","Lucius Verginius","",-375,"","tribuneplebs.png");
addPerson("VILL0189","Appius Villius","",-375,"","tribuneplebs.png");
addPerson("ATER0197","Aulus Aternius (Varus) (Fontinalis)","True",-375,"","tribuneplebs.png");
addPerson("TREB0198","Lucius Trebonius Asper","",-375,"","tribuneplebs.png");
addPerson("CANU0207","Gaius Canuleius","",-375,"","tribuneplebs.png");
addPerson("FURN0208","Gaius Furnius","",-375,"","tribuneplebs.png");
addPerson("POET0216","? Poetelius","",-375,"","tribuneplebs.png");
addPerson("CAEC0227","Quintus Caecilius","",-375,"","tribuneplebs.png");
addPerson("IUNI0228","Quintus Iunius","",-375,"","tribuneplebs.png");
addPerson("TITI0229","Sextus Titinius","",-375,"","tribuneplebs.png");
addPerson("MAEL0242","Spurius Maelius","",-375,"","tribuneplebs.png");
addPerson("IUNI0276","Gaius Iunius","",-350,"","tribuneplebs.png");
addPerson("ANTI0280","Tiberius Antistius","",-350,"","tribuneplebs.png");
addPerson("ASEL0281","Marcus Asellius","",-350,"","tribuneplebs.png");
addPerson("SPUR0282","Tiberius Spurillius","",-350,"","tribuneplebs.png");
addPerson("TEMP0277","Sextus Tempanius","",-350,"","tribuneplebs.png");
addPerson("HORT0283","Lucius Hortensius","",-350,"","tribuneplebs.png");
addPerson("ANTI0287","Aulus Antistius","",-350,"","tribuneplebs.png");
addPerson("POMP0288","Sextus Pompilius","",-350,"","tribuneplebs.png");
addPerson("CANU0289","Marcus Canuleius","",-350,"","tribuneplebs.png");
addPerson("MAEC0298","Spurius Maecilius","",-350,"","tribuneplebs.png");
addPerson("METI0299","Marcus Metilius","",-350,"","tribuneplebs.png");
addPerson("DECI0304","Lucius Decius","",-350,"","tribuneplebs.png");
addPerson("SEXT0308","Marcus Sextius","",-350,"","tribuneplebs.png");
addPerson("ICIL0313","Lucius Icilius","",-350,"","tribuneplebs.png");
addPerson("MENE0317","Marcus Menenius","",-350,"","tribuneplebs.png");
addPerson("ICIL0319","? Icilius","",-350,"","tribuneplebs.png");
addPerson("ICIL0320","? Icilius","",-350,"","tribuneplebs.png");
addPerson("ACUT0348","Marcus Acutius","",-350,"","tribuneplebs.png");
addPerson("CURI0349","Publius Curiatius","",-350,"","tribuneplebs.png");
addPerson("LACE0350","Gaius Lacerius","",-350,"","tribuneplebs.png");
addPerson("METI0351","Marcus Metilius","",-350,"","tribuneplebs.png");
addPerson("MINU0352","Marcus Minucius","",-350,"","tribuneplebs.png");
addPerson("TREB0353","Gnaeus Trebonius","",-350,"","tribuneplebs.png");
addPerson("SICI0385","Titus Sicinius","",-325,"","tribuneplebs.png");
addPerson("POMP0378","Quintus Pomponius","",-325,"","tribuneplebs.png");
addPerson("VERG0379","Aulus Verginius","",-325,"","tribuneplebs.png");
addPerson("APPU0394","Lucius Appuleius","",-325,"","tribuneplebs.png");
addPerson("MARC0413","Gnaeus Marcius","",-325,"","tribuneplebs.png");
addPerson("SICI0425","Lucius Sicinius","",-325,"","tribuneplebs.png");
addPerson("MENE0434","Marcus Menenius","",-325,"","tribuneplebs.png");
addPerson("PUBL0435","Quintus Publilius","",-325,"","tribuneplebs.png");
addPerson("POMP0496","Marcus Pomponius","",-300,"","tribuneplebs.png");
addPerson("DUIL0506","Marcus Duillius","",-300,"","tribuneplebs.png");
addPerson("MENE0507","Lucius Menenius","",-300,"","tribuneplebs.png");
addPerson("GENU0530","Lucius Genucius","",-275,"","tribuneplebs.png");
addPerson("FLAV0566","Marcus Flavius","",-250,"","tribuneplebs.png");
addPerson("LIVI0580","Lucius Livius","",-250,"","tribuneplebs.png");
addPerson("MAEL0581","Quintus Maelius","",-250,"","tribuneplebs.png");
addPerson("NUMI0582","Tiberius Numicius","",-250,"","tribuneplebs.png");
addPerson("ANTI0583","Marcus Antistius","",-250,"","tribuneplebs.png");
addPerson("OVIN0594","? Ovinius","",-250,"","tribuneplebs.png");
addPerson("COMI0598","Lucius Cominius","",-250,"","tribuneplebs.png");
addPerson("ATIL0600","Lucius Atilius","",-250,"","tribuneplebs.png");
addPerson("DECI0602","Marcus Decius","",-250,"","tribuneplebs.png");
addPerson("FURI0607","Lucius Furius","",-250,"","tribuneplebs.png");
addPerson("FLAV0616","Gnaeus Flavius","",-250,"","aedile.png");
addPerson("OGUL0631","Gnaeus Ogulnius","",-225,"","aedile.png");
addPerson("AQUI0667","? Aquillius","",-150,"","tribuneplebs.png");
addPerson("SCAN0650","Marcus Scantius","",-225,"","tribuneplebs.png");
addPerson("AELI0670","Gaius Aelius","",-225,"","tribuneplebs.png");
addPerson("MAEN0686","? Maenius","",-225,"","tribuneplebs.png");
addPerson("PULL0756","? Pullius","",-175,"","tribuneplebs.png");
addPerson("PLAE3024","Marcus Plaetorius","",-175,"","tribuneplebs.png");
addPerson("GENU0769","? Genucius","",-175,"","tribuneplebs.png");
addPerson("PAPI3016","Lucius Papirius","",-50,"","tribuneplebs.png");
addPerson("METI0825","Marcus Metilius","",-150,"","tribuneplebs.png");
addPerson("CLAU0837","Quintus Claudius","",-150,"","tribuneplebs.png");
addPerson("METI0859","Marcus Metilius","",-150,"","tribuneplebs.png");
addPerson("BAEB0872","Quintus Baebius Herennius","",-150,"","tribuneplebs.png");
addPerson("MINU0873","Marcus Minucius","",-150,"","tribuneplebs.png");
addPerson("SCRI0874","Lucius Scribonius Libo","",-150,"","praetor.png");
addPerson("OPPI0895","Gaius Oppius","",-150,"","tribuneplebs.png");
addPerson("CARV0927","Lucius Carvilius","",-150,"","tribuneplebs.png");
addPerson("CARV0928","Spurius Carvilius","",-150,"","tribuneplebs.png");
addPerson("SERV0929","Gaius Servilius Casca","",-150,"","tribuneplebs.png");
addPerson("AQUI0941","Publius Aquillius","",-150,"","tribuneplebs.png");
addPerson("SEMP0942","Gaius Sempronius Blaesus","",-150,"","tribuneplebs.png");
addPerson("ARRE0962","Gaius Arrenius","",-150,"","tribuneplebs.png");
addPerson("ARRE0963","Lucius Arrenius","",-150,"","tribuneplebs.png");
addPerson("LUCR0965","Marcus Lucretius","",-150,"","tribuneplebs.png");
addPerson("PUBL0988","Gaius Publicius Bibulus","",-150,"","tribuneplebs.png");
addPerson("CINC1036","Marcus Cincius Alimentus","",-125,"","tribuneplebs.png");
addPerson("LICI1037","? Licinius","",-150,"","tribuneplebs.png");
addPerson("SILI1038","Marcus Silius","",-150,"","tribuneplebs.png");
addPerson("SILI1039","Publius Silius","",-150,"","tribuneplebs.png");
addPerson("BAEB1076","Quintus Baebius","",-150,"","tribuneplebs.png");
addPerson("PORC3025","? Porcius","",-50,"","tribuneplebs.png");
addPerson("VALL3038","? Vallius","",-50,"","tribuneplebs.png");
addPerson("PORC3295","? Porcius Laeca","",-50,"","tribuneplebs.png");
addPerson("PORC1084","Publius Porcius Laeca","",-164,"","praetor.png");
addPerson("IUNI3012","? Iunius","",-100,"","tribuneplebs.png");
addPerson("FULV1072","Marcus Fulvius Flaccus","",-125,"","tribuneplebs.png");
addPerson("CURI1094","Manius Curius","",-125,"","tribuneplebs.png");
addPerson("FULV1104","Quintus Fulvius","",-125,"","tribuneplebs.png");
addPerson("OPPI1105","Lucius Oppius Salinator","",-125,"","praetor.png");
addPerson("AFRA1227","Gaius Afranius Stellio","",-125,"","praetor.png");
addPerson("ATIN1113","Gaius Atinius Labeo","",-125,"","praetor.png");
addPerson("LICI1114","Gaius Licinius Lucullus","",-125,"","tribuneplebs.png");
addPerson("MARC1115","Quintus Marcius Ralla","",-125,"","tribuneplebs.png");
addPerson("FUND1130","Marcus Fundanius","",-125,"","tribuneplebs.png");
addPerson("IUNI1132","Publius Iunius Brutus","",-125,"","praetor.png");
addPerson("VALE1133","Lucius Valerius Tappo","",-125,"","praetor.png");
addPerson("AELI1152","Quintus Aelius Tubero","",-125,"","tribuneplebs.png");
addPerson("TITI1167","Gaius Titinius","",-125,"","tribuneplebs.png");
addPerson("TITI1168","Marcus Titinius Curvus","",-125,"","praetor.png");
addPerson("PLAE3022","? Plaetorius","",-125,"","tribuneplebs.png");
addPerson("SEMP1171","Publius Sempronius Blaesus","",-125,"","tribuneplebs.png");
addPerson("ATIL0964","Lucius Atilius","",-216,"True","tribuneplebs.png");
addPerson("SEMP1195","Publius Sempronius Gracchus","",-125,"","tribuneplebs.png");
addPerson("SEMP1196","Gaius Sempronius Rutilus","",-125,"","tribuneplebs.png");
addPerson("TERE1135","Quintus Terentius Culleo","",-100,"","praetor.png");
addPerson("VALE1207","Gaius Valerius Tappo","",-125,"","tribuneplebs.png");
addPerson("ABUR1215","Marcus Aburius","",-125,"","praetor.png");
addPerson("MUMM1216","Lucius Mummius","",-125,"","praetor.png");
addPerson("MUMM1217","Quintus Mummius","",-125,"","tribuneplebs.png");
addPerson("PETI1218","Quintus Petillius","",-125,"","tribuneplebs.png");
addPerson("CAEL1243","Marcus Caelius","",-125,"","tribuneplebs.png");
addPerson("FANN1244","Gaius Fannius","",-125,"","tribuneplebs.png");
addPerson("MINU1245","Gaius Minucius Augurinus","",-125,"","tribuneplebs.png");
addPerson("NAEV1246","Marcus Naevius","",-125,"","tribuneplebs.png");
addPerson("ORCH1257","Gaius Orchius","",-125,"","tribuneplebs.png");
addPerson("VILL1279","Lucius Villius Annalis","",-100,"","praetor.png");
addPerson("AELI1429","Quintus Aelius Tubero","",-100,"","tribuneplebs.png");
addPerson("LICI1314","Aulus Licinius Nerva","",-125,"","tribuneplebs.png");
addPerson("PAPI1315","Gaius Papirius Turdus","",-125,"","tribuneplebs.png");
addPerson("LICI1374","Aulus Licinius Nerva","",-100,"","praetor.png");
addPerson("LICI1425","Gaius Licinius Nerva","",-100,"","praetor.png");
addPerson("MAEV3460","? Maevius","",-125,"","praetor.png");
addPerson("PAPI3017","Quintus Papirius","",-100,"","tribuneplebs.png");
addPerson("LUCR1357","Marcus Lucretius","",-100,"","tribuneplebs.png");
addPerson("MARC1358","Quintus Marcius Scilla","",-100,"","tribuneplebs.png");
addPerson("MARC1359","Marcus Marcius Sermo","",-100,"","tribuneplebs.png");
addPerson("AUFI1386","Gnaeus Aufidius","",-100,"","tribuneplebs.png");
addPerson("FURI3001","Gaius Furius","",-100,"","tribuneplebs.png");
addPerson("RUTI1397","Publius Rutilius","",-100,"","tribuneplebs.png");
addPerson("VOCO1398","Quintus Voconius Saxa","",-100,"","tribuneplebs.png");
addPerson("TREM1412","Gnaeus Tremellius","",-100,"","praetor.png");
addPerson("ANTO1443","Marcus Antonius","",-100,"","tribuneplebs.png");
addPerson("POMP1444","Marcus Pomponius","",-100,"","praetor.png");
addPerson("SEMP1445","Tiberius Sempronius","",-100,"","tribuneplebs.png");
addPerson("PLAE3023","? Plaetorius","",-100,"","tribuneplebs.png");
addPerson("AELI1496","? Aelius","",-100,"","praetor.png");
addPerson("FUFI1497","? Fufius","",-100,"","tribuneplebs.png");
addPerson("ATIN1509","? Atinius","",-75,"","tribuneplebs.png");
addPerson("SCRI1511","Lucius Scribonius Libo","",-75,"","tribuneplebs.png");
addPerson("SCAN1512","Marcus Scantius or Scantinius","",-75,"","tribuneplebs.png");
addPerson("LIVI1535","? Livius","",-75,"","tribuneplebs.png");
addPerson("LICI1547","Gaius Licinius Crassus","",-75,"","tribuneplebs.png");
addPerson("DIDI1557","Titus Didius","",-75,"","tribuneplebs.png");
addPerson("FANN3464","Gaius Fannius","",-50,"","praetor.png");
addPerson("CLAU1570","Tiberius Claudius Asellus","",-75,"","tribuneplebs.png");
addPerson("GABI1541","Aulus Gabinius","",-75,"","tribuneplebs.png");
addPerson("CURI1577","Gaius Curiatius","",-75,"","tribuneplebs.png");
addPerson("LICI1578","? Licinius","",-75,"","tribuneplebs.png");
addPerson("ANTI1582","Marcus Antius Briso","",-75,"","tribuneplebs.png");
addPerson("RUTI1585","Publius Rutilius","",-75,"","tribuneplebs.png");
addPerson("OCTA1607","Marcus Octavius","",-75,"","tribuneplebs.png");
addPerson("RUBR1608","? Rubrius","",-75,"","tribuneplebs.png");
addPerson("SATU1609","Publius Satureius","",-75,"","tribuneplebs.png");
addPerson("AELI1622","Quintus Aelius Tubero","",-75,"","tribuneplebs.png");
addPerson("ATIN1618","Gaius Atinius Labeo Macerio","",-50,"","praetor.png");
addPerson("IUNI1638","Marcus Iunius Pennus","",-50,"","aedile.png");
addPerson("PAPI3014","? Papius","",-75,"","tribuneplebs.png");
addPerson("AUFE1644","? Aufeius","",-50,"","tribuneplebs.png");
addPerson("MARC1652","Gnaeus Marcius Censorinus","",-50,"","tribuneplebs.png");
addPerson("ACIL1650","Manius Acilius Glabrio","",-50,"","tribuneplebs.png");
addPerson("RUBR1653","Gaius Rubrius","",-50,"","tribuneplebs.png");
addPerson("MAEV1658","? Maevius","",-50,"","tribuneplebs.png");
addPerson("DECI1666","Publius Decius Subolo","",-50,"","praetor.png");
addPerson("LICI1720","Gaius Licinius Nerva","",-50,"","tribuneplebs.png");
addPerson("THOR1722","Spurius Thorius","",-50,"","tribuneplebs.png");
addPerson("MEMM3380","? Memmius","",-50,"","tribuneplebs.png");
addPerson("PEDU1704","Sextus Peducaeus","",-50,"","tribuneplebs.png");
addPerson("MEMM1595","Gaius Memmius","",-100,"True","praetor.png");
addPerson("BAEB1719","Gaius Baebius","",-50,"","tribuneplebs.png");
addPerson("OTAC4689","Lucius Otacilius Rufus","",-25,"","tribuneplebs.png");
addPerson("ANNI1724","Lucius Annius","",-50,"","tribuneplebs.png");
addPerson("LICI1725","Publius Licinius Lucullus","",-50,"","tribuneplebs.png");
addPerson("MAMI1733","Gaius Mamilius Limetanus","",-25,"","tribuneplebs.png");
addPerson("MANL1745","Titus Manlius Mancinus","",-50,"","tribuneplebs.png");
addPerson("CASS1762","Lucius Cassius Longinus","",-50,"","tribuneplebs.png");
addPerson("CLOD1765","? Clodius","",-50,"","tribuneplebs.png");
addPerson("AURE1774","Lucius Aurelius Cotta","",-25,"","praetor.png");
addPerson("BAEB1775","Marcus Baebius (Tamphilus)","",-50,"","tribuneplebs.png");
addPerson("ANTI0897","Lucius Antistius Reginus","",-50,"","tribuneplebs.png");
addPerson("POMP1781","Aulus Pompeius","",-102,"","tribuneplebs.png");
addPerson("FURI1804","Publius Furius","",-98,"True","tribuneplebs.png");
addPerson("CORN3287","? Cornelius","",-25,"","tribuneplebs.png");
addPerson("PORC1806","Marcus Porcius Cato","",-98,"","tribuneplebs.png");
addPerson("TITI4367","Sextus Titius","",-25,"","tribuneplebs.png");
addPerson("APPU1811","Gaius Appuleius Decianus","",-75,"","tribuneplebs.png");
addPerson("CALI1812","Quintus Calidius","",-25,"","praetor.png");
addPerson("CANU1813","Gaius Canuleius","",-25,"","tribuneplebs.png");
addPerson("OCTA3018","Marcus Octavius","",-25,"","tribuneplebs.png");
addPerson("DURO1817","Marcus Duronius","",-25,"","tribuneplebs.png");
addPerson("PORC3029","? Porcius (Laeca)","",-25,"","tribuneplebs.png");
addPerson("SAUF1853","? Saufeius","",-25,"","tribuneplebs.png");
addPerson("IUNI3008","Titus Iunius","",-25,"","tribuneplebs.png");
addPerson("MINI3021","? Minicius","",-25,"","tribuneplebs.png");
addPerson("PORC3638","Publius Porcius Laeca","",-25,"","tribuneplebs.png");
addPerson("FUFI3691","Lucius Fufius","",-25,"","tribuneplebs.png");
addPerson("SEST1854","Lucius Sestius","",-56,"","tribuneplebs.png");
addPerson("VELL3036","Gaius Velleius","",-25,"","tribuneplebs.png");
addPerson("CAEC1875","Quintus Caecilius Metellus Celer","",-25,"","aedile.png");
addPerson("PAPI1835","Gaius Papirius Carbo Arvina","",-82,"True","praetor.png");
addPerson("VARI1877","Quintus Varius Severus Hybrida Sucronensis","",-83,"","tribuneplebs.png");
addPerson("CALP2951","Lucius (Calpurnius) Piso Caesoninus","",-25,"","praetor.png");
addPerson("POMP3788","Gnaeus Pomponius","",-25,"","tribuneplebs.png");
addPerson("CALP1896","Lucius Calpurnius Piso Frugi","",0,"","praetor.png");
addPerson("CASS1897","Lucius Cassius","",-25,"","tribuneplebs.png");
addPerson("MEMM1898","Lucius Memmius","",-25,"","tribuneplebs.png");
addPerson("PAPI2011","Gaius Papirius Carbo","",-80,"True","praetor.png");
addPerson("PLAU1900","Marcus Plautius Silvanus","",-25,"","tribuneplebs.png");
addPerson("ANTI1932","Publius Antistius","",-25,"","aedile.png");
addPerson("SULP1886","Publius Sulpicius (Rufus)","",-88,"True","tribuneplebs.png");
addPerson("HERE2024","Gaius Herennius","",-75,"True","tribuneplebs.png");
addPerson("LUCI1938","Sextus Lucilius","",-86,"True","tribuneplebs.png");
addPerson("MAGI1939","Publius Magius","",-25,"","praetor.png");
addPerson("MILO1941","Gaius Milonius","",-87,"True","tribuneplebs.png");
addPerson("VERG1942","Marcus Vergilius","",-25,"","tribuneplebs.png");
addPerson("CAEL3755","? Caelius","",-86,"True","tribuneplebs.png");
addPerson("MARI1940","Marcus Marius Gratidianus","",-82,"True","praetor.png");
addPerson("POPI1959","Publius Popillius Laenas","",-25,"","tribuneplebs.png");
addPerson("IUNI1973","Marcus Iunius Brutus","",-77,"True","tribuneplebs.png");
addPerson("VALE1989","Quintus Valerius Soranus","",-80,"True","tribuneplebs.png");
addPerson("PUBL3031","? Publicius","",-25,"","tribuneplebs.png");
addPerson("TITI3455","? Titius","",-25,"","tribuneplebs.png");
addPerson("REMM3028","? Remmius","",-25,"","tribuneplebs.png");
addPerson("TERP2043","Marcus Terpolius","",-25,"","tribuneplebs.png");
addPerson("SICI2052","Gnaeus Sicinius","",-76,"True","tribuneplebs.png");
addPerson("OPIM2069","Quintus Opimius","",-25,"","tribuneplebs.png");
addPerson("QUIN2081","Lucius Quinctius","",0,"","praetor.png");
addPerson("LICI2103","Gaius Licinius Macer","",-66,"True","praetor.png");
addPerson("LOLL2177","Marcus Lollius Palicanus","",-50,"","praetor.png");
addPerson("PLAU2167","? Plautius","",0,"","tribuneplebs.png");
addPerson("PLAU2276","Aulus Plautius (Plotius)","",25,"","praetor.png");
addPerson("CORN2181","Quintus Cornificius","",-50,"","praetor.png");
addPerson("MANL2049","Quintus Manlius","",-69,"","tribuneplebs.png");
addPerson("ANTI2208","Gaius Antius (Restio)","",-25,"","tribuneplebs.png");
addPerson("FUND1789","Gaius Fundanius","",0,"","tribuneplebs.png");
addPerson("HOST2211","Lucius Hostilius (Dasianus)","",0,"","tribuneplebs.png");
addPerson("MARC2212","Quintus Marcius","",0,"","tribuneplebs.png");
addPerson("POPI2213","Gaius Popillius","",0,"","tribuneplebs.png");
addPerson("VALE2214","Marcus Valerius","",0,"","tribuneplebs.png");
addPerson("VOLC2215","Lucius Volcacius","",0,"","tribuneplebs.png");
addPerson("COEL2997","Quintus Coelius Latiniensis","",0,"","tribuneplebs.png");
addPerson("FALC2999","Gaius Falcidius","",0,"","tribuneplebs.png");
addPerson("CORN2233","Gaius Cornelius","",0,"","tribuneplebs.png");
addPerson("PAPI2235","Gaius Papirius Carbo","",0,"","praetor.png");
addPerson("ROSC2236","Lucius Roscius Otho","",0,"","praetor.png");
addPerson("SERV2237","Publius Servilius Globulus","",0,"","praetor.png");
addPerson("TREB2238","Lucius Trebellius","",0,"","tribuneplebs.png");
addPerson("MANI2260","Gaius Manilius (Crispus)","",0,"","tribuneplebs.png");
addPerson("MEMM2261","Gaius Memmius","",-50,"","praetor.png");
addPerson("PAPI2273","Gaius Papius","",0,"","tribuneplebs.png");
addPerson("FABI2281","? Fabius","",0,"","tribuneplebs.png");
addPerson("MUCI2282","Quintus Mucius Orestinus","",0,"","tribuneplebs.png");
addPerson("AEBU2996","? Aebutius","",0,"","tribuneplebs.png");
addPerson("LICI3006","? Licinius","",0,"","tribuneplebs.png");
addPerson("LUCI3007","Marcus Lucilius","",0,"","tribuneplebs.png");
addPerson("FABI3000","? Fabius","",0,"","tribuneplebs.png");
addPerson("AMPI2291","Titus Ampius Balbus","",-25,"","praetor.png");
addPerson("LABI2292","Titus Labienus 'Rabienus'","",-45,"True","praetor.png");
addPerson("SERV2293","Publius Servilius Rullus","",0,"","tribuneplebs.png");
addPerson("TITI3032","? Titius","",0,"","tribuneplebs.png");
addPerson("CALP2305","Lucius Calpurnius Bestia","",0,"","aedile.png");
addPerson("FABR2306","Lucius Fabricius","",0,"","tribuneplebs.png");
addPerson("MARI2307","Lucius Marius","",0,"","tribuneplebs.png");
addPerson("AUFI2319","Marcus Aufidius Lurco","",0,"","tribuneplebs.png");
addPerson("CAEC2320","Gaius Caecilius Cornutus","",0,"","praetor.png");
addPerson("FLAV2332","Lucius Flavius","",25,"","praetor.png");
addPerson("HERE2333","Gaius Herennius","",0,"","tribuneplebs.png");
addPerson("PAPI3019","? Papirius","",25,"","tribuneplebs.png");
addPerson("PREC3030","? Precilius or Praecilius","",50,"","tribuneplebs.png");
addPerson("PILE3774","Marcus Pileius","",25,"","tribuneplebs.png");
addPerson("ALFI2346","Gaius Alfius Flavus","",0,"","praetor.png");
addPerson("COSC2348","Gaius Cosconius","",-47,"True","praetor.png");
addPerson("FANN2340","Gaius Fannius","",25,"","praetor.png");
addPerson("NIGI2349","Publius Nigidius Figulus","",-45,"","praetor.png");
addPerson("AELI2361","? Aelius Ligus","",0,"","tribuneplebs.png");
addPerson("NINN2363","Lucius Ninnius Quadratus","",0,"","tribuneplebs.png");
addPerson("NOVI2364","Lucius Novius (Niger)","",0,"","tribuneplebs.png");
addPerson("TERE2365","Quintus Terentius Culleo","",25,"","tribuneplebs.png");
addPerson("ANNI2381","Titus Annius Milo","",-48,"True","praetor.png");
addPerson("CEST2382","Gaius Cestilius","",0,"","tribuneplebs.png");
addPerson("CISP2383","Marcus Cispius","",25,"","praetor.png");
addPerson("FABR2385","Quintus Fabricius","",0,"","tribuneplebs.png");
addPerson("MESS2386","Gaius Messius","",25,"","aedile.png");
addPerson("CANI2401","Lucius Caninius Gallus","",-44,"","tribuneplebs.png");
addPerson("CASS2402","? Cassius","",0,"","tribuneplebs.png");
addPerson("RACI2406","Lucius Racilius","",0,"","tribuneplebs.png");
addPerson("RUTI2407","Publius Rutilius Lupus","",25,"","praetor.png");
addPerson("PROC2405","Lucius Procilius F(ilius)","",0,"","tribuneplebs.png");
addPerson("AQUI2421","Publius Aquillius Gallus","",0,"","tribuneplebs.png");
addPerson("ATEI2422","Gaius Ateius Capito","",-43,"True","tribuneplebs.png");
addPerson("MAMI2423","? Mamilius","",0,"","tribuneplebs.png");
addPerson("ROSC2424","Lucius Roscius Fabatus","",25,"","praetor.png");
addPerson("PEDU2426","Sextus Peducaeus","",25,"","tribuneplebs.png");
addPerson("FABI2427","Gaius Fabius","",25,"","tribuneplebs.png");
addPerson("LAEL2438","Decimus Laelius Balbus","",-25,"","tribuneplebs.png");
addPerson("MEMM2439","Gaius Memmius","",0,"","tribuneplebs.png");
addPerson("MUCI2440","Quintus Mucius Scaevola","",25,"","tribuneplebs.png");
addPerson("TERE2441","? Terentius","",0,"","tribuneplebs.png");
addPerson("LICI2456","Publius Licinius Crassus Iunianus Damasippus","",25,"","praetor.png");
addPerson("LUCI2457","Gaius Lucilius Hirrus","",25,"","tribuneplebs.png");
addPerson("MANI2476","? Manilius Cumanus","",0,"","tribuneplebs.png");
addPerson("MUNA2477","Titus Munatius Plancus Bursa","",25,"","tribuneplebs.png");
addPerson("POMP2478","Quintus Pompeius Rufus","",-50,"","tribuneplebs.png");
addPerson("VIBI3284","Titus Vibius Pansa","",25,"","tribuneplebs.png");
addPerson("CAEL2493","Gaius Caelius","",0,"","tribuneplebs.png");
addPerson("CORN2494","Publius Cornelius","",0,"","tribuneplebs.png");
addPerson("COEL3436","Gaius Coelius","",0,"","tribuneplebs.png");
addPerson("FURN2521","Gaius Furnius","",-17,"","plebeian.png");
addPerson("FRUT2955","Marcus Fruticius","",50,"","praetor.png");
addPerson("AURE2538","? Aurelius Cotta","",25,"","tribuneplebs.png");
addPerson("RUBR2539","Lucius Rubrius","",25,"","tribuneplebs.png");
addPerson("CAEL3338","Gaius Caelius Rufus","",25,"","tribuneplebs.png");
addPerson("TREB2671","Lucius Trebellius (Fides)","",25,"","aedile.png");
addPerson("PONT2637","Lucius Pontius Aquila","",-43,"True","tribuneplebs.png");
addPerson("DECI2743","Publius Decius","",25,"","tribuneplebs.png");
addPerson("TITI3454","? Titius","",25,"","tribuneplebs.png");
addPerson("VALE3584","Lucius Valerius Acisculus","",25,"","plebeian.png");
addPerson("POMP4618","? Pomponius","",25,"","tribuneplebs.png");
addPerson("CAES2676","Lucius Caesetius Flavus","",25,"","tribuneplebs.png");
addPerson("CANN2677","Tiberius Cannutius","",-43,"True","tribuneplebs.png");
addPerson("CARF2678","Decimus Carfulenus","",-43,"True","tribuneplebs.png");
addPerson("CASS2575","Lucius Cassius Longinus","",25,"","tribuneplebs.png");
addPerson("DECI2679","Lucius Decidius Saxa","",-40,"True","tribuneplebs.png");
addPerson("EPID2680","Gaius Epidius Marullus","",25,"","tribuneplebs.png");
addPerson("HELV2681","Gaius Helvius Cinna","",-44,"True","tribuneplebs.png");
addPerson("HOST2620","Gaius Hostilius Saserna","",25,"","tribuneplebs.png");
addPerson("HOST2621","Publius Hostilius Saserna","",25,"","tribuneplebs.png");
addPerson("NONI2685","? Nonius Asprenas","",25,"","tribuneplebs.png");
addPerson("FLAM2687","Lucius Flaminius Chilo","",25,"","tribuneplebs.png");
addPerson("ANON4605","Gaius - Casca","",25,"","tribuneplebs.png");
addPerson("SALV2718","? Salvius","",-43,"True","tribuneplebs.png");
addPerson("SERV2719","Marcus Servilius","",25,"","tribuneplebs.png");
addPerson("SERV2720","Publius Servilius Casca Longus","",-42,"","tribuneplebs.png");
addPerson("TITI2721","Publius Titius","",25,"","tribuneplebs.png");
addPerson("CLOD2769","Lucius Clodius Bithynicus","",-40,"True","tribuneplebs.png");
addPerson("HOST2770","? Hostilius Tullus","",25,"","tribuneplebs.png");
addPerson("INST2771","Marcus Insteius","",25,"","tribuneplebs.png");
addPerson("RUFR2755","? Rufrenus","",25,"","tribuneplebs.png");
addPerson("FALC2799","Gaius Falcidius","",25,"","tribuneplebs.png");
addPerson("CLOE2991","Quintus Cloelius","",25,"","plebeian.png");
addPerson("PETR3026","? Petronius","",25,"","tribuneplebs.png");
addPerson("NONI2915","Marcus Nonius Balbus","",25,"","tribuneplebs.png");
addPerson("CEST2947","Gaius Cestius Epulo","",-12,"","praetor.png");
addPerson("IUNI0053","Titus Iunius Brutus","",-425,"","aedile.png");
addPerson("MARC0224","Manius Marcius","",-375,"","aedile.png");
addPerson("AELI0644","Lucius Aelius Paetus","",-225,"","aedile.png");
addPerson("FULV0645","Gaius Fulvius Curvus","",-225,"","aedile.png");
addPerson("PUBL0770","Lucius Publicius Malleolus","",-175,"","aedile.png");
addPerson("SCAN0811","Gaius Scantinius Capitolinus","",-175,"","aedile.png");
addPerson("AURE0870","Marcus Aurelius Cotta","",-200,"","aedile.png");
addPerson("CLAU0871","Marcus Claudius Marcellus","",-150,"","aedile.png");
addPerson("FUND0913","Marcus Fundanius Fundulus","",-150,"","aedile.png");
addPerson("VILL0914","Lucius Villius Tappulus","",-125,"","praetor.png");
addPerson("MEMM0940","? Memmius","",-150,"","aedile.png");
addPerson("CATI0961","Quintus Catius","",-150,"","aedile.png");
addPerson("PORC0948","Lucius Porcius Licinus","",-150,"","praetor.png");
addPerson("MAMI0982","Gaius Mamilius Atellus","",-174,"","praetor.png");
addPerson("CAEC0996","Marcus Caecilius Metellus","",-125,"","praetor.png");
addPerson("POMP1010","Marcus Pomponius Matho","",-150,"","praetor.png");
addPerson("MAMI1011","Quintus Mamilius Turrinus","",-150,"","praetor.png");
addPerson("LUCR1020","Spurius Lucretius","",-150,"","praetor.png");
addPerson("OCTA0880","Gnaeus Octavius","",-125,"","praetor.png");
addPerson("CLAU1014","Tiberius Claudius Asellus","",-150,"","aedile.png");
addPerson("IUNI1025","Marcus Iunius Pennus","",-150,"","praetor.png");
addPerson("SEXT1043","Marcus Sextius Sabinus","",-150,"","praetor.png");
addPerson("AELI1057","Publius Aelius Tubero","",-125,"","praetor.png");
addPerson("LAET1058","Lucius Laetorius","",-150,"","aedile.png");
addPerson("APUS1088","Lucius Apustius (Fullo)","",-190,"True","praetor.png");
addPerson("TERE1075","Lucius Terentius Massiliota","",-125,"","praetor.png");
addPerson("CINC2986","Gaius Cincius","",-150,"","aedile.png");
addPerson("HELV1046","Gaius Helvius","",-203,"True","praetor.png");
addPerson("SEMP1092","Gaius Sempronius Tuditanus","",-196,"","praetor.png");
addPerson("HELV1093","Marcus Helvius","",-125,"","praetor.png");
addPerson("SCRI1111","Gaius Scribonius Curio","",-100,"","praetor.png");
addPerson("PUBL1129","Gaius Publicius Bibulus","",-125,"","aedile.png");
addPerson("CAEC1193","Aulus Caecilius","",-100,"","aedile.png");
addPerson("FURI1213","Marcus Furius Luscus","",-125,"","aedile.png");
addPerson("SEMP1214","Gaius Sempronius Blaesus","",-100,"","praetor.png");
addPerson("PUPI1233","Lucius Pupius","",-100,"","praetor.png");
addPerson("SICI1234","Gnaeus Sicinius","",-100,"","praetor.png");
addPerson("SERV1342","Gaius Servilius (Geminus)","",-100,"","aedile.png");
addPerson("MENA2988","Publius Menates","",-50,"","aedile.png");
addPerson("LUCR1603","? Lucretius Vespillo","",-75,"","aedile.png");
addPerson("PACU3768","Sextus Pacuius (Pacuvius?) Taurus","",50,"","aedile.png");
addPerson("CRIT1971","Lucius Critonius","",-75,"","aedile.png");
addPerson("FANN1972","Marcus Fannius","",-25,"","praetor.png");
addPerson("POMP1988","Marcus Pomponius","",-25,"","aedile.png");
addPerson("CAES2180","Marcus Caesonius","",0,"","praetor.png");
addPerson("GALL2230","Quintus Gallius","",-50,"","praetor.png");
addPerson("VOCO2231","Quintus Voconius Naso","",0,"","praetor.png");
addPerson("LICI2331","Publius Licinius Crassus Dives","",0,"","praetor.png");
addPerson("CALP5166","Lucius (Calpurnius) Bestia","",0,"","aedile.png");
addPerson("AELI2635","Lucius Aelius Lamia","",25,"","praetor.png");
addPerson("CUSI2665","Marcus Cusinius","",25,"","praetor.png");
addPerson("VETU0169","Spurius Veturius Crassus Cicurinus","True",-400,"","romanaristocrat.png");
addPerson("VETU0170","Lucius Veturius Crassus Cicurinus","True",-400,"","romanaristocrat.png");
addPerson("CORN0173","Marcus Cornelius Maluginensis","True",-375,"","romanaristocrat.png");
addPerson("SERG0174","Marcus Sergius Esquilinus","True",-375,"","romanaristocrat.png");
addPerson("POET0175","Quintus Poetelius Libo Visolus","",-375,"","plebeian.png");
addPerson("ANTO0176","Titus Antonius Merenda","",-375,"","plebeian.png");
addPerson("DUIL0177","Caeso Duillius (Longus)","",-375,"","plebeian.png");
addPerson("OPPI0178","Spurius Oppius Cornicen","",-449,"True","plebeian.png");
addPerson("RABU0179","Manius Rabuleius","",-375,"","plebeian.png");
addPerson("SEMP0209","Aulus Sempronius Atratinus","True",-375,"","romanaristocrat.png");
addPerson("ATIL0210","Lucius Atilius Luscus","True",-375,"","romanaristocrat.png");
addPerson("CLOE0211","Titus Cloelius Siculus","True",-375,"","romanaristocrat.png");
addPerson("CORN0247","Servius Cornelius Cossus","True",-375,"","romanaristocrat.png");
addPerson("FOLI0402","Marcus Folius (Flaccinator)","True",-390,"True","romanaristocrat.png");
addPerson("PINA0251","Lucius Pinarius Mamercinus","True",-375,"","romanaristocrat.png");
addPerson("POST0258","Spurius Postumius Albus (Regillensis)","True",-439,"","romanaristocrat.png");
addPerson("POST0268","Marcus Postumius (Albinus) (Regillensis)","True",-375,"","romanaristocrat.png");
addPerson("HORA0270","Lucius Horatius Barbatus","True",-375,"","romanaristocrat.png");
addPerson("CLAU0271","Appius Claudius Crassus","True",-350,"","romanaristocrat.png");
addPerson("NAUT0272","Spurius Nautius Rutilus","True",-350,"","romanaristocrat.png");
addPerson("IULI0273","Sextus Iulius Iullus","True",-350,"","romanaristocrat.png");
addPerson("MANL0278","Lucius Manlius Capitolinus","True",-350,"","romanaristocrat.png");
addPerson("ANTO0279","Quintus Antonius Merenda","",-350,"","plebeian.png");
addPerson("MANL0286","Marcus Manlius Vulso","True",-350,"","romanaristocrat.png");
addPerson("LUCR0293","Publius Lucretius Tricipitinus","True",-350,"","romanaristocrat.png");
addPerson("PAPI0295","Marcus Papirius Mugillanus","True",-350,"","romanaristocrat.png");
addPerson("RUTI0296","Spurius Rutilius Crassus","",-350,"","plebeian.png");
addPerson("VETU0297","Spurius Veturius Crassus Cicurinus","True",-350,"","romanaristocrat.png");
addPerson("CORN0300","Publius Cornelius Cossus","True",-350,"","romanaristocrat.png");
addPerson("QUIN0303","Quintus Quinctius Cincinnatus","True",-350,"","romanaristocrat.png");
addPerson("POST0307","Publius Postumius Albinus Regillensis","True",-414,"True","romanaristocrat.png");
addPerson("POST3793","Tiberius Postumius","",-350,"","plebeian.png");
addPerson("IULI0325","Gaius Iulius Iullus","True",-393,"","romanaristocrat.png");
addPerson("CORN0326","Publius Cornelius Cossus","True",-350,"","romanaristocrat.png");
addPerson("CORN0330","Gnaeus Cornelius Cossus","True",-325,"","romanaristocrat.png");
addPerson("FABI0400","Numerius Fabius Ambustus","True",-325,"","romanaristocrat.png");
addPerson("MANL0332","Aulus Manlius Vulso Capitolinus","True",-325,"","romanaristocrat.png");
addPerson("SERG0333","Manius Sergius Fidenas","True",-350,"","romanaristocrat.png");
addPerson("CORN0334","Publius Cornelius Maluginensis","True",-350,"","romanaristocrat.png");
addPerson("QUIN0336","Marcus Quinctilius Varus","True",-350,"","romanaristocrat.png");
addPerson("IULI0337","Lucius Iulius Iullus","True",-350,"","romanaristocrat.png");
addPerson("FURI0338","Marcus Furius Fusus","True",-325,"","romanaristocrat.png");
addPerson("POST0341","Marcus Postumius Albinus Regillensis","True",-350,"","romanaristocrat.png");
addPerson("POST3798","Marcus Postumius Albinus Regillensis","True",-350,"","romanaristocrat.png");
addPerson("VERG0343","Lucius Verginius Tricostus Esquilinus","True",-350,"","romanaristocrat.png");
addPerson("SULP0344","Quintus Sulpicius Camerinus Cornutus","True",-325,"","romanaristocrat.png");
addPerson("CLOD0345","Capitos Clodius","",-350,"","plebeian.png");
addPerson("ANCU0346","Marcus Ancus","",-350,"","plebeian.png");
addPerson("IULI0347","Lucius Iulius Iullus","True",-325,"","romanaristocrat.png");
addPerson("LICI0354","Publius Licinius Calvus Esquilinus","",-325,"","plebeian.png");
addPerson("MANL0355","Publius Manlius Vulso","True",-350,"","romanaristocrat.png");
addPerson("TITI0356","Lucius Titinius Pansa Saccus","",-325,"","plebeian.png");
addPerson("MAEL0357","Publius Maelius Capitolinus","",-325,"","plebeian.png");
addPerson("FURI0358","Spurius Furius Medullinus","True",-350,"","romanaristocrat.png");
addPerson("PUBL0359","Lucius Publilius Philo Vulscus","",-350,"","plebeian.png");
addPerson("GENU0360","Gnaeus Genucius Augurinus","",-396,"True","plebeian.png");
addPerson("ATIL0361","Lucius Atilius Priscus","",-325,"","plebeian.png");
addPerson("POMP0362","Marcus Pomponius Rufus","",-325,"","tribuneplebs.png");
addPerson("DUIL0363","Gaius Duillius Longus","",-325,"","plebeian.png");
addPerson("VETU0364","Marcus Veturius Crassus Cicurinus","True",-325,"","romanaristocrat.png");
addPerson("PUBL0365","Volero Publilius Philo","",-325,"","plebeian.png");
addPerson("VALE0366","Marcus Valerius Lactucinus Maximus","True",-325,"","romanaristocrat.png");
addPerson("CLAU0367","? Claudius Ugo","",-325,"","plebeian.png");
addPerson("MARI0368","? Marius Appius","",-325,"","plebeian.png");
addPerson("SERG0371","Lucius Sergius Fidenas","True",-325,"","romanaristocrat.png");
addPerson("POST0372","Aulus Postumius Albinus Regillensis","True",-325,"","romanaristocrat.png");
addPerson("MANL0374","Quintus Manlius Vulso (Capitolinus)","True",-325,"","romanaristocrat.png");
addPerson("CORN0375","Publius Cornelius Cossus","True",-325,"","romanaristocrat.png");
addPerson("AEMI0380","Gaius Aemilius Mamercinus","True",-325,"","romanaristocrat.png");
addPerson("POST0382","Spurius Postumius Albinus Regillensis","True",-380,"","romanaristocrat.png");
addPerson("CORN0383","Publius Cornelius","True",-325,"","romanaristocrat.png");
addPerson("CATL0384","? Catlus Verus","",-325,"","plebeian.png");
addPerson("AEMI0407","Lucius Aemilius Mamercinus","True",-325,"","romanaristocrat.png");
addPerson("FURI0393","Agrippa Furius Fusus","True",-325,"","romanaristocrat.png");
addPerson("FABI0396","Quintus Fabius Ambustus","True",-389,"True","romanaristocrat.png");
addPerson("SULP0401","Quintus Sulpicius Longus","True",-325,"","romanaristocrat.png");
addPerson("CORN0405","Publius Cornelius","True",-325,"","romanaristocrat.png");
addPerson("MANL0406","Aulus Manlius Capitolinus","True",-300,"","romanaristocrat.png");
addPerson("POST0408","Lucius Postumius Albinus Regillensis","True",-325,"","romanaristocrat.png");
addPerson("PAPI0409","Lucius Papirius Mugillanus","True",-325,"","romanaristocrat.png");
addPerson("FURI0410","Marcus Furius","",-325,"","plebeian.png");
addPerson("VERG3843","Lucius Verginius Tricostus Esquilinus","True",-325,"","romanaristocrat.png");
addPerson("IULI0416","Lucius Iulius Iullus","True",-325,"","romanaristocrat.png");
addPerson("AQUI0417","Lucius Aquillius Corvus","",-325,"","plebeian.png");
addPerson("SULP0418","Servius Sulpicius Rufus","True",-325,"","romanaristocrat.png");
addPerson("PAPI0389","Lucius Papirius Cursor","True",-325,"","romanaristocrat.png");
addPerson("SERG0419","Gnaeus Sergius Fidenas Coxo","True",-325,"","romanaristocrat.png");
addPerson("MENE0420","Licinus Menenius Lanatus","True",-325,"","romanaristocrat.png");
addPerson("QUIN0421","Lucius Quinctius","True",-325,"","romanaristocrat.png");
addPerson("CORN0422","Lucius Cornelius","True",-325,"","romanaristocrat.png");
addPerson("MALL0423","Aulus Mallius (Manlius)","True",-325,"","romanaristocrat.png");
addPerson("FABI0424","? Fabius","True",-325,"","romanaristocrat.png");
addPerson("QUIN0427","Lucius Quinctius Cincinnatus","True",-325,"","romanaristocrat.png");
addPerson("HORA0428","Lucius Horatius Pulvillus","True",-325,"","romanaristocrat.png");
addPerson("CORN0430","Publius Cornelius","True",-325,"","romanaristocrat.png");
addPerson("PAPI0433","Gaius Papirius Crassus","True",-325,"","romanaristocrat.png");
addPerson("TREB0436","Marcus Trebonius","",-325,"","plebeian.png");
addPerson("FABI0437","? Fabius","",-325,"","plebeian.png");
addPerson("PAPI0438","Spurius Papirius Crassus","True",-325,"","romanaristocrat.png");
addPerson("SERV0440","Quintus Servilius Fidenas","True",-300,"","romanaristocrat.png");
addPerson("SULP0441","Gaius Sulpicius (Camerinus)","True",-325,"","romanaristocrat.png");
addPerson("FABI0442","? Fabius Albus","",-325,"","plebeian.png");
addPerson("FURI0443","Lucius Furius Medullinus","True",-300,"","romanaristocrat.png");
addPerson("FABI0444","Marcus Fabius Ambustus","True",-300,"","romanaristocrat.png");
addPerson("PAPI0446","Tiberius Papirius Crassus","True",-325,"","romanaristocrat.png");
addPerson("MANL0451","Gaius Manlius","True",-325,"","romanaristocrat.png");
addPerson("SEXT0452","Gaius Sextilius","",-325,"","plebeian.png");
addPerson("ALBI0453","Marcus Albinius -","",-325,"","plebeian.png");
addPerson("ANTI0454","Lucius Antistius -","",-325,"","plebeian.png");
addPerson("TREB0455","Publius Trebonius","",-325,"","plebeian.png");
addPerson("EREN0456","Gaius Erenucius -","",-325,"","plebeian.png");
addPerson("FURI0457","Spurius Furius","True",-325,"","romanaristocrat.png");
addPerson("CLOE0458","Publius Cloelius Siculus","True",-325,"","romanaristocrat.png");
addPerson("HORA0459","Marcus Horatius -","True",-325,"","romanaristocrat.png");
addPerson("GEGA0460","Lucius Geganius (Macerinus)","True",-325,"","romanaristocrat.png");
addPerson("VETU0464","Gaius Veturius (Crassus) (Cicurinus)","True",-300,"","romanaristocrat.png");
addPerson("SULP0465","Servius Sulpicius Praetextatus Praetextatus","True",-300,"","romanaristocrat.png");
addPerson("QUIN0466","Gaius Quinctius Cincinnatus","True",-325,"","romanaristocrat.png");
addPerson("VALE0471","Gaius Valerius Potitus","True",-300,"","romanaristocrat.png");
addPerson("CORN0473","Aulus Cornelius Cossus","True",-300,"","romanaristocrat.png");
addPerson("CORN0474","Marcus Cornelius Maluginensis","True",-300,"","romanaristocrat.png");
addPerson("QUIN0475","Quintus Quinctius (Cincinnatus)","True",-300,"","romanaristocrat.png");
addPerson("SERV0477","Spurius Servilius Structus","True",-300,"","romanaristocrat.png");
addPerson("PAPI0478","Lucius Papirius Crassus","True",-300,"","romanaristocrat.png");
addPerson("VETU0479","Lucius Veturius Crassus Cicurinus","True",-300,"","romanaristocrat.png");
addPerson("GEGA0482","Marcus Geganius Macerinus","True",-300,"","romanaristocrat.png");
addPerson("PAPI0262","Lucius Papirius","True",-375,"","romanaristocrat.png");
addPerson("PINA0263","Publius Pinarius","True",-375,"","romanaristocrat.png");
addPerson("SULP0449","Gaius Sulpicius Camerinus","True",-325,"","romanaristocrat.png");
addPerson("SERV0461","Spurius Servilius Priscus","True",-325,"","romanaristocrat.png");
addPerson("CLOE0462","Quintus Cloelius Siculus","True",-325,"","romanaristocrat.png");
addPerson("POST0485","? Postumius Regillensis Albinus","True",-365,"","romanaristocrat.png");
addPerson("PAPI0585","Lucius Papirius Crassus","True",-250,"","praetor.png");
addPerson("PLAU0597","Gaius Plautius Venox","",-250,"","plebeian.png");
addPerson("PAPI0695","Lucius Papirius Praetextatus","True",-272,"","romanaristocrat.png");
addPerson("CORN0390","Marcus Cornelius Maluginensis","True",-325,"","romanaristocrat.png");
addPerson("ANON4685","?  Rufus","",25,"","praetor.png");
addPerson("BARB3308","? Barbarius Philippus","",25,"","praetor.png");
addPerson("ANON2994","Lucius  Flaccus","",25,"","praetor.png");
addPerson("CALP3756","Marcus Calpurnius Piso Frugi","",25,"","praetor.png");
addPerson("CLAU2948","Publius Claudius","True",-150,"","praetor.png");
addPerson("GENU2956","? Genucius Cipus","",-150,"","praetor.png");
addPerson("FURI0486","Spurius Furius Camillus","True",-300,"","praetor.png");
addPerson("FURI0586","Lucius Furius","True",-250,"","praetor.png");
addPerson("DOMI2957","? Domitius Calvinus","",-50,"","praetor.png");
addPerson("MINU3348","? (Minucius)","",-200,"","praetor.png");
addPerson("LIVI3349","Marcus Livius Drusus","",-200,"","praetor.png");
addPerson("LIVI4992","Marcus Livius Drusus","",-200,"","praetor.png");
addPerson("CORN0790","Publius Cornelius","True",-234,"","praetor.png");
addPerson("FURI0828","Lucius Furius Bibaculus","True",-220,"","praetor.png");
addPerson("AELI2943","Gaius Aelius Tubero","",-216,"","praetor.png");
addPerson("BAEB0830","Quintus Baebius Tamphilus","",-150,"","praetor.png");
addPerson("MANL0836","Lucius Manlius (Vulso)","True",-150,"","praetor.png");
addPerson("TERE0841","Quintus Terentius","",-150,"","praetor.png");
addPerson("SERV0845","Gaius Servilius (Geminus)","",-150,"","praetor.png");
addPerson("ANNI0846","Marcus Annius","",-150,"","praetor.png");
addPerson("ACIL0847","Manius Acilius","",-150,"","praetor.png");
addPerson("QUIN0865","Caeso Quinctius Flamininus","True",-150,"","praetor.png");
addPerson("AELI0889","Quintus Aelius Paetus","",-216,"","praetor.png");
addPerson("PAPI0921","Gaius Papirius Maso","True",-213,"","praetor.png");
addPerson("BAEB3351","Gaius (Baebius) Herennius","",-150,"","praetor.png");
addPerson("CORN3352","Publius Cornelius Merenda","True",-150,"","praetor.png");
addPerson("AEMI4635","Marcus Aemilius Lepidus","True",-150,"","praetor.png");
addPerson("ATIL0835","Gaius Atilius Serranus","",-150,"","praetor.png");
addPerson("ATIL0888","Gaius Atilius","",-150,"","praetor.png");
addPerson("AEMI0854","Marcus Aemilius Regillus","True",-205,"","praetor.png");
addPerson("CORN0855","Aulus Cornelius Mammula","True",-200,"","praetor.png");
addPerson("OTAC0856","Titus Otacilius Crassus","",-211,"","praetor.png");
addPerson("POMP0857","? Pomponius (Matho)","",-150,"","praetor.png");
addPerson("CORN0903","Publius Cornelius Lentulus","True",-200,"","praetor.png");
addPerson("ATIL0912","Marcus Atilius Regulus","",-150,"","praetor.png");
addPerson("CORN0923","Publius Cornelius Sulla","True",-150,"","praetor.png");
addPerson("FULV0924","Gnaeus Fulvius Flaccus","",-200,"","praetor.png");
addPerson("IUNI0925","Marcus Iunius Silanus","",-150,"","praetor.png");
addPerson("CALP0966","Gaius Calpurnius Piso","",-150,"","praetor.png");
addPerson("CORN0938","Lucius Cornelius Lentulus","True",-172,"","praetor.png");
addPerson("SULP0939","Gaius Sulpicius (Galus)","True",-150,"","praetor.png");
addPerson("CINC0957","Lucius Cincius Alimentus","",-150,"","praetor.png");
addPerson("LAET0869","Gaius Laetorius","",-125,"","praetor.png");
addPerson("MANL0958","Lucius Manlius Acidinus","True",-125,"","praetor.png");
addPerson("MANL0959","Publius Manlius Vulso","True",-150,"","praetor.png");
addPerson("AURU0983","Gaius Aurunculeius","",-150,"","praetor.png");
addPerson("HOST0984","Gaius Hostilius Tubulus","",-150,"","praetor.png");
addPerson("CLAU0994","Quintus Claudius (Flamen)","",-150,"","praetor.png");
addPerson("IULI0995","Sextus Iulius Caesar","True",-150,"","praetor.png");
addPerson("LICI0960","Publius Licinius Varus","",-150,"","praetor.png");
addPerson("QUIN3355","Caeso Quinctius Claudus Flamininus","",-150,"","praetor.png");
addPerson("HOST1007","Aulus Hostilius (Cato)","",-125,"","praetor.png");
addPerson("HOST1008","Gaius Hostilius Cato","",-150,"","praetor.png");
addPerson("CLAU1019","Tiberius Claudius Asellus","",-150,"","praetor.png");
addPerson("AEMI1024","Lucius Aemilius Papus","True",-172,"","praetor.png");
addPerson("AEMI2939","Lucius Aemilius","",-125,"","praetor.png");
addPerson("MARC1033","Marcus Marcius Ralla","",-150,"","praetor.png");
addPerson("CORN0986","Publius Cornelius Lentulus Caudinus","True",-125,"","praetor.png");
addPerson("QUIN1041","Publius Quinctilius Varus","True",-169,"","praetor.png");
addPerson("FABI1042","Marcus Fabius Buteo","True",-150,"","praetor.png");
addPerson("FULV1051","Quintus Fulvius Gillo","",-150,"","praetor.png");
addPerson("SERG1073","Gaius Sergius Plautus","",-125,"","praetor.png");
addPerson("AELI2942","Gaius Aelius Tubero","",25,"","praetor.png");
addPerson("MANL2967","Aulus (Manlius) Torquatus","",-50,"","praetor.png");
addPerson("RABI3106","Gaius Rabirius","",-50,"","praetor.png");
addPerson("OCTA3405","? Octavius","",-50,"","praetor.png");
addPerson("MARC3408","Marcus Marcius","",-50,"","praetor.png");
addPerson("FURI3409","Lucius Furius","True",-50,"","praetor.png");
addPerson("AUFI3313","Gnaeus Aufidius","",-50,"","praetor.png");
addPerson("CORN3412","? (Cornelius) Sulla","",-50,"","praetor.png");
addPerson("ATIL1099","Lucius Atilius","",-125,"","praetor.png");
addPerson("MANL1100","Lucius Manlius Vulso","True",-125,"","praetor.png");
addPerson("MINU1101","Marcus Minucius Rufus","",-125,"","praetor.png");
addPerson("SERG1102","Marcus Sergius Silus","True",-125,"","praetor.png");
addPerson("ACIL3356","Lucius Acilius (Sapiens)","",-125,"","praetor.png");
addPerson("FABI1097","Quintus Fabius (Buteo)","True",-196,"","praetor.png");
addPerson("CLAU1095","Appius Claudius Nero","True",-175,"","praetor.png");
addPerson("FABR1127","Gaius Fabricius Luscinus","",-125,"","praetor.png");
addPerson("MANL1128","Publius Manlius (Vulso)","True",-180,"","praetor.png");
addPerson("CORN1085","Gnaeus Cornelius Blasio","True",-125,"","praetor.png");
addPerson("CORN1137","Gnaeus Cornelius Merenda","True",-175,"","praetor.png");
addPerson("DIGI1138","Sextus Digitius","",-100,"","praetor.png");
addPerson("IUVE1139","Titus Iuventius Thalna","",-100,"","praetor.png");
addPerson("FULV1164","Marcus Fulvius Centumalus","",-125,"","praetor.png");
addPerson("SALO1165","Quintus Salonius Sarra","",-125,"","praetor.png");
addPerson("SCRI1141","Lucius Scribonius Libo","",-125,"","praetor.png");
addPerson("CORN1169","Aulus Cornelius Mammula","True",-125,"","praetor.png");
addPerson("AEMI1175","Lucius Aemilius Regillus","True",-175,"","praetor.png");
addPerson("ATIN1176","Gaius Atinius Labeo","",-125,"","praetor.png");
addPerson("AURU1177","Lucius Aurunculeius","",-175,"","praetor.png");
addPerson("FULV1178","Gnaeus Fulvius","",-125,"","praetor.png");
addPerson("TUCC1166","Marcus Tuccius","",-125,"","praetor.png");
addPerson("BAEB1052","Lucius Baebius Dives","",-189,"True","praetor.png");
addPerson("FABI1188","Quintus Fabius Pictor","True",-167,"","praetor.png");
addPerson("PLAU1190","Lucius Plautius Hypsaeus","",-125,"","praetor.png");
addPerson("ATIN1220","Gaius Atinius","",-186,"True","praetor.png");
addPerson("STER1206","Gaius Stertinius","",-125,"","praetor.png");
addPerson("FURI1081","Marcus Furius Crassipes","True",-100,"","praetor.png");
addPerson("SULP1192","Servius Sulpicius Galba","True",-125,"","praetor.png");
addPerson("AURE1221","Gaius Aurelius Scaurus","",-125,"","praetor.png");
addPerson("CORN1223","Publius Cornelius Sulla","True",-125,"","praetor.png");
addPerson("LICI1224","Marcus Licinius Lucullus","",-125,"","praetor.png");
addPerson("MAEN1225","Titus Maenius","",-125,"","praetor.png");
addPerson("QUIN1226","Lucius Quinctius Crispinus","True",-125,"","praetor.png");
addPerson("ATIL1228","Gaius Atilius Serranus","",-125,"","praetor.png");
addPerson("POST1231","Lucius Postumius Tempsanus","True",-125,"","praetor.png");
addPerson("CORN1238","Publius Cornelius Cethegus","True",-125,"","praetor.png");
addPerson("NAEV1240","Quintus Naevius Matho","",-125,"","praetor.png");
addPerson("SEMP1241","Publius Sempronius Longus","",-183,"","praetor.png");
addPerson("TERE1183","Aulus Terentius Varro","",-100,"","praetor.png");
addPerson("CORN1249","Publius Cornelius Sisenna","",-125,"","praetor.png");
addPerson("IULI1250","Lucius Iulius (Caesar)","",-125,"","praetor.png");
addPerson("VALE0993","Gaius Valerius Flaccus","True",-174,"","praetor.png");
addPerson("CAEC1254","Lucius Caecilius Denter","",-125,"","praetor.png");
addPerson("OGUL1255","Marcus Ogulnius Gallus","",-125,"","praetor.png");
addPerson("TERE1256","Gaius Terentius Istra","",-125,"","praetor.png");
addPerson("VALE1232","Marcus Valerius Laevinus","True",-100,"","praetor.png");
addPerson("CLAU1235","Tiberius Claudius Nero","True",-125,"","praetor.png");
addPerson("DURO1262","Lucius Duronius","",-125,"","praetor.png");
addPerson("FABI1263","Quintus Fabius Buteo","True",-100,"","praetor.png");
addPerson("PINA1264","Marcus Pinarius Rusca (or Posca)","True",-125,"","praetor.png");
addPerson("CORN1274","Publius Cornelius Mammula","True",-125,"","praetor.png");
addPerson("MAEN1276","Gaius Maenius","",-125,"","praetor.png");
addPerson("MINU1277","Tiberius Minucius Molliculus","",-180,"","praetor.png");
addPerson("AEBU1253","Titus Aebutius Parrus","",-100,"","praetor.png");
addPerson("CLAU1295","Tiberius Claudius Nero","True",-100,"","praetor.png");
addPerson("CLUV1296","Gaius Cluvius Saxula","",-100,"","praetor.png");
addPerson("FONT1297","Titus Fonteius Capito","",-125,"","praetor.png");
addPerson("TITI1298","Marcus Titinius","",-125,"","praetor.png");
addPerson("CORN1309","Gnaeus Cornelius Scipio","True",-125,"","praetor.png");
addPerson("NUMI1310","Gaius Numisius","",-125,"","praetor.png");
addPerson("QUIN1311","Gaius Quinctius Flamininus","True",-125,"","praetor.png");
addPerson("AQUI1319","Lucius Aquillius Gallus","",-125,"","praetor.png");
addPerson("CORN1320","Marcus Cornelius Scipio Maluginensis","True",-150,"","praetor.png");
addPerson("PAPI1322","Lucius Papirius Maso","True",-125,"","praetor.png");
addPerson("BAEB1325","Quintus Baebius Sulca","",-100,"","praetor.png");
addPerson("CLAU1290","Appius Claudius Centho","True",-100,"","praetor.png");
addPerson("LUTA1327","Gnaeus Lutatius Cerco","",-100,"","praetor.png");
addPerson("CORN1326","Servius Cornelius Sulla","True",-100,"","praetor.png");
addPerson("ATIL1329","Marcus Atilius (Serranus)","",-100,"","praetor.png");
addPerson("CLAU1330","Lucius Claudius","True",-100,"","praetor.png");
addPerson("CORN1331","Lucius Cornelius Scipio","True",-100,"","praetor.png");
addPerson("FURI1332","Publius Furius Philus","True",-150,"","praetor.png");
addPerson("ATIL1187","Marcus Atilius Serranus","",-100,"","praetor.png");
addPerson("CICE1340","Gaius Cicereius","",-100,"","praetor.png");
addPerson("FABI1341","Numerius Fabius Buteo","True",-173,"","praetor.png");
addPerson("MATI1273","Gaius Matienus","",-150,"","praetor.png");
addPerson("CLUV1352","Spurius Cluvius","",-100,"","praetor.png");
addPerson("LUCR1355","Spurius Lucretius","",-100,"","praetor.png");
addPerson("MEMM1333","Gaius Memmius","",-100,"","praetor.png");
addPerson("CANI1367","Gaius Caninius Rebilus","",-100,"","praetor.png");
addPerson("CANU1334","Lucius Canuleius (Dives)","",-100,"","praetor.png");
addPerson("FURI1323","Lucius Furius Philus","True",-170,"","praetor.png");
addPerson("LUCR1272","Gaius Lucretius Gallus","",-100,"","praetor.png");
addPerson("SULP1336","Gaius Sulpicius Galba","True",-100,"","praetor.png");
addPerson("HORT1382","Lucius Hortensius","",-100,"","praetor.png");
addPerson("MAEN1383","Quintus Maenius","",-100,"","praetor.png");
addPerson("TREM1345","Gaius Tremellius","",-100,"","praetor.png");
addPerson("RAEC1385","Marcus Raecius","",-100,"","praetor.png");
addPerson("CORN1363","Servius Cornelius Lentulus","True",-100,"","praetor.png");
addPerson("DECI1373","Gaius Decimius","",-100,"","praetor.png");
addPerson("FONT1394","Publius Fonteius Capito","",-100,"","praetor.png");
addPerson("AEBU1407","Marcus Aebutius Helva","True",-100,"","praetor.png");
addPerson("BAEB1409","Gnaeus Baebius Tamphilus","",-100,"","praetor.png");
addPerson("FONT1410","Publius Fonteius Balbus","",-100,"","praetor.png");
addPerson("PAPI1411","Gaius Papirius Carbo","",-100,"","praetor.png");
addPerson("CLAU1440","Tiberius Claudius Nero","True",-100,"","praetor.png");
addPerson("FULV1441","Gnaeus Fulvius","",-100,"","praetor.png");
addPerson("APPU1346","Lucius Appuleius Saturninus","",-100,"","praetor.png");
addPerson("FONT1453","Marcus Fonteius","",-100,"","praetor.png");
addPerson("IULI1454","Lucius Iulius (Caesar)","True",-100,"","praetor.png");
addPerson("QUIN1455","Publius Quinctilius Varus","True",-100,"","praetor.png");
addPerson("RUTI1456","Publius Rutilius Calvus","",-100,"","praetor.png");
addPerson("CORN1390","Publius Cornelius Blasio","True",-75,"","praetor.png");
addPerson("MINU3359","Quintus Minucius","",-100,"","praetor.png");
addPerson("OPPI1487","Lucius Oppius","",-100,"","praetor.png");
addPerson("ATIL1499","Marcus Atilius (Serranus)","",-75,"","praetor.png");
addPerson("PORC1433","Marcus Porcius Cato Licinianus","",-152,"","praetor.png");
addPerson("SEXT2976","Publius Sextilius","",-100,"","praetor.png");
addPerson("IUVE1507","Publius Iuventius Thalna","",-148,"True","praetor.png");
addPerson("LICI1514","Marcus Licinius","",-75,"","praetor.png");
addPerson("LICI1520","Lucius Licinius Murena","",-75,"","praetor.png");
addPerson("SEMP1521","Gaius Sempronius Tuditanus","",-75,"","praetor.png");
addPerson("VETI1522","Gaius Vetilius","",-146,"True","praetor.png");
addPerson("CLAU1529","? Claudius Unimanus","True",-75,"","praetor.png");
addPerson("PLAU1531","Gaius Plautius (Hypsaeus)","",-125,"","praetor.png");
addPerson("OPPI1530","? Oppius","",-75,"","praetor.png");
addPerson("NIGI1546","Gaius Nigidius","",-75,"","praetor.png");
addPerson("MARC1550","Quintus Marcius Rex","",-75,"","praetor.png");
addPerson("MUMM1542","Spurius Mummius","",-75,"","praetor.png");
addPerson("LICI1554","? Licinius Nerva","",-75,"","praetor.png");
addPerson("QUIN1555","? Quinctius","",-75,"","praetor.png");
addPerson("EGNA3362","Gnaeus Egnatius","",-75,"","praetor.png");
addPerson("HOST1562","Lucius Hostilius Tubulus","",-141,"True","praetor.png");
addPerson("IUNI1566","Decimus Iunius Silanus Manlianus","",-140,"True","praetor.png");
addPerson("IUNI1533","Marcus Iunius Brutus","",-125,"","praetor.png");
addPerson("PLAU1574","Lucius Plautius Hypsaeus","",-75,"","praetor.png");
addPerson("CLAU1579","Marcus Claudius (Marcellus)","",-137,"","praetor.png");
addPerson("MANL1584","? Manlius","True",-75,"","praetor.png");
addPerson("COSC1589","Marcus Cosconius","",-75,"","praetor.png");
addPerson("MANL3364","Titus Manlius","True",-75,"","praetor.png");
addPerson("POPI1601","Gaius Popillius Laenas","",-75,"","praetor.png");
addPerson("RUPI1602","Lucius Rupilius","",-75,"","praetor.png");
addPerson("LATI1628","Tiberius (Latinius) Pandusa","",-75,"","praetor.png");
addPerson("MARC1621","Gaius Marcius Figulus","",-75,"","praetor.png");
addPerson("PUPI3241","Marcus Pupius","",-50,"","praetor.png");
addPerson("ALBI3135","Publius Albius","",-25,"","praetor.png");
addPerson("IULI3201","Lucius Iulius Caesar","True",-50,"","praetor.png");
addPerson("CORN3168","Gaius Cornelius (Cethegus?)","",-50,"","praetor.png");
addPerson("VALG3265","Quintus Valgius","",-50,"","praetor.png");
addPerson("CORN1631","Publius Cornelius Lentulus","True",-75,"","praetor.png");
addPerson("LICI1637","Marcus Licinius Crassus 'Agelastus'","",-75,"","praetor.png");
addPerson("SEMP3257","Gaius Sempronius","",-75,"","praetor.png");
addPerson("MANL3209","Lucius Manlius","",-75,"","praetor.png");
addPerson("CLUV1768","Gaius Cluvius","",-50,"","praetor.png");
addPerson("AEBU5164"," Aebutius","",-75,"","praetor.png");
addPerson("ATIL2944","Publius Atilius","",-50,"","praetor.png");
addPerson("FABI2959","Quintus Fabius Labeo","True",-50,"","praetor.png");
addPerson("IULI1642","Sextus Iulius Caesar","True",-50,"","praetor.png");
addPerson("LIVI3366","? Livius or Oppius Salinator","",-50,"","praetor.png");
addPerson("SERV2973","Gaius Servilius Vatia","",-95,"","praetor.png");
addPerson("POMP1675","Sextus Pompeius","",-120,"True","praetor.png");
addPerson("VALE1888","Manius Valerius Messalla","True",-50,"","praetor.png");
addPerson("CORN1678","Gnaeus Cornelius Sisenna","",-50,"","praetor.png");
addPerson("SCRI1657","Gaius Scribonius Curio","",-50,"","praetor.png");
addPerson("SERG1727","Manius Sergius","True",-50,"","praetor.png");
addPerson("FABI1726","Quintus Fabius Labeo","True",-50,"","praetor.png");
addPerson("PAPI1696","Marcus Papirius Carbo","",-50,"","praetor.png");
addPerson("PORC3369","Marcus Porcius Cato (Salonianus)","",-50,"","praetor.png");
addPerson("ANON3370","Servius","",-50,"","praetor.png");
addPerson("CALP1713","Lucius Calpurnius Piso Frugi","",-111,"True","praetor.png");
addPerson("MINU1687","Quintus Minucius Rufus","",-50,"","praetor.png");
addPerson("SULP1662","Gaius Sulpicius Galba","True",-50,"","praetor.png");
addPerson("CORN3098","Servius Cornelius Lentulus","",-50,"","praetor.png");
addPerson("CORN1732","Gnaeus Cornelius Scipio","True",-50,"","praetor.png");
addPerson("MANL1747","Aulus Manlius","True",-50,"","praetor.png");
addPerson("POPI1748","Gaius Popillius Laenas","",-100,"","praetor.png");
addPerson("AUFI1741","Gnaeus Aufidius","",-50,"","praetor.png");
addPerson("ALBU1750","Titus Albucius","",-50,"","praetor.png");
addPerson("BELL1751","Lucius Bellienus","",-50,"","praetor.png");
addPerson("ANON1752","Lucius -onius","",-50,"","praetor.png");
addPerson("TREM3372","Lucius Tremellius Scrofa","",-50,"","praetor.png");
addPerson("ANON3374","Lucius -onius","",-50,"","praetor.png");
addPerson("ANON3375","?","",-50,"","praetor.png");
addPerson("FLAM1758","Titus Flaminius","",-50,"","praetor.png");
addPerson("LICI1759","Lucius Licinius Lucullus","",-100,"","praetor.png");
addPerson("LICI1760","Publius Licinius Nerva","",-50,"","praetor.png");
addPerson("CAES3376","Lucius Caesius","",-50,"","praetor.png");
addPerson("ANON1771","?  Glaucia","",-50,"","praetor.png");
addPerson("CLAU1784","Marcus Claudius Marcellus","",-25,"","praetor.png");
addPerson("VIBI1773","? Vibius","",-50,"","praetor.png");
addPerson("SERV1779","Gaius Servilius (Vatia)","True",-50,"","praetor.png");
addPerson("MARI1778","Marcus Marius","",-25,"","praetor.png");
addPerson("ANON3379","Gaius -ius","",-50,"","praetor.png");
addPerson("LICI1788","Lucius Licinius Murena","",-50,"","praetor.png");
addPerson("PLAU2970","Marcus Plautius Hypsaeus","",-22,"","praetor.png");
addPerson("PORC1831","Marcus Porcius Cato","",-25,"","praetor.png");
addPerson("MARC3382","Quintus Marcius Philippus","",-50,"","praetor.png");
addPerson("CORN3383","Gnaeus Cornelius Dolabella","True",-100,"True","praetor.png");
addPerson("CORN1791","Lucius Cornelius Dolabella","True",-25,"","praetor.png");
addPerson("FABI2960","? Fabius Senator","",50,"","praetor.png");
addPerson("FURI3418","? Furius Leptinus","",25,"","praetor.png");
addPerson("PROC3419","? Procilius","",50,"","praetor.png");
addPerson("IUVE3744","Manius Iuventius Laterensis","",25,"","praetor.png");
addPerson("TERE3817","? Teresius (or Terentius?)","",-50,"","praetor.png");
addPerson("SEMP1824","Gaius Sempronius Longus","",-25,"","praetor.png");
addPerson("SENT3384","Lucius Sentius (Saturninus)","",-75,"","praetor.png");
addPerson("SENT1829","Gaius Sentius (Saturninus)","",-25,"","praetor.png");
addPerson("CORN1836","Publius Cornelius Scipio Nasica","True",-25,"","praetor.png");
addPerson("SEMP1820","Lucius Sempronius Asellio","",-25,"","praetor.png");
addPerson("SEXT1842","Gaius Sextius Calvinus","",-25,"","praetor.png");
addPerson("IULI1799","Gaius Iulius Caesar","True",-25,"","praetor.png");
addPerson("SEXT1895","Publius Sextilius Rufus","",-25,"","praetor.png");
addPerson("PERP1848","Gaius Perperna","",-25,"","praetor.png");
addPerson("SERV1849","Quintus Servilius","True",-90,"True","praetor.png");
addPerson("SULP1850","Servius Sulpicius Galba","True",-25,"","praetor.png");
addPerson("CAEC1869","Marcus Caecilius Cornutus","",-25,"","praetor.png");
addPerson("CORN1883","Publius Cornelius Lentulus","True",-87,"True","praetor.png");
addPerson("GABI1920","Aulus Gabinius","",-89,"True","praetor.png");
addPerson("VALE1887","Marcus Valerius Messalla","True",-25,"","praetor.png");
addPerson("LUCI1847","Lucius Lucilius","",-25,"","praetor.png");
addPerson("CAEL1868","Gaius Caelius","",-25,"","praetor.png");
addPerson("CASS1870","Gaius Cassius","",-25,"","praetor.png");
addPerson("POST1874","Lucius Postumius","True",-90,"True","praetor.png");
addPerson("POMP3385","Sextus Pompeius","",-25,"","praetor.png");
addPerson("OPPI1892","Quintus Oppius","",-25,"","praetor.png");
addPerson("SEMP1894","Aulus Sempronius Asellio","",-89,"True","praetor.png");
addPerson("CANI2954","Gaius Caninius","",-25,"","praetor.png");
addPerson("GABI1891","Publius Gabinius","",0,"","praetor.png");
addPerson("COSC1919","Gaius Cosconius","",-25,"","praetor.png");
addPerson("FUFI3415","Lucius Fufidius","",-75,"","praetor.png");
addPerson("CALP3414","? Calpurnius","",-25,"","praetor.png");
addPerson("ANCH1928","Quintus Ancharius","",-87,"True","praetor.png");
addPerson("IUNI1929","Marcus Iunius Brutus","",-82,"True","praetor.png");
addPerson("LICI1930","Lucius Licinius Murena","",0,"","praetor.png");
addPerson("SERV1931","? Servilius","True",-25,"","praetor.png");
addPerson("HORT1951","Lucius Hortensius","",-25,"","praetor.png");
addPerson("CORN1990","Lucius Cornelius Lentulus","True",-25,"","praetor.png");
addPerson("SERV1999","Marcus Servilius","",-25,"","praetor.png");
addPerson("FABI1964","Gaius Fabius Hadrianus","",-83,"True","praetor.png");
addPerson("BURR1970","Publius Burrenus","",-80,"True","praetor.png");
addPerson("ANTO1984","Quintus Antonius Balbus","",-82,"","praetor.png");
addPerson("ANNI1740","Gaius Annius (Luscus)","",-25,"","praetor.png");
addPerson("CORN3388","Publius Cornelius Cethegus","True",-25,"","praetor.png");
addPerson("MAGI4440","Marcus Magius Surus","",-25,"","praetor.png");
addPerson("CARR1977","Gaius Carrinas","",-82,"True","praetor.png");
addPerson("MAGI1985","? Magius","",-25,"","praetor.png");
addPerson("PERP1986","Marcus Perperna Veiento","",-72,"True","praetor.png");
addPerson("MAGI3281","? Magius","",-25,"","praetor.png");
addPerson("IUNI1980","Lucius Iunius Brutus Damasippus","",-80,"True","praetor.png");
addPerson("COEL1995","Gaius Coelius Antipater","",-82,"True","praetor.png");
addPerson("FLAV1996","? Flavius Fimbria","",-82,"True","praetor.png");
addPerson("FANN3190","Gaius Fannius","",-75,"","praetor.png");
addPerson("ALBI2193","Publius Albinovanus","",0,"","praetor.png");
addPerson("POST3391","Aulus Postumius Albinus","True",-25,"","praetor.png");
addPerson("LUCR2003","Quintus Lucretius Afella (or Ofella)","",-82,"True","praetor.png");
addPerson("CORN2007","Gnaeus Cornelius Dolabella","True",-75,"","praetor.png");
addPerson("FUFI2008","Lucius Fufidius","",-25,"","praetor.png");
addPerson("MINU2009","Marcus Minucius Thermus","",-25,"","praetor.png");
addPerson("NONI2010","Sextus Nonius Suffenas","",-25,"","praetor.png");
addPerson("CLAU2006","Gaius Claudius Nero","True",-25,"","praetor.png");
addPerson("DOMI2022","Marcus Domitius Calvinus","",-79,"True","praetor.png");
addPerson("MANL2030","Lucius Manlius","True",-25,"","praetor.png");
addPerson("FABE3182","Lucius Faberius","",-25,"","praetor.png");
addPerson("COEL3127","Gaius Coelius Caldus","",0,"","praetor.png");
addPerson("CORN2035","Lucius Cornelius Sisenna","True",-67,"","praetor.png");
addPerson("TERE2037","? Terentius Varro","",-25,"","praetor.png");
addPerson("PEDU2042","Sextus Peducaeus","",-45,"","praetor.png");
addPerson("IUNI2051","Marcus Iunius Iuncus","",0,"","praetor.png");
addPerson("SALV3839","? Salvius","",-25,"","praetor.png");
addPerson("CAES2063","Marcus Caesius","",-50,"","praetor.png");
addPerson("TURI2066","Lucius Turius","",0,"","praetor.png");
addPerson("LICI2067","Gaius Licinius Sacerdos","",0,"","praetor.png");
addPerson("CLAU2099","Gaius Claudius Glaber","",-50,"","praetor.png");
addPerson("RUTI2096","Publius Rutilius Nudus","",0,"","praetor.png");
addPerson("CLAU1851","Marcus Claudius Marcellus","",-50,"","praetor.png");
addPerson("FURI4612","Lucius Furius","True",0,"","praetor.png");
addPerson("CASS5157","Marcus Cassius","",-50,"","praetor.png");
addPerson("ANTO2077","Marcus Antonius Creticus","",-71,"","praetor.png");
addPerson("COEL2079","Publius Coelius","",0,"","praetor.png");
addPerson("ARRI2098","Quintus Arrius","",-72,"","praetor.png");
addPerson("COSS2100","Lucius Cossinius","",-73,"True","praetor.png");
addPerson("VALE2101","Publius Valerius","",0,"","praetor.png");
addPerson("VARI2102","Publius Varinius","",0,"","praetor.png");
addPerson("CLAU3427","Gaius Claudius (or Clodius) Glaber","",0,"","praetor.png");
addPerson("MANL2136","Gnaeus Manlius","True",0,"","praetor.png");
addPerson("TITI3395","Lucius Titius","",0,"","praetor.png");
addPerson("ANTI2162","Gaius Antistius Vetus","",0,"","praetor.png");
addPerson("MANL2165","Aulus Manlius Torquatus","True",0,"","praetor.png");
addPerson("MUMM2166","Marcus Mummius","",0,"","praetor.png");
addPerson("POMP2075","Quintus Pompeius Bithynicus","",0,"","praetor.png");
addPerson("CAEC2175","Marcus Caecilius Metellus","",0,"","praetor.png");
addPerson("CORN2176","Publius Cornelius Dolabella","True",0,"","praetor.png");
addPerson("CORN2028","Publius Cornelius Sulla","True",25,"","romanaristocrat.png");
addPerson("SERG1998","Lucius Sergius Catilina","True",-62,"True","praetor.png");
addPerson("LOLL2249","Lucius Lollius","",0,"","praetor.png");
addPerson("CORN3397","Gnaeus (Cornelius) Scipio","True",0,"","praetor.png");
addPerson("RUBR2206","? Rubrius","",0,"","praetor.png");
addPerson("CURI2223","Quintus Curius","",0,"","praetor.png");
addPerson("LUCC2225","Lucius Lucceius","",-41,"True","praetor.png");
addPerson("MINU2227","? Minucius Thermus","",0,"","praetor.png");
addPerson("BELL2204","? Bellinus","",0,"","praetor.png");
addPerson("SEXT2207","? Sextilius","",0,"","praetor.png");
addPerson("AUFI2222","Titus Aufidius","",-25,"","praetor.png");
addPerson("IUNI2224","Marcus Iunius","",0,"","praetor.png");
addPerson("AQUI2256","Gaius Aquillius Gallus","",0,"","praetor.png");
addPerson("ORCH2258","Gaius Orchivius","",0,"","praetor.png");
addPerson("SULP2179","Publius Sulpicius Galba","True",-47,"","praetor.png");
addPerson("ATTI2270","Gaius Attius Celsus","",0,"","praetor.png");
addPerson("ORBI2271","Publius Orbius","",0,"","praetor.png");
addPerson("ARRI2279","Quintus Arrius","",-50,"","praetor.png");
addPerson("PETR2280","Marcus Petreius","",-46,"True","praetor.png");
addPerson("CLAU2248","Tiberius Claudius Nero","True",-50,"","praetor.png");
addPerson("COSC2286","Gaius Cosconius","",-59,"","praetor.png");
addPerson("POMP2311","Gaius Pomptinus","",25,"","praetor.png");
addPerson("SULP2289","Gaius Sulpicius","",0,"","praetor.png");
addPerson("LUCC3816","? Lucceius","",-25,"","praetor.png");
addPerson("CORN2196","Lucius Cornelius Lentulus Niger","True",-56,"","praetor.png");
addPerson("ATIU2329","Marcus Atius Balbus","",0,"","praetor.png");
addPerson("CORN2330","Lucius (Cornelius?) Culleolus","",0,"","praetor.png");
addPerson("SULP2971","Gaius Sulpicius Galba","True",25,"","praetor.png");
addPerson("APPU2318","Lucius Appuleius Saturninus","",0,"","praetor.png");
addPerson("CORN2338","Gnaeus Cornelius Lentulus Clodianus","True",0,"","praetor.png");
addPerson("FABI3178","Quintus Fabius Sanga","",0,"","praetor.png");
addPerson("FABI2357","Gaius Fabius Hadrianus","",-25,"","praetor.png");
addPerson("VILL2358","Lucius Villius Annalis","",-43,"True","praetor.png");
addPerson("SILI2360","Publius Silius (Nerva)","",25,"","praetor.png");
addPerson("CALI2375","Marcus Calidius","",-47,"","praetor.png");
addPerson("QUIN2376","Sextus Quinctilius Varus","True",-41,"True","praetor.png");
addPerson("SEPT2377","Gaius Septimius T. f.","",-41,"","praetor.png");
addPerson("VALE2409","Quintus Valerius Orca","",25,"","praetor.png");
addPerson("SEPT2516","Gaius Septimus","",-50,"","praetor.png");
addPerson("CLAU2062","Gaius Claudius Pulcher","True",-25,"","praetor.png");
addPerson("MANL3217","Titus Manlius Torquatus","True",0,"","praetor.png");
addPerson("ANON2419","? - Gutta","",-50,"","praetor.png");
addPerson("ATTI2455","Publius Attius Varus","",-45,"True","praetor.png");
addPerson("NONI3752","? Nonius Struma","",0,"","praetor.png");
addPerson("CONS2359","Gaius Considius Longus","",-46,"True","praetor.png");
addPerson("DOMI2399","Gnaeus Domitius","",25,"","praetor.png");
addPerson("SULP2316","Servius Sulpicius Galba","True",-43,"","ServiusSulpiciusGalba.jpg");
addPerson("AURE2434","Marcus Aurelius Cotta","",25,"","praetor.png");
addPerson("CONS2435","Marcus Considius Nonianus","",25,"","praetor.png");
addPerson("POST2436","Lucius Postumius","True",25,"","praetor.png");
addPerson("VOCO2437","? Voconius","",25,"","praetor.png");
addPerson("FONT2432","? Fonteius","",0,"","praetor.png");
addPerson("TITI2519","Gaius Titius Rufus","",25,"","praetor.png");
addPerson("LIVI2520","Marcus Livius Drusus (Claudianus)","",-42,"True","praetor.png");
addPerson("CORN2961","? Cornelius Gallus","",50,"","praetor.png");
addPerson("FURI2958","Lucius Furius Crassipes","True",25,"","praetor.png");
addPerson("MANL2198","Lucius Manlius Torquatus","True",-46,"","praetor.png");
addPerson("COPO2537","Gaius Coponius","",-25,"","praetor.png");
addPerson("AELI2325","Lucius Aelius Tubero","",-25,"","praetor.png");
addPerson("VOLU2513","Quintus Volusius","",25,"","praetor.png");
addPerson("MARC2567","Quintus Marcius Philippus","",25,"","praetor.png");
addPerson("RABI2568","Gaius Rabirius (Curtius) Postumus","",25,"","praetor.png");
addPerson("SULP2259","? (Sulpicius) Galba","True",25,"","praetor.png");
addPerson("ACIL2583","Marcus Acilius Caninus","",25,"","praetor.png");
addPerson("STAI2588","Lucius Staius Murcus","",-39,"True","praetor.png");
addPerson("TILL2634","Lucius Tillius Cimber","",-30,"","praetor.png");
addPerson("GALL2666","Marcus Gallius","",25,"","praetor.png");
addPerson("CORD2946","Manius Cordius Rufus","",25,"","praetor.png");
addPerson("SEMP2972","Gaius Sempronius Rufus","",-25,"","praetor.png");
addPerson("TEDE2977","Publius Tedetius","",25,"","praetor.png");
addPerson("ANNI2659","Titus Annius Cimber","",25,"","praetor.png");
addPerson("CASS2586","Quintus Cassius","",25,"","praetor.png");
addPerson("CEST2662","Gaius Cestius","",-41,"True","praetor.png");
addPerson("CORN2663","Lucius Cornelius Cinna","True",-25,"","praetor.png");
addPerson("TURR2669","Gaius Turranius","",-43,"True","praetor.png");
addPerson("VEHI2670","Marcus Vehilius","",25,"","praetor.png");
addPerson("ANON3437","? -minius Longinus","",25,"","plebeian.png");
addPerson("OPPI2622","Spurius Oppius","",25,"","praetor.png");
addPerson("ANTI2461","Gaius Antistius Reginus","",25,"","praetor.png");
addPerson("PLAU3775","Lucius Plautius (Plotius) Plancus","",-43,"True","praetor.png");
addPerson("VINI3836","Titus Vinius","",25,"","praetor.png");
addPerson("AQUI2708","Manius Aquillius Crassus","",-41,"True","praetor.png");
addPerson("CAEC2709","Marcus Caecilius Cornutus","",-43,"True","praetor.png");
addPerson("CEST2710","Lucius Cestius","",25,"","praetor.png");
addPerson("MINU2712","? Minucius Rufus","",-43,"True","praetor.png");
addPerson("RUPI2714","Publius Rupilius Rex","",25,"","praetor.png");
addPerson("IULI2963","Lucius Iulius Mocilla","",-25,"","praetor.png");
addPerson("LIVI2965","Lucius Livius Ocella or Pella","",-25,"","praetor.png");
addPerson("CLOV2655","Gaius Cluvius or Clovius","",25,"","praetor.png");
addPerson("LUCI3812","Lucius (Lucilius) Balbus","",25,"","praetor.png");
addPerson("ANON3307","? - Balbus","",25,"","praetor.png");
addPerson("CORN2781","Lucius Cornelius Lentulus Cruscellio","True",25,"","praetor.png");
addPerson("ASIN2898","Gnaeus Asinius Marrucinus","",25,"","praetor.png");
addPerson("ASEL2909","Lucius Asellius","",25,"","praetor.png");
addPerson("QUIN3416","Lucius Quinctius Rufus","True",25,"","praetor.png");
addPerson("FISC3467","Quintus Fiscilius","",25,"","praetor.png");
addPerson("IUVE0613","? Iuventius","",-250,"","aedile.png");
addPerson("ANIC0619","Quintus Anicius Praenestinus","",-250,"","aedile.png");
addPerson("POPI3789","Marcus Popillius","",-50,"","aedile.png");
addPerson("CARV0639","Spurius Carvilius Maximus","",-225,"","aedile.png");
addPerson("PAPI0659","Lucius Papirius Maso","",-225,"","aedile.png");
addPerson("FABI0705","Quintus Fabius","True",-250,"","aedile.png");
addPerson("SULP0987","Servius Sulpicius Galba","True",-199,"","aedile.png");
addPerson("CORN1009","Servius Cornelius Lentulus","True",-150,"","aedile.png");
addPerson("CORN0985","Lucius Cornelius Lentulus Caudinus","True",-100,"","aedile.png");
addPerson("FULV1055","Quintus Fulvius (Gillo)","",-150,"","aedile.png");
addPerson("LICI1056","Lucius Licinius Lucullus","",-150,"","aedile.png");
addPerson("MINU3705","Lucius Minucius Thermus","",25,"","aedile.png");
addPerson("CORN1472","Lucius Cornelius Merula","True",-100,"","aedile.png");
addPerson("HOST1503","Aulus Hostilius Mancinus","",-75,"","aedile.png");
addPerson("IULI1532","Lucius Iulius","True",-75,"","aedile.png");
addPerson("IUNI1534","Marcus Iunius (Silanus)","",-75,"","aedile.png");
addPerson("MINU1592","Quintus Minucius","",-75,"","aedile.png");
addPerson("OCTA2990","Gnaeus Octavius","",50,"","aedile.png");
addPerson("POST2993","? Postumius","",50,"","aedile.png");
addPerson("FURI1987","Publius Furius Crassipes","True",-25,"","aedile.png");
addPerson("SEIU2080","Marcus Seius","",0,"","aedile.png");
addPerson("FLAM2229","Gaius Flaminius","",0,"","aedile.png");
addPerson("BARR2985","Publius Barronius Barba","",25,"","aedile.png");
addPerson("LICI2301","Gaius Licinius Murena","",0,"","aedile.png");
addPerson("NONI2420","? Nonius Struma","",0,"","aedile.png");
addPerson("OCTA2467","Marcus Octavius","",25,"","aedile.png");
addPerson("TERE2930","Aulus Terentius Varro Murena","",25,"","aedile.png");
addPerson("TERE2581","Aulus Terentius Varro Murena","",25,"","aedile.png");
addPerson("POMP2992","? Pompeius Rufus","",25,"","aedile.png");
addPerson("COND2987","Publius Condetius","",-150,"","aedile.png");
addPerson("MIND2989","Marcus Mindius","",-150,"","aedile.png");
addPerson("APRO0706","Gnaeus Apronius","",-250,"","aedile.png");
addPerson("REMM1830","? Remmius","",-25,"","aedile.png");
addPerson("IUNI2068","Gaius Iunius","",0,"","aedile.png");
addPerson("VOLU2125","Lucius Voluscius (or Volscius)","",-50,"","aedile.png");
addPerson("LART2126","Lucius Lartius","",-50,"","aedile.png");
addPerson("ANNA2127","Gaius Annaeus (Brocchus)","",-50,"","aedile.png");
addPerson("CURT2152","Quintus Curtius (Postumus)","",0,"","aedile.png");
addPerson("APPU3145","Lucius Appuleius","",25,"","aedile.png");
addPerson("CAEL2673","Quintus Caelius","",25,"","aedile.png");
addPerson("CRIT2674","? Critonius","",25,"","aedile.png");
addPerson("VARI2675","Lucius Varius Cotyla","",25,"","aedile.png");
addPerson("VOLU2715","Marcus Volusius","",25,"","aedile.png");
addPerson("VILL2768","? Villius Annalis","",-42,"True","aedile.png");
addPerson("ATTI2980","Publius Attius","",25,"","aedile.png");
addPerson("OPPI2859","Marcus Oppius","",-35,"","aedile.png");
addPerson("FABI0592","Gaius Fabius Ambustus","True",-250,"","romanaristocrat.png");
addPerson("ASEL2910","? Asellius","",25,"","praetor.png");
addPerson("POPI3229","Marcus Popillius","",25,"","plebeian.png");
addPerson("PUBL3240","? Publilius","",25,"","plebeian.png");
addPerson("AEBU3299","? (Aeb)utius or (Pla)utius","",25,"","plebeian.png");
addPerson("ANNI3323","Lucius Annius","",-250,"","plebeian.png");
addPerson("AEMI4706","Quintus Aemilius Lepidus","",25,"","plebeian.png");
addPerson("AEMI3331","Quintus Aemilius Lepidus","True",50,"","romanaristocrat.png");
addPerson("LUCI3814","? Lucilius (Balbus?)","",-75,"","plebeian.png");
addPerson("TEID4631","Publius Teidius","",-50,"","plebeian.png");
addPerson("MANI3222","? Manilius","",-125,"","plebeian.png");
addPerson("FULV3693","Lucius Fulvius","",-100,"","plebeian.png");
addPerson("TERE3522","Gaius Terentius Lucanus","",-75,"","plebeian.png");
addPerson("ACIL3297","Manius Acilius (Balbus)","",-100,"","plebeian.png");
addPerson("EGNA3174","Gnaeus Egnatius","",-100,"","plebeian.png");
addPerson("FONT3189","Manius Fonteius","",-100,"","plebeian.png");
addPerson("OFID3224","Titus Ofidius (Aufidius?)","",-100,"","plebeian.png");
addPerson("PORC3239","Publius Porcius (Laeca)","",-100,"","plebeian.png");
addPerson("SEMP3251","Gaius Sempronius","",-100,"","plebeian.png");
addPerson("CLAU3429","Tiberius Claudius Nero or Asellus","",-100,"","plebeian.png");
addPerson("FONT3195","? Fonteius","",-100,"","plebeian.png");
addPerson("MANL1808","Titus Manlius","True",-100,"","romanaristocrat.png");
addPerson("ACIL3298","Gaius Acilius","",-100,"","plebeian.png");
addPerson("SULP4610","? Sulpicius Rufus","True",-100,"","romanaristocrat.png");
addPerson("LUTA3200","Gnaeus Lutatius Cerco","",-75,"","plebeian.png");
addPerson("SEMP3259","Aulus Sempronius","",-75,"","plebeian.png");
addPerson("STAT3274","Quintus Statilienus","",-75,"","plebeian.png");
addPerson("ANNI3136","Gaius Annius","",-75,"","plebeian.png");
addPerson("ANNI3137","Lucius Annius","",-75,"","plebeian.png");
addPerson("COPO3170","Lucius Coponius","",-75,"","plebeian.png");
addPerson("PAPI3235","? Papirius","",-75,"","plebeian.png");
addPerson("PETT3773","Lucius Pettius","",-75,"","plebeian.png");
addPerson("AFIN3134","Lucius Afinius","",-75,"","plebeian.png");
addPerson("AFIN3289","Lucius Afinius","",-75,"","plebeian.png");
addPerson("ANNI3288","Gaius Annius","",-75,"","plebeian.png");
addPerson("ANTI3282","Lucius Antistius","",-75,"","plebeian.png");
addPerson("ANTI3138","Lucius Antistius","",-75,"","plebeian.png");
addPerson("APPU3146","Marcus Appuleius","",-75,"","plebeian.png");
addPerson("AUFI3148","Gnaeus Aufidius","",-75,"","plebeian.png");
addPerson("CAEC3152","Quintus Caecilius","",-75,"","plebeian.png");
addPerson("COEL3158","Gaius Coelius","",-75,"","plebeian.png");
addPerson("CARV3160","Spurius Carvilius","",-75,"","plebeian.png");
addPerson("CLAU3167","Quintus Claudius","",-75,"","plebeian.png");
addPerson("DIDI3172","Gaius Didius","",-75,"","plebeian.png");
addPerson("DOMI3173","Lucius Domitius (Ahenobarbus)","",-75,"","plebeian.png");
addPerson("COSC3175","Marcus Cosconius","",-75,"","plebeian.png");
addPerson("GENU3187","Lucius Genucius","",-75,"","plebeian.png");
addPerson("GESS3188","Publius Gessius","",-75,"","plebeian.png");
addPerson("FALE3192","Marcus Falerius","",-75,"","plebeian.png");
addPerson("FILI3194","Lucius Filius","",-75,"","plebeian.png");
addPerson("LABE3197","Quintus Laberius","",-75,"","plebeian.png");
addPerson("LOLL3198","Marcus Lollius","",-75,"","plebeian.png");
addPerson("HERE3199","Gaius Herennius","",-75,"","plebeian.png");
addPerson("LICI3206","Gaius Licinius","",-75,"","plebeian.png");
addPerson("LUCI3207","Marcus Lucilius (Rufus?)","",-75,"","plebeian.png");
addPerson("NAUT3214","Gaius Nautius","",-75,"","plebeian.png");
addPerson("MUNI3215","Marcus Munius","",-75,"","plebeian.png");
addPerson("OCTA3220","Gnaeus Octavius","",-75,"","plebeian.png");
addPerson("MEMM1702","Lucius Memmius","",-50,"","plebeian.png");
addPerson("NEME3223","Gaius Nemetorius (or Numitorius)","",-75,"","plebeian.png");
addPerson("POMP3225","Gnaeus Pompeius","",-75,"","plebeian.png");
addPerson("POPI3226","Publius Popillius Laenas","",-75,"","plebeian.png");
addPerson("PLAE3237","Lucius Plaetorius","",-75,"","plebeian.png");
addPerson("POPI3238","Quintus Popillius Laenas","",-75,"","plebeian.png");
addPerson("RUBR3248","Gaius Rubrius","",-75,"","plebeian.png");
addPerson("SERR3252","Marcus Serrius","",-75,"","plebeian.png");
addPerson("SILI3253","Gaius Silius","",-75,"","plebeian.png");
addPerson("SILI3272","Publius Silius","",-75,"","plebeian.png");
addPerson("ATIL3332","Sextus (At)ilius","",-75,"","plebeian.png");
addPerson("CORN3779","Lucius Cornelius","",-75,"","plebeian.png");
addPerson("SEMP3818","Gaius Sempronius","",-75,"","plebeian.png");
addPerson("PAPI3770","Gaius (Papirius) Masso","",-50,"","plebeian.png");
addPerson("LUCI3810","? Lucilius Hirrus","",-50,"","plebeian.png");
addPerson("CASS3425","? Cassius Sabaco","",-50,"","plebeian.png");
addPerson("PLAU3231","Gaius Plautius Numida","",-50,"","plebeian.png");
addPerson("VOLC3279","Gaius Volcacius Gurges","",25,"","plebeian.png");
addPerson("CAEL3336","Titus Caelius","",0,"","plebeian.png");
addPerson("VERR3842","Gaius Verres","",-25,"","plebeian.png");
addPerson("SERG4603","Quintus Sergius","",-25,"","plebeian.png");
addPerson("LICI3203","? Licinius Bucco","",-25,"","plebeian.png");
addPerson("STAT3267","? Statius 'the Samnite'","",-43,"True","plebeian.png");
addPerson("COEL1956","Publius Coelius Caldus","",-87,"True","plebeian.png");
addPerson("BAEB5095","? Baebius","",-80,"True","plebeian.png");
addPerson("CONS5096","Lucius Considius","",-80,"True","plebeian.png");
addPerson("DOMI5097","? Domitius","",-80,"True","plebeian.png");
addPerson("LAET5098","Publius Laetorius","",-82,"True","plebeian.png");
addPerson("LAMP5152","Marcus Lamponius","",-80,"True","plebeian.png");
addPerson("PAPI5100","Gaius Papius Mutilus","",-80,"True","plebeian.png");
addPerson("SALT5101","Sextus Saltius","",-80,"True","plebeian.png");
addPerson("APPU5102","Sextus Appuleius","",-25,"","plebeian.png");
addPerson("GRAN4272","Quintus Granius","",-25,"","plebeian.png");
addPerson("ANON5104","? - Gutta","",-25,"","plebeian.png");
addPerson("MARC1947","Gaius Marcius Censorinus","",-82,"","plebeian.png");
addPerson("DOMI1991","Gnaeus Domitius Ahenobarbus","",-81,"True","plebeian.png");
addPerson("LIVI2018","Lucius Livius Salinator","",-81,"True","plebeian.png");
addPerson("INST2055","Lucius Insteius","",-25,"","plebeian.png");
addPerson("OCTA2057","Gaius Octavius Graecinus","",-71,"True","plebeian.png");
addPerson("TARQ2058","Gaius Tarquitius Priscus","",-71,"True","plebeian.png");
addPerson("INST2059","Gaius Insteius","",-25,"","plebeian.png");
addPerson("ANTO2146","Marcus Antonius","",-71,"True","plebeian.png");
addPerson("MANL2149","Marcus Manlius or Mallius","",-71,"True","plebeian.png");
addPerson("FANN2220","Lucius Fannius","",0,"","plebeian.png");
addPerson("NORB3510","Gaius Norbanus","",-25,"","plebeian.png");
addPerson("VIBI3526","Gaius Vibius Pansa","",-80,"True","plebeian.png");
addPerson("MARC3552","Lucius Marcius Censorinus","",-25,"","plebeian.png");
addPerson("HIRT3707","Quintus Hirtuleius","",-75,"True","plebeian.png");
addPerson("CORN3869","Lucius Cornelius Scipio Asiagenus Aemilianus","",-77,"True","plebeian.png");
addPerson("LUCR3899","Quintus Lucretius Vespillo","",-80,"True","plebeian.png");
addPerson("PLAE3234","Marcus Plaetorius","",-82,"True","plebeian.png");
addPerson("FIDU3465","Marcus Fidustius","",-41,"True","plebeian.png");
addPerson("VENU2004","? Venuleius","",-82,"True","plebeian.png");
addPerson("ATTI3333","? Attius (or Atticus)","",0,"","plebeian.png");
addPerson("PETI3236","Quintus Petillius","",-25,"","plebeian.png");
addPerson("LUSC3211","Gaius Luscius Ocrea","",-25,"","plebeian.png");
addPerson("MANI3221","Titus Manilius","",-25,"","plebeian.png");
addPerson("LUCI3811","Quintus Lucilius Balbus","",-25,"","plebeian.png");
addPerson("ATTI3151","? Attidius","",-67,"True","plebeian.png");
addPerson("OCTA3218","Marcus Octavius Ligus","",-25,"","plebeian.png");
addPerson("ANNI3325","Publius Annius Asellus","",-75,"","plebeian.png");
addPerson("OCTA3760","Lucius (Octavius) Ligus","",-25,"","plebeian.png");
addPerson("AQUI3147","Manius Aquillius","",-50,"","plebeian.png");
addPerson("ATIL3153","Marcus Atilius Bulbus","",0,"","plebeian.png");
addPerson("CAUL3161","Lucius Caulius Mergus","",0,"","plebeian.png");
addPerson("CAUD3163","Gaius Caudinus","",0,"","plebeian.png");
addPerson("CONS3169","Quintus Considius","",0,"","plebeian.png");
addPerson("FIDI3193","Gaius Fidiculanius Falcula","",0,"","plebeian.png");
addPerson("ANON3196","Tiberius  Gutta","",0,"","plebeian.png");
addPerson("IUVE3205","Marcus Iuventius Pedo","",0,"","plebeian.png");
addPerson("HEIU3210","Gnaeus Heius","",0,"","plebeian.png");
addPerson("SEPT3254","Publius Septimius Scaevola","",0,"","plebeian.png");
addPerson("SATU3261","Publius Saturius","",0,"","plebeian.png");
addPerson("BAEB3305","Marcus Baebius","",0,"","plebeian.png");
addPerson("EGNA3447","Gnaeus Egnatius Maximus","",0,"","plebeian.png");
addPerson("MINU3704","Marcus (Minucius) Basilus","",0,"","plebeian.png");
addPerson("OCTA3759","Lucius Octavius Balbus","",0,"","plebeian.png");
addPerson("CALI3144","? Calidius","",0,"","plebeian.png");
addPerson("RUTI3256","Lucius Rutilius Flaccus","",0,"","plebeian.png");
addPerson("CLAU3162","Gaius Claudius","",0,"","plebeian.png");
addPerson("POPI3228","Gaius Popillius","",0,"","plebeian.png");
addPerson("EGNA3179","Gnaeus Egnatius (Maximus?)","",0,"","plebeian.png");
addPerson("ANON3184","Gaius - Gallus","",0,"","plebeian.png");
addPerson("IUNI3204","Quintus Iunius","",0,"","plebeian.png");
addPerson("LUCR3208","Marcus Lucretius","",0,"","plebeian.png");
addPerson("POPI3227","Publius Popillius","",0,"","plebeian.png");
addPerson("TITI3271","Quintus Titinius","",0,"","plebeian.png");
addPerson("VATI3846","Publius Vatienus","",0,"","plebeian.png");
addPerson("TITI3856","Gaius Titinius","",0,"","plebeian.png");
addPerson("LUCI3212","Quintus Lucienus","",0,"","plebeian.png");
addPerson("ANNI3139","Titus Annius","",0,"","plebeian.png");
addPerson("VARG3269","Lucius Vargunteius","",0,"","plebeian.png");
addPerson("TUDI3275","Gnaeus Tudicius","",0,"","plebeian.png");
addPerson("QUIN3823","Publius Quinctilius Varus","",0,"","plebeian.png");
addPerson("VOLU2195","Publius Volumnius","",-56,"","plebeian.png");
addPerson("RABI1912","Gaius Rabirius","",0,"","plebeian.png");
addPerson("ANNI3140","Quintus Annius Chilo","",0,"","plebeian.png");
addPerson("CORN3164","Publius Cornelius Sulla","",0,"","plebeian.png");
addPerson("CORN3165","Gaius Cornelius Cethegus","",-63,"True","plebeian.png");
addPerson("CORN3166","? Cornelius Cethegus","",0,"","plebeian.png");
addPerson("CORN3177","Servius Cornelius Sulla","",0,"","plebeian.png");
addPerson("FULV3185","Aulus Fulvius","",0,"","plebeian.png");
addPerson("PORC3244","Marcus Porcius Laeca","",0,"","plebeian.png");
addPerson("SAEN3260","Lucius Saenius","",0,"","plebeian.png");
addPerson("TERE3270","Gnaeus Terentius","",0,"","plebeian.png");
addPerson("CORN3440","? Cornificius","",0,"","plebeian.png");
addPerson("LICI3797","Gaius Licinius Sacerdos","",0,"","plebeian.png");
addPerson("PLOT2315","Gaius Plotius","",0,"","plebeian.png");
addPerson("ALBA3142","Gaius Albanius","",0,"","plebeian.png");
addPerson("AMNA3320","? Amnaeus","",-50,"","plebeian.png");
addPerson("OPPI3230","Gnaeus Oppius Cornicinus","",0,"","plebeian.png");
addPerson("ANNA3321","Lucius Annalius","",0,"","plebeian.png");
addPerson("TANU3851","? Tanusius Geminus","",0,"","plebeian.png");
addPerson("APPU3154","Gnaeus (Appuleius) Saturninus","",0,"","plebeian.png");
addPerson("IUVE3587","Marcus Iuventius Laterensis","",-54,"","plebeian.png");
addPerson("CORN3180","Lucius Cornificius","",0,"","plebeian.png");
addPerson("TEID3273","Sextus Teidius","",0,"","plebeian.png");
addPerson("VIBI3280","Gaius Vibienus","",-52,"True","plebeian.png");
addPerson("CORN3441","Publius Cornificius","",0,"","plebeian.png");
addPerson("VOLU4619","Lucius Volumnius","",25,"","plebeian.png");
addPerson("RUBR3247","Lucius Rubrius","",25,"","plebeian.png");
addPerson("CURT3442","Gaius Curtius","",25,"","plebeian.png");
addPerson("LICI3795","? Licinius Lenticulus (or Denticula)","",-25,"","plebeian.png");
addPerson("ANON3805","? - Licinus","",25,"","plebeian.png");
addPerson("SULP3671","Servius Sulpicius","",25,"","plebeian.png");
addPerson("TUTI3263","? Tuticanus Gallus","",25,"","plebeian.png");
addPerson("TITI3857","? Titius","",25,"","plebeian.png");
addPerson("CALP3171","Quintus Calpenus","",25,"","plebeian.png");
addPerson("PLAE3232","? Plaetorius Rustianus (or Cestianus)","",-49,"","plebeian.png");
addPerson("FULV3696","? Fulvius Sepinus","",25,"","plebeian.png");
addPerson("FURI3697","? Furius Leptinus","",25,"","plebeian.png");
addPerson("AQUI2618","Marcus Aquinus","",-30,"True","plebeian.png");
addPerson("PUBL3802","? Publilius","",25,"","plebeian.png");
addPerson("VALG3264","? Valgius","",25,"","plebeian.png");
addPerson("POMP3787","Gnaeus Pomp- Rufus","",25,"","plebeian.png");
addPerson("OCTA5122","Gaius Octavius","",-30,"True","plebeian.png");
addPerson("SEXT5126","? Sextius Naso","",-30,"","plebeian.png");
addPerson("PATI2578","Quintus Patisius","",-30,"True","plebeian.png");
addPerson("PATI2728","Quintus Patiscus","",-30,"True","plebeian.png");
addPerson("ANTI2778","Pacuvius Antistius Labeo","",-42,"True","plebeian.png");
addPerson("SERV2686","? (Servilius) Casca","",-42,"","plebeian.png");
addPerson("ANIC3143","Gaius Anicius","",25,"","plebeian.png");
addPerson("CAEC3150","? Caecilius Bucilianus","",-25,"","plebeian.png");
addPerson("ERUC3181","Lucius Erucius","",25,"","plebeian.png");
addPerson("FLAV3186","? Flavius","",25,"","plebeian.png");
addPerson("GELL3191","Marcus Gellius","",25,"","plebeian.png");
addPerson("PLAU3233","Publius Plautius","",25,"","plebeian.png");
addPerson("QUIN3243","Marcus Quintius Plancinus","",25,"","plebeian.png");
addPerson("POPI3246","? Popillius Laenas","",25,"","plebeian.png");
addPerson("SERR3250","Publius Serrius","",25,"","plebeian.png");
addPerson("CAEC3310","? Caecilius","",-30,"","plebeian.png");
addPerson("ASEL3327","Marcus Asellius","",25,"","plebeian.png");
addPerson("OCTA3758","Gaius Octavius Balbus","",-41,"True","plebeian.png");
addPerson("PETR3772","? Petronius","",-42,"True","plebeian.png");
addPerson("RUBR3831","? Rubrius Ruga","",-30,"","plebeian.png");
addPerson("SPUR4607","Marcus Spurius","",-30,"","plebeian.png");
addPerson("STAT4608","? Statilius","",25,"","plebeian.png");
addPerson("AEMI5108","? Aemilius (Lepidus or Scaurus)","",-43,"True","plebeian.png");
addPerson("LABI5110","? Labienus","",-43,"True","plebeian.png");
addPerson("LIGA5111","? Ligarius","",-41,"True","plebeian.png");
addPerson("LIGA5147","Gaius Ligarius","",-41,"True","plebeian.png");
addPerson("ACIL5113","? Acilius","",25,"","plebeian.png");
addPerson("ANTI5114","? Antius","",25,"","plebeian.png");
addPerson("ANON4695","?  Arrianus","",25,"","plebeian.png");
addPerson("CANI5116","? Caninius Rebilus","",25,"","plebeian.png");
addPerson("LUCI5120","? Lucilius","",25,"","plebeian.png");
addPerson("POMP5123","? Pompeius","",25,"","plebeian.png");
addPerson("POMP5125","? Pomponius","",25,"","plebeian.png");
addPerson("VENT5129","? Ventidius","",25,"","plebeian.png");
addPerson("VETU4701","? Vetulinus Vetulinus","",-41,"True","plebeian.png");
addPerson("VOLU5130","Publius Volumnius","",25,"","plebeian.png");
addPerson("MARC4921","? Marcius Rex","",25,"","plebeian.png");
addPerson("POMP2254","Sextus Pompeius Magnus Pius","",-35,"True","plebeian.png");
addPerson("LIGA2506","Quintus Ligarius","",-30,"","plebeian.png");
addPerson("LUCR2560","Quintus Lucretius Vespillo","",0,"","plebeian.png");
addPerson("NASI2562","Lucius Nasidius","",25,"","plebeian.png");
addPerson("CAES2701","? Caesennius Lento","",-41,"True","plebeian.png");
addPerson("AEMI2726","Publius Aemilius Lepidus","True",25,"","romanaristocrat.png");
addPerson("CASS2742","Lucius Cassius Longinus","",-42,"True","plebeian.png");
addPerson("LOLL2749","Marcus Lollius Paullinus","",-2,"","plebeian.png");
addPerson("PORC2754","Marcus Porcius Cato","",-42,"True","plebeian.png");
addPerson("LABI2777","Quintus Labienus Parthicus","",-39,"True","plebeian.png");
addPerson("VENT2791","? Ventidius","",-42,"True","plebeian.png");
addPerson("TISI2815","? Tisienus (or Titisienus) Gallus","",25,"","plebeian.png");
addPerson("LICI2860","Marcus Licinius Crassus","",-25,"","plebeian.png");
addPerson("ARRU2918","Lucius Arruntius","",0,"","plebeian.png");
addPerson("CAEC2949","? Caecilius Metellus","",25,"","plebeian.png");
addPerson("CAEC3421","? Caecilius Metellus","",25,"","plebeian.png");
addPerson("HOSI3501","Gaius Hosidius Geta","",25,"","plebeian.png");
addPerson("OPPI3896","Marcus Oppius","",25,"","plebeian.png");
addPerson("AEMI3935","Marcus Aemilius Scaurus","",25,"","plebeian.png");
addPerson("OCTA4346","? Octavius Balbus","",-41,"True","plebeian.png");
addPerson("EGNA4691","? Egnatius","",-41,"True","plebeian.png");
addPerson("EGNA4692","? Egnatius","",-41,"True","plebeian.png");
addPerson("ASIN3156","? Asinius","",25,"","plebeian.png");
addPerson("DECI3183","Publius Decius","",-43,"True","plebeian.png");
addPerson("NONI3213","? Nonius","",25,"","plebeian.png");
addPerson("QUIN3242","Lucius Quinctius","",-40,"True","plebeian.png");
addPerson("SILI3262","Publius Silicius Corona","",-43,"True","plebeian.png");
addPerson("VELL3268","? Velleius Capito","",25,"","plebeian.png");
addPerson("AUFU3311","Gaius Aufustius","",-43,"","plebeian.png");
addPerson("ALBE3315","Sextus Albedius","",25,"","plebeian.png");
addPerson("CAES3339","Publius Caesetius Rufus","",-43,"True","plebeian.png");
addPerson("ANON3426","? - Cillo (or Chilo?)","",-43,"True","plebeian.png");
addPerson("DOMI3446","? Domitius Apulus","",25,"","plebeian.png");
addPerson("HATE3702","? Haterius","",-41,"True","plebeian.png");
addPerson("HELV3703","? Helvius Blasio","",-43,"True","plebeian.png");
addPerson("HIRT3706","? Hirtius","",25,"","plebeian.png");
addPerson("HOST2684","Lucius Hostilius Saserna","",25,"","plebeian.png");
addPerson("IULI3742","? Iulius Saturninus","",25,"","plebeian.png");
addPerson("SERG4602","? Sergius","",25,"","plebeian.png");
addPerson("SULP4461","Servius Sulpicius Rufus","",25,"","plebeian.png");
addPerson("FLAV3468","Gaius Flavius","",-40,"True","plebeian.png");
addPerson("CORN3785","Publius Cornelius Sulla","True",25,"","romanaristocrat.png");
addPerson("AEMI2931","Quintus Aemilius Lepidus","True",0,"","romanaristocrat.png");
addPerson("ANON3276","Marcus  Pallacinus","",25,"","plebeian.png");
addPerson("AELI3292","Lucius Aelius Capito","",25,"","plebeian.png");
addPerson("GEMI3701","Gaius Geminius","",25,"","plebeian.png");
addPerson("LICI3750","Titus Licinius","",25,"","plebeian.png");
addPerson("LICI3804","Titus (Li)cinius Turannus","",25,"","plebeian.png");
addPerson("SEDI3821","Gnaeus Sedius","",25,"","plebeian.png");
addPerson("SERG4604","Lucius Sergius Plautus","",25,"","plebeian.png");
addPerson("TILL3855","? Tillius","",25,"","plebeian.png");
addPerson("PRIS3800","? Priscus","",25,"","plebeian.png");
addPerson("AELI3304","Quintus Aelius Tubero","",25,"","plebeian.png");
addPerson("TERE3853","? Terentius Varro","",25,"","plebeian.png");
addPerson("POST3245","Quintus Postumius","",-31,"True","plebeian.png");
addPerson("AELI3302","? (Aelius) Marullinus","",25,"","plebeian.png");
addPerson("ARTI3330","? Articuleius Paetus","",25,"","plebeian.png");
addPerson("CLAU3430","Appius Claudius Pulcher","",-25,"","plebeian.png");
addPerson("EGNA3448","? Egnatius Vale(rianus)","",25,"","plebeian.png");
addPerson("FLAV3470","Publius (Flavius?) Silva","",25,"","plebeian.png");
addPerson("OVIN3763","Quintus Ovinius","",-31,"True","plebeian.png");
addPerson("PAPI3769","Gaius Papirius Carbo","",25,"","plebeian.png");
addPerson("PAPI3771","Gaius Papirius Maso","",25,"","plebeian.png");
addPerson("CORN3781","Publius Cornelius Lentulus Marcellinus","",25,"","plebeian.png");
addPerson("LICI3796","? Licinius Regulus","",25,"","plebeian.png");
addPerson("LICI3803","Lucius Licinius Stolo","",25,"","plebeian.png");
addPerson("SEIU3820","Lucius Seius","",25,"","plebeian.png");
addPerson("THOR3854","? Thorius Flaccus","",25,"","plebeian.png");
addPerson("SEPT4601","Titus Septimius Sabinus","",25,"","plebeian.png");
addPerson("STAT4609","Quintus Statilius","",25,"","plebeian.png");
addPerson("MUCI1604","Quintus Mucius","",-75,"","tribuneplebs.png");
addPerson("MINU1605","Quintus Minucius","",-75,"","tribuneplebs.png");
addPerson("MUMM1606","Quintus Mummius","",-75,"","tribuneplebs.png");
addPerson("FURI0193","Quintus Furius (Pacilus) (Fusus)","True",-375,"","PontifexMaximus.png");
addPerson("CORN5169","Aulus Cornelius Cossus","True",-375,"","PontifexMaximus.png");
addPerson("MINU0290","Spurius Minucius","",-350,"","PontifexMaximus.png");
addPerson("CORN0621","Gnaeus Cornelius Barbatus Barbatus","True",-250,"","PontifexMaximus.png");
addPerson("CORN0555","Publius Cornelius Calussa","True",-254,"","PontifexMaximus.png");
addPerson("APPU3095","? Appuleius","",25,"","plebeian.png");
addPerson("STER1086","Lucius Stertinius","",-175,"","plebeian.png");
addPerson("LICI3102","Publius Licinius","",25,"","plebeian.png");
addPerson("AURE3334","Lucius Aurelius Cotta or Orestes","",-50,"","plebeian.png");
addPerson("SEMP3104","Marcus (Sempronius) (Rutilus)","",50,"","plebeian.png");
addPerson("ANON3105","Publius -nius","",-25,"","plebeian.png");
addPerson("CURI2641","? Curius","",25,"","plebeian.png");
addPerson("CORN2774","Quintus Cornucius","",-46,"True","plebeian.png");
addPerson("CLOD3097","Gaius Clodius Vestalis","",25,"","plebeian.png");
addPerson("OPPI2916","Quintus Oppius","",25,"","plebeian.png");
addPerson("OCTA3757","Titus Octavius","",25,"","plebeian.png");





addOffice("Aedile","POMP2992",-509,-509);
addOffice("Aedile","ANON2994",-509,-509);
addOffice("Aedile","POPI0491",-357,-357);
addOffice("Aedile","COND2987",-300,-300);
addOffice("Aedile","MIND2989",-300,-300);
addOffice("Aedile","APRO0706",-267,-267);
addOffice("Aedile","PUBL0770",-238,-238);
addOffice("Aedile","PUBL0771",-238,-238);
addOffice("Aedile","CAEC1424",-152,-152);
addOffice("Aedile","REMM1830",-120,-120);
addOffice("Aedile","IUNI1638",-119,-119);
addOffice("Aedile","IUNI1638",-118,-118);
addOffice("Aedile","LICI1780",-102,-102);
addOffice("Aedile","MARC1764",-97,-97);
addOffice("Aedile","SENT1829",-97,-97);
addOffice("Aedile","GELL1822",-96,-96);
addOffice("Aedile","LIVI1756",-94,-94);
addOffice("Aedile","REMM1830",-94,-94);
addOffice("Aedile","CAEC1875",-88,-88);
addOffice("Aedile","ANTI1932",-86,-86);
addOffice("Aedile","LUTA1949",-84,-84);
addOffice("Aedile","AURE1866",-82,-82);
addOffice("Aedile","SCRI1876",-82,-82);
addOffice("Aedile","AUFI2032",-79,-79);
addOffice("Aedile","LICI1981",-76,-76);
addOffice("Aedile","HORT1902",-75,-75);
addOffice("Aedile","IUNI2068",-75,-75);
addOffice("Aedile","VOLU2125",-74,-74);
addOffice("Aedile","LART2126",-74,-74);
addOffice("Aedile","ANNA2127",-74,-74);
addOffice("Aedile","CURT2152",-71,-71);
addOffice("Aedile","IUNI2120",-70,-70);
addOffice("Aedile","CALP2305",-59,-59);
addOffice("Aedile","MARC2389",-58,-58);
addOffice("Aedile","CAEC2347",-57,-57);
addOffice("Aedile","FAVO2352",-53,-53);
addOffice("Aedile","FAVO2352",-52,-52);
addOffice("Aedile","AMPU2979",-50,-50);
addOffice("Aedile","APPU2941",-50,-50);
addOffice("Aedile","FRUT2955",-50,-50);
addOffice("Aedile","VIBI2495",-48,-48);
addOffice("Aedile","APPU3145",-45,-45);
addOffice("Aedile","CAEL2673",-44,-44);
addOffice("Aedile","CRIT2674",-44,-44);
addOffice("Aedile","VARI2675",-44,-44);
addOffice("Aedile","VOLU2715",-43,-43);
addOffice("Aedile","VILL2768",-42,-42);
addOffice("Aedile","ATTI2980",-40,-40);
addOffice("Aedile","CLOE2991",-40,-40);
addOffice("Aedile","OPPI2859",-37,-37);
addOffice("Aedile","VIPS2808",-33,-33);
addOffice("Censor","PAPI0212",-443,-442);
addOffice("Censor","SEMP0213",-443,-442);
addOffice("Censor","FURI0219",-435,-434);
addOffice("Censor","GEGA0199",-435,-434);
addOffice("Censor","PAPI0262",-430,-429);
addOffice("Censor","PINA0263",-430,-429);
addOffice("Censor","PAPI0267",-418,-417);
addOffice("Censor","FURI0340",-403,-402);
addOffice("Censor","POST0341",-403,-402);
addOffice("Censor","POST3798",-403,-402);
addOffice("Censor","PAPI0389",-393,-392);
addOffice("Censor","IULI0325",-393,-392);
addOffice("Censor","FURI0338",-389,-388);
addOffice("Censor","PAPI0409",-389,-388);
addOffice("Censor","SULP0449",-380,-379);
addOffice("Censor","POST0382",-380,-379);
addOffice("Censor","SERV0461",-378,-377);
addOffice("Censor","CLOE0462",-378,-377);
addOffice("Censor","POST0485",-366,-365);
addOffice("Censor","SULP0445",-366,-365);
addOffice("Censor","POST0485",-365,-364);
addOffice("Censor","SULP0445",-365,-364);
addOffice("Censor","FABI0444",-363,-362);
addOffice("Censor","FURI0443",-363,-362);
addOffice("Censor","MARC0505",-351,-350);
addOffice("Censor","MANL0500",-351,-350);
addOffice("Censor","CORN0513",-340,-339);
addOffice("Censor","CORN0519",-340,-339);
addOffice("Censor","PUBL0517",-332,-331);
addOffice("Censor","POST0548",-332,-331);
addOffice("Censor","SULP0541",-319,-318);
addOffice("Censor","PAPI0585",-318,-317);
addOffice("Censor","MAEN0540",-318,-317);
addOffice("Censor","CLAU0591",-312,-309);
addOffice("Censor","PLAU0597",-312,-309);
addOffice("Censor","VALE0570",-307,-306);
addOffice("Censor","IUNI0587",-307,-306);
addOffice("Censor","FABI0559",-304,-303);
addOffice("Censor","DECI0596",-304,-303);
addOffice("Censor","SEMP0603",-300,-299);
addOffice("Censor","SULP0617",-300,-299);
addOffice("Censor","CORN0611",-294,-293);
addOffice("Censor","MARC0601",-294,-293);
addOffice("Censor","CARV0649",-289,-288);
addOffice("Censor","FABI0642",-289,-288);
addOffice("Censor","CAED0660",-283,-282);
addOffice("Censor","CORN0628",-280,-279);
addOffice("Censor","DOMI0638",-280,-279);
addOffice("Censor","FABR0675",-275,-274);
addOffice("Censor","AEMI0676",-275,-274);
addOffice("Censor","PAPI0695",-272,-271);
addOffice("Censor","CURI0641",-272,-271);
addOffice("Censor","MARC0681",-269,-268);
addOffice("Censor","AEMI0680",-269,-268);
addOffice("Censor","MARC0601",-265,-264);
addOffice("Censor","DUIL0724",-258,-257);
addOffice("Censor","CORN0722",-258,-257);
addOffice("Censor","CORN0698",-257,-256);
addOffice("Censor","IUNI0707",-253,-252);
addOffice("Censor","POST0718",-253,-252);
addOffice("Censor","VALE0716",-252,-251);
addOffice("Censor","SEMP0701",-252,-251);
addOffice("Censor","ATIL0727",-247,-246);
addOffice("Censor","MANL0758",-247,-246);
addOffice("Censor","AURE0746",-241,-240);
addOffice("Censor","FABI0762",-241,-240);
addOffice("Censor","CORN0780",-236,-235);
addOffice("Censor","LUTA0768",-236,-235);
addOffice("Censor","ATIL0763",-234,-233);
addOffice("Censor","POST0766",-234,-233);
addOffice("Censor","MANL0787",-231,-230);
addOffice("Censor","FULV0781",-231,-230);
addOffice("Censor","FABI0712",-230,-229);
addOffice("Censor","SEMP0777",-230,-229);
addOffice("Censor","CLAU0776",-225,-224);
addOffice("Censor","IUNI0797",-225,-224);
addOffice("Censor","AEMI0812",-220,-219);
addOffice("Censor","FLAM0793",-220,-219);
addOffice("Censor","ATIL0806",-214,-213);
addOffice("Censor","FURI0814",-214,-213);
addOffice("Censor","VETU0824",-210,-209);
addOffice("Censor","LICI0926",-210,-209);
addOffice("Censor","SEMP0882",-209,-208);
addOffice("Censor","CORN0815",-209,-208);
addOffice("Censor","LIVI0827",-204,-203);
addOffice("Censor","CLAU0908",-204,-203);
addOffice("Censor","CORN0878",-199,-199);
addOffice("Censor","AELI1006",-199,-199);
addOffice("Censor","AELI1074",-194,-194);
addOffice("Censor","CORN1065",-194,-194);
addOffice("Censor","QUIN0999",-189,-189);
addOffice("Censor","CLAU0997",-189,-189);
addOffice("Censor","VALE0930",-184,-184);
addOffice("Censor","PORC0907",-184,-184);
addOffice("Censor","AEMI1067",-179,-179);
addOffice("Censor","FULV1109",-179,-179);
addOffice("Censor","FULV1242",-174,-174);
addOffice("Censor","POST1172",-174,-174);
addOffice("Censor","CLAU1125",-169,-169);
addOffice("Censor","SEMP1182",-169,-169);
addOffice("Censor","AEMI1134",-164,-164);
addOffice("Censor","MARC1205",-164,-164);
addOffice("Censor","CORN1396",-159,-159);
addOffice("Censor","POPI1283",-159,-159);
addOffice("Censor","VALE1460",-154,-154);
addOffice("Censor","CASS1304",-154,-154);
addOffice("Censor","CORN1465",-147,-147);
addOffice("Censor","MARC1475",-147,-147);
addOffice("Censor","CORN1504",-142,-142);
addOffice("Censor","MUMM1495",-142,-142);
addOffice("Censor","CLAU1452",-136,-136);
addOffice("Censor","FULV1248",-136,-136);
addOffice("Censor","CAEC1424",-131,-131);
addOffice("Censor","POMP1551",-131,-131);
addOffice("Censor","SERV1552",-125,-125);
addOffice("Censor","CASS1583",-125,-125);
addOffice("Censor","SERV1552",-124,-124);
addOffice("Censor","CASS1583",-124,-124);
addOffice("Censor","CAEC1635",-120,-120);
addOffice("Censor","CALP1510",-120,-120);
addOffice("Censor","DOMI1630",-115,-115);
addOffice("Censor","CAEC1665",-115,-115);
addOffice("Censor","AEMI1645",-109,-109);
addOffice("Censor","LIVI1651",-109,-109);
addOffice("Censor","FABI1615",-108,-108);
addOffice("Censor","LICI1674",-108,-108);
addOffice("Censor","CAEC1693",-102,-102);
addOffice("Censor","CAEC1701",-102,-102);
addOffice("Censor","VALE1815",-97,-97);
addOffice("Censor","ANTO1705",-97,-97);
addOffice("Censor","DOMI1763",-92,-92);
addOffice("Censor","LICI1679",-92,-92);
addOffice("Censor","LICI1780",-89,-89);
addOffice("Censor","IULI1825",-89,-89);
addOffice("Censor","CORN2064",-70,-70);
addOffice("Censor","GELL1822",-70,-70);
addOffice("Censor","LUTA1949",-65,-65);
addOffice("Censor","LICI1981",-65,-65);
addOffice("Censor","AURE2163",-64,-64);
addOffice("Censor","AEMI1865",-64,-64);
addOffice("Censor","IULI2044",-61,-61);
addOffice("Censor","ACIL2119",-61,-61);
addOffice("Censor","VALE2107",-55,-55);
addOffice("Censor","SERV1814",-55,-55);
addOffice("Censor","CLAU2140",-50,-50);
addOffice("Censor","CALP2168",-50,-50);
addOffice("Censor","ANTO1969",-42,-42);
addOffice("Censor","SULP2430",-42,-42);
addOffice("Consul","IUNI0001",-509,-509);
addOffice("Consul","TARQ0002",-509,-509);
addOffice("Consul","VALE0003",-508,-508);
addOffice("Consul","LUCR0010",-508,-508);
addOffice("Consul","VALE0003",-507,-507);
addOffice("Consul","HORA0005",-507,-507);
addOffice("Consul","LARC0012",-506,-506);
addOffice("Consul","HERM0011",-506,-506);
addOffice("Consul","LUCR0014",-506,-506);
addOffice("Consul","VALE0003",-506,-506);
addOffice("Consul","VALE0013",-505,-505);
addOffice("Consul","POST0015",-505,-505);
addOffice("Consul","VALE0003",-504,-504);
addOffice("Consul","LUCR0010",-504,-504);
addOffice("Consul","MENE0018",-503,-503);
addOffice("Consul","POST0015",-503,-503);
addOffice("Consul","VERG0019",-502,-502);
addOffice("Consul","CASS0020",-502,-502);
addOffice("Consul","COMI0021",-501,-501);
addOffice("Consul","LARC0017",-501,-501);
addOffice("Consul","SULP0023",-500,-500);
addOffice("Consul","TULL0024",-500,-500);
addOffice("Consul","AEBU0025",-499,-499);
addOffice("Consul","VETU0007",-499,-499);
addOffice("Consul","CLOE0029",-498,-498);
addOffice("Consul","LARC0017",-498,-498);
addOffice("Consul","SEMP0028",-497,-497);
addOffice("Consul","MINU0030",-497,-497);
addOffice("Consul","POST0027",-496,-496);
addOffice("Consul","VERG0031",-496,-496);
addOffice("Consul","CLAU0032",-495,-495);
addOffice("Consul","SERV0033",-495,-495);
addOffice("Consul","VERG0035",-494,-494);
addOffice("Consul","VETU0036",-494,-494);
addOffice("Consul","COMI0021",-493,-493);
addOffice("Consul","CASS0020",-493,-493);
addOffice("Consul","GEGA0048",-492,-492);
addOffice("Consul","MINU0049",-492,-492);
addOffice("Consul","MINU0030",-491,-491);
addOffice("Consul","SEMP0028",-491,-491);
addOffice("Consul","SULP0055",-490,-490);
addOffice("Consul","LARC0012",-490,-490);
addOffice("Consul","IULI0056",-489,-489);
addOffice("Consul","PINA0057",-489,-489);
addOffice("Consul","NAUT0058",-488,-488);
addOffice("Consul","FURI0059",-488,-488);
addOffice("Consul","SICI0061",-487,-487);
addOffice("Consul","AQUI0062",-487,-487);
addOffice("Consul","CASS0020",-486,-486);
addOffice("Consul","VERG0063",-486,-486);
addOffice("Consul","CORN0076",-485,-485);
addOffice("Consul","FABI0077",-485,-485);
addOffice("Consul","AEMI0080",-484,-484);
addOffice("Consul","FABI0078",-484,-484);
addOffice("Consul","FABI0082",-483,-483);
addOffice("Consul","VALE0079",-483,-483);
addOffice("Consul","FABI0077",-482,-482);
addOffice("Consul","IULI0085",-482,-482);
addOffice("Consul","FABI0078",-481,-481);
addOffice("Consul","FURI0086",-481,-481);
addOffice("Consul","FABI0082",-480,-480);
addOffice("Consul","MANL0088",-480,-480);
addOffice("Consul","FABI0078",-479,-479);
addOffice("Consul","VERG0091",-479,-479);
addOffice("Consul","AEMI0080",-478,-478);
addOffice("Consul","SERV0092",-478,-478);
addOffice("Consul","MENE0096",-477,-477);
addOffice("Consul","HORA0165",-477,-477);
addOffice("Consul","VERG0097",-476,-476);
addOffice("Consul","SERV0098",-476,-476);
addOffice("Consul","VALE0051",-475,-475);
addOffice("Consul","NAUT0101",-475,-475);
addOffice("Consul","FURI0104",-474,-474);
addOffice("Consul","MANL0105",-474,-474);
addOffice("Consul","AEMI0080",-473,-473);
addOffice("Consul","IULI0106",-473,-473);
addOffice("Consul","VERG0107",-473,-473);
addOffice("Consul","PINA0109",-472,-472);
addOffice("Consul","FURI0110",-472,-472);
addOffice("Consul","CLAU0113",-471,-471);
addOffice("Consul","QUIN0114",-471,-471);
addOffice("Consul","VALE0079",-470,-470);
addOffice("Consul","AEMI0116",-470,-470);
addOffice("Consul","NUMI0121",-469,-469);
addOffice("Consul","VERG0122",-469,-469);
addOffice("Consul","QUIN0114",-468,-468);
addOffice("Consul","SERV0123",-468,-468);
addOffice("Consul","AEMI0116",-467,-467);
addOffice("Consul","FABI0124",-467,-467);
addOffice("Consul","SERV0123",-466,-466);
addOffice("Consul","POST0125",-466,-466);
addOffice("Consul","FABI0124",-465,-465);
addOffice("Consul","QUIN0114",-465,-465);
addOffice("Consul","POST0126",-464,-464);
addOffice("Consul","FURI0127",-464,-464);
addOffice("Consul","SERV0129",-463,-463);
addOffice("Consul","AEBU0130",-463,-463);
addOffice("Consul","LUCR0133",-462,-462);
addOffice("Consul","VETU0134",-462,-462);
addOffice("Consul","VOLU0137",-461,-461);
addOffice("Consul","SULP0138",-461,-461);
addOffice("Consul","VALE0051",-460,-460);
addOffice("Consul","CLAU0141",-460,-460);
addOffice("Consul","FABI0124",-459,-459);
addOffice("Consul","CORN0143",-459,-459);
addOffice("Consul","NAUT0101",-458,-458);
addOffice("Consul","FURI0146",-458,-458);
addOffice("Consul","HORA0165",-457,-457);
addOffice("Consul","MINU0151",-457,-457);
addOffice("Consul","QUIN0142",-457,-457);
addOffice("Consul","FABI0152",-457,-457);
addOffice("Consul","VALE0149",-456,-456);
addOffice("Consul","VERG0153",-456,-456);
addOffice("Consul","ROMI0156",-455,-455);
addOffice("Consul","VETU0157",-455,-455);
addOffice("Consul","TARP0158",-454,-454);
addOffice("Consul","ATER0159",-454,-454);
addOffice("Consul","QUIN0163",-453,-453);
addOffice("Consul","CURI0164",-453,-453);
addOffice("Consul","MENE0166",-452,-452);
addOffice("Consul","SEST0172",-452,-452);
addOffice("Consul","CLAU0113",-451,-451);
addOffice("Consul","GENU0168",-451,-451);
addOffice("Consul","VALE0180",-449,-449);
addOffice("Consul","HORA0181",-449,-449);
addOffice("Consul","HERM0195",-448,-448);
addOffice("Consul","VERG0196",-448,-448);
addOffice("Consul","GEGA0199",-447,-447);
addOffice("Consul","IULI0200",-447,-447);
addOffice("Consul","QUIN0114",-446,-446);
addOffice("Consul","FURI0201",-446,-446);
addOffice("Consul","GENU0205",-445,-445);
addOffice("Consul","CURT0206",-445,-445);
addOffice("Consul","GEGA0199",-443,-443);
addOffice("Consul","QUIN0114",-443,-443);
addOffice("Consul","FABI0214",-442,-442);
addOffice("Consul","AEBU0215",-442,-442);
addOffice("Consul","FURI0219",-441,-441);
addOffice("Consul","PAPI0220",-441,-441);
addOffice("Consul","GEGA0222",-440,-440);
addOffice("Consul","MENE0166",-440,-440);
addOffice("Consul","MENE0223",-440,-440);
addOffice("Consul","MENE0292",-439,-439);
addOffice("Consul","QUIN0114",-439,-439);
addOffice("Consul","GEGA0199",-437,-437);
addOffice("Consul","SERG0237",-437,-437);
addOffice("Consul","PAPI0240",-436,-436);
addOffice("Consul","CORN0241",-436,-436);
addOffice("Consul","IULI0200",-435,-435);
addOffice("Consul","VERG0243",-435,-435);
addOffice("Consul","VERG3285",-435,-435);
addOffice("Consul","IULI0200",-434,-434);
addOffice("Consul","VERG0243",-434,-434);
addOffice("Consul","MANL0245",-434,-434);
addOffice("Consul","SULP0246",-434,-434);
addOffice("Consul","VERG3285",-434,-434);
addOffice("Consul","QUIN0254",-431,-431);
addOffice("Consul","IULI0255",-431,-431);
addOffice("Consul","PAPI0260",-430,-430);
addOffice("Consul","IULI0261",-430,-430);
addOffice("Consul","PAPI0240",-430,-430);
addOffice("Consul","LUCR0264",-429,-429);
addOffice("Consul","SERG0237",-429,-429);
addOffice("Consul","CORN0239",-428,-428);
addOffice("Consul","QUIN0254",-428,-428);
addOffice("Consul","QUIN0231",-428,-428);
addOffice("Consul","SEMP0269",-428,-428);
addOffice("Consul","SERV0266",-427,-427);
addOffice("Consul","PAPI0267",-427,-427);
addOffice("Consul","FABI0275",-423,-423);
addOffice("Consul","SEMP0274",-423,-423);
addOffice("Consul","FABI0311",-423,-423);
addOffice("Consul","FABI0329",-421,-421);
addOffice("Consul","QUIN0285",-421,-421);
addOffice("Consul","CORN0310",-413,-413);
addOffice("Consul","FURI0252",-413,-413);
addOffice("Consul","FABI0311",-412,-412);
addOffice("Consul","FABI0275",-412,-412);
addOffice("Consul","FURI0312",-412,-412);
addOffice("Consul","PAPI0314",-411,-411);
addOffice("Consul","NAUT0294",-411,-411);
addOffice("Consul","AEMI0316",-410,-410);
addOffice("Consul","VALE0301",-410,-410);
addOffice("Consul","CORN0305",-409,-409);
addOffice("Consul","FURI0252",-409,-409);
addOffice("Consul","VALE0306",-393,-393);
addOffice("Consul","CORN0373",-393,-393);
addOffice("Consul","CORN0426",-393,-393);
addOffice("Consul","VALE0306",-392,-392);
addOffice("Consul","MANL0391",-392,-392);
addOffice("Consul","AEMI0484",-366,-366);
addOffice("Consul","SEXT0469",-366,-366);
addOffice("Consul","GENU0489",-365,-365);
addOffice("Consul","SERV0490",-365,-365);
addOffice("Consul","SULP0445",-364,-364);
addOffice("Consul","LICI0468",-364,-364);
addOffice("Consul","LICI0481",-364,-364);
addOffice("Consul","GENU0492",-363,-363);
addOffice("Consul","AEMI0484",-363,-363);
addOffice("Consul","SERV0490",-362,-362);
addOffice("Consul","GENU0489",-362,-362);
addOffice("Consul","LICI0468",-361,-361);
addOffice("Consul","LICI0481",-361,-361);
addOffice("Consul","SULP0445",-361,-361);
addOffice("Consul","FABI0498",-360,-360);
addOffice("Consul","POET0499",-360,-360);
addOffice("Consul","POPI0491",-359,-359);
addOffice("Consul","MANL0500",-359,-359);
addOffice("Consul","FABI0501",-358,-358);
addOffice("Consul","PLAU0502",-358,-358);
addOffice("Consul","MARC0505",-357,-357);
addOffice("Consul","MANL0500",-357,-357);
addOffice("Consul","FABI0498",-356,-356);
addOffice("Consul","POPI0491",-356,-356);
addOffice("Consul","SULP0445",-355,-355);
addOffice("Consul","VALE0503",-355,-355);
addOffice("Consul","FABI0498",-354,-354);
addOffice("Consul","QUIN0483",-354,-354);
addOffice("Consul","POPI0491",-354,-354);
addOffice("Consul","SULP0445",-353,-353);
addOffice("Consul","VALE0503",-353,-353);
addOffice("Consul","VALE0511",-352,-352);
addOffice("Consul","MARC0505",-352,-352);
addOffice("Consul","SULP0445",-351,-351);
addOffice("Consul","QUIN0483",-351,-351);
addOffice("Consul","POPI0491",-350,-350);
addOffice("Consul","CORN0513",-350,-350);
addOffice("Consul","FURI0414",-349,-349);
addOffice("Consul","CLAU0335",-349,-349);
addOffice("Consul","AEMI0520",-349,-349);
addOffice("Consul","QUIN0521",-349,-349);
addOffice("Consul","VALE0522",-348,-348);
addOffice("Consul","POPI0491",-348,-348);
addOffice("Consul","PLAU0523",-347,-347);
addOffice("Consul","MANL0497",-347,-347);
addOffice("Consul","VALE0522",-346,-346);
addOffice("Consul","POET0499",-346,-346);
addOffice("Consul","FABI0524",-345,-345);
addOffice("Consul","SULP0525",-345,-345);
addOffice("Consul","MARC0505",-344,-344);
addOffice("Consul","MANL0497",-344,-344);
addOffice("Consul","VALE0522",-343,-343);
addOffice("Consul","CORN0510",-343,-343);
addOffice("Consul","SERV0490",-342,-342);
addOffice("Consul","MARC0505",-342,-342);
addOffice("Consul","PLAU0523",-341,-341);
addOffice("Consul","AEMI0529",-341,-341);
addOffice("Consul","MANL0497",-340,-340);
addOffice("Consul","DECI0515",-340,-340);
addOffice("Consul","AEMI0538",-339,-339);
addOffice("Consul","PUBL0517",-339,-339);
addOffice("Consul","FURI0526",-338,-338);
addOffice("Consul","MAEN0540",-338,-338);
addOffice("Consul","SULP0541",-337,-337);
addOffice("Consul","AELI0542",-337,-337);
addOffice("Consul","PAPI0533",-336,-336);
addOffice("Consul","DUIL0546",-336,-336);
addOffice("Consul","ATIL0547",-335,-335);
addOffice("Consul","VALE0522",-335,-335);
addOffice("Consul","POST0548",-334,-334);
addOffice("Consul","VETU0549",-334,-334);
addOffice("Consul","DOMI0552",-332,-332);
addOffice("Consul","CORN0510",-332,-332);
addOffice("Consul","VALE0556",-331,-331);
addOffice("Consul","CLAU0557",-331,-331);
addOffice("Consul","PAPI0533",-330,-330);
addOffice("Consul","PLAU0560",-330,-330);
addOffice("Consul","AEMI0529",-329,-329);
addOffice("Consul","PLAU0561",-329,-329);
addOffice("Consul","PLAU0561",-328,-328);
addOffice("Consul","PLAU0562",-328,-328);
addOffice("Consul","CORN0563",-328,-328);
addOffice("Consul","CORN0612",-328,-328);
addOffice("Consul","POST0564",-328,-328);
addOffice("Consul","CORN0565",-327,-327);
addOffice("Consul","PUBL0517",-327,-327);
addOffice("Consul","POET0499",-326,-326);
addOffice("Consul","PAPI0534",-326,-326);
addOffice("Consul","FURI0526",-325,-325);
addOffice("Consul","IUNI0539",-325,-325);
addOffice("Consul","SULP0541",-323,-323);
addOffice("Consul","AULI0571",-323,-323);
addOffice("Consul","FABI0559",-322,-322);
addOffice("Consul","FULV0572",-322,-322);
addOffice("Consul","VETU0549",-321,-321);
addOffice("Consul","POST0548",-321,-321);
addOffice("Consul","PAPI0534",-320,-320);
addOffice("Consul","PUBL0517",-320,-320);
addOffice("Consul","PAPI0534",-319,-319);
addOffice("Consul","AULI0571",-319,-319);
addOffice("Consul","FOLI0579",-318,-318);
addOffice("Consul","PLAU0584",-318,-318);
addOffice("Consul","IUNI0587",-317,-317);
addOffice("Consul","AEMI0588",-317,-317);
addOffice("Consul","NAUT0589",-316,-316);
addOffice("Consul","POPI0590",-316,-316);
addOffice("Consul","PAPI0534",-315,-315);
addOffice("Consul","PUBL0517",-315,-315);
addOffice("Consul","POET0593",-314,-314);
addOffice("Consul","SULP0541",-314,-314);
addOffice("Consul","PAPI0534",-313,-313);
addOffice("Consul","IUNI0587",-313,-313);
addOffice("Consul","VALE0570",-312,-312);
addOffice("Consul","DECI0596",-312,-312);
addOffice("Consul","IUNI0587",-311,-311);
addOffice("Consul","AEMI0588",-311,-311);
addOffice("Consul","FABI0559",-310,-310);
addOffice("Consul","MARC0601",-310,-310);
addOffice("Consul","DECI0596",-308,-308);
addOffice("Consul","FABI0559",-308,-308);
addOffice("Consul","CLAU0591",-307,-307);
addOffice("Consul","VOLU0608",-307,-307);
addOffice("Consul","MARC0610",-306,-306);
addOffice("Consul","CORN0611",-306,-306);
addOffice("Consul","POST0609",-305,-305);
addOffice("Consul","MINU0614",-305,-305);
addOffice("Consul","SEMP0603",-304,-304);
addOffice("Consul","SULP0617",-304,-304);
addOffice("Consul","CORN0622",-303,-303);
addOffice("Consul","GENU0623",-303,-303);
addOffice("Consul","LIVI0624",-302,-302);
addOffice("Consul","AEMI0625",-302,-302);
addOffice("Consul","VALE0522",-300,-300);
addOffice("Consul","APPU0630",-300,-300);
addOffice("Consul","FULV0636",-299,-299);
addOffice("Consul","MANL0637",-299,-299);
addOffice("Consul","CORN0628",-298,-298);
addOffice("Consul","FULV0629",-298,-298);
addOffice("Consul","FABI0559",-297,-297);
addOffice("Consul","DECI0596",-297,-297);
addOffice("Consul","VOLU0608",-296,-296);
addOffice("Consul","CLAU0591",-296,-296);
addOffice("Consul","FABI0559",-295,-295);
addOffice("Consul","DECI0596",-295,-295);
addOffice("Consul","POST0609",-294,-294);
addOffice("Consul","ATIL0647",-294,-294);
addOffice("Consul","PAPI0640",-293,-293);
addOffice("Consul","CARV0649",-293,-293);
addOffice("Consul","FABI0642",-292,-292);
addOffice("Consul","IUNI0652",-292,-292);
addOffice("Consul","POST0609",-291,-291);
addOffice("Consul","IUNI0657",-291,-291);
addOffice("Consul","CORN0658",-290,-290);
addOffice("Consul","CURI0641",-290,-290);
addOffice("Consul","VALE0570",-289,-289);
addOffice("Consul","CAED0660",-289,-289);
addOffice("Consul","MARC0610",-288,-288);
addOffice("Consul","CORN0661",-288,-288);
addOffice("Consul","CLAU0662",-287,-287);
addOffice("Consul","NAUT0663",-287,-287);
addOffice("Consul","VALE0665",-286,-286);
addOffice("Consul","AELI0666",-286,-286);
addOffice("Consul","CLAU0668",-285,-285);
addOffice("Consul","AEMI0669",-285,-285);
addOffice("Consul","SERV0672",-284,-284);
addOffice("Consul","CAEC0673",-284,-284);
addOffice("Consul","CORN0674",-283,-283);
addOffice("Consul","DOMI0638",-283,-283);
addOffice("Consul","FABR0675",-282,-282);
addOffice("Consul","AEMI0676",-282,-282);
addOffice("Consul","AEMI0680",-281,-281);
addOffice("Consul","MARC0681",-281,-281);
addOffice("Consul","VALE0682",-280,-280);
addOffice("Consul","CORU0683",-280,-280);
addOffice("Consul","SULP0684",-279,-279);
addOffice("Consul","DECI0685",-279,-279);
addOffice("Consul","FABR0675",-278,-278);
addOffice("Consul","AEMI0676",-278,-278);
addOffice("Consul","CORN0658",-277,-277);
addOffice("Consul","IUNI0657",-277,-277);
addOffice("Consul","FABI0642",-276,-276);
addOffice("Consul","GENU0687",-276,-276);
addOffice("Consul","CURI0641",-275,-275);
addOffice("Consul","CORN0688",-275,-275);
addOffice("Consul","CURI0641",-274,-274);
addOffice("Consul","CORN0689",-274,-274);
addOffice("Consul","FABI0691",-273,-273);
addOffice("Consul","CLAU0668",-273,-273);
addOffice("Consul","PAPI0640",-272,-272);
addOffice("Consul","CARV0649",-272,-272);
addOffice("Consul","QUIN0696",-271,-271);
addOffice("Consul","GENU0697",-271,-271);
addOffice("Consul","GENU0687",-270,-270);
addOffice("Consul","OGUL0632",-269,-269);
addOffice("Consul","FABI0700",-269,-269);
addOffice("Consul","SEMP0701",-268,-268);
addOffice("Consul","CLAU0702",-268,-268);
addOffice("Consul","ATIL0703",-267,-267);
addOffice("Consul","IULI0704",-267,-267);
addOffice("Consul","IUNI0707",-266,-266);
addOffice("Consul","FABI0692",-266,-266);
addOffice("Consul","FABI0709",-265,-265);
addOffice("Consul","MAMI0710",-265,-265);
addOffice("Consul","CORN0698",-265,-265);
addOffice("Consul","FABI0642",-265,-265);
addOffice("Consul","CLAU0713",-264,-264);
addOffice("Consul","FULV0699",-264,-264);
addOffice("Consul","VALE0716",-263,-263);
addOffice("Consul","OTAC0759",-263,-263);
addOffice("Consul","POST0718",-262,-262);
addOffice("Consul","MAMI0719",-262,-262);
addOffice("Consul","VALE0720",-261,-261);
addOffice("Consul","OTAC0721",-261,-261);
addOffice("Consul","CORN0723",-260,-260);
addOffice("Consul","DUIL0724",-260,-260);
addOffice("Consul","CORN0722",-259,-259);
addOffice("Consul","AQUI0726",-259,-259);
addOffice("Consul","ATIL0727",-258,-258);
addOffice("Consul","SULP0728",-258,-258);
addOffice("Consul","ATIL0732",-257,-257);
addOffice("Consul","MANL0734",-256,-256);
addOffice("Consul","CAED0735",-256,-256);
addOffice("Consul","FULV0738",-255,-255);
addOffice("Consul","AEMI0739",-255,-255);
addOffice("Consul","CORN0723",-254,-254);
addOffice("Consul","ATIL0727",-254,-254);
addOffice("Consul","SERV0742",-253,-253);
addOffice("Consul","SEMP0743",-253,-253);
addOffice("Consul","AURE0746",-252,-252);
addOffice("Consul","SERV0747",-252,-252);
addOffice("Consul","CAEC0751",-251,-251);
addOffice("Consul","FURI0745",-251,-251);
addOffice("Consul","ATIL0732",-250,-250);
addOffice("Consul","MANL0734",-250,-250);
addOffice("Consul","CLAU0744",-249,-249);
addOffice("Consul","IUNI0753",-249,-249);
addOffice("Consul","AURE0746",-248,-248);
addOffice("Consul","SERV0747",-248,-248);
addOffice("Consul","CAEC0751",-247,-247);
addOffice("Consul","FABI0757",-247,-247);
addOffice("Consul","CORN0698",-247,-247);
addOffice("Consul","OTAC0759",-246,-246);
addOffice("Consul","FABI0760",-246,-246);
addOffice("Consul","FABI0762",-245,-245);
addOffice("Consul","ATIL0763",-245,-245);
addOffice("Consul","MANL0758",-244,-244);
addOffice("Consul","SEMP0743",-244,-244);
addOffice("Consul","FUND0755",-243,-243);
addOffice("Consul","SULP0764",-243,-243);
addOffice("Consul","LUTA0765",-242,-242);
addOffice("Consul","POST0766",-242,-242);
addOffice("Consul","MANL0758",-241,-241);
addOffice("Consul","LUTA0768",-241,-241);
addOffice("Consul","CLAU0776",-240,-240);
addOffice("Consul","SEMP0777",-240,-240);
addOffice("Consul","MAMI0778",-239,-239);
addOffice("Consul","VALE0767",-239,-239);
addOffice("Consul","SEMP0761",-238,-238);
addOffice("Consul","VALE0779",-238,-238);
addOffice("Consul","CORN0780",-237,-237);
addOffice("Consul","FULV0781",-237,-237);
addOffice("Consul","CORN0782",-236,-236);
addOffice("Consul","LICI0783",-236,-236);
addOffice("Consul","MANL0787",-235,-235);
addOffice("Consul","ATIL0763",-235,-235);
addOffice("Consul","POST0788",-234,-234);
addOffice("Consul","CARV0789",-234,-234);
addOffice("Consul","FABI0712",-233,-233);
addOffice("Consul","POMP0791",-233,-233);
addOffice("Consul","AEMI0792",-232,-232);
addOffice("Consul","PUBL0771",-232,-232);
addOffice("Consul","POMP0853",-231,-231);
addOffice("Consul","PAPI4665",-231,-231);
addOffice("Consul","AEMI0796",-230,-230);
addOffice("Consul","IUNI0797",-230,-230);
addOffice("Consul","POST0788",-229,-229);
addOffice("Consul","FULV0803",-229,-229);
addOffice("Consul","CARV0789",-228,-228);
addOffice("Consul","FABI0712",-228,-228);
addOffice("Consul","VALE0805",-227,-227);
addOffice("Consul","ATIL0806",-227,-227);
addOffice("Consul","VALE0808",-226,-226);
addOffice("Consul","APUS0809",-226,-226);
addOffice("Consul","AEMI0812",-225,-225);
addOffice("Consul","ATIL0813",-225,-225);
addOffice("Consul","MANL0787",-224,-224);
addOffice("Consul","FULV0781",-224,-224);
addOffice("Consul","FLAM0793",-223,-223);
addOffice("Consul","FURI0814",-223,-223);
addOffice("Consul","CLAU0810",-222,-222);
addOffice("Consul","CORN0817",-222,-222);
addOffice("Consul","CORN0819",-221,-221);
addOffice("Consul","MINU0820",-221,-221);
addOffice("Consul","VALE0807",-220,-220);
addOffice("Consul","MUCI0822",-220,-220);
addOffice("Consul","LUTA0823",-220,-220);
addOffice("Consul","VETU0824",-220,-220);
addOffice("Consul","AEMI0826",-219,-219);
addOffice("Consul","LIVI0827",-219,-219);
addOffice("Consul","CORN0832",-218,-218);
addOffice("Consul","SEMP0833",-218,-218);
addOffice("Consul","SERV0852",-217,-217);
addOffice("Consul","FLAM0793",-217,-217);
addOffice("Consul","TERE0818",-216,-216);
addOffice("Consul","AEMI0826",-216,-216);
addOffice("Consul","POST0788",-215,-215);
addOffice("Consul","SEMP0866",-215,-215);
addOffice("Consul","FABI0712",-214,-214);
addOffice("Consul","CLAU0810",-214,-214);
addOffice("Consul","FABI0879",-213,-213);
addOffice("Consul","SEMP0866",-213,-213);
addOffice("Consul","FULV0781",-212,-212);
addOffice("Consul","CLAU0858",-212,-212);
addOffice("Consul","FULV0904",-211,-211);
addOffice("Consul","SULP0936",-211,-211);
addOffice("Consul","CLAU0810",-210,-210);
addOffice("Consul","VALE0807",-210,-210);
addOffice("Consul","FABI0712",-209,-209);
addOffice("Consul","FULV0781",-209,-209);
addOffice("Consul","CLAU0810",-208,-208);
addOffice("Consul","QUIN0916",-208,-208);
addOffice("Consul","CLAU0908",-207,-207);
addOffice("Consul","LIVI0827",-207,-207);
addOffice("Consul","VETU0949",-206,-206);
addOffice("Consul","CAEC0891",-206,-206);
addOffice("Consul","CORN0878",-205,-205);
addOffice("Consul","LICI0926",-205,-205);
addOffice("Consul","CORN0815",-204,-204);
addOffice("Consul","SEMP0882",-204,-204);
addOffice("Consul","SERV0919",-203,-203);
addOffice("Consul","SERV0931",-203,-203);
addOffice("Consul","SERV0953",-202,-202);
addOffice("Consul","CLAU1032",-202,-202);
addOffice("Consul","CORN0877",-201,-201);
addOffice("Consul","AELI1006",-201,-201);
addOffice("Consul","SULP0936",-200,-200);
addOffice("Consul","AURE1054",-200,-200);
addOffice("Consul","CORN1023",-199,-199);
addOffice("Consul","VILL1034",-199,-199);
addOffice("Consul","AELI1074",-198,-198);
addOffice("Consul","QUIN0999",-198,-198);
addOffice("Consul","CORN1065",-197,-197);
addOffice("Consul","MINU1062",-197,-197);
addOffice("Consul","FURI0967",-196,-196);
addOffice("Consul","CLAU0997",-196,-196);
addOffice("Consul","VALE0930",-195,-195);
addOffice("Consul","PORC0907",-195,-195);
addOffice("Consul","CORN0878",-194,-194);
addOffice("Consul","SEMP0976",-194,-194);
addOffice("Consul","CORN1091",-193,-193);
addOffice("Consul","MINU1064",-193,-193);
addOffice("Consul","QUIN0977",-192,-192);
addOffice("Consul","DOMI1110",-192,-192);
addOffice("Consul","CORN1077",-191,-191);
addOffice("Consul","ACIL1063",-191,-191);
addOffice("Consul","CORN1016",-190,-190);
addOffice("Consul","LAEL0992",-190,-190);
addOffice("Consul","FULV1109",-189,-189);
addOffice("Consul","MANL1103",-189,-189);
addOffice("Consul","VALE1201",-188,-188);
addOffice("Consul","LIVI0952",-188,-188);
addOffice("Consul","AEMI1067",-187,-187);
addOffice("Consul","FLAM0989",-187,-187);
addOffice("Consul","POST1170",-186,-186);
addOffice("Consul","MARC1205",-186,-186);
addOffice("Consul","CLAU1118",-185,-185);
addOffice("Consul","SEMP1157",-185,-185);
addOffice("Consul","CLAU1191",-184,-184);
addOffice("Consul","PORC1154",-184,-184);
addOffice("Consul","CLAU1229",-183,-183);
addOffice("Consul","FABI1117",-183,-183);
addOffice("Consul","BAEB1035",-182,-182);
addOffice("Consul","AEMI1134",-182,-182);
addOffice("Consul","CORN1212",-181,-181);
addOffice("Consul","BAEB1163",-181,-181);
addOffice("Consul","POST1172",-180,-180);
addOffice("Consul","CALP1222",-180,-180);
addOffice("Consul","FULV1242",-179,-179);
addOffice("Consul","MANL1204",-179,-179);
addOffice("Consul","IUNI1131",-178,-178);
addOffice("Consul","MANL1151",-178,-178);
addOffice("Consul","CLAU1125",-177,-177);
addOffice("Consul","SEMP1182",-177,-177);
addOffice("Consul","CORN1090",-176,-176);
addOffice("Consul","PETI1219",-176,-176);
addOffice("Consul","MUCI1288",-175,-175);
addOffice("Consul","AEMI1067",-175,-175);
addOffice("Consul","POST1251",-174,-174);
addOffice("Consul","MUCI1289",-174,-174);
addOffice("Consul","POST1278",-173,-173);
addOffice("Consul","POPI1283",-173,-173);
addOffice("Consul","POPI1328",-172,-172);
addOffice("Consul","AELI1324",-172,-172);
addOffice("Consul","LICI1321",-171,-171);
addOffice("Consul","CASS1304",-171,-171);
addOffice("Consul","HOST1275",-170,-170);
addOffice("Consul","ATIL1140",-170,-170);
addOffice("Consul","MARC1205",-169,-169);
addOffice("Consul","SERV1291",-169,-169);
addOffice("Consul","AEMI1134",-168,-168);
addOffice("Consul","LICI1354",-168,-168);
addOffice("Consul","AELI1312",-167,-167);
addOffice("Consul","IUNI1353",-167,-167);
addOffice("Consul","CLAU1318",-166,-166);
addOffice("Consul","SULP1173",-166,-166);
addOffice("Consul","MANL1384",-165,-165);
addOffice("Consul","OCTA1356",-165,-165);
addOffice("Consul","MANL1442",-164,-164);
addOffice("Consul","CASS1439",-164,-164);
addOffice("Consul","SEMP1182",-163,-163);
addOffice("Consul","IUVE1387",-163,-163);
addOffice("Consul","CORN1396",-162,-162);
addOffice("Consul","MARC1395",-162,-162);
addOffice("Consul","VALE1460",-161,-161);
addOffice("Consul","FANN1461",-161,-161);
addOffice("Consul","ANIC1408",-160,-160);
addOffice("Consul","CORN1377",-160,-160);
addOffice("Consul","CORN1457",-159,-159);
addOffice("Consul","FULV1369",-159,-159);
addOffice("Consul","AEMI1471",-158,-158);
addOffice("Consul","POPI1328",-158,-158);
addOffice("Consul","IULI1265",-157,-157);
addOffice("Consul","AURE1468",-157,-157);
addOffice("Consul","CORN1465",-156,-156);
addOffice("Consul","MARC1395",-156,-156);
addOffice("Consul","CORN1396",-155,-155);
addOffice("Consul","CLAU1318",-155,-155);
addOffice("Consul","OPIM1476",-154,-154);
addOffice("Consul","POST1406",-154,-154);
addOffice("Consul","FULV1248",-153,-153);
addOffice("Consul","ANNI1404",-153,-153);
addOffice("Consul","CLAU1318",-152,-152);
addOffice("Consul","VALE1466",-152,-152);
addOffice("Consul","LICI1484",-151,-151);
addOffice("Consul","POST1420",-151,-151);
addOffice("Consul","QUIN1449",-150,-150);
addOffice("Consul","ACIL1494",-150,-150);
addOffice("Consul","MARC1475",-149,-149);
addOffice("Consul","MANI1480",-149,-149);
addOffice("Consul","POST1502",-148,-148);
addOffice("Consul","CALP1483",-148,-148);
addOffice("Consul","CORN1504",-147,-147);
addOffice("Consul","LIVI1519",-147,-147);
addOffice("Consul","CORN1474",-146,-146);
addOffice("Consul","MUMM1495",-146,-146);
addOffice("Consul","FABI1422",-145,-145);
addOffice("Consul","HOST1508",-145,-145);
addOffice("Consul","SULP1417",-144,-144);
addOffice("Consul","AURE1485",-144,-144);
addOffice("Consul","CLAU1452",-143,-143);
addOffice("Consul","CAEC1424",-143,-143);
addOffice("Consul","CAEC1544",-142,-142);
addOffice("Consul","FABI1545",-142,-142);
addOffice("Consul","SERV1552",-141,-141);
addOffice("Consul","POMP1551",-141,-141);
addOffice("Consul","LAEL1524",-140,-140);
addOffice("Consul","SERV1556",-140,-140);
addOffice("Consul","CALP1561",-139,-139);
addOffice("Consul","POPI1563",-139,-139);
addOffice("Consul","CORN1513",-138,-138);
addOffice("Consul","IUNI1565",-138,-138);
addOffice("Consul","AEMI1553",-137,-137);
addOffice("Consul","HOST1569",-137,-137);
addOffice("Consul","FURI1573",-136,-136);
addOffice("Consul","ATIL1572",-136,-136);
addOffice("Consul","FULV1576",-135,-135);
addOffice("Consul","CALP1575",-135,-135);
addOffice("Consul","CORN1504",-134,-134);
addOffice("Consul","FULV1581",-134,-134);
addOffice("Consul","MUCI1567",-133,-133);
addOffice("Consul","CALP1510",-133,-133);
addOffice("Consul","POPI1590",-132,-132);
addOffice("Consul","RUPI1591",-132,-132);
addOffice("Consul","LICI1500",-131,-131);
addOffice("Consul","VALE1492",-131,-131);
addOffice("Consul","CORN3363",-130,-130);
addOffice("Consul","CORN1568",-130,-130);
addOffice("Consul","PERP1600",-130,-130);
addOffice("Consul","SEMP1548",-129,-129);
addOffice("Consul","AQUI1614",-129,-129);
addOffice("Consul","OCTA1617",-128,-128);
addOffice("Consul","ANNI1616",-128,-128);
addOffice("Consul","CASS1583",-127,-127);
addOffice("Consul","CORN1620",-127,-127);
addOffice("Consul","AEMI1626",-126,-126);
addOffice("Consul","AURE1627",-126,-126);
addOffice("Consul","PLAU1632",-125,-125);
addOffice("Consul","FULV1624",-125,-125);
addOffice("Consul","CASS1633",-124,-124);
addOffice("Consul","SEXT1634",-124,-124);
addOffice("Consul","CAEC1635",-123,-123);
addOffice("Consul","QUIN1636",-123,-123);
addOffice("Consul","FANN1523",-122,-122);
addOffice("Consul","DOMI1630",-122,-122);
addOffice("Consul","OPIM1639",-121,-121);
addOffice("Consul","FABI1594",-121,-121);
addOffice("Consul","MANI1643",-120,-120);
addOffice("Consul","PAPI1623",-120,-120);
addOffice("Consul","CAEC1649",-119,-119);
addOffice("Consul","AURE1648",-119,-119);
addOffice("Consul","PORC1656",-118,-118);
addOffice("Consul","MARC1655",-118,-118);
addOffice("Consul","CAEC1665",-117,-117);
addOffice("Consul","MUCI1613",-117,-117);
addOffice("Consul","LICI1674",-116,-116);
addOffice("Consul","FABI1615",-116,-116);
addOffice("Consul","AEMI1645",-115,-115);
addOffice("Consul","CAEC1677",-115,-115);
addOffice("Consul","ACIL1680",-114,-114);
addOffice("Consul","PORC1682",-114,-114);
addOffice("Consul","CAEC1701",-113,-113);
addOffice("Consul","PAPI1689",-113,-113);
addOffice("Consul","LIVI1651",-112,-112);
addOffice("Consul","CALP1712",-112,-112);
addOffice("Consul","CORN1695",-111,-111);
addOffice("Consul","CALP1663",-111,-111);
addOffice("Consul","MINU1686",-110,-110);
addOffice("Consul","POST1703",-110,-110);
addOffice("Consul","CAEC1693",-109,-109);
addOffice("Consul","IUNI0885",-109,-109);
addOffice("Consul","SULP1718",-108,-108);
addOffice("Consul","HORT1716",-108,-108);
addOffice("Consul","HORT1670",-108,-108);
addOffice("Consul","CASS1715",-107,-107);
addOffice("Consul","MARI1660",-107,-107);
addOffice("Consul","SERV1629",-106,-106);
addOffice("Consul","ATIL1730",-106,-106);
addOffice("Consul","RUTI1596",-105,-105);
addOffice("Consul","MALL1739",-105,-105);
addOffice("Consul","MARI1660",-104,-104);
addOffice("Consul","FLAV1743",-104,-104);
addOffice("Consul","MARI1660",-103,-103);
addOffice("Consul","AURE1749",-103,-103);
addOffice("Consul","MARI1660",-102,-102);
addOffice("Consul","LUTA1731",-102,-102);
addOffice("Consul","MARI1660",-101,-101);
addOffice("Consul","AQUI1757",-101,-101);
addOffice("Consul","MARI1660",-100,-100);
addOffice("Consul","VALE1815",-100,-100);
addOffice("Consul","ANTO1705",-99,-99);
addOffice("Consul","POST1728",-99,-99);
addOffice("Consul","CAEC1787",-98,-98);
addOffice("Consul","DIDI1776",-98,-98);
addOffice("Consul","CORN1792",-97,-97);
addOffice("Consul","LICI1780",-97,-97);
addOffice("Consul","DOMI1763",-96,-96);
addOffice("Consul","CASS1801",-96,-96);
addOffice("Consul","LICI1679",-95,-95);
addOffice("Consul","MUCI1692",-95,-95);
addOffice("Consul","DOMI1816",-94,-94);
addOffice("Consul","COEL1744",-94,-94);
addOffice("Consul","VALE1821",-93,-93);
addOffice("Consul","HERE1819",-93,-93);
addOffice("Consul","CLAU1753",-92,-92);
addOffice("Consul","PERP1826",-92,-92);
addOffice("Consul","MARC1764",-91,-91);
addOffice("Consul","IULI1828",-91,-91);
addOffice("Consul","IULI1825",-90,-90);
addOffice("Consul","RUTI1837",-90,-90);
addOffice("Consul","POMP1767",-89,-89);
addOffice("Consul","PORC1841",-89,-89);
addOffice("Consul","CORN1746",-88,-88);
addOffice("Consul","POMP1805",-88,-88);
addOffice("Consul","OCTA1873",-87,-87);
addOffice("Consul","CORN1871",-87,-87);
addOffice("Consul","CORN1871",-86,-86);
addOffice("Consul","MARI1660",-86,-86);
addOffice("Consul","CORN1871",-85,-85);
addOffice("Consul","PAPI1843",-85,-85);
addOffice("Consul","PAPI1843",-84,-84);
addOffice("Consul","CORN1871",-84,-84);
addOffice("Consul","CORN1882",-83,-83);
addOffice("Consul","NORB1777",-83,-83);
addOffice("Consul","MARI1983",-82,-82);
addOffice("Consul","PAPI1843",-82,-82);
addOffice("Consul","TULL2005",-81,-81);
addOffice("Consul","CORN1979",-81,-81);
addOffice("Consul","CORN1746",-80,-80);
addOffice("Consul","CAEC1889",-80,-80);
addOffice("Consul","SERV1814",-79,-79);
addOffice("Consul","CLAU1807",-79,-79);
addOffice("Consul","AEMI1993",-78,-78);
addOffice("Consul","LUTA1949",-78,-78);
addOffice("Consul","IUNI2023",-77,-77);
addOffice("Consul","AEMI1865",-77,-77);
addOffice("Consul","OCTA2031",-76,-76);
addOffice("Consul","SCRI1876",-76,-76);
addOffice("Consul","OCTA2036",-75,-75);
addOffice("Consul","AURE1866",-75,-75);
addOffice("Consul","LICI1903",-74,-74);
addOffice("Consul","AURE2026",-74,-74);
addOffice("Consul","TERE1982",-73,-73);
addOffice("Consul","CASS2050",-73,-73);
addOffice("Consul","GELL1822",-72,-72);
addOffice("Consul","CORN2064",-72,-72);
addOffice("Consul","CORN2012",-71,-71);
addOffice("Consul","AUFI2032",-71,-71);
addOffice("Consul","POMP1976",-70,-70);
addOffice("Consul","LICI1981",-70,-70);
addOffice("Consul","HORT1902",-69,-69);
addOffice("Consul","CAEC2078",-69,-69);
addOffice("Consul","CAEC2150",-68,-68);
addOffice("Consul","MARC2151",-68,-68);
addOffice("Consul","CALP2164",-67,-67);
addOffice("Consul","ACIL2119",-67,-67);
addOffice("Consul","AEMI2038",-66,-66);
addOffice("Consul","VOLC2178",-66,-66);
addOffice("Consul","AURE2163",-65,-65);
addOffice("Consul","MANL2205",-65,-65);
addOffice("Consul","IULI2044",-64,-64);
addOffice("Consul","MARC2226",-64,-64);
addOffice("Consul","TULL2072",-63,-63);
addOffice("Consul","ANTO1969",-63,-63);
addOffice("Consul","IUNI2120",-62,-62);
addOffice("Consul","LICI2085",-62,-62);
addOffice("Consul","PUPI1974",-61,-61);
addOffice("Consul","VALE2107",-61,-61);
addOffice("Consul","CAEC2040",-60,-60);
addOffice("Consul","AFRA2074",-60,-60);
addOffice("Consul","IULI1957",-59,-59);
addOffice("Consul","CALP2272",-59,-59);
addOffice("Consul","CALP2168",-58,-58);
addOffice("Consul","GABI2234",-58,-58);
addOffice("Consul","CORN2290",-57,-57);
addOffice("Consul","CAEC2247",-57,-57);
addOffice("Consul","MARC2303",-56,-56);
addOffice("Consul","CORN2082",-56,-56);
addOffice("Consul","POMP1976",-55,-55);
addOffice("Consul","LICI1981",-55,-55);
addOffice("Consul","DOMI2264",-54,-54);
addOffice("Consul","CLAU2140",-54,-54);
addOffice("Consul","DOMI2313",-53,-53);
addOffice("Consul","VALE2536",-53,-53);
addOffice("Consul","POMP1976",-52,-52);
addOffice("Consul","CAEC2347",-52,-52);
addOffice("Consul","SULP2088",-51,-51);
addOffice("Consul","CLAU2398",-51,-51);
addOffice("Consul","AEMI2350",-50,-50);
addOffice("Consul","CLAU2396",-50,-50);
addOffice("Consul","CLAU2397",-49,-49);
addOffice("Consul","CORN2356",-49,-49);
addOffice("Consul","IULI1957",-48,-48);
addOffice("Consul","SERV2433",-48,-48);
addOffice("Consul","FUFI2321",-47,-47);
addOffice("Consul","VATI2297",-47,-47);
addOffice("Consul","IULI1957",-46,-46);
addOffice("Consul","AEMI2341",-46,-46);
addOffice("Consul","IULI1957",-45,-45);
addOffice("Consul","IULI1957",-44,-44);
addOffice("Consul","ANTO2392",-44,-44);
addOffice("Consul","VIBI2495",-43,-43);
addOffice("Consul","HIRT2449",-43,-43);
addOffice("Consul","AEMI2341",-42,-42);
addOffice("Consul","MUNA2450",-42,-42);
addOffice("Consul","ANTO2523",-41,-41);
addOffice("Consul","SERV2433",-41,-41);
addOffice("Consul","DOMI2313",-40,-40);
addOffice("Consul","ASIN2553",-40,-40);
addOffice("Consul","MARC2711",-39,-39);
addOffice("Consul","CALV2584",-39,-39);
addOffice("Consul","CLAU2867",-38,-38);
addOffice("Consul","NORB2713",-38,-38);
addOffice("Consul","VIPS2808",-37,-37);
addOffice("Consul","CANI2821",-37,-37);
addOffice("Consul","GELL2802",-36,-36);
addOffice("Consul","COCC2806",-36,-36);
addOffice("Consul","POMP3286",-35,-35);
addOffice("Consul","CORN2717",-35,-35);
addOffice("Consul","ANTO2392",-34,-34);
addOffice("Consul","SCRI2518",-34,-34);
addOffice("Consul","IULI2597",-33,-33);
addOffice("Consul","VOLC2609",-33,-33);
addOffice("Consul","DOMI2699",-32,-32);
addOffice("Consul","SOSI2840",-32,-32);
addOffice("Consul","ANTO2392",-31,-31);
addOffice("Consul","IULI2597",-31,-31);
addOffice("Consul","SILI4366",-20,-20);
addOffice("Consular Tribune","SEMP0209",-444,-444);
addOffice("Consular Tribune","ATIL0210",-444,-444);
addOffice("Consular Tribune","CLOE0211",-444,-444);
addOffice("Consular Tribune","AEMI0203",-438,-438);
addOffice("Consular Tribune","QUIN0231",-438,-438);
addOffice("Consular Tribune","IULI0261",-438,-438);
addOffice("Consular Tribune","CORN0247",-434,-434);
addOffice("Consular Tribune","MANL0245",-434,-434);
addOffice("Consular Tribune","SULP0246",-434,-434);
addOffice("Consular Tribune","FABI0214",-433,-433);
addOffice("Consular Tribune","FOLI0402",-433,-433);
addOffice("Consular Tribune","SERG0237",-433,-433);
addOffice("Consular Tribune","PINA0251",-432,-432);
addOffice("Consular Tribune","FURI0252",-432,-432);
addOffice("Consular Tribune","POST0258",-432,-432);
addOffice("Consular Tribune","QUIN0254",-426,-426);
addOffice("Consular Tribune","FURI0219",-426,-426);
addOffice("Consular Tribune","POST0268",-426,-426);
addOffice("Consular Tribune","CORN0239",-426,-426);
addOffice("Consular Tribune","SEMP0269",-425,-425);
addOffice("Consular Tribune","QUIN0231",-425,-425);
addOffice("Consular Tribune","FURI0252",-425,-425);
addOffice("Consular Tribune","HORA0270",-425,-425);
addOffice("Consular Tribune","CLAU0271",-424,-424);
addOffice("Consular Tribune","NAUT0272",-424,-424);
addOffice("Consular Tribune","SERG0237",-424,-424);
addOffice("Consular Tribune","IULI0273",-424,-424);
addOffice("Consular Tribune","MANL0278",-422,-422);
addOffice("Consular Tribune","ANTO0279",-422,-422);
addOffice("Consular Tribune","PAPI0267",-422,-422);
addOffice("Consular Tribune","QUIN0231",-420,-420);
addOffice("Consular Tribune","QUIN0254",-420,-420);
addOffice("Consular Tribune","FURI0252",-420,-420);
addOffice("Consular Tribune","MANL0286",-420,-420);
addOffice("Consular Tribune","SEMP0269",-420,-420);
addOffice("Consular Tribune","MENE0292",-419,-419);
addOffice("Consular Tribune","LUCR0293",-419,-419);
addOffice("Consular Tribune","NAUT0294",-419,-419);
addOffice("Consular Tribune","SERV0266",-419,-419);
addOffice("Consular Tribune","SERG0237",-418,-418);
addOffice("Consular Tribune","PAPI0295",-418,-418);
addOffice("Consular Tribune","SERV0266",-418,-418);
addOffice("Consular Tribune","LUCR0293",-417,-417);
addOffice("Consular Tribune","MENE0292",-417,-417);
addOffice("Consular Tribune","SERV0266",-417,-417);
addOffice("Consular Tribune","RUTI0296",-417,-417);
addOffice("Consular Tribune","VETU0297",-417,-417);
addOffice("Consular Tribune","FABI0275",-416,-416);
addOffice("Consular Tribune","SEMP0269",-416,-416);
addOffice("Consular Tribune","PAPI0295",-416,-416);
addOffice("Consular Tribune","FABI0311",-416,-416);
addOffice("Consular Tribune","NAUT0294",-416,-416);
addOffice("Consular Tribune","CORN0300",-415,-415);
addOffice("Consular Tribune","VALE0301",-415,-415);
addOffice("Consular Tribune","FABI0329",-415,-415);
addOffice("Consular Tribune","QUIN0303",-415,-415);
addOffice("Consular Tribune","CORN0305",-414,-414);
addOffice("Consular Tribune","VALE0306",-414,-414);
addOffice("Consular Tribune","FABI0311",-414,-414);
addOffice("Consular Tribune","POST0307",-414,-414);
addOffice("Consular Tribune","POST3793",-414,-414);
addOffice("Consular Tribune","IULI0325",-408,-408);
addOffice("Consular Tribune","CORN0326",-408,-408);
addOffice("Consular Tribune","SERV0327",-408,-408);
addOffice("Consular Tribune","FURI0252",-407,-407);
addOffice("Consular Tribune","VALE0301",-407,-407);
addOffice("Consular Tribune","FABI0329",-407,-407);
addOffice("Consular Tribune","SERV0327",-407,-407);
addOffice("Consular Tribune","CORN0328",-406,-406);
addOffice("Consular Tribune","CORN0330",-406,-406);
addOffice("Consular Tribune","FABI0400",-406,-406);
addOffice("Consular Tribune","VALE0306",-406,-406);
addOffice("Consular Tribune","QUIN0285",-405,-405);
addOffice("Consular Tribune","QUIN0303",-405,-405);
addOffice("Consular Tribune","IULI0325",-405,-405);
addOffice("Consular Tribune","MANL0332",-405,-405);
addOffice("Consular Tribune","FURI0252",-405,-405);
addOffice("Consular Tribune","AEMI0316",-405,-405);
addOffice("Consular Tribune","VALE0301",-404,-404);
addOffice("Consular Tribune","SERG0333",-404,-404);
addOffice("Consular Tribune","CORN0334",-404,-404);
addOffice("Consular Tribune","CORN0330",-404,-404);
addOffice("Consular Tribune","FABI0322",-404,-404);
addOffice("Consular Tribune","NAUT0294",-404,-404);
addOffice("Consular Tribune","AEMI0316",-403,-403);
addOffice("Consular Tribune","VALE0306",-403,-403);
addOffice("Consular Tribune","CLAU0335",-403,-403);
addOffice("Consular Tribune","QUIN0336",-403,-403);
addOffice("Consular Tribune","IULI0337",-403,-403);
addOffice("Consular Tribune","FURI0338",-403,-403);
addOffice("Consular Tribune","FURI0340",-403,-403);
addOffice("Consular Tribune","POST0341",-403,-403);
addOffice("Consular Tribune","POST3798",-403,-403);
addOffice("Consular Tribune","SERV0327",-402,-402);
addOffice("Consular Tribune","SERV0342",-402,-402);
addOffice("Consular Tribune","VERG0343",-402,-402);
addOffice("Consular Tribune","SULP0344",-402,-402);
addOffice("Consular Tribune","MANL0332",-402,-402);
addOffice("Consular Tribune","SERG0333",-402,-402);
addOffice("Consular Tribune","CLOD0345",-402,-402);
addOffice("Consular Tribune","ANCU0346",-402,-402);
addOffice("Consular Tribune","VALE0306",-401,-401);
addOffice("Consular Tribune","FURI0340",-401,-401);
addOffice("Consular Tribune","AEMI0316",-401,-401);
addOffice("Consular Tribune","CORN0330",-401,-401);
addOffice("Consular Tribune","FABI0322",-401,-401);
addOffice("Consular Tribune","IULI0347",-401,-401);
addOffice("Consular Tribune","LICI0354",-400,-400);
addOffice("Consular Tribune","MANL0355",-400,-400);
addOffice("Consular Tribune","TITI0356",-400,-400);
addOffice("Consular Tribune","MAEL0357",-400,-400);
addOffice("Consular Tribune","FURI0358",-400,-400);
addOffice("Consular Tribune","PUBL0359",-400,-400);
addOffice("Consular Tribune","GENU0360",-399,-399);
addOffice("Consular Tribune","ATIL0361",-399,-399);
addOffice("Consular Tribune","POMP0362",-399,-399);
addOffice("Consular Tribune","DUIL0363",-399,-399);
addOffice("Consular Tribune","VETU0364",-399,-399);
addOffice("Consular Tribune","PUBL0365",-399,-399);
addOffice("Consular Tribune","VALE0306",-398,-398);
addOffice("Consular Tribune","VALE0366",-398,-398);
addOffice("Consular Tribune","FURI0340",-398,-398);
addOffice("Consular Tribune","FURI0252",-398,-398);
addOffice("Consular Tribune","SERV0342",-398,-398);
addOffice("Consular Tribune","SULP0344",-398,-398);
addOffice("Consular Tribune","CLAU0367",-398,-398);
addOffice("Consular Tribune","MARI0368",-398,-398);
addOffice("Consular Tribune","IULI0347",-397,-397);
addOffice("Consular Tribune","FURI0252",-397,-397);
addOffice("Consular Tribune","SERG0371",-397,-397);
addOffice("Consular Tribune","POST0372",-397,-397);
addOffice("Consular Tribune","CORN0373",-397,-397);
addOffice("Consular Tribune","MANL0332",-397,-397);
addOffice("Consular Tribune","TITI0356",-396,-396);
addOffice("Consular Tribune","LICI0354",-396,-396);
addOffice("Consular Tribune","MAEL0357",-396,-396);
addOffice("Consular Tribune","MANL0374",-396,-396);
addOffice("Consular Tribune","GENU0360",-396,-396);
addOffice("Consular Tribune","ATIL0361",-396,-396);
addOffice("Consular Tribune","CORN0375",-395,-395);
addOffice("Consular Tribune","CORN0376",-395,-395);
addOffice("Consular Tribune","FABI0322",-395,-395);
addOffice("Consular Tribune","FURI0252",-395,-395);
addOffice("Consular Tribune","SERV0342",-395,-395);
addOffice("Consular Tribune","VALE0366",-395,-395);
addOffice("Consular Tribune","FURI0340",-394,-394);
addOffice("Consular Tribune","FURI0252",-394,-394);
addOffice("Consular Tribune","AEMI0380",-394,-394);
addOffice("Consular Tribune","VALE0381",-394,-394);
addOffice("Consular Tribune","POST0382",-394,-394);
addOffice("Consular Tribune","CORN0383",-394,-394);
addOffice("Consular Tribune","CATL0384",-394,-394);
addOffice("Consular Tribune","CORN0375",-394,-394);
addOffice("Consular Tribune","CORN0376",-394,-394);
addOffice("Consular Tribune","LUCR0387",-391,-391);
addOffice("Consular Tribune","SULP0388",-391,-391);
addOffice("Consular Tribune","AEMI0407",-391,-391);
addOffice("Consular Tribune","FURI0252",-391,-391);
addOffice("Consular Tribune","FURI0393",-391,-391);
addOffice("Consular Tribune","AEMI0380",-391,-391);
addOffice("Consular Tribune","FABI0396",-390,-390);
addOffice("Consular Tribune","FABI0322",-390,-390);
addOffice("Consular Tribune","FABI0400",-390,-390);
addOffice("Consular Tribune","SULP0401",-390,-390);
addOffice("Consular Tribune","SERV0342",-390,-390);
addOffice("Consular Tribune","CORN0373",-390,-390);
addOffice("Consular Tribune","VALE0381",-389,-389);
addOffice("Consular Tribune","CORN0405",-389,-389);
addOffice("Consular Tribune","MANL0406",-389,-389);
addOffice("Consular Tribune","AEMI0407",-389,-389);
addOffice("Consular Tribune","POST0408",-389,-389);
addOffice("Consular Tribune","PAPI0409",-389,-389);
addOffice("Consular Tribune","FURI0410",-389,-389);
addOffice("Consular Tribune","VERG3843",-389,-389);
addOffice("Consular Tribune","QUIN0415",-388,-388);
addOffice("Consular Tribune","SERV0342",-388,-388);
addOffice("Consular Tribune","IULI0416",-388,-388);
addOffice("Consular Tribune","AQUI0417",-388,-388);
addOffice("Consular Tribune","LUCR0387",-388,-388);
addOffice("Consular Tribune","SULP0418",-388,-388);
addOffice("Consular Tribune","PAPI0389",-387,-387);
addOffice("Consular Tribune","SERG0419",-387,-387);
addOffice("Consular Tribune","AEMI0407",-387,-387);
addOffice("Consular Tribune","MENE0420",-387,-387);
addOffice("Consular Tribune","VALE0381",-387,-387);
addOffice("Consular Tribune","QUIN0421",-387,-387);
addOffice("Consular Tribune","CORN0422",-387,-387);
addOffice("Consular Tribune","MALL0423",-387,-387);
addOffice("Consular Tribune","FABI0424",-387,-387);
addOffice("Consular Tribune","FURI0340",-386,-386);
addOffice("Consular Tribune","CORN0426",-386,-386);
addOffice("Consular Tribune","SERV0342",-386,-386);
addOffice("Consular Tribune","QUIN0427",-386,-386);
addOffice("Consular Tribune","HORA0428",-386,-386);
addOffice("Consular Tribune","VALE0429",-386,-386);
addOffice("Consular Tribune","MANL0406",-385,-385);
addOffice("Consular Tribune","CORN0430",-385,-385);
addOffice("Consular Tribune","QUIN0415",-385,-385);
addOffice("Consular Tribune","QUIN0427",-385,-385);
addOffice("Consular Tribune","PAPI0389",-385,-385);
addOffice("Consular Tribune","SERG0419",-385,-385);
addOffice("Consular Tribune","CORN0426",-384,-384);
addOffice("Consular Tribune","VALE0429",-384,-384);
addOffice("Consular Tribune","FURI0340",-384,-384);
addOffice("Consular Tribune","SULP0418",-384,-384);
addOffice("Consular Tribune","PAPI0433",-384,-384);
addOffice("Consular Tribune","QUIN0415",-384,-384);
addOffice("Consular Tribune","VALE0381",-383,-383);
addOffice("Consular Tribune","MANL0406",-383,-383);
addOffice("Consular Tribune","SULP0418",-383,-383);
addOffice("Consular Tribune","LUCR0387",-383,-383);
addOffice("Consular Tribune","AEMI0407",-383,-383);
addOffice("Consular Tribune","TREB0436",-383,-383);
addOffice("Consular Tribune","FABI0437",-383,-383);
addOffice("Consular Tribune","PAPI0438",-382,-382);
addOffice("Consular Tribune","PAPI0409",-382,-382);
addOffice("Consular Tribune","CORN0426",-382,-382);
addOffice("Consular Tribune","SERV0440",-382,-382);
addOffice("Consular Tribune","SULP0441",-382,-382);
addOffice("Consular Tribune","AEMI0407",-382,-382);
addOffice("Consular Tribune","FABI0442",-382,-382);
addOffice("Consular Tribune","FURI0340",-381,-381);
addOffice("Consular Tribune","POST0372",-381,-381);
addOffice("Consular Tribune","POST0408",-381,-381);
addOffice("Consular Tribune","FURI0443",-381,-381);
addOffice("Consular Tribune","LUCR0387",-381,-381);
addOffice("Consular Tribune","FABI0444",-381,-381);
addOffice("Consular Tribune","VALE0381",-380,-380);
addOffice("Consular Tribune","VALE0429",-380,-380);
addOffice("Consular Tribune","CORN0426",-380,-380);
addOffice("Consular Tribune","MENE0420",-380,-380);
addOffice("Consular Tribune","SULP0445",-380,-380);
addOffice("Consular Tribune","AEMI0407",-380,-380);
addOffice("Consular Tribune","SERG0419",-380,-380);
addOffice("Consular Tribune","PAPI0446",-380,-380);
addOffice("Consular Tribune","PAPI0409",-380,-380);
addOffice("Consular Tribune","MANL0450",-379,-379);
addOffice("Consular Tribune","MANL0451",-379,-379);
addOffice("Consular Tribune","IULI0416",-379,-379);
addOffice("Consular Tribune","SEXT0452",-379,-379);
addOffice("Consular Tribune","ALBI0453",-379,-379);
addOffice("Consular Tribune","ANTI0454",-379,-379);
addOffice("Consular Tribune","TREB0455",-379,-379);
addOffice("Consular Tribune","EREN0456",-379,-379);
addOffice("Consular Tribune","FURI0457",-378,-378);
addOffice("Consular Tribune","SERV0440",-378,-378);
addOffice("Consular Tribune","MENE0420",-378,-378);
addOffice("Consular Tribune","CLOE0458",-378,-378);
addOffice("Consular Tribune","HORA0459",-378,-378);
addOffice("Consular Tribune","GEGA0460",-378,-378);
addOffice("Consular Tribune","AEMI0484",-377,-377);
addOffice("Consular Tribune","VALE0429",-377,-377);
addOffice("Consular Tribune","VETU0464",-377,-377);
addOffice("Consular Tribune","SULP0418",-377,-377);
addOffice("Consular Tribune","SULP0465",-377,-377);
addOffice("Consular Tribune","QUIN0427",-377,-377);
addOffice("Consular Tribune","QUIN0466",-377,-377);
addOffice("Consular Tribune","PAPI0409",-376,-376);
addOffice("Consular Tribune","MENE0420",-376,-376);
addOffice("Consular Tribune","CORN0426",-376,-376);
addOffice("Consular Tribune","SULP0465",-376,-376);
addOffice("Consular Tribune","FURI0443",-370,-370);
addOffice("Consular Tribune","MANL0406",-370,-370);
addOffice("Consular Tribune","SULP0465",-370,-370);
addOffice("Consular Tribune","CORN0426",-370,-370);
addOffice("Consular Tribune","VALE0429",-370,-370);
addOffice("Consular Tribune","VALE0471",-370,-370);
addOffice("Consular Tribune","SERV0440",-369,-369);
addOffice("Consular Tribune","VETU0464",-369,-369);
addOffice("Consular Tribune","CORN0473",-369,-369);
addOffice("Consular Tribune","CORN0474",-369,-369);
addOffice("Consular Tribune","QUIN0475",-369,-369);
addOffice("Consular Tribune","FABI0444",-369,-369);
addOffice("Consular Tribune","QUIN0476",-368,-368);
addOffice("Consular Tribune","CORN0426",-368,-368);
addOffice("Consular Tribune","SULP0465",-368,-368);
addOffice("Consular Tribune","SERV0477",-368,-368);
addOffice("Consular Tribune","PAPI0478",-368,-368);
addOffice("Consular Tribune","VETU0479",-368,-368);
addOffice("Consular Tribune","CORN0473",-367,-367);
addOffice("Consular Tribune","CORN0474",-367,-367);
addOffice("Consular Tribune","GEGA0482",-367,-367);
addOffice("Consular Tribune","MANL0450",-367,-367);
addOffice("Consular Tribune","VETU0479",-367,-367);
addOffice("Consular Tribune","VALE0429",-367,-367);
addOffice("Curule Aedile","QUIN0487",-366,-366);
addOffice("Curule Aedile","CORN0519",-366,-366);
addOffice("Curule Aedile","POPI0491",-364,-364);
addOffice("Curule Aedile","VALE0522",-345,-345);
addOffice("Curule Aedile","FABI0559",-331,-331);
addOffice("Curule Aedile","VALE0556",-329,-329);
addOffice("Curule Aedile","CLAU0591",-313,-313);
addOffice("Curule Aedile","POST0609",-307,-307);
addOffice("Curule Aedile","IUVE0613",-306,-306);
addOffice("Curule Aedile","CLAU0591",-305,-305);
addOffice("Curule Aedile","FLAV0616",-304,-304);
addOffice("Curule Aedile","ANIC0619",-304,-304);
addOffice("Curule Aedile","CORN0628",-301,-301);
addOffice("Curule Aedile","POPI3789",-300,-300);
addOffice("Curule Aedile","DOMI0638",-299,-299);
addOffice("Curule Aedile","CARV0639",-299,-299);
addOffice("Curule Aedile","FABI0559",-299,-299);
addOffice("Curule Aedile","PAPI0640",-299,-299);
addOffice("Curule Aedile","OGUL0631",-296,-296);
addOffice("Curule Aedile","OGUL0632",-296,-296);
addOffice("Curule Aedile","FABI0642",-295,-295);
addOffice("Curule Aedile","PAPI0659",-290,-290);
addOffice("Curule Aedile","FABI0705",-267,-267);
addOffice("Curule Aedile","CORN0722",-261,-261);
addOffice("Curule Aedile","FURI0745",-255,-255);
addOffice("Curule Aedile","CLAU0744",-255,-255);
addOffice("Curule Aedile","CLAU0744",-253,-253);
addOffice("Curule Aedile","FURI0745",-253,-253);
addOffice("Curule Aedile","FABI0712",-235,-235);
addOffice("Curule Aedile","VALE0807",-229,-229);
addOffice("Curule Aedile","CLAU0810",-226,-226);
addOffice("Curule Aedile","TERE0818",-220,-220);
addOffice("Curule Aedile","CLAU0858",-217,-217);
addOffice("Curule Aedile","LAET0869",-216,-216);
addOffice("Curule Aedile","SEMP0866",-216,-216);
addOffice("Curule Aedile","FABI0879",-215,-215);
addOffice("Curule Aedile","FULV0904",-214,-214);
addOffice("Curule Aedile","SEMP0882",-214,-214);
addOffice("Curule Aedile","CORN0815",-213,-213);
addOffice("Curule Aedile","CORN0878",-213,-213);
addOffice("Curule Aedile","LICI0926",-212,-212);
addOffice("Curule Aedile","VETU0949",-210,-210);
addOffice("Curule Aedile","LICI0960",-210,-210);
addOffice("Curule Aedile","SULP0987",-209,-209);
addOffice("Curule Aedile","CORN1023",-209,-209);
addOffice("Curule Aedile","CAEC0891",-208,-208);
addOffice("Curule Aedile","SERV0931",-208,-208);
addOffice("Curule Aedile","SERV0919",-207,-207);
addOffice("Curule Aedile","CORN1009",-207,-207);
addOffice("Curule Aedile","CORN0985",-205,-205);
addOffice("Curule Aedile","CORN0986",-205,-205);
addOffice("Curule Aedile","CORN0877",-205,-205);
addOffice("Curule Aedile","LIVI0952",-204,-204);
addOffice("Curule Aedile","SERV0953",-204,-204);
addOffice("Curule Aedile","VALE1022",-203,-203);
addOffice("Curule Aedile","FABI1042",-203,-203);
addOffice("Curule Aedile","FULV1055",-202,-202);
addOffice("Curule Aedile","LICI1056",-202,-202);
addOffice("Curule Aedile","QUIN0977",-201,-201);
addOffice("Curule Aedile","VALE0930",-201,-201);
addOffice("Curule Aedile","AELI1074",-200,-200);
addOffice("Curule Aedile","CLAU0997",-200,-200);
addOffice("Curule Aedile","VALE0993",-199,-199);
addOffice("Curule Aedile","CORN1065",-199,-199);
addOffice("Curule Aedile","MINU1064",-198,-198);
addOffice("Curule Aedile","SEMP0976",-198,-198);
addOffice("Curule Aedile","CORN1077",-197,-197);
addOffice("Curule Aedile","MANL1103",-197,-197);
addOffice("Curule Aedile","FULV1109",-196,-196);
addOffice("Curule Aedile","FLAM0989",-196,-196);
addOffice("Curule Aedile","CORN1016",-195,-195);
addOffice("Curule Aedile","ATIL1140",-194,-194);
addOffice("Curule Aedile","SCRI1141",-194,-194);
addOffice("Curule Aedile","AEMI1067",-193,-193);
addOffice("Curule Aedile","AEMI1134",-193,-193);
addOffice("Curule Aedile","IUNI1132",-192,-192);
addOffice("Curule Aedile","TUCC1166",-192,-192);
addOffice("Curule Aedile","POST1170",-191,-191);
addOffice("Curule Aedile","CLAU1191",-189,-189);
addOffice("Curule Aedile","SULP1192",-189,-189);
addOffice("Curule Aedile","CORN1212",-187,-187);
addOffice("Curule Aedile","POST1172",-187,-187);
addOffice("Curule Aedile","VALE1232",-185,-185);
addOffice("Curule Aedile","POST1251",-185,-185);
addOffice("Curule Aedile","FULV1242",-184,-184);
addOffice("Curule Aedile","SEMP1182",-182,-182);
addOffice("Curule Aedile","CLAU1290",-179,-179);
addOffice("Curule Aedile","SERV1291",-179,-179);
addOffice("Curule Aedile","OCTA1356",-172,-172);
addOffice("Curule Aedile","MINU3705",-170,-170);
addOffice("Curule Aedile","CORN1362",-169,-169);
addOffice("Curule Aedile","CORN1396",-169,-169);
addOffice("Curule Aedile","ACIL1270",-166,-166);
addOffice("Curule Aedile","FULV1369",-166,-166);
addOffice("Curule Aedile","CORN1457",-165,-165);
addOffice("Curule Aedile","IULI1265",-165,-165);
addOffice("Curule Aedile","CORN1465",-163,-163);
addOffice("Curule Aedile","VALE1466",-163,-163);
addOffice("Curule Aedile","CORN1472",-161,-161);
addOffice("Curule Aedile","POST1406",-161,-161);
addOffice("Curule Aedile","FULV1248",-160,-160);
addOffice("Curule Aedile","MARC1475",-160,-160);
addOffice("Curule Aedile","POST1420",-159,-159);
addOffice("Curule Aedile","HOST1503",-151,-151);
addOffice("Curule Aedile","IULI1532",-146,-146);
addOffice("Curule Aedile","IUNI1533",-146,-146);
addOffice("Curule Aedile","IUNI1534",-146,-146);
addOffice("Curule Aedile","CORN1506",-141,-141);
addOffice("Curule Aedile","LICI1500",-137,-137);
addOffice("Curule Aedile","SEMP1548",-135,-135);
addOffice("Curule Aedile","MINU1592",-135,-135);
addOffice("Curule Aedile","VALE1492",-135,-135);
addOffice("Curule Aedile","CAEC1635",-129,-129);
addOffice("Curule Aedile","AEMI1645",-122,-122);
addOffice("Curule Aedile","CAEC1787",-104,-104);
addOffice("Curule Aedile","OCTA2990",-100,-100);
addOffice("Curule Aedile","POST2993",-100,-100);
addOffice("Curule Aedile","LICI1679",-100,-100);
addOffice("Curule Aedile","MUCI1692",-100,-100);
addOffice("Curule Aedile","CLAU1753",-99,-99);
addOffice("Curule Aedile","VALE1802",-99,-99);
addOffice("Curule Aedile","VALE1802",-98,-98);
addOffice("Curule Aedile","PORC1831",-94,-94);
addOffice("Curule Aedile","CLAU1851",-91,-91);
addOffice("Curule Aedile","CLAU1807",-91,-91);
addOffice("Curule Aedile","IULI1798",-90,-90);
addOffice("Curule Aedile","FURI1987",-82,-82);
addOffice("Curule Aedile","LICI1903",-79,-79);
addOffice("Curule Aedile","TERE1982",-79,-79);
addOffice("Curule Aedile","SEIU2080",-74,-74);
addOffice("Curule Aedile","SULP2179",-69,-69);
addOffice("Curule Aedile","FLAM2229",-67,-67);
addOffice("Curule Aedile","PLAE2169",-67,-67);
addOffice("Curule Aedile","VALE1992",-66,-66);
addOffice("Curule Aedile","CALP2272",-65,-65);
addOffice("Curule Aedile","IULI1957",-65,-65);
addOffice("Curule Aedile","CALP2168",-64,-64);
addOffice("Curule Aedile","CORN2290",-63,-63);
addOffice("Curule Aedile","DOMI2264",-61,-61);
addOffice("Curule Aedile","BARR2985",-60,-60);
addOffice("Curule Aedile","LICI2301",-59,-59);
addOffice("Curule Aedile","VISE2027",-59,-59);
addOffice("Curule Aedile","AEMI2262",-58,-58);
addOffice("Curule Aedile","PLAU2265",-58,-58);
addOffice("Curule Aedile","FABI2379",-57,-57);
addOffice("Curule Aedile","CLOD2219",-56,-56);
addOffice("Curule Aedile","CLAU2396",-56,-56);
addOffice("Curule Aedile","CLAU2397",-56,-56);
addOffice("Curule Aedile","CLAU2398",-56,-56);
addOffice("Curule Aedile","AEMI2350",-56,-56);
addOffice("Curule Aedile","NONI2420",-55,-55);
addOffice("Curule Aedile","PLAN2312",-55,-55);
addOffice("Curule Aedile","PLAU2276",-55,-55);
addOffice("Curule Aedile","PLAU2276",-54,-54);
addOffice("Curule Aedile","PLAN2312",-54,-54);
addOffice("Curule Aedile","AEMI2341",-53,-53);
addOffice("Curule Aedile","CAEL2417",-50,-50);
addOffice("Curule Aedile","OCTA2467",-50,-50);
addOffice("Curule Aedile","TERE2930",-44,-44);
addOffice("Curule Aedile","TREB2671",-44,-44);
addOffice("Curule Aedile","TERE2581",-44,-44);
addOffice("Curule Aedile","BARB2800",-40,-40);
addOffice("Curule Aedile","PAQU3458",-31,-31);
addOffice("Decemvir","CLAU0113",-451,-451);
addOffice("Decemvir","GENU0168",-451,-451);
addOffice("Decemvir","VETU0134",-451,-451);
addOffice("Decemvir","VETU0169",-451,-451);
addOffice("Decemvir","VETU0170",-451,-451);
addOffice("Decemvir","IULI0085",-451,-451);
addOffice("Decemvir","MANL0105",-451,-451);
addOffice("Decemvir","SULP0138",-451,-451);
addOffice("Decemvir","SEST0172",-451,-451);
addOffice("Decemvir","CURI0164",-451,-451);
addOffice("Decemvir","ROMI0156",-451,-451);
addOffice("Decemvir","POST0125",-451,-451);
addOffice("Decemvir","SULP0138",-451,-451);
addOffice("Decemvir","CLAU0113",-450,-450);
addOffice("Decemvir","CORN0173",-450,-450);
addOffice("Decemvir","SERG0174",-450,-450);
addOffice("Decemvir","MINU0147",-450,-450);
addOffice("Decemvir","FABI0124",-450,-450);
addOffice("Decemvir","POET0175",-450,-450);
addOffice("Decemvir","ANTO0176",-450,-450);
addOffice("Decemvir","DUIL0177",-450,-450);
addOffice("Decemvir","OPPI0178",-450,-450);
addOffice("Decemvir","RABU0179",-450,-450);
addOffice("Decemvir","CLAU0113",-449,-449);
addOffice("Decemvir","CORN0173",-449,-449);
addOffice("Decemvir","SERG0174",-449,-449);
addOffice("Decemvir","MINU0147",-449,-449);
addOffice("Decemvir","FABI0124",-449,-449);
addOffice("Decemvir","POET0175",-449,-449);
addOffice("Decemvir","ANTO0176",-449,-449);
addOffice("Decemvir","DUIL0177",-449,-449);
addOffice("Decemvir","OPPI0178",-449,-449);
addOffice("Decemvir","RABU0179",-449,-449);
addOffice("Dictator","LARC0017",-501,-501);
addOffice("Dictator","VALE0022",-501,-501);
addOffice("Dictator","POST0027",-499,-499);
addOffice("Dictator","LARC0017",-498,-498);
addOffice("Dictator","POST0027",-496,-496);
addOffice("Dictator","VALE0037",-494,-494);
addOffice("Dictator","AEMI0131",-463,-463);
addOffice("Dictator","QUIN0142",-458,-458);
addOffice("Dictator","QUIN0142",-439,-439);
addOffice("Dictator","AEMI0203",-437,-437);
addOffice("Dictator","SERV0244",-435,-435);
addOffice("Dictator","AEMI0203",-434,-434);
addOffice("Dictator","POST0249",-431,-431);
addOffice("Dictator","AEMI0203",-426,-426);
addOffice("Dictator","SERV0244",-418,-418);
addOffice("Dictator","CORN0328",-408,-408);
addOffice("Dictator","FURI0340",-396,-396);
addOffice("Dictator","FURI0340",-390,-390);
addOffice("Dictator","FURI0340",-389,-389);
addOffice("Dictator","CORN0432",-385,-385);
addOffice("Dictator","QUIN0415",-380,-380);
addOffice("Dictator","FURI0340",-368,-368);
addOffice("Dictator","MANL0450",-368,-368);
addOffice("Dictator","FURI0340",-367,-367);
addOffice("Dictator","MANL0493",-363,-363);
addOffice("Dictator","CLAU0335",-362,-362);
addOffice("Dictator","QUIN0483",-361,-361);
addOffice("Dictator","SERV0490",-360,-360);
addOffice("Dictator","SULP0445",-358,-358);
addOffice("Dictator","MARC0505",-356,-356);
addOffice("Dictator","MANL0497",-353,-353);
addOffice("Dictator","IULI0512",-352,-352);
addOffice("Dictator","FABI0498",-351,-351);
addOffice("Dictator","FURI0414",-350,-350);
addOffice("Dictator","MANL0497",-349,-349);
addOffice("Dictator","FURI0526",-345,-345);
addOffice("Dictator","FURI0414",-345,-345);
addOffice("Dictator","VALE0511",-344,-344);
addOffice("Dictator","VALE0522",-342,-342);
addOffice("Dictator","PAPI0533",-340,-340);
addOffice("Dictator","PUBL0517",-339,-339);
addOffice("Dictator","CLAU0543",-337,-337);
addOffice("Dictator","AEMI0529",-335,-335);
addOffice("Dictator","CORN0550",-334,-334);
addOffice("Dictator","CORN0550",-333,-333);
addOffice("Dictator","PAPI0553",-332,-332);
addOffice("Dictator","QUIN0487",-331,-331);
addOffice("Dictator","CLAU0557",-327,-327);
addOffice("Dictator","PAPI0534",-325,-325);
addOffice("Dictator","PAPI0534",-324,-324);
addOffice("Dictator","CORN0510",-322,-322);
addOffice("Dictator","FABI0528",-321,-321);
addOffice("Dictator","AEMI0576",-321,-321);
addOffice("Dictator","MAEN0540",-320,-320);
addOffice("Dictator","CORN0565",-320,-320);
addOffice("Dictator","MANL0497",-320,-320);
addOffice("Dictator","AEMI0529",-316,-316);
addOffice("Dictator","FABI0559",-315,-315);
addOffice("Dictator","MAEN0540",-314,-314);
addOffice("Dictator","POET4611",-313,-313);
addOffice("Dictator","FABI0559",-313,-313);
addOffice("Dictator","SULP0541",-312,-312);
addOffice("Dictator","IUNI0587",-312,-312);
addOffice("Dictator","PAPI0534",-310,-310);
addOffice("Dictator","PAPI0534",-309,-309);
addOffice("Dictator","CORN0612",-306,-306);
addOffice("Dictator","IUNI0587",-302,-302);
addOffice("Dictator","VALE0522",-302,-302);
addOffice("Dictator","VALE0522",-301,-301);
addOffice("Dictator","HORT0664",-287,-287);
addOffice("Dictator","AEMI0671",-285,-285);
addOffice("Dictator","CLAU0591",-285,-285);
addOffice("Dictator","CORN0658",-285,-285);
addOffice("Dictator","DOMI0638",-280,-280);
addOffice("Dictator","FULV0629",-263,-263);
addOffice("Dictator","OGUL0632",-257,-257);
addOffice("Dictator","CLAU0754",-249,-249);
addOffice("Dictator","ATIL0727",-249,-249);
addOffice("Dictator","CORU0683",-246,-246);
addOffice("Dictator","DUIL0724",-231,-231);
addOffice("Dictator","CAEC0751",-224,-224);
addOffice("Dictator","FABI0712",-221,-221);
addOffice("Dictator","MINU0820",-219,-219);
addOffice("Dictator","FABI0712",-217,-217);
addOffice("Dictator","VETU0824",-217,-217);
addOffice("Dictator","IUNI0797",-216,-216);
addOffice("Dictator","FABI0762",-216,-216);
addOffice("Dictator","CLAU0776",-213,-213);
addOffice("Dictator","FULV0781",-210,-210);
addOffice("Dictator","MANL0787",-208,-208);
addOffice("Dictator","LIVI0827",-207,-207);
addOffice("Dictator","CAEC0891",-205,-205);
addOffice("Dictator","SULP0936",-203,-203);
addOffice("Dictator","SERV0931",-202,-202);
addOffice("Dictator","CORN1746",-82,-82);
addOffice("Dictator","CORN1746",-81,-81);
addOffice("Dictator","CORN1746",-80,-80);
addOffice("Dictator","IULI1957",-49,-49);
addOffice("Dictator","IULI1957",-48,-48);
addOffice("Dictator","IULI1957",-47,-47);
addOffice("Dictator","IULI1957",-46,-46);
addOffice("Dictator","IULI1957",-45,-45);
addOffice("Dictator","IULI1957",-44,-44);
addOffice("Dictator","IULI1957",-44,-44);
addOffice("Interrex","LUCR0004",-509,-509);
addOffice("Interrex","SEMP0028",-482,-482);
addOffice("Interrex","LARC0012",-482,-482);
addOffice("Interrex","AEMI0131",-463,-463);
addOffice("Interrex","VALE0051",-462,-462);
addOffice("Interrex","QUIN0114",-444,-444);
addOffice("Interrex","PAPI0212",-420,-420);
addOffice("Interrex","FABI0311",-413,-413);
addOffice("Interrex","VALE0306",-396,-396);
addOffice("Interrex","SERV0342",-396,-396);
addOffice("Interrex","FURI0340",-396,-396);
addOffice("Interrex","FURI0340",-391,-391);
addOffice("Interrex","CORN0376",-391,-391);
addOffice("Interrex","VALE0306",-391,-391);
addOffice("Interrex","CORN0376",-389,-389);
addOffice("Interrex","FURI0340",-389,-389);
addOffice("Interrex","MANL0391",-387,-387);
addOffice("Interrex","SULP0388",-387,-387);
addOffice("Interrex","VALE0306",-387,-387);
addOffice("Interrex","SERV0490",-355,-355);
addOffice("Interrex","FABI0498",-355,-355);
addOffice("Interrex","MANL0500",-355,-355);
addOffice("Interrex","FABI0501",-355,-355);
addOffice("Interrex","SULP0445",-355,-355);
addOffice("Interrex","AEMI0484",-355,-355);
addOffice("Interrex","CORN0513",-352,-352);
addOffice("Interrex","SULP0445",-351,-351);
addOffice("Interrex","FABI0498",-351,-351);
addOffice("Interrex","VALE0522",-340,-340);
addOffice("Interrex","FABI0498",-340,-340);
addOffice("Interrex","FABI0524",-340,-340);
addOffice("Interrex","VALE0522",-332,-332);
addOffice("Interrex","AEMI0529",-326,-326);
addOffice("Interrex","FABI0559",-320,-320);
addOffice("Interrex","VALE0522",-320,-320);
addOffice("Interrex","CLAU0591",-298,-298);
addOffice("Interrex","SULP0617",-298,-298);
addOffice("Interrex","POST0609",-291,-291);
addOffice("Interrex","FABI0712",-222,-222);
addOffice("Interrex","CLAU0776",-216,-216);
addOffice("Interrex","CORN0819",-216,-216);
addOffice("Interrex","FABI0712",-208,-208);
addOffice("Interrex","AEMI1134",-162,-162);
addOffice("Interrex","VALE1815",-82,-82);
addOffice("Interrex","CLAU1807",-77,-77);
addOffice("Interrex","VALE2107",-55,-55);
addOffice("Interrex","CAEC2347",-53,-53);
addOffice("Interrex","VALE2107",-53,-53);
addOffice("Interrex","AEMI2341",-52,-52);
addOffice("Interrex","SULP2088",-52,-52);
addOffice("Interrex","VALE2107",-52,-52);
addOffice("Master of the Horse","CASS0020",-501,-501);
addOffice("Master of the Horse","AEBU0025",-499,-499);
addOffice("Master of the Horse","AEBU0025",-496,-496);
addOffice("Master of the Horse","SERV0038",-494,-494);
addOffice("Master of the Horse","TARQ0148",-458,-458);
addOffice("Master of the Horse","SERV0226",-439,-439);
addOffice("Master of the Horse","QUIN0231",-437,-437);
addOffice("Master of the Horse","AEBU0215",-435,-435);
addOffice("Master of the Horse","POST0249",-434,-434);
addOffice("Master of the Horse","IULI0261",-431,-431);
addOffice("Master of the Horse","CORN0239",-426,-426);
addOffice("Master of the Horse","SERV0266",-418,-418);
addOffice("Master of the Horse","SERV0327",-408,-408);
addOffice("Master of the Horse","CORN0373",-396,-396);
addOffice("Master of the Horse","VALE0381",-390,-390);
addOffice("Master of the Horse","VALE0306",-390,-390);
addOffice("Master of the Horse","SERV0411",-389,-389);
addOffice("Master of the Horse","QUIN0415",-385,-385);
addOffice("Master of the Horse","SEMP0448",-380,-380);
addOffice("Master of the Horse","AEMI0484",-368,-368);
addOffice("Master of the Horse","LICI0481",-368,-368);
addOffice("Master of the Horse","QUIN0476",-367,-367);
addOffice("Master of the Horse","QUIN0483",-367,-367);
addOffice("Master of the Horse","PINA0494",-363,-363);
addOffice("Master of the Horse","CORN0495",-362,-362);
addOffice("Master of the Horse","CORN0426",-361,-361);
addOffice("Master of the Horse","QUIN0483",-360,-360);
addOffice("Master of the Horse","VALE0503",-358,-358);
addOffice("Master of the Horse","PLAU0502",-356,-356);
addOffice("Master of the Horse","CORN0510",-353,-353);
addOffice("Master of the Horse","AEMI0484",-352,-352);
addOffice("Master of the Horse","SERV0490",-351,-351);
addOffice("Master of the Horse","CORN0519",-350,-350);
addOffice("Master of the Horse","CORN0510",-349,-349);
addOffice("Master of the Horse","MANL0500",-345,-345);
addOffice("Master of the Horse","FABI0528",-344,-344);
addOffice("Master of the Horse","AEMI0529",-342,-342);
addOffice("Master of the Horse","PAPI0534",-340,-340);
addOffice("Master of the Horse","IUNI0539",-339,-339);
addOffice("Master of the Horse","CLAU0544",-337,-337);
addOffice("Master of the Horse","PUBL0517",-335,-335);
addOffice("Master of the Horse","ANTO0551",-334,-334);
addOffice("Master of the Horse","ANTO0551",-333,-333);
addOffice("Master of the Horse","VALE0429",-332,-332);
addOffice("Master of the Horse","VALE0556",-331,-331);
addOffice("Master of the Horse","VALE0577",-331,-331);
addOffice("Master of the Horse","POST0548",-327,-327);
addOffice("Master of the Horse","FABI0559",-325,-325);
addOffice("Master of the Horse","FABI0559",-324,-324);
addOffice("Master of the Horse","FABI0498",-322,-322);
addOffice("Master of the Horse","AELI0542",-321,-321);
addOffice("Master of the Horse","VALE0577",-321,-321);
addOffice("Master of the Horse","FOLI0579",-320,-320);
addOffice("Master of the Horse","PAPI0534",-320,-320);
addOffice("Master of the Horse","PAPI0534",-320,-320);
addOffice("Master of the Horse","FULV0572",-316,-316);
addOffice("Master of the Horse","AULI0571",-315,-315);
addOffice("Master of the Horse","FOLI0579",-314,-314);
addOffice("Master of the Horse","FOLI0579",-313,-313);
addOffice("Master of the Horse","POET0593",-313,-313);
addOffice("Master of the Horse","IUNI0587",-312,-312);
addOffice("Master of the Horse","IUNI0587",-310,-310);
addOffice("Master of the Horse","IUNI0587",-309,-309);
addOffice("Master of the Horse","DECI0596",-306,-306);
addOffice("Master of the Horse","TITI0626",-302,-302);
addOffice("Master of the Horse","FABI0559",-302,-302);
addOffice("Master of the Horse","AEMI0625",-302,-302);
addOffice("Master of the Horse","FABI0559",-301,-301);
addOffice("Master of the Horse","AEMI0625",-301,-301);
addOffice("Master of the Horse","MARC0681",-263,-263);
addOffice("Master of the Horse","LAET0733",-257,-257);
addOffice("Master of the Horse","CAEC0751",-249,-249);
addOffice("Master of the Horse","FULV0699",-246,-246);
addOffice("Master of the Horse","AURE0746",-231,-231);
addOffice("Master of the Horse","FABI0757",-224,-224);
addOffice("Master of the Horse","FLAM0793",-221,-221);
addOffice("Master of the Horse","MINU0820",-217,-217);
addOffice("Master of the Horse","POMP0853",-217,-217);
addOffice("Master of the Horse","SEMP0866",-216,-216);
addOffice("Master of the Horse","FULV0781",-213,-213);
addOffice("Master of the Horse","LICI0926",-210,-210);
addOffice("Master of the Horse","SERV0931",-208,-208);
addOffice("Master of the Horse","CAEC0891",-207,-207);
addOffice("Master of the Horse","VETU0949",-205,-205);
addOffice("Master of the Horse","SERV0953",-203,-203);
addOffice("Master of the Horse","AELI1006",-202,-202);
addOffice("Master of the Horse","VALE1815",-82,-82);
addOffice("Master of the Horse","VALE1815",-81,-81);
addOffice("Master of the Horse","VALE1815",-80,-80);
addOffice("Master of the Horse","VALE1815",-79,-79);
addOffice("Master of the Horse","ANTO2392",-48,-48);
addOffice("Master of the Horse","ANTO2392",-47,-47);
addOffice("Master of the Horse","AEMI2341",-46,-46);
addOffice("Master of the Horse","AEMI2341",-45,-45);
addOffice("Master of the Horse","AEMI2341",-44,-44);
addOffice("Plebeian Aedile","SICI0043",-492,-492);
addOffice("Plebeian Aedile","IUNI0040",-492,-492);
addOffice("Plebeian Aedile","IUNI0053",-491,-491);
addOffice("Plebeian Aedile","VISC0044",-491,-491);
addOffice("Plebeian Aedile","ALIE0155",-454,-454);
addOffice("Plebeian Aedile","MARC0224",-440,-440);
addOffice("Plebeian Aedile","AELI0644",-296,-296);
addOffice("Plebeian Aedile","FULV0645",-296,-296);
addOffice("Plebeian Aedile","FUND0755",-246,-246);
addOffice("Plebeian Aedile","SEMP0761",-246,-246);
addOffice("Plebeian Aedile","PUBL0770",-241,-241);
addOffice("Plebeian Aedile","PUBL0771",-241,-241);
addOffice("Plebeian Aedile","SCAN0811",-226,-226);
addOffice("Plebeian Aedile","TERE0818",-221,-221);
addOffice("Plebeian Aedile","AURE0870",-216,-216);
addOffice("Plebeian Aedile","CLAU0871",-216,-216);
addOffice("Plebeian Aedile","FUND0913",-213,-213);
addOffice("Plebeian Aedile","VILL0914",-213,-213);
addOffice("Plebeian Aedile","MEMM0940",-211,-211);
addOffice("Plebeian Aedile","CATI0961",-210,-210);
addOffice("Plebeian Aedile","PORC0948",-210,-210);
addOffice("Plebeian Aedile","SERV0931",-209,-209);
addOffice("Plebeian Aedile","CAEC0891",-209,-209);
addOffice("Plebeian Aedile","MAMI0982",-208,-208);
addOffice("Plebeian Aedile","CAEC0996",-208,-208);
addOffice("Plebeian Aedile","POMP1010",-207,-207);
addOffice("Plebeian Aedile","MAMI1011",-207,-207);
addOffice("Plebeian Aedile","LUCR1020",-206,-206);
addOffice("Plebeian Aedile","OCTA0880",-206,-206);
addOffice("Plebeian Aedile","CLAU1014",-205,-205);
addOffice("Plebeian Aedile","IUNI1025",-205,-205);
addOffice("Plebeian Aedile","AELI1006",-204,-204);
addOffice("Plebeian Aedile","VILL1034",-204,-204);
addOffice("Plebeian Aedile","SEXT1043",-203,-203);
addOffice("Plebeian Aedile","TREM1021",-203,-203);
addOffice("Plebeian Aedile","AELI1057",-202,-202);
addOffice("Plebeian Aedile","LAET1058",-202,-202);
addOffice("Plebeian Aedile","APUS1088",-201,-201);
addOffice("Plebeian Aedile","MINU1062",-201,-201);
addOffice("Plebeian Aedile","BAEB1035",-200,-200);
addOffice("Plebeian Aedile","TERE1075",-200,-200);
addOffice("Plebeian Aedile","CINC2986",-200,-200);
addOffice("Plebeian Aedile","PORC0907",-199,-199);
addOffice("Plebeian Aedile","HELV1046",-199,-199);
addOffice("Plebeian Aedile","SEMP1092",-198,-198);
addOffice("Plebeian Aedile","HELV1093",-198,-198);
addOffice("Plebeian Aedile","ACIL1063",-197,-197);
addOffice("Plebeian Aedile","LAEL0992",-197,-197);
addOffice("Plebeian Aedile","DOMI1110",-196,-196);
addOffice("Plebeian Aedile","SCRI1111",-196,-196);
addOffice("Plebeian Aedile","PUBL1129",-195,-195);
addOffice("Plebeian Aedile","OPPI1105",-193,-193);
addOffice("Plebeian Aedile","IUNI1131",-193,-193);
addOffice("Plebeian Aedile","CAEC1193",-189,-189);
addOffice("Plebeian Aedile","FULV1194",-189,-189);
addOffice("Plebeian Aedile","FURI1213",-187,-187);
addOffice("Plebeian Aedile","SEMP1214",-187,-187);
addOffice("Plebeian Aedile","PUPI1233",-185,-185);
addOffice("Plebeian Aedile","SICI1234",-185,-185);
addOffice("Plebeian Aedile","SERV1342",-173,-173);
addOffice("Plebeian Aedile","MENA2988",-150,-150);
addOffice("Plebeian Aedile","LUCR1603",-133,-133);
addOffice("Plebeian Aedile","PACU3768",-100,-100);
addOffice("Plebeian Aedile","CRIT1971",-86,-86);
addOffice("Plebeian Aedile","FANN1972",-86,-86);
addOffice("Plebeian Aedile","POMP1988",-82,-82);
addOffice("Plebeian Aedile","CAES2180",-69,-69);
addOffice("Plebeian Aedile","TULL2072",-69,-69);
addOffice("Plebeian Aedile","GALL2230",-67,-67);
addOffice("Plebeian Aedile","VOCO2231",-67,-67);
addOffice("Plebeian Aedile","CAEC2040",-67,-67);
addOffice("Plebeian Aedile","TULL2216",-65,-65);
addOffice("Plebeian Aedile","VERG2267",-65,-65);
addOffice("Plebeian Aedile","OCTA2104",-64,-64);
addOffice("Plebeian Aedile","TORA2106",-64,-64);
addOffice("Plebeian Aedile","LICI2331",-60,-60);
addOffice("Plebeian Aedile","CALP5166",-57,-57);
addOffice("Plebeian Aedile","COSC2348",-57,-57);
addOffice("Plebeian Aedile","MESS2386",-55,-55);
addOffice("Plebeian Aedile","AELI2635",-45,-45);
addOffice("Plebeian Aedile","CUSI2665",-45,-45);
addOffice("Pontifex Maximus","FURI0219",-449,-449);
addOffice("Pontifex Maximus","FURI0193",-449,-449);
addOffice("Pontifex Maximus","PAPI0220",-441,-441);
addOffice("Pontifex Maximus","CORN5169",-431,-431);
addOffice("Pontifex Maximus","CORN0239",-431,-431);
addOffice("Pontifex Maximus","MINU0290",-420,-420);
addOffice("Pontifex Maximus","CORN0563",-332,-328);
addOffice("Pontifex Maximus","CORN0621",-304,-304);
addOffice("Pontifex Maximus","CORN0555",-290,-254);
addOffice("Pontifex Maximus","CORU0683",-254,-243);
addOffice("Pontifex Maximus","CAEC0751",-243,-221);
addOffice("Pontifex Maximus","CORN0780",-221,-218);
addOffice("Pontifex Maximus","CORN0780",-217,-213);
addOffice("Pontifex Maximus","LICI0926",-212,-183);
addOffice("Pontifex Maximus","SERV0931",-183,-180);
addOffice("Pontifex Maximus","AEMI1067",-180,-152);
addOffice("Pontifex Maximus","CORN1396",-150,-141);
addOffice("Pontifex Maximus","CORN1513",-141,-133);
addOffice("Pontifex Maximus","LICI1500",-132,-130);
addOffice("Pontifex Maximus","CORN1513",-132,-132);
addOffice("Pontifex Maximus","CAEC1649",-130,-115);
addOffice("Pontifex Maximus","MUCI1567",-130,-124);
addOffice("Pontifex Maximus","MUCI1567",-123,-115);
addOffice("Pontifex Maximus","MUCI1692",-115,-83);
addOffice("Pontifex Maximus","CAEC1649",-114,-114);
addOffice("Pontifex Maximus","SERV1629",-107,-103);
addOffice("Pontifex Maximus","DOMI1763",-103,-92);
addOffice("Pontifex Maximus","DOMI1763",-91,-89);
addOffice("Pontifex Maximus","MUCI1692",-82,-82);
addOffice("Pontifex Maximus","CAEC1889",-81,-64);
addOffice("Pontifex Maximus","IULI1957",-63,-44);
addOffice("Pontifex Maximus","AEMI2341",-44,-31);
addOffice("Praetor","ANON4685",-509,-509);
addOffice("Praetor","BARB3308",-509,-509);
addOffice("Praetor","ANON2994",-509,-509);
addOffice("Praetor","CALP3756",-509,-509);
addOffice("Praetor","CLAU2948",-400,-400);
addOffice("Praetor","GENU2956",-400,-400);
addOffice("Praetor","FURI0486",-366,-366);
addOffice("Praetor","VALE0511",-350,-350);
addOffice("Praetor","PINA0494",-349,-349);
addOffice("Praetor","VALE0522",-347,-347);
addOffice("Praetor","AEMI0538",-341,-341);
addOffice("Praetor","PAPI0533",-340,-340);
addOffice("Praetor","PUBL0517",-336,-336);
addOffice("Praetor","PAPI0533",-332,-332);
addOffice("Praetor","PAPI0585",-332,-332);
addOffice("Praetor","PAPI0534",-332,-332);
addOffice("Praetor","PLAU0584",-322,-322);
addOffice("Praetor","PLAU0560",-322,-322);
addOffice("Praetor","FURI0586",-318,-318);
addOffice("Praetor","VALE0522",-308,-308);
addOffice("Praetor","DOMI2957",-300,-300);
addOffice("Praetor","AEMI2940",-300,-300);
addOffice("Praetor","ANNI3451",-300,-300);
addOffice("Praetor","CLAU0591",-297,-297);
addOffice("Praetor","SEMP0603",-296,-296);
addOffice("Praetor","CLAU0591",-295,-295);
addOffice("Praetor","ATIL0647",-293,-293);
addOffice("Praetor","PAPI0640",-292,-292);
addOffice("Praetor","CAEC0673",-283,-283);
addOffice("Praetor","MARC0681",-280,-280);
addOffice("Praetor","GENU0687",-273,-273);
addOffice("Praetor","MINU3348",-270,-270);
addOffice("Praetor","LIVI3349",-268,-268);
addOffice("Praetor","LIVI4992",-268,-268);
addOffice("Praetor","ATIL0727",-257,-257);
addOffice("Praetor","POST0718",-253,-253);
addOffice("Praetor","VALE0767",-242,-242);
addOffice("Praetor","CORN0790",-234,-234);
addOffice("Praetor","POST0788",-233,-233);
addOffice("Praetor","FLAM0793",-227,-227);
addOffice("Praetor","VALE0807",-227,-227);
addOffice("Praetor","CLAU0810",-224,-224);
addOffice("Praetor","FURI0814",-224,-224);
addOffice("Praetor","LIVI0827",-221,-221);
addOffice("Praetor","FURI0828",-219,-219);
addOffice("Praetor","AELI2943",-219,-219);
addOffice("Praetor","BAEB0830",-219,-219);
addOffice("Praetor","MANL0836",-219,-219);
addOffice("Praetor","TERE0841",-219,-219);
addOffice("Praetor","SERV0845",-219,-219);
addOffice("Praetor","ANNI0846",-219,-219);
addOffice("Praetor","ACIL0847",-219,-219);
addOffice("Praetor","POMP0853",-219,-219);
addOffice("Praetor","QUIN0865",-219,-219);
addOffice("Praetor","AELI0889",-219,-219);
addOffice("Praetor","PAPI0921",-219,-219);
addOffice("Praetor","BAEB3351",-219,-219);
addOffice("Praetor","CORN3352",-219,-219);
addOffice("Praetor","AURE1054",-219,-219);
addOffice("Praetor","AEMI4635",-218,-218);
addOffice("Praetor","ATIL0835",-218,-218);
addOffice("Praetor","MANL0836",-218,-218);
addOffice("Praetor","TERE0818",-218,-218);
addOffice("Praetor","ATIL0888",-218,-218);
addOffice("Praetor","AEMI0854",-217,-217);
addOffice("Praetor","CORN0855",-217,-217);
addOffice("Praetor","OTAC0856",-217,-217);
addOffice("Praetor","POMP0857",-217,-217);
addOffice("Praetor","POMP0853",-217,-217);
addOffice("Praetor","CLAU0810",-216,-216);
addOffice("Praetor","FURI0814",-216,-216);
addOffice("Praetor","POST0788",-216,-216);
addOffice("Praetor","POMP0853",-216,-216);
addOffice("Praetor","POMP0857",-216,-216);
addOffice("Praetor","CLAU0858",-215,-215);
addOffice("Praetor","FULV0781",-215,-215);
addOffice("Praetor","MUCI0822",-215,-215);
addOffice("Praetor","VALE0807",-215,-215);
addOffice("Praetor","CORN0903",-214,-214);
addOffice("Praetor","FABI0879",-214,-214);
addOffice("Praetor","FULV0781",-214,-214);
addOffice("Praetor","OTAC0856",-214,-214);
addOffice("Praetor","AEMI4635",-213,-213);
addOffice("Praetor","ATIL0912",-213,-213);
addOffice("Praetor","FULV0904",-213,-213);
addOffice("Praetor","SEMP0882",-213,-213);
addOffice("Praetor","CLAU0908",-212,-212);
addOffice("Praetor","CORN0923",-212,-212);
addOffice("Praetor","FULV0924",-212,-212);
addOffice("Praetor","IUNI0925",-212,-212);
addOffice("Praetor","CALP0966",-211,-211);
addOffice("Praetor","CORN0815",-211,-211);
addOffice("Praetor","CORN0938",-211,-211);
addOffice("Praetor","SULP0939",-211,-211);
addOffice("Praetor","CINC0957",-210,-210);
addOffice("Praetor","LAET0869",-210,-210);
addOffice("Praetor","MANL0958",-210,-210);
addOffice("Praetor","MANL0959",-210,-210);
addOffice("Praetor","AURU0983",-209,-209);
addOffice("Praetor","HOST0984",-209,-209);
addOffice("Praetor","QUIN0916",-209,-209);
addOffice("Praetor","VETU0949",-209,-209);
addOffice("Praetor","CLAU0994",-208,-208);
addOffice("Praetor","IULI0995",-208,-208);
addOffice("Praetor","LICI0926",-208,-208);
addOffice("Praetor","LICI0960",-208,-208);
addOffice("Praetor","QUIN3355",-208,-208);
addOffice("Praetor","HOST1007",-207,-207);
addOffice("Praetor","HOST1008",-207,-207);
addOffice("Praetor","MAMI0982",-207,-207);
addOffice("Praetor","PORC0948",-207,-207);
addOffice("Praetor","CAEC0996",-206,-206);
addOffice("Praetor","CLAU1019",-206,-206);
addOffice("Praetor","MAMI1011",-206,-206);
addOffice("Praetor","SERV0931",-206,-206);
addOffice("Praetor","AEMI2939",-205,-205);
addOffice("Praetor","AEMI1024",-205,-205);
addOffice("Praetor","SERV0919",-205,-205);
addOffice("Praetor","LUCR1020",-205,-205);
addOffice("Praetor","OCTA0880",-205,-205);
addOffice("Praetor","CLAU1032",-204,-204);
addOffice("Praetor","MARC1033",-204,-204);
addOffice("Praetor","POMP1010",-204,-204);
addOffice("Praetor","SCRI0874",-204,-204);
addOffice("Praetor","AELI1006",-203,-203);
addOffice("Praetor","CORN0986",-203,-203);
addOffice("Praetor","QUIN1041",-203,-203);
addOffice("Praetor","VILL1034",-203,-203);
addOffice("Praetor","AURE1054",-202,-202);
addOffice("Praetor","LIVI0952",-202,-202);
addOffice("Praetor","SEXT1043",-202,-202);
addOffice("Praetor","TREM1021",-202,-202);
addOffice("Praetor","AELI1057",-201,-201);
addOffice("Praetor","FABI1042",-201,-201);
addOffice("Praetor","IUNI1025",-201,-201);
addOffice("Praetor","VALE1022",-201,-201);
addOffice("Praetor","AELI2942",-200,-200);
addOffice("Praetor","MANL2967",-200,-200);
addOffice("Praetor","RABI3106",-200,-200);
addOffice("Praetor","OCTA3405",-200,-200);
addOffice("Praetor","MARC3408",-200,-200);
addOffice("Praetor","FURI3409",-200,-200);
addOffice("Praetor","AUFI3313",-200,-200);
addOffice("Praetor","CORN3412",-200,-200);
addOffice("Praetor","FULV1051",-200,-200);
addOffice("Praetor","FURI0967",-200,-200);
addOffice("Praetor","MINU1062",-200,-200);
addOffice("Praetor","SERG1073",-200,-200);
addOffice("Praetor","BAEB1035",-199,-199);
addOffice("Praetor","QUIN0977",-199,-199);
addOffice("Praetor","VALE0930",-199,-199);
addOffice("Praetor","VILL0914",-199,-199);
addOffice("Praetor","CLAU0997",-198,-198);
addOffice("Praetor","CORN1091",-198,-198);
addOffice("Praetor","HELV1046",-198,-198);
addOffice("Praetor","PORC0907",-198,-198);
addOffice("Praetor","ATIL1099",-197,-197);
addOffice("Praetor","HELV1093",-197,-197);
addOffice("Praetor","MANL1100",-197,-197);
addOffice("Praetor","MINU1101",-197,-197);
addOffice("Praetor","SEMP1092",-197,-197);
addOffice("Praetor","SERG1102",-197,-197);
addOffice("Praetor","ACIL3356",-197,-197);
addOffice("Praetor","ACIL1063",-196,-196);
addOffice("Praetor","APUS1088",-196,-196);
addOffice("Praetor","FABI1097",-196,-196);
addOffice("Praetor","LAEL0992",-196,-196);
addOffice("Praetor","MINU1064",-196,-196);
addOffice("Praetor","SEMP0976",-196,-196);
addOffice("Praetor","ATIN1113",-195,-195);
addOffice("Praetor","CLAU1095",-195,-195);
addOffice("Praetor","FABR1127",-195,-195);
addOffice("Praetor","MANL1103",-195,-195);
addOffice("Praetor","MANL1128",-195,-195);
addOffice("Praetor","PORC1084",-195,-195);
addOffice("Praetor","CORN1085",-194,-194);
addOffice("Praetor","CORN1137",-194,-194);
addOffice("Praetor","CORN1077",-194,-194);
addOffice("Praetor","DIGI1138",-194,-194);
addOffice("Praetor","DOMI1110",-194,-194);
addOffice("Praetor","IUVE1139",-194,-194);
addOffice("Praetor","CORN1016",-193,-193);
addOffice("Praetor","FLAM0989",-193,-193);
addOffice("Praetor","FULV1109",-193,-193);
addOffice("Praetor","PORC1154",-193,-193);
addOffice("Praetor","SCRI1111",-193,-193);
addOffice("Praetor","VALE1201",-193,-193);
addOffice("Praetor","ATIL1140",-192,-192);
addOffice("Praetor","BAEB1163",-192,-192);
addOffice("Praetor","FULV1164",-192,-192);
addOffice("Praetor","SALO1165",-192,-192);
addOffice("Praetor","VALE1133",-192,-192);
addOffice("Praetor","SCRI1141",-192,-192);
addOffice("Praetor","AEMI1067",-191,-191);
addOffice("Praetor","AEMI1134",-191,-191);
addOffice("Praetor","CORN1169",-191,-191);
addOffice("Praetor","IUNI1131",-191,-191);
addOffice("Praetor","LIVI0952",-191,-191);
addOffice("Praetor","OPPI1105",-191,-191);
addOffice("Praetor","AEMI1175",-190,-190);
addOffice("Praetor","ATIN1176",-190,-190);
addOffice("Praetor","AURU1177",-190,-190);
addOffice("Praetor","FULV1178",-190,-190);
addOffice("Praetor","IUNI1132",-190,-190);
addOffice("Praetor","TUCC1166",-190,-190);
addOffice("Praetor","BAEB1052",-189,-189);
addOffice("Praetor","FABI1117",-189,-189);
addOffice("Praetor","FABI1188",-189,-189);
addOffice("Praetor","PLAU1190",-189,-189);
addOffice("Praetor","POST1170",-189,-189);
addOffice("Praetor","SEMP1157",-189,-189);
addOffice("Praetor","ATIN1220",-188,-188);
addOffice("Praetor","CLAU1229",-188,-188);
addOffice("Praetor","CLAU1118",-188,-188);
addOffice("Praetor","MANL1204",-188,-188);
addOffice("Praetor","MARC1205",-188,-188);
addOffice("Praetor","STER1206",-188,-188);
addOffice("Praetor","CLAU1191",-187,-187);
addOffice("Praetor","FULV1194",-187,-187);
addOffice("Praetor","FURI1081",-187,-187);
addOffice("Praetor","SULP1192",-187,-187);
addOffice("Praetor","TERE1075",-187,-187);
addOffice("Praetor","TERE1135",-187,-187);
addOffice("Praetor","AURE1221",-186,-186);
addOffice("Praetor","CALP1222",-186,-186);
addOffice("Praetor","CORN1223",-186,-186);
addOffice("Praetor","LICI1224",-186,-186);
addOffice("Praetor","MAEN1225",-186,-186);
addOffice("Praetor","QUIN1226",-186,-186);
addOffice("Praetor","AFRA1227",-185,-185);
addOffice("Praetor","ATIL1228",-185,-185);
addOffice("Praetor","CLAU1229",-185,-185);
addOffice("Praetor","POST1172",-185,-185);
addOffice("Praetor","POST1231",-185,-185);
addOffice("Praetor","MANL1151",-185,-185);
addOffice("Praetor","CORN1212",-185,-185);
addOffice("Praetor","CORN1238",-184,-184);
addOffice("Praetor","NAEV1240",-184,-184);
addOffice("Praetor","SEMP1214",-184,-184);
addOffice("Praetor","SEMP1241",-184,-184);
addOffice("Praetor","TERE1183",-184,-184);
addOffice("Praetor","CORN1249",-183,-183);
addOffice("Praetor","IULI1250",-183,-183);
addOffice("Praetor","POST1251",-183,-183);
addOffice("Praetor","PUPI1233",-183,-183);
addOffice("Praetor","SICI1234",-183,-183);
addOffice("Praetor","VALE0993",-183,-183);
addOffice("Praetor","CAEC1254",-182,-182);
addOffice("Praetor","FULV1242",-182,-182);
addOffice("Praetor","MANL1128",-182,-182);
addOffice("Praetor","OGUL1255",-182,-182);
addOffice("Praetor","TERE1256",-182,-182);
addOffice("Praetor","VALE1232",-182,-182);
addOffice("Praetor","CLAU1235",-181,-181);
addOffice("Praetor","DURO1262",-181,-181);
addOffice("Praetor","FABI1263",-181,-181);
addOffice("Praetor","FABI1209",-181,-181);
addOffice("Praetor","PINA1264",-181,-181);
addOffice("Praetor","FABI1208",-181,-181);
addOffice("Praetor","PETI1219",-181,-181);
addOffice("Praetor","CORN1274",-180,-180);
addOffice("Praetor","HOST1275",-180,-180);
addOffice("Praetor","MAEN1276",-180,-180);
addOffice("Praetor","MINU1277",-180,-180);
addOffice("Praetor","POST1278",-180,-180);
addOffice("Praetor","SEMP1182",-180,-180);
addOffice("Praetor","CORN1090",-179,-179);
addOffice("Praetor","MUCI1288",-179,-179);
addOffice("Praetor","MUCI1289",-179,-179);
addOffice("Praetor","VALE1200",-179,-179);
addOffice("Praetor","AEBU1253",-178,-178);
addOffice("Praetor","CLAU1295",-178,-178);
addOffice("Praetor","CLUV1296",-178,-178);
addOffice("Praetor","FONT1297",-178,-178);
addOffice("Praetor","TITI1298",-178,-178);
addOffice("Praetor","TITI1168",-178,-178);
addOffice("Praetor","AELI1057",-177,-177);
addOffice("Praetor","CORN1309",-177,-177);
addOffice("Praetor","MUMM1216",-177,-177);
addOffice("Praetor","NUMI1310",-177,-177);
addOffice("Praetor","QUIN1311",-177,-177);
addOffice("Praetor","VALE1200",-177,-177);
addOffice("Praetor","ABUR1215",-176,-176);
addOffice("Praetor","AQUI1319",-176,-176);
addOffice("Praetor","CORN1320",-176,-176);
addOffice("Praetor","LICI1321",-176,-176);
addOffice("Praetor","PAPI1322",-176,-176);
addOffice("Praetor","POPI1283",-176,-176);
addOffice("Praetor","MAEV3460",-176,-176);
addOffice("Praetor","AELI1324",-175,-175);
addOffice("Praetor","BAEB1325",-175,-175);
addOffice("Praetor","CLAU1290",-175,-175);
addOffice("Praetor","LUTA1327",-175,-175);
addOffice("Praetor","POPI1328",-175,-175);
addOffice("Praetor","CORN1326",-175,-175);
addOffice("Praetor","ATIL1329",-174,-174);
addOffice("Praetor","CASS1304",-174,-174);
addOffice("Praetor","CLAU1330",-174,-174);
addOffice("Praetor","CORN1331",-174,-174);
addOffice("Praetor","FURI1332",-174,-174);
addOffice("Praetor","SERV1291",-174,-174);
addOffice("Praetor","ATIL1187",-174,-174);
addOffice("Praetor","ATIL1140",-173,-173);
addOffice("Praetor","CICE1340",-173,-173);
addOffice("Praetor","CLUV1296",-173,-173);
addOffice("Praetor","FABI1341",-173,-173);
addOffice("Praetor","FURI1081",-173,-173);
addOffice("Praetor","MATI1273",-173,-173);
addOffice("Praetor","CLUV1352",-172,-172);
addOffice("Praetor","IUNI1353",-172,-172);
addOffice("Praetor","LICI1354",-172,-172);
addOffice("Praetor","LUCR1355",-172,-172);
addOffice("Praetor","MEMM1333",-172,-172);
addOffice("Praetor","SICI1234",-172,-172);
addOffice("Praetor","CANI1367",-171,-171);
addOffice("Praetor","CANU1334",-171,-171);
addOffice("Praetor","FURI1323",-171,-171);
addOffice("Praetor","LUCR1272",-171,-171);
addOffice("Praetor","SULP1336",-171,-171);
addOffice("Praetor","VILL1279",-171,-171);
addOffice("Praetor","AELI1312",-170,-170);
addOffice("Praetor","DOMI1366",-170,-170);
addOffice("Praetor","HORT1382",-170,-170);
addOffice("Praetor","MAEN1383",-170,-170);
addOffice("Praetor","MANL1384",-170,-170);
addOffice("Praetor","TREM1345",-170,-170);
addOffice("Praetor","RAEC1385",-170,-170);
addOffice("Praetor","CLAU1318",-169,-169);
addOffice("Praetor","CORN1363",-169,-169);
addOffice("Praetor","DECI1373",-169,-169);
addOffice("Praetor","FONT1394",-169,-169);
addOffice("Praetor","MARC1395",-169,-169);
addOffice("Praetor","SULP1173",-169,-169);
addOffice("Praetor","AEBU1407",-168,-168);
addOffice("Praetor","ANIC1408",-168,-168);
addOffice("Praetor","BAEB1409",-168,-168);
addOffice("Praetor","FONT1410",-168,-168);
addOffice("Praetor","OCTA1356",-168,-168);
addOffice("Praetor","PAPI1411",-168,-168);
addOffice("Praetor","CASS1439",-167,-167);
addOffice("Praetor","CLAU1440",-167,-167);
addOffice("Praetor","FULV1441",-167,-167);
addOffice("Praetor","IUVE1387",-167,-167);
addOffice("Praetor","LICI1425",-167,-167);
addOffice("Praetor","MANL1442",-167,-167);
addOffice("Praetor","APPU1346",-166,-166);
addOffice("Praetor","FONT1453",-166,-166);
addOffice("Praetor","IULI1454",-166,-166);
addOffice("Praetor","LICI1374",-166,-166);
addOffice("Praetor","QUIN1455",-166,-166);
addOffice("Praetor","RUTI1456",-166,-166);
addOffice("Praetor","CORN1390",-165,-165);
addOffice("Praetor","CORN1362",-165,-165);
addOffice("Praetor","CORN1396",-165,-165);
addOffice("Praetor","MINU3359",-164,-164);
addOffice("Praetor","VALE1460",-164,-164);
addOffice("Praetor","FANN1461",-164,-164);
addOffice("Praetor","CORN1377",-163,-163);
addOffice("Praetor","CORN1457",-162,-162);
addOffice("Praetor","FULV1369",-162,-162);
addOffice("Praetor","AEMI1471",-161,-161);
addOffice("Praetor","POMP1444",-161,-161);
addOffice("Praetor","AURE1468",-160,-160);
addOffice("Praetor","IULI1265",-160,-160);
addOffice("Praetor","CORN1465",-159,-159);
addOffice("Praetor","TREM1412",-159,-159);
addOffice("Praetor","ACIL1270",-157,-157);
addOffice("Praetor","OPIM1476",-157,-157);
addOffice("Praetor","POST1406",-157,-157);
addOffice("Praetor","FULV1248",-156,-156);
addOffice("Praetor","ANNI1404",-156,-156);
addOffice("Praetor","CALP1483",-156,-156);
addOffice("Praetor","MUMM1495",-155,-155);
addOffice("Praetor","MANI1480",-155,-155);
addOffice("Praetor","POST1420",-155,-155);
addOffice("Praetor","VALE1466",-155,-155);
addOffice("Praetor","OPPI1487",-155,-155);
addOffice("Praetor","CALP1483",-154,-154);
addOffice("Praetor","LICI1484",-154,-154);
addOffice("Praetor","MANI1480",-154,-154);
addOffice("Praetor","ACIL1494",-153,-153);
addOffice("Praetor","QUIN1449",-153,-153);
addOffice("Praetor","MUMM1495",-153,-153);
addOffice("Praetor","AELI1496",-153,-153);
addOffice("Praetor","FUFI1497",-153,-153);
addOffice("Praetor","ATIL1499",-152,-152);
addOffice("Praetor","MARC1475",-152,-152);
addOffice("Praetor","PORC1433",-152,-152);
addOffice("Praetor","POST1502",-151,-151);
addOffice("Praetor","SULP1417",-151,-151);
addOffice("Praetor","LIVI1519",-150,-150);
addOffice("Praetor","SEXT2976",-150,-150);
addOffice("Praetor","CORN1474",-149,-149);
addOffice("Praetor","FABI1422",-149,-149);
addOffice("Praetor","IUVE1507",-149,-149);
addOffice("Praetor","HOST1508",-149,-149);
addOffice("Praetor","LICI1514",-149,-149);
addOffice("Praetor","CAEC1424",-148,-148);
addOffice("Praetor","AURE1485",-147,-147);
addOffice("Praetor","LICI1520",-147,-147);
addOffice("Praetor","SEMP1521",-147,-147);
addOffice("Praetor","VETI1522",-147,-147);
addOffice("Praetor","CLAU1452",-146,-146);
addOffice("Praetor","CLAU1529",-146,-146);
addOffice("Praetor","PLAU1531",-146,-146);
addOffice("Praetor","OPPI1530",-146,-146);
addOffice("Praetor","CAEC1544",-145,-145);
addOffice("Praetor","LAEL1524",-145,-145);
addOffice("Praetor","NIGI1546",-145,-145);
addOffice("Praetor","CLAU1529",-145,-145);
addOffice("Praetor","FABI1545",-145,-145);
addOffice("Praetor","NIGI1546",-144,-144);
addOffice("Praetor","MARC1550",-144,-144);
addOffice("Praetor","POMP1551",-144,-144);
addOffice("Praetor","SERV1552",-144,-144);
addOffice("Praetor","MUMM1542",-144,-144);
addOffice("Praetor","LICI1554",-143,-143);
addOffice("Praetor","QUIN1555",-143,-143);
addOffice("Praetor","SERV1556",-143,-143);
addOffice("Praetor","EGNA3362",-143,-143);
addOffice("Praetor","CALP1561",-142,-142);
addOffice("Praetor","HOST1562",-142,-142);
addOffice("Praetor","POPI1563",-142,-142);
addOffice("Praetor","LICI1554",-142,-142);
addOffice("Praetor","CORN1513",-141,-141);
addOffice("Praetor","IUNI1565",-141,-141);
addOffice("Praetor","IUNI1566",-141,-141);
addOffice("Praetor","AEMI1553",-140,-140);
addOffice("Praetor","CORN1568",-140,-140);
addOffice("Praetor","HOST1569",-140,-140);
addOffice("Praetor","IUNI1533",-140,-140);
addOffice("Praetor","CORN1390",-140,-140);
addOffice("Praetor","ATIL1572",-139,-139);
addOffice("Praetor","CORN1506",-139,-139);
addOffice("Praetor","FURI1573",-139,-139);
addOffice("Praetor","PLAU1574",-138,-138);
addOffice("Praetor","CALP1575",-138,-138);
addOffice("Praetor","CALP1510",-138,-138);
addOffice("Praetor","FULV1576",-138,-138);
addOffice("Praetor","CORN1568",-137,-137);
addOffice("Praetor","CLAU1579",-137,-137);
addOffice("Praetor","CORN3363",-137,-137);
addOffice("Praetor","FULV1581",-137,-137);
addOffice("Praetor","MANL1584",-136,-136);
addOffice("Praetor","MUCI1567",-136,-136);
addOffice("Praetor","TREM1558",-136,-136);
addOffice("Praetor","COSC1589",-135,-135);
addOffice("Praetor","POPI1590",-135,-135);
addOffice("Praetor","RUPI1591",-135,-135);
addOffice("Praetor","PLAU1574",-135,-135);
addOffice("Praetor","LICI1500",-134,-134);
addOffice("Praetor","VALE1492",-134,-134);
addOffice("Praetor","HOST1569",-134,-134);
addOffice("Praetor","MANL3364",-134,-134);
addOffice("Praetor","CLAU1599",-133,-133);
addOffice("Praetor","POPI1601",-133,-133);
addOffice("Praetor","RUPI1602",-133,-133);
addOffice("Praetor","PERP1600",-133,-133);
addOffice("Praetor","AQUI1614",-132,-132);
addOffice("Praetor","SEMP1548",-132,-132);
addOffice("Praetor","ANNI1616",-131,-131);
addOffice("Praetor","OCTA1617",-131,-131);
addOffice("Praetor","LATI1628",-131,-131);
addOffice("Praetor","CASS1583",-130,-130);
addOffice("Praetor","CORN1620",-130,-130);
addOffice("Praetor","MARC1621",-130,-130);
addOffice("Praetor","PUPI3241",-130,-130);
addOffice("Praetor","ALBI3135",-130,-130);
addOffice("Praetor","IULI3201",-130,-130);
addOffice("Praetor","CORN3168",-130,-130);
addOffice("Praetor","VALG3265",-130,-130);
addOffice("Praetor","AEMI1626",-129,-129);
addOffice("Praetor","AURE1627",-129,-129);
addOffice("Praetor","CORN1631",-128,-128);
addOffice("Praetor","FULV1624",-128,-128);
addOffice("Praetor","PLAU1632",-128,-128);
addOffice("Praetor","CASS1633",-127,-127);
addOffice("Praetor","SEXT1634",-127,-127);
addOffice("Praetor","LICI1637",-127,-127);
addOffice("Praetor","SEMP3257",-127,-127);
addOffice("Praetor","CAEC1635",-126,-126);
addOffice("Praetor","QUIN1636",-126,-126);
addOffice("Praetor","FANN1523",-126,-126);
addOffice("Praetor","MANL3209",-126,-126);
addOffice("Praetor","ATIL2944",-125,-125);
addOffice("Praetor","FABI2959",-125,-125);
addOffice("Praetor","CLUV1768",-125,-125);
addOffice("Praetor","OPIM1639",-125,-125);
addOffice("Praetor","AEBU5164",-125,-125);
addOffice("Praetor","DOMI1630",-125,-125);
addOffice("Praetor","FABI1594",-124,-124);
addOffice("Praetor","IULI1642",-123,-123);
addOffice("Praetor","MANI1643",-123,-123);
addOffice("Praetor","PAPI1623",-123,-123);
addOffice("Praetor","AURE1648",-123,-123);
addOffice("Praetor","LIVI3366",-123,-123);
addOffice("Praetor","CAEC1649",-122,-122);
addOffice("Praetor","SERV2973",-122,-122);
addOffice("Praetor","ATIN1618",-122,-122);
addOffice("Praetor","MARC1655",-121,-121);
addOffice("Praetor","PORC1656",-121,-121);
addOffice("Praetor","ATIN1618",-121,-121);
addOffice("Praetor","POMP1675",-121,-121);
addOffice("Praetor","CAEC1665",-120,-120);
addOffice("Praetor","LICI1674",-120,-120);
addOffice("Praetor","MUCI1613",-120,-120);
addOffice("Praetor","VALE1888",-120,-120);
addOffice("Praetor","FANN3464",-119,-119);
addOffice("Praetor","AEMI1645",-119,-119);
addOffice("Praetor","FABI1615",-119,-119);
addOffice("Praetor","LICI1674",-119,-119);
addOffice("Praetor","CORN1678",-119,-119);
addOffice("Praetor","CAEC1677",-118,-118);
addOffice("Praetor","RUTI1596",-118,-118);
addOffice("Praetor","CORN1678",-118,-118);
addOffice("Praetor","ACIL1680",-117,-117);
addOffice("Praetor","PORC1682",-117,-117);
addOffice("Praetor","SCRI1657",-117,-117);
addOffice("Praetor","CAEC1701",-117,-117);
addOffice("Praetor","PAPI1689",-116,-116);
addOffice("Praetor","SERG1727",-116,-116);
addOffice("Praetor","DECI1666",-115,-115);
addOffice("Praetor","LIVI1651",-115,-115);
addOffice("Praetor","MARI1660",-115,-115);
addOffice("Praetor","FABI1726",-115,-115);
addOffice("Praetor","CALP1712",-115,-115);
addOffice("Praetor","CALP1663",-114,-114);
addOffice("Praetor","CORN1695",-114,-114);
addOffice("Praetor","PAPI1696",-114,-114);
addOffice("Praetor","MINU1686",-113,-113);
addOffice("Praetor","POST1703",-113,-113);
addOffice("Praetor","PORC3369",-113,-113);
addOffice("Praetor","ANON3370",-113,-113);
addOffice("Praetor","CAEC1693",-112,-112);
addOffice("Praetor","IUNI0885",-112,-112);
addOffice("Praetor","CALP1713",-111,-111);
addOffice("Praetor","AURE1683",-111,-111);
addOffice("Praetor","CASS1715",-111,-111);
addOffice("Praetor","HORT1716",-111,-111);
addOffice("Praetor","HORT1670",-111,-111);
addOffice("Praetor","SULP1718",-111,-111);
addOffice("Praetor","MINU1687",-111,-111);
addOffice("Praetor","POST1728",-111,-111);
addOffice("Praetor","SULP1662",-110,-110);
addOffice("Praetor","CORN3098",-110,-110);
addOffice("Praetor","ATIL1730",-109,-109);
addOffice("Praetor","LUTA1731",-109,-109);
addOffice("Praetor","CORN1732",-109,-109);
addOffice("Praetor","SERV1629",-109,-109);
addOffice("Praetor","MALL1739",-108,-108);
addOffice("Praetor","MANL1747",-108,-108);
addOffice("Praetor","POPI1748",-108,-108);
addOffice("Praetor","AUFI1741",-107,-107);
addOffice("Praetor","BILL1742",-107,-107);
addOffice("Praetor","FLAV1743",-107,-107);
addOffice("Praetor","AURE1749",-106,-106);
addOffice("Praetor","ALBU1750",-105,-105);
addOffice("Praetor","BELL1751",-105,-105);
addOffice("Praetor","ANON1752",-105,-105);
addOffice("Praetor","TREM3372",-105,-105);
addOffice("Praetor","ANON3374",-105,-105);
addOffice("Praetor","ANON3375",-105,-105);
addOffice("Praetor","MEMM1595",-104,-104);
addOffice("Praetor","AQUI1757",-104,-104);
addOffice("Praetor","FLAM1758",-104,-104);
addOffice("Praetor","LICI1759",-104,-104);
addOffice("Praetor","LICI1760",-104,-104);
addOffice("Praetor","VALE1815",-104,-104);
addOffice("Praetor","CAES3376",-104,-104);
addOffice("Praetor","ANON1771",-103,-103);
addOffice("Praetor","CLAU1784",-103,-103);
addOffice("Praetor","VIBI1773",-102,-102);
addOffice("Praetor","ANTO1705",-102,-102);
addOffice("Praetor","SERV1779",-102,-102);
addOffice("Praetor","MARI1778",-102,-102);
addOffice("Praetor","ANON3379",-102,-102);
addOffice("Praetor","CAEC1787",-101,-101);
addOffice("Praetor","DIDI1776",-101,-101);
addOffice("Praetor","LICI1788",-101,-101);
addOffice("Praetor","PLAU2970",-101,-101);
addOffice("Praetor","PORC1831",-101,-101);
addOffice("Praetor","MARC3382",-101,-101);
addOffice("Praetor","CORN3383",-101,-101);
addOffice("Praetor","FABI2960",-100,-100);
addOffice("Praetor","FURI3418",-100,-100);
addOffice("Praetor","PROC3419",-100,-100);
addOffice("Praetor","IUVE3744",-100,-100);
addOffice("Praetor","CORN1791",-100,-100);
addOffice("Praetor","CORN1792",-100,-100);
addOffice("Praetor","LICI1780",-100,-100);
addOffice("Praetor","SERV1734",-100,-100);
addOffice("Praetor","TERE3817",-100,-100);
addOffice("Praetor","CASS1801",-99,-99);
addOffice("Praetor","DOMI1763",-99,-99);
addOffice("Praetor","COEL1744",-99,-99);
addOffice("Praetor","LICI1679",-98,-98);
addOffice("Praetor","MUCI1692",-98,-98);
addOffice("Praetor","CORN1746",-97,-97);
addOffice("Praetor","DOMI1816",-97,-97);
addOffice("Praetor","HERE1819",-96,-96);
addOffice("Praetor","MARC1764",-96,-96);
addOffice("Praetor","VALE1821",-96,-96);
addOffice("Praetor","VALE1802",-96,-96);
addOffice("Praetor","VALE1802",-95,-95);
addOffice("Praetor","AURE1774",-95,-95);
addOffice("Praetor","CLAU1753",-95,-95);
addOffice("Praetor","IULI1825",-95,-95);
addOffice("Praetor","PERP1826",-95,-95);
addOffice("Praetor","CORN1746",-95,-95);
addOffice("Praetor","SEMP1824",-95,-95);
addOffice("Praetor","SENT3384",-95,-95);
addOffice("Praetor","GELL1822",-94,-94);
addOffice("Praetor","SENT1829",-94,-94);
addOffice("Praetor","IULI1828",-94,-94);
addOffice("Praetor","CORN1836",-93,-93);
addOffice("Praetor","RUTI1837",-93,-93);
addOffice("Praetor","SEMP1820",-93,-93);
addOffice("Praetor","POMP1767",-92,-92);
addOffice("Praetor","SEXT1842",-92,-92);
addOffice("Praetor","IULI1799",-92,-92);
addOffice("Praetor","SEXT1895",-92,-92);
addOffice("Praetor","OCTA1754",-91,-91);
addOffice("Praetor","PERP1848",-91,-91);
addOffice("Praetor","POMP1805",-91,-91);
addOffice("Praetor","SERV1849",-91,-91);
addOffice("Praetor","SERV1796",-91,-91);
addOffice("Praetor","SULP1850",-91,-91);
addOffice("Praetor","CALP2951",-91,-91);
addOffice("Praetor","NORB1777",-91,-91);
addOffice("Praetor","SERV1814",-91,-91);
addOffice("Praetor","PORC1841",-91,-91);
addOffice("Praetor","CAEC1869",-91,-91);
addOffice("Praetor","CORN1871",-91,-91);
addOffice("Praetor","CORN1883",-91,-91);
addOffice("Praetor","GABI1920",-91,-91);
addOffice("Praetor","IUNI2023",-91,-91);
addOffice("Praetor","VALE1887",-91,-91);
addOffice("Praetor","LUCI1847",-90,-90);
addOffice("Praetor","CAEL1868",-90,-90);
addOffice("Praetor","CASS1870",-90,-90);
addOffice("Praetor","CORN1872",-90,-90);
addOffice("Praetor","OCTA1873",-90,-90);
addOffice("Praetor","POST1874",-90,-90);
addOffice("Praetor","POMP3385",-90,-90);
addOffice("Praetor","CALP1795",-90,-90);
addOffice("Praetor","CLAU1807",-89,-89);
addOffice("Praetor","OPPI1892",-89,-89);
addOffice("Praetor","PAPI1843",-89,-89);
addOffice("Praetor","SEMP1894",-89,-89);
addOffice("Praetor","CAEC1889",-89,-89);
addOffice("Praetor","CANI2954",-89,-89);
addOffice("Praetor","GABI1891",-89,-89);
addOffice("Praetor","COSC1919",-89,-89);
addOffice("Praetor","FUFI3415",-89,-89);
addOffice("Praetor","CALP3414",-89,-89);
addOffice("Praetor","ANCH1928",-88,-88);
addOffice("Praetor","IUNI1929",-88,-88);
addOffice("Praetor","LICI1930",-88,-88);
addOffice("Praetor","SERV1931",-88,-88);
addOffice("Praetor","CLAU1807",-88,-88);
addOffice("Praetor","CAEC1889",-88,-88);
addOffice("Praetor","HORT1951",-88,-88);
addOffice("Praetor","CORN1990",-88,-88);
addOffice("Praetor","LICI1930",-87,-87);
addOffice("Praetor","SERV1999",-87,-87);
addOffice("Praetor","CORN1882",-86,-86);
addOffice("Praetor","MARI1940",-85,-85);
addOffice("Praetor","FABI1964",-85,-85);
addOffice("Praetor","MARI1940",-84,-84);
addOffice("Praetor","SERT1818",-84,-84);
addOffice("Praetor","CORN1979",-84,-84);
addOffice("Praetor","TULL2005",-84,-84);
addOffice("Praetor","FABI1964",-84,-84);
addOffice("Praetor","BURR1970",-83,-83);
addOffice("Praetor","PAPI1835",-83,-83);
addOffice("Praetor","ANTO1984",-83,-83);
addOffice("Praetor","ANNI1740",-83,-83);
addOffice("Praetor","CORN3388",-83,-83);
addOffice("Praetor","CLOE3676",-83,-83);
addOffice("Praetor","MAGI4440",-82,-82);
addOffice("Praetor","MAGI1939",-82,-82);
addOffice("Praetor","ANNI1740",-82,-82);
addOffice("Praetor","CARR1977",-82,-82);
addOffice("Praetor","MAGI1985",-82,-82);
addOffice("Praetor","PERP1986",-82,-82);
addOffice("Praetor","MAGI3281",-82,-82);
addOffice("Praetor","IUNI1980",-82,-82);
addOffice("Praetor","COEL1995",-82,-82);
addOffice("Praetor","FLAV1996",-82,-82);
addOffice("Praetor","FANN3190",-82,-82);
addOffice("Praetor","ALBI2193",-82,-82);
addOffice("Praetor","POST3391",-82,-82);
addOffice("Praetor","LUCR2003",-82,-82);
addOffice("Praetor","CORN2007",-81,-81);
addOffice("Praetor","FUFI2008",-81,-81);
addOffice("Praetor","LUTA1949",-81,-81);
addOffice("Praetor","MINU2009",-81,-81);
addOffice("Praetor","NONI2010",-81,-81);
addOffice("Praetor","PAPI2011",-81,-81);
addOffice("Praetor","AURE1866",-81,-81);
addOffice("Praetor","ANNI1740",-81,-81);
addOffice("Praetor","SCRI1876",-81,-81);
addOffice("Praetor","AEMI1993",-81,-81);
addOffice("Praetor","CLAU2006",-81,-81);
addOffice("Praetor","CLAU2021",-80,-80);
addOffice("Praetor","DOMI2022",-80,-80);
addOffice("Praetor","FANN1972",-80,-80);
addOffice("Praetor","AEMI1865",-80,-80);
addOffice("Praetor","SCRI3080",-80,-80);
addOffice("Praetor","OCTA2031",-79,-79);
addOffice("Praetor","CALI1812",-79,-79);
addOffice("Praetor","COSC1919",-79,-79);
addOffice("Praetor","MANL2030",-79,-79);
addOffice("Praetor","FABE3182",-79,-79);
addOffice("Praetor","COEL3127",-79,-79);
addOffice("Praetor","CORN2035",-78,-78);
addOffice("Praetor","LICI1903",-78,-78);
addOffice("Praetor","OCTA2036",-78,-78);
addOffice("Praetor","TERE2037",-78,-78);
addOffice("Praetor","VALE2117",-78,-78);
addOffice("Praetor","AUFI2032",-77,-77);
addOffice("Praetor","AURE2026",-77,-77);
addOffice("Praetor","PEDU2042",-77,-77);
addOffice("Praetor","IUNI1966",-77,-77);
addOffice("Praetor","TREM2157",-77,-77);
addOffice("Praetor","CASS2050",-76,-76);
addOffice("Praetor","IUNI2051",-76,-76);
addOffice("Praetor","TERE1982",-76,-76);
addOffice("Praetor","SALV3839",-76,-76);
addOffice("Praetor","CAES2063",-75,-75);
addOffice("Praetor","CORN2064",-75,-75);
addOffice("Praetor","FONT1965",-75,-75);
addOffice("Praetor","TURI2066",-75,-75);
addOffice("Praetor","LICI2067",-75,-75);
addOffice("Praetor","CLAU2099",-75,-75);
addOffice("Praetor","RUTI2096",-75,-75);
addOffice("Praetor","CLAU1851",-75,-75);
addOffice("Praetor","FURI4612",-75,-75);
addOffice("Praetor","CASS5157",-74,-74);
addOffice("Praetor","ANTO2077",-74,-74);
addOffice("Praetor","CALP1896",-74,-74);
addOffice("Praetor","COEL2079",-74,-74);
addOffice("Praetor","CORN2012",-74,-74);
addOffice("Praetor","VERR1967",-74,-74);
addOffice("Praetor","CAEC2078",-73,-73);
addOffice("Praetor","ARRI2098",-73,-73);
addOffice("Praetor","COSS2100",-73,-73);
addOffice("Praetor","LICI1981",-73,-73);
addOffice("Praetor","VALE2101",-73,-73);
addOffice("Praetor","VARI2102",-73,-73);
addOffice("Praetor","CLAU3427",-73,-73);
addOffice("Praetor","HORT1902",-72,-72);
addOffice("Praetor","PUPI1974",-72,-72);
addOffice("Praetor","AFRA2074",-72,-72);
addOffice("Praetor","CAEC2078",-72,-72);
addOffice("Praetor","MANL2136",-72,-72);
addOffice("Praetor","TREM2157",-72,-72);
addOffice("Praetor","CAEC2150",-71,-71);
addOffice("Praetor","MARC2151",-71,-71);
addOffice("Praetor","PUPI1974",-71,-71);
addOffice("Praetor","TITI3395",-71,-71);
addOffice("Praetor","CALP2164",-71,-71);
addOffice("Praetor","ACIL2119",-70,-70);
addOffice("Praetor","ANTI2162",-70,-70);
addOffice("Praetor","AURE2163",-70,-70);
addOffice("Praetor","MANL2165",-70,-70);
addOffice("Praetor","MUMM2166",-70,-70);
addOffice("Praetor","POMP2075",-70,-70);
addOffice("Praetor","MANL2250",-69,-69);
addOffice("Praetor","CAEC2175",-69,-69);
addOffice("Praetor","CORN2176",-69,-69);
addOffice("Praetor","VOLC2178",-69,-69);
addOffice("Praetor","AEMI2038",-69,-69);
addOffice("Praetor","LOLL2177",-69,-69);
addOffice("Praetor","AUTR2070",-68,-68);
addOffice("Praetor","LICI2103",-68,-68);
addOffice("Praetor","CORN2028",-68,-68);
addOffice("Praetor","QUIN2081",-68,-68);
addOffice("Praetor","SERG1998",-68,-68);
addOffice("Praetor","TERE1963",-68,-68);
addOffice("Praetor","MANL2205",-68,-68);
addOffice("Praetor","LOLL2249",-68,-68);
addOffice("Praetor","CORN3397",-68,-68);
addOffice("Praetor","RUBR2206",-68,-68);
addOffice("Praetor","CURI2223",-67,-67);
addOffice("Praetor","IULI2044",-67,-67);
addOffice("Praetor","LUCC2225",-67,-67);
addOffice("Praetor","MARC2226",-67,-67);
addOffice("Praetor","MINU2227",-67,-67);
addOffice("Praetor","PUBL2228",-67,-67);
addOffice("Praetor","IUNI2120",-67,-67);
addOffice("Praetor","BELL2204",-67,-67);
addOffice("Praetor","SEXT2207",-67,-67);
addOffice("Praetor","AUFI2222",-67,-67);
addOffice("Praetor","IUNI2224",-67,-67);
addOffice("Praetor","ANTO1969",-66,-66);
addOffice("Praetor","AQUI2256",-66,-66);
addOffice("Praetor","CASS2257",-66,-66);
addOffice("Praetor","CORN2181",-66,-66);
addOffice("Praetor","ORCH2258",-66,-66);
addOffice("Praetor","SULP2179",-66,-66);
addOffice("Praetor","TULL2072",-66,-66);
addOffice("Praetor","VARI2102",-66,-66);
addOffice("Praetor","CAES2180",-66,-66);
addOffice("Praetor","ATTI2270",-65,-65);
addOffice("Praetor","GALL2230",-65,-65);
addOffice("Praetor","LICI2085",-65,-65);
addOffice("Praetor","ORBI2271",-65,-65);
addOffice("Praetor","SULP2088",-65,-65);
addOffice("Praetor","ARRI2279",-64,-64);
addOffice("Praetor","PETR2280",-64,-64);
addOffice("Praetor","PLAE2169",-64,-64);
addOffice("Praetor","VALE2107",-64,-64);
addOffice("Praetor","SERV2237",-64,-64);
addOffice("Praetor","CLAU2248",-64,-64);
addOffice("Praetor","CAEC2040",-63,-63);
addOffice("Praetor","CORN2012",-63,-63);
addOffice("Praetor","COSC2286",-63,-63);
addOffice("Praetor","POMP2287",-63,-63);
addOffice("Praetor","POMP2311",-63,-63);
addOffice("Praetor","ROSC2236",-63,-63);
addOffice("Praetor","SULP2289",-63,-63);
addOffice("Praetor","VALE1992",-63,-63);
addOffice("Praetor","LUCC3816",-62,-62);
addOffice("Praetor","CALP2272",-62,-62);
addOffice("Praetor","IULI1957",-62,-62);
addOffice("Praetor","MARC2303",-62,-62);
addOffice("Praetor","PAPI2235",-62,-62);
addOffice("Praetor","TULL2216",-62,-62);
addOffice("Praetor","VALE2536",-62,-62);
addOffice("Praetor","VERG2267",-62,-62);
addOffice("Praetor","CORN2196",-61,-61);
addOffice("Praetor","GABI2234",-61,-61);
addOffice("Praetor","OCTA2104",-61,-61);
addOffice("Praetor","VOCO2231",-61,-61);
addOffice("Praetor","TORA2106",-61,-61);
addOffice("Praetor","CALP2168",-61,-61);
addOffice("Praetor","SULP2971",-60,-60);
addOffice("Praetor","APPU3037",-60,-60);
addOffice("Praetor","ATIU2329",-60,-60);
addOffice("Praetor","CAEC2247",-60,-60);
addOffice("Praetor","CORN2082",-60,-60);
addOffice("Praetor","CORN2290",-60,-60);
addOffice("Praetor","CORN2330",-60,-60);
addOffice("Praetor","AMPI2291",-59,-59);
addOffice("Praetor","APPU2318",-59,-59);
addOffice("Praetor","CORN2338",-59,-59);
addOffice("Praetor","FUFI2321",-59,-59);
addOffice("Praetor","VETT2344",-59,-59);
addOffice("Praetor","LABI2292",-59,-59);
addOffice("Praetor","FABI3178",-59,-59);
addOffice("Praetor","CORN2356",-58,-58);
addOffice("Praetor","DOMI2264",-58,-58);
addOffice("Praetor","FABI2357",-58,-58);
addOffice("Praetor","FLAV2332",-58,-58);
addOffice("Praetor","MEMM2261",-58,-58);
addOffice("Praetor","NIGI2349",-58,-58);
addOffice("Praetor","VILL2358",-58,-58);
addOffice("Praetor","SILI2360",-58,-58);
addOffice("Praetor","CAEC2320",-57,-57);
addOffice("Praetor","CAEC2263",-57,-57);
addOffice("Praetor","CALI2375",-57,-57);
addOffice("Praetor","CLAU2140",-57,-57);
addOffice("Praetor","LICI2331",-57,-57);
addOffice("Praetor","QUIN2376",-57,-57);
addOffice("Praetor","SEPT2377",-57,-57);
addOffice("Praetor","VALE2409",-57,-57);
addOffice("Praetor","SEPT2516",-57,-57);
addOffice("Praetor","AEMI2262",-56,-56);
addOffice("Praetor","ANCH2110",-56,-56);
addOffice("Praetor","CLAU2062",-56,-56);
addOffice("Praetor","DOMI2313",-56,-56);
addOffice("Praetor","MANL3217",-56,-56);
addOffice("Praetor","ANNI2381",-55,-55);
addOffice("Praetor","CAEC2347",-55,-55);
addOffice("Praetor","ANON2419",-55,-55);
addOffice("Praetor","PLAU2265",-55,-55);
addOffice("Praetor","VATI2297",-55,-55);
addOffice("Praetor","NONI2403",-55,-55);
addOffice("Praetor","FURF2498",-55,-55);
addOffice("Praetor","ATTI2455",-55,-55);
addOffice("Praetor","NONI3752",-55,-55);
addOffice("Praetor","PORC2404",-55,-55);
addOffice("Praetor","CONS2359",-54,-54);
addOffice("Praetor","CLAU2398",-54,-54);
addOffice("Praetor","COSC2348",-54,-54);
addOffice("Praetor","DOMI2399",-54,-54);
addOffice("Praetor","PORC2241",-54,-54);
addOffice("Praetor","SERV2433",-54,-54);
addOffice("Praetor","SULP2316",-54,-54);
addOffice("Praetor","AURE2434",-54,-54);
addOffice("Praetor","CONS2435",-54,-54);
addOffice("Praetor","POST2436",-54,-54);
addOffice("Praetor","VOCO2437",-54,-54);
addOffice("Praetor","ALFI2346",-54,-54);
addOffice("Praetor","FONT2432",-54,-54);
addOffice("Praetor","AEMI2350",-53,-53);
addOffice("Praetor","CLAU2396",-53,-53);
addOffice("Praetor","FADI2295",-53,-53);
addOffice("Praetor","CLAU2397",-52,-52);
addOffice("Praetor","SILI2360",-52,-52);
addOffice("Praetor","MINU2131",-52,-52);
addOffice("Praetor","TREM3401",-52,-52);
addOffice("Praetor","IUVE2308",-51,-51);
addOffice("Praetor","PLAU2276",-51,-51);
addOffice("Praetor","LICI2456",-51,-51);
addOffice("Praetor","APPU2941",-50,-50);
addOffice("Praetor","CAEC2953",-50,-50);
addOffice("Praetor","FRUT2955",-50,-50);
addOffice("Praetor","CORN2961",-50,-50);
addOffice("Praetor","SANQ2968",-50,-50);
addOffice("Praetor","POST2436",-50,-50);
addOffice("Praetor","SCRI2518",-50,-50);
addOffice("Praetor","TITI2519",-50,-50);
addOffice("Praetor","LIVI2520",-50,-50);
addOffice("Praetor","ATEI2479",-50,-50);
addOffice("Praetor","SEST2296",-50,-50);
addOffice("Praetor","FANN2340",-50,-50);
addOffice("Praetor","FABI2379",-50,-50);
addOffice("Praetor","MARC2389",-50,-50);
addOffice("Praetor","FURI2958",-50,-50);
addOffice("Praetor","CURT3402",-50,-50);
addOffice("Praetor","MANL2198",-50,-50);
addOffice("Praetor","SOSI2266",-49,-49);
addOffice("Praetor","AEMI2341",-49,-49);
addOffice("Praetor","ALLI2324",-49,-49);
addOffice("Praetor","COPO2537",-49,-49);
addOffice("Praetor","MANL2198",-49,-49);
addOffice("Praetor","ROSC2424",-49,-49);
addOffice("Praetor","RUTI2407",-49,-49);
addOffice("Praetor","CISP2383",-49,-49);
addOffice("Praetor","AELI2325",-49,-49);
addOffice("Praetor","FAVO2352",-49,-49);
addOffice("Praetor","VOLU2513",-49,-49);
addOffice("Praetor","CAEL2417",-48,-48);
addOffice("Praetor","CANI2486",-48,-48);
addOffice("Praetor","COEL2408",-48,-48);
addOffice("Praetor","COSC2348",-48,-48);
addOffice("Praetor","MARC2567",-48,-48);
addOffice("Praetor","PEDI2370",-48,-48);
addOffice("Praetor","RABI2568",-48,-48);
addOffice("Praetor","SULP2430",-48,-48);
addOffice("Praetor","TREB2336",-48,-48);
addOffice("Praetor","SULP2259",-48,-48);
addOffice("Praetor","ACIL2583",-47,-47);
addOffice("Praetor","NONI2598",-47,-47);
addOffice("Praetor","CARR2608",-46,-46);
addOffice("Praetor","HIRT2449",-46,-46);
addOffice("Praetor","SALL2429",-46,-46);
addOffice("Praetor","VOLC2609",-46,-46);
addOffice("Praetor","COEL2408",-46,-46);
addOffice("Praetor","ASIN2553",-45,-45);
addOffice("Praetor","CORN2573",-45,-45);
addOffice("Praetor","HORT2554",-45,-45);
addOffice("Praetor","IUNI2489",-45,-45);
addOffice("Praetor","MINU2466",-45,-45);
addOffice("Praetor","MUNA2450",-45,-45);
addOffice("Praetor","POMP2633",-45,-45);
addOffice("Praetor","SEXT2468",-45,-45);
addOffice("Praetor","STAI2588",-45,-45);
addOffice("Praetor","TILL2634",-45,-45);
addOffice("Praetor","GALL2666",-45,-45);
addOffice("Praetor","CORD2946",-45,-45);
addOffice("Praetor","SEMP2972",-45,-45);
addOffice("Praetor","TEDE2977",-45,-45);
addOffice("Praetor","ANNI2659",-44,-44);
addOffice("Praetor","ANTO2497",-44,-44);
addOffice("Praetor","PUPI2661",-44,-44);
addOffice("Praetor","CASS2586",-44,-44);
addOffice("Praetor","CASS2458",-44,-44);
addOffice("Praetor","CEST2662",-44,-44);
addOffice("Praetor","CORN2663",-44,-44);
addOffice("Praetor","CORN2664",-44,-44);
addOffice("Praetor","CUSI2665",-44,-44);
addOffice("Praetor","IUNI2459",-44,-44);
addOffice("Praetor","MARC2534",-44,-44);
addOffice("Praetor","ANON2667",-44,-44);
addOffice("Praetor","TURR2669",-44,-44);
addOffice("Praetor","VEHI2670",-44,-44);
addOffice("Praetor","CALV2584",-44,-44);
addOffice("Praetor","ANON3437",-44,-44);
addOffice("Praetor","OPPI2622",-44,-44);
addOffice("Praetor","VILL2358",-43,-43);
addOffice("Praetor","ANTI2461",-43,-43);
addOffice("Praetor","PLAU3775",-43,-43);
addOffice("Praetor","VINI3836",-43,-43);
addOffice("Praetor","AQUI2708",-43,-43);
addOffice("Praetor","CAEC2709",-43,-43);
addOffice("Praetor","CEST2710",-43,-43);
addOffice("Praetor","GALL2605",-43,-43);
addOffice("Praetor","MARC2711",-43,-43);
addOffice("Praetor","MINU2712",-43,-43);
addOffice("Praetor","NORB2713",-43,-43);
addOffice("Praetor","RUPI2714",-43,-43);
addOffice("Praetor","VENT2638",-43,-43);
addOffice("Praetor","IULI2963",-43,-43);
addOffice("Praetor","LIVI2965",-43,-43);
addOffice("Praetor","CASC2130",-43,-43);
addOffice("Praetor","LIVI3403",-43,-43);
addOffice("Praetor","QUIN2542",-43,-43);
addOffice("Praetor","CLOV2655",-42,-42);
addOffice("Praetor","AELI2635",-42,-42);
addOffice("Praetor","ALFE2766",-42,-42);
addOffice("Praetor","COCC2767",-42,-42);
addOffice("Praetor","CLAU2571",-42,-42);
addOffice("Praetor","FURN2521",-42,-42);
addOffice("Praetor","CANI2821",-40,-40);
addOffice("Praetor","STAT2822",-40,-40);
addOffice("Praetor","VIPS2808",-40,-40);
addOffice("Praetor","BARB2800",-40,-40);
addOffice("Praetor","CLAU2867",-40,-40);
addOffice("Praetor","LUCI3812",-40,-40);
addOffice("Praetor","ANON3307",-40,-40);
addOffice("Praetor","CORN2781",-38,-38);
addOffice("Praetor","ASIN2898",-35,-35);
addOffice("Praetor","VALE2758",-34,-34);
addOffice("Praetor","ASEL2909",-33,-33);
addOffice("Praetor","VALE2914",-32,-32);
addOffice("Praetor","CAER2945",-32,-32);
addOffice("Praetor","QUIN3416",-32,-32);
addOffice("Praetor","CLAU2952",-30,-30);
addOffice("Praetor","FISC3467",-28,-28);
addOffice("Praetor","CEST2947",-13,-13);
addOffice("Princeps Senatus","VALE0037",-493,-493);
addOffice("Princeps Senatus","FABI0559",-275,-275);
addOffice("Princeps Senatus","MARC0601",-269,-269);
addOffice("Princeps Senatus","FABI0642",-258,-258);
addOffice("Princeps Senatus","CORN0698",-247,-247);
addOffice("Princeps Senatus","VALE0716",-225,-225);
addOffice("Princeps Senatus","MANL0758",-220,-220);
addOffice("Princeps Senatus","FABI0762",-216,-216);
addOffice("Princeps Senatus","FABI0712",-209,-203);
addOffice("Princeps Senatus","CORN0878",-199,-184);
addOffice("Princeps Senatus","VALE0930",-184,-184);
addOffice("Princeps Senatus","VALE0930",-183,-180);
addOffice("Princeps Senatus","CORN0878",-183,-183);
addOffice("Princeps Senatus","AEMI1067",-179,-153);
addOffice("Princeps Senatus","AEMI1067",-152,-152);
addOffice("Princeps Senatus","CORN1396",-147,-147);
addOffice("Princeps Senatus","CLAU1452",-136,-136);
addOffice("Princeps Senatus","CORN1465",-130,-130);
addOffice("Princeps Senatus","CORN1362",-125,-125);
addOffice("Princeps Senatus","AEMI1645",-115,-89);
addOffice("Princeps Senatus","VALE1815",-86,-86);
addOffice("Princeps Senatus","AEMI1865",-70,-70);
addOffice("Princeps Senatus","TULL2072",-43,-43);
addOffice("Proconsul","FABI0078",-478,-478);
addOffice("Proconsul","FURI0086",-478,-478);
addOffice("Proconsul","QUIN0114",-464,-464);
addOffice("Proconsul","PUBL0517",-326,-326);
addOffice("Proconsul","FABI0559",-309,-309);
addOffice("Proconsul","FABI0559",-307,-307);
addOffice("Proconsul","DOMI2957",-300,-300);
addOffice("Proconsul","DECI0596",-296,-296);
addOffice("Proconsul","FABI0559",-296,-296);
addOffice("Proconsul","VOLU0608",-295,-295);
addOffice("Proconsul","FABI0642",-291,-291);
addOffice("Proconsul","AEMI0680",-280,-280);
addOffice("Proconsul","APPU3095",-264,-264);
addOffice("Proconsul","AQUI0726",-258,-258);
addOffice("Proconsul","ATIL0703",-255,-255);
addOffice("Proconsul","FULV0738",-254,-254);
addOffice("Proconsul","AEMI0739",-254,-254);
addOffice("Proconsul","CORN0723",-253,-253);
addOffice("Proconsul","CAEC0751",-250,-250);
addOffice("Proconsul","LUTA0765",-241,-241);
addOffice("Proconsul","FULV0803",-228,-228);
addOffice("Proconsul","CORN0832",-217,-217);
addOffice("Proconsul","ATIL0806",-216,-216);
addOffice("Proconsul","CORN0832",-216,-216);
addOffice("Proconsul","SERV0852",-216,-216);
addOffice("Proconsul","CLAU0810",-215,-215);
addOffice("Proconsul","CORN0832",-215,-215);
addOffice("Proconsul","TERE0818",-215,-215);
addOffice("Proconsul","CORN0832",-214,-214);
addOffice("Proconsul","SEMP0866",-214,-214);
addOffice("Proconsul","TERE0818",-214,-214);
addOffice("Proconsul","CLAU0810",-213,-213);
addOffice("Proconsul","CORN0832",-213,-213);
addOffice("Proconsul","TERE0818",-213,-213);
addOffice("Proconsul","CLAU0810",-212,-212);
addOffice("Proconsul","CORN0832",-212,-212);
addOffice("Proconsul","SEMP0866",-212,-212);
addOffice("Proconsul","CLAU0810",-211,-211);
addOffice("Proconsul","CLAU0858",-211,-211);
addOffice("Proconsul","CORN0832",-211,-211);
addOffice("Proconsul","FULV0781",-211,-211);
addOffice("Proconsul","CORN0878",-210,-210);
addOffice("Proconsul","FULV0904",-210,-210);
addOffice("Proconsul","FULV0781",-210,-210);
addOffice("Proconsul","IUNI0925",-210,-210);
addOffice("Proconsul","SULP0936",-210,-210);
addOffice("Proconsul","CLAU0810",-209,-209);
addOffice("Proconsul","CORN0878",-209,-209);
addOffice("Proconsul","IUNI0925",-209,-209);
addOffice("Proconsul","SULP0936",-209,-209);
addOffice("Proconsul","VALE0807",-209,-209);
addOffice("Proconsul","CORN0878",-208,-208);
addOffice("Proconsul","FULV0781",-208,-208);
addOffice("Proconsul","IUNI0925",-208,-208);
addOffice("Proconsul","SULP0936",-208,-208);
addOffice("Proconsul","VALE0807",-208,-208);
addOffice("Proconsul","CORN0878",-207,-207);
addOffice("Proconsul","FULV0781",-207,-207);
addOffice("Proconsul","IUNI0925",-207,-207);
addOffice("Proconsul","SULP0936",-207,-207);
addOffice("Proconsul","VALE0807",-207,-207);
addOffice("Proconsul","CORN1023",-206,-206);
addOffice("Proconsul","CORN0878",-206,-206);
addOffice("Proconsul","IUNI0925",-206,-206);
addOffice("Proconsul","LIVI0827",-206,-206);
addOffice("Proconsul","MANL0958",-206,-206);
addOffice("Proconsul","SULP0936",-206,-206);
addOffice("Proconsul","CAEC0891",-205,-205);
addOffice("Proconsul","CORN1023",-205,-205);
addOffice("Proconsul","LIVI0827",-205,-205);
addOffice("Proconsul","MANL0958",-205,-205);
addOffice("Proconsul","SEMP0882",-205,-205);
addOffice("Proconsul","CORN1023",-204,-204);
addOffice("Proconsul","CORN0878",-204,-204);
addOffice("Proconsul","LICI0926",-204,-204);
addOffice("Proconsul","LIVI0827",-204,-204);
addOffice("Proconsul","MANL0958",-204,-204);
addOffice("Proconsul","CORN0815",-203,-203);
addOffice("Proconsul","CORN1023",-203,-203);
addOffice("Proconsul","CORN0878",-203,-203);
addOffice("Proconsul","MANL0958",-203,-203);
addOffice("Proconsul","SEMP0882",-203,-203);
addOffice("Proconsul","CORN1023",-202,-202);
addOffice("Proconsul","CORN0878",-202,-202);
addOffice("Proconsul","MANL0958",-202,-202);
addOffice("Proconsul","SERV0931",-202,-202);
addOffice("Proconsul","CORN1065",-201,-201);
addOffice("Proconsul","CORN1023",-201,-201);
addOffice("Proconsul","CORN0878",-201,-201);
addOffice("Proconsul","MANL0958",-201,-201);
addOffice("Proconsul","SERV0953",-201,-201);
addOffice("Proconsul","CORN1065",-200,-200);
addOffice("Proconsul","CORN0877",-200,-200);
addOffice("Proconsul","CORN1023",-200,-200);
addOffice("Proconsul","MANL0958",-200,-200);
addOffice("Proconsul","CORN1085",-200,-200);
addOffice("Proconsul","CORN1085",-199,-199);
addOffice("Proconsul","MANL0958",-199,-199);
addOffice("Proconsul","STER1086",-199,-199);
addOffice("Proconsul","SULP0936",-199,-199);
addOffice("Proconsul","CORN1085",-198,-198);
addOffice("Proconsul","CORN1023",-198,-198);
addOffice("Proconsul","STER1086",-198,-198);
addOffice("Proconsul","VILL1034",-198,-198);
addOffice("Proconsul","CORN1085",-197,-197);
addOffice("Proconsul","QUIN0999",-197,-197);
addOffice("Proconsul","STER1086",-197,-197);
addOffice("Proconsul","CORN1085",-196,-196);
addOffice("Proconsul","HELV1093",-196,-196);
addOffice("Proconsul","QUIN0999",-196,-196);
addOffice("Proconsul","SEMP1092",-196,-196);
addOffice("Proconsul","STER1086",-196,-196);
addOffice("Proconsul","HELV1093",-195,-195);
addOffice("Proconsul","QUIN0999",-195,-195);
addOffice("Proconsul","PORC0907",-194,-194);
addOffice("Proconsul","QUIN0999",-194,-194);
addOffice("Proconsul","VALE0930",-194,-194);
addOffice("Proconsul","FULV1109",-192,-192);
addOffice("Proconsul","DOMI1110",-191,-191);
addOffice("Proconsul","FULV1109",-191,-191);
addOffice("Proconsul","ACIL1063",-190,-190);
addOffice("Proconsul","AEMI1134",-190,-190);
addOffice("Proconsul","AEMI1134",-189,-189);
addOffice("Proconsul","CORN1016",-189,-189);
addOffice("Proconsul","LAEL0992",-189,-189);
addOffice("Proconsul","FULV1109",-188,-188);
addOffice("Proconsul","MANL1103",-188,-188);
addOffice("Proconsul","FULV1109",-187,-187);
addOffice("Proconsul","MANL1204",-187,-187);
addOffice("Proconsul","MANL1103",-187,-187);
addOffice("Proconsul","MANL1204",-186,-186);
addOffice("Proconsul","MANL1204",-185,-185);
addOffice("Proconsul","PORC1154",-183,-183);
addOffice("Proconsul","SEMP1241",-183,-183);
addOffice("Proconsul","TERE1183",-183,-183);
addOffice("Proconsul","CLAU1229",-182,-182);
addOffice("Proconsul","SEMP1241",-182,-182);
addOffice("Proconsul","TERE1183",-182,-182);
addOffice("Proconsul","AEMI1134",-181,-181);
addOffice("Proconsul","BAEB1035",-181,-181);
addOffice("Proconsul","CLAU1229",-181,-181);
addOffice("Proconsul","FULV1242",-181,-181);
addOffice("Proconsul","BAEB1163",-180,-180);
addOffice("Proconsul","CORN1212",-180,-180);
addOffice("Proconsul","FULV1242",-180,-180);
addOffice("Proconsul","POST1278",-179,-179);
addOffice("Proconsul","SEMP1182",-179,-179);
addOffice("Proconsul","POST1278",-178,-178);
addOffice("Proconsul","SEMP1182",-178,-178);
addOffice("Proconsul","CLAU1295",-177,-177);
addOffice("Proconsul","FONT1297",-177,-177);
addOffice("Proconsul","IUNI1131",-177,-177);
addOffice("Proconsul","MANL1151",-177,-177);
addOffice("Proconsul","TITI1168",-177,-177);
addOffice("Proconsul","CLAU1295",-176,-176);
addOffice("Proconsul","CLAU1125",-176,-176);
addOffice("Proconsul","FONT1297",-176,-176);
addOffice("Proconsul","SEMP1182",-176,-176);
addOffice("Proconsul","TITI1168",-176,-176);
addOffice("Proconsul","SEMP1182",-175,-175);
addOffice("Proconsul","TITI1168",-175,-175);
addOffice("Proconsul","CLAU1290",-174,-174);
addOffice("Proconsul","POPI1283",-172,-172);
addOffice("Proconsul","LICI3102",-171,-171);
addOffice("Proconsul","HOST1275",-169,-169);
addOffice("Proconsul","CLAU1290",-169,-169);
addOffice("Proconsul","CLAU1290",-168,-168);
addOffice("Proconsul","CLAU1318",-168,-168);
addOffice("Proconsul","MARC1205",-168,-168);
addOffice("Proconsul","AEMI1134",-167,-167);
addOffice("Proconsul","LICI1354",-167,-167);
addOffice("Proconsul","SEMP1182",-162,-162);
addOffice("Proconsul","FULV1369",-158,-158);
addOffice("Proconsul","CORN1465",-154,-154);
addOffice("Proconsul","CLAU1318",-151,-151);
addOffice("Proconsul","LICI1484",-150,-150);
addOffice("Proconsul","SULP1417",-150,-150);
addOffice("Proconsul","MANI1480",-148,-148);
addOffice("Proconsul","CORN1504",-146,-146);
addOffice("Proconsul","VETI1522",-146,-146);
addOffice("Proconsul","FABI1422",-144,-144);
addOffice("Proconsul","EGNA3362",-143,-143);
addOffice("Proconsul","FABI1545",-141,-141);
addOffice("Proconsul","CAEC1544",-141,-141);
addOffice("Proconsul","FABI1545",-140,-140);
addOffice("Proconsul","SERV1556",-139,-139);
addOffice("Proconsul","POPI1563",-138,-138);
addOffice("Proconsul","IUNI1565",-137,-137);
addOffice("Proconsul","AEMI1553",-136,-136);
addOffice("Proconsul","IUNI1565",-136,-136);
addOffice("Proconsul","ATIL1572",-135,-135);
addOffice("Proconsul","CORN1504",-133,-133);
addOffice("Proconsul","IUNI1565",-133,-133);
addOffice("Proconsul","CORN1504",-132,-132);
addOffice("Proconsul","LICI1500",-130,-130);
addOffice("Proconsul","PERP1600",-129,-129);
addOffice("Proconsul","AQUI1614",-128,-128);
addOffice("Proconsul","AQUI1614",-127,-127);
addOffice("Proconsul","AQUI1614",-126,-126);
addOffice("Proconsul","CLUV1768",-125,-125);
addOffice("Proconsul","FABI2959",-125,-125);
addOffice("Proconsul","AURE1627",-125,-125);
addOffice("Proconsul","AURE1627",-124,-124);
addOffice("Proconsul","FULV1624",-124,-124);
addOffice("Proconsul","AURE1627",-123,-123);
addOffice("Proconsul","FULV1624",-123,-123);
addOffice("Proconsul","SEXT1634",-123,-123);
addOffice("Proconsul","AURE1627",-122,-122);
addOffice("Proconsul","CAEC1635",-122,-122);
addOffice("Proconsul","SEXT1634",-122,-122);
addOffice("Proconsul","CAEC1635",-121,-121);
addOffice("Proconsul","DOMI1630",-121,-121);
addOffice("Proconsul","DOMI1630",-120,-120);
addOffice("Proconsul","FABI1594",-120,-120);
addOffice("Proconsul","DOMI1630",-119,-119);
addOffice("Proconsul","FABI1594",-119,-119);
addOffice("Proconsul","CAEC1649",-118,-118);
addOffice("Proconsul","CORN1678",-118,-118);
addOffice("Proconsul","DOMI1630",-118,-118);
addOffice("Proconsul","FABI1594",-118,-118);
addOffice("Proconsul","CAEC1649",-117,-117);
addOffice("Proconsul","MARC1655",-117,-117);
addOffice("Proconsul","CAEC1665",-116,-116);
addOffice("Proconsul","FABI1615",-115,-115);
addOffice("Proconsul","CAEC1677",-114,-114);
addOffice("Proconsul","FABI1615",-114,-114);
addOffice("Proconsul","CALP1713",-114,-114);
addOffice("Proconsul","CALP1713",-113,-113);
addOffice("Proconsul","CAEC1677",-113,-113);
addOffice("Proconsul","CAEC1677",-112,-112);
addOffice("Proconsul","CAEC1701",-112,-112);
addOffice("Proconsul","CAEC1677",-111,-111);
addOffice("Proconsul","CAEC1701",-111,-111);
addOffice("Proconsul","LIVI1651",-111,-111);
addOffice("Proconsul","CALP1712",-111,-111);
addOffice("Proconsul","FABI1726",-110,-110);
addOffice("Proconsul","LIVI1651",-110,-110);
addOffice("Proconsul","CORN3098",-110,-110);
addOffice("Proconsul","MINU1686",-109,-109);
addOffice("Proconsul","POST1703",-109,-109);
addOffice("Proconsul","CORN3098",-109,-109);
addOffice("Proconsul","CAEC1693",-108,-108);
addOffice("Proconsul","IUNI0885",-108,-108);
addOffice("Proconsul","MINU1686",-108,-108);
addOffice("Proconsul","SERV1629",-108,-108);
addOffice("Proconsul","CAEC1693",-107,-107);
addOffice("Proconsul","MINU1686",-107,-107);
addOffice("Proconsul","SERV1629",-107,-107);
addOffice("Proconsul","IUNI0885",-107,-107);
addOffice("Proconsul","BILL1742",-106,-106);
addOffice("Proconsul","CAEC1693",-106,-106);
addOffice("Proconsul","MARI1660",-106,-106);
addOffice("Proconsul","MINU1686",-106,-106);
addOffice("Proconsul","MARI1660",-105,-105);
addOffice("Proconsul","SERV1629",-105,-105);
addOffice("Proconsul","MEMM1595",-103,-103);
addOffice("Proconsul","FLAV1743",-103,-103);
addOffice("Proconsul","FLAV1743",-102,-102);
addOffice("Proconsul","SERG1727",-101,-101);
addOffice("Proconsul","ANTO1705",-101,-101);
addOffice("Proconsul","LUTA1731",-101,-101);
addOffice("Proconsul","SEMP3104",-100,-100);
addOffice("Proconsul","AURE3334",-100,-100);
addOffice("Proconsul","ANTO1705",-100,-100);
addOffice("Proconsul","AQUI1757",-100,-100);
addOffice("Proconsul","DIDI1776",-100,-100);
addOffice("Proconsul","AQUI1757",-99,-99);
addOffice("Proconsul","CORN1791",-99,-99);
addOffice("Proconsul","DIDI1776",-99,-99);
addOffice("Proconsul","CORN1791",-98,-98);
addOffice("Proconsul","MUCI1692",-97,-97);
addOffice("Proconsul","DIDI1776",-97,-97);
addOffice("Proconsul","DIDI1776",-96,-96);
addOffice("Proconsul","LICI1780",-96,-96);
addOffice("Proconsul","DIDI1776",-95,-95);
addOffice("Proconsul","LICI1780",-95,-95);
addOffice("Proconsul","VALE1802",-95,-95);
addOffice("Proconsul","VALE1802",-94,-94);
addOffice("Proconsul","DIDI1776",-94,-94);
addOffice("Proconsul","IULI1825",-94,-94);
addOffice("Proconsul","LICI1679",-94,-94);
addOffice("Proconsul","LICI1780",-94,-94);
addOffice("Proconsul","COEL1744",-93,-93);
addOffice("Proconsul","DIDI1776",-93,-93);
addOffice("Proconsul","GELL1822",-93,-93);
addOffice("Proconsul","LICI1780",-93,-93);
addOffice("Proconsul","SENT1829",-93,-93);
addOffice("Proconsul","SENT1829",-92,-92);
addOffice("Proconsul","VALE1821",-92,-92);
addOffice("Proconsul","COEL1744",-92,-92);
addOffice("Proconsul","IULI1799",-91,-91);
addOffice("Proconsul","SENT1829",-91,-91);
addOffice("Proconsul","COEL1744",-91,-91);
addOffice("Proconsul","VALE1821",-91,-91);
addOffice("Proconsul","SENT1829",-90,-90);
addOffice("Proconsul","SERV1849",-90,-90);
addOffice("Proconsul","SERV1796",-90,-90);
addOffice("Proconsul","COEL1744",-90,-90);
addOffice("Proconsul","VALE1821",-90,-90);
addOffice("Proconsul","CASS1870",-89,-89);
addOffice("Proconsul","SENT1829",-89,-89);
addOffice("Proconsul","ANON3105",-89,-89);
addOffice("Proconsul","COEL1744",-89,-89);
addOffice("Proconsul","VALE1821",-89,-89);
addOffice("Proconsul","CASS1870",-88,-88);
addOffice("Proconsul","OPPI1892",-88,-88);
addOffice("Proconsul","POMP1767",-88,-88);
addOffice("Proconsul","SENT1829",-88,-88);
addOffice("Proconsul","COEL1744",-88,-88);
addOffice("Proconsul","VALE1821",-88,-88);
addOffice("Proconsul","CAEC1889",-87,-87);
addOffice("Proconsul","CORN1746",-87,-87);
addOffice("Proconsul","POMP1767",-87,-87);
addOffice("Proconsul","SENT1829",-87,-87);
addOffice("Proconsul","COEL1744",-87,-87);
addOffice("Proconsul","VALE1821",-87,-87);
addOffice("Proconsul","CAEC1889",-86,-86);
addOffice("Proconsul","CORN1746",-86,-86);
addOffice("Proconsul","VALE1821",-86,-86);
addOffice("Proconsul","CAEC1889",-85,-85);
addOffice("Proconsul","CORN1746",-85,-85);
addOffice("Proconsul","VALE1821",-85,-85);
addOffice("Proconsul","CAEC1889",-84,-84);
addOffice("Proconsul","CORN1746",-84,-84);
addOffice("Proconsul","VALE1821",-84,-84);
addOffice("Proconsul","CAEC1889",-83,-83);
addOffice("Proconsul","CORN1746",-83,-83);
addOffice("Proconsul","PAPI1843",-83,-83);
addOffice("Proconsul","VALE1821",-83,-83);
addOffice("Proconsul","CAEC1889",-82,-82);
addOffice("Proconsul","CORN1990",-82,-82);
addOffice("Proconsul","CORN1746",-82,-82);
addOffice("Proconsul","VALE1821",-82,-82);
addOffice("Proconsul","ANNI1740",-82,-82);
addOffice("Proconsul","ANNI1740",-81,-81);
addOffice("Proconsul","VALE1821",-81,-81);
addOffice("Proconsul","CLAU2006",-80,-80);
addOffice("Proconsul","CORN1979",-80,-80);
addOffice("Proconsul","CORN2007",-80,-80);
addOffice("Proconsul","CAEC1889",-79,-79);
addOffice("Proconsul","CLAU2021",-79,-79);
addOffice("Proconsul","CLAU2006",-79,-79);
addOffice("Proconsul","CORN1979",-79,-79);
addOffice("Proconsul","CORN2007",-79,-79);
addOffice("Proconsul","DOMI2022",-79,-79);
addOffice("Proconsul","CAEC1889",-78,-78);
addOffice("Proconsul","CLAU1807",-78,-78);
addOffice("Proconsul","CORN1979",-78,-78);
addOffice("Proconsul","COSC1919",-78,-78);
addOffice("Proconsul","MANL2030",-78,-78);
addOffice("Proconsul","SERV1814",-78,-78);
addOffice("Proconsul","AEMI1993",-77,-77);
addOffice("Proconsul","CAEC1889",-77,-77);
addOffice("Proconsul","CLAU1807",-77,-77);
addOffice("Proconsul","CORN1979",-77,-77);
addOffice("Proconsul","COSC1919",-77,-77);
addOffice("Proconsul","LUTA1949",-77,-77);
addOffice("Proconsul","POMP1976",-77,-77);
addOffice("Proconsul","SERV1814",-77,-77);
addOffice("Proconsul","CAEC1889",-76,-76);
addOffice("Proconsul","CLAU1807",-76,-76);
addOffice("Proconsul","COSC1919",-76,-76);
addOffice("Proconsul","IUNI1966",-76,-76);
addOffice("Proconsul","POMP1976",-76,-76);
addOffice("Proconsul","SERV1814",-76,-76);
addOffice("Proconsul","CAEC1889",-75,-75);
addOffice("Proconsul","IUNI2051",-75,-75);
addOffice("Proconsul","POMP1976",-75,-75);
addOffice("Proconsul","SCRI1876",-75,-75);
addOffice("Proconsul","SERV1814",-75,-75);
addOffice("Proconsul","IUNI2051",-74,-74);
addOffice("Proconsul","AURE1866",-74,-74);
addOffice("Proconsul","CAEC1889",-74,-74);
addOffice("Proconsul","OCTA2036",-74,-74);
addOffice("Proconsul","POMP1976",-74,-74);
addOffice("Proconsul","SCRI1876",-74,-74);
addOffice("Proconsul","SERV1814",-74,-74);
addOffice("Proconsul","ANTO2077",-73,-73);
addOffice("Proconsul","AURE1866",-73,-73);
addOffice("Proconsul","AURE2026",-73,-73);
addOffice("Proconsul","CAEC1889",-73,-73);
addOffice("Proconsul","LICI1903",-73,-73);
addOffice("Proconsul","POMP1976",-73,-73);
addOffice("Proconsul","SCRI1876",-73,-73);
addOffice("Proconsul","ANTO2077",-72,-72);
addOffice("Proconsul","AURE2026",-72,-72);
addOffice("Proconsul","CAEC1889",-72,-72);
addOffice("Proconsul","CASS2050",-72,-72);
addOffice("Proconsul","LICI1981",-72,-72);
addOffice("Proconsul","LICI1903",-72,-72);
addOffice("Proconsul","POMP1976",-72,-72);
addOffice("Proconsul","SCRI1876",-72,-72);
addOffice("Proconsul","TERE1982",-72,-72);
addOffice("Proconsul","VARI2102",-72,-72);
addOffice("Proconsul","ANTO2077",-71,-71);
addOffice("Proconsul","AURE2026",-71,-71);
addOffice("Proconsul","CAEC1889",-71,-71);
addOffice("Proconsul","LICI1903",-71,-71);
addOffice("Proconsul","POMP1976",-71,-71);
addOffice("Proconsul","PUPI1974",-71,-71);
addOffice("Proconsul","TERE1982",-71,-71);
addOffice("Proconsul","AFRA2074",-71,-71);
addOffice("Proconsul","LICI1981",-71,-71);
addOffice("Proconsul","AFRA2074",-70,-70);
addOffice("Proconsul","AURE2026",-70,-70);
addOffice("Proconsul","LICI1903",-70,-70);
addOffice("Proconsul","PUPI1974",-70,-70);
addOffice("Proconsul","AFRA2074",-69,-69);
addOffice("Proconsul","LICI1903",-69,-69);
addOffice("Proconsul","PUPI1974",-69,-69);
addOffice("Proconsul","CAEC2078",-68,-68);
addOffice("Proconsul","CORN2176",-68,-68);
addOffice("Proconsul","LICI1903",-68,-68);
addOffice("Proconsul","AFRA2074",-68,-68);
addOffice("Proconsul","LICI1903",-67,-67);
addOffice("Proconsul","MANL2205",-67,-67);
addOffice("Proconsul","MARC2151",-67,-67);
addOffice("Proconsul","POMP1976",-67,-67);
addOffice("Proconsul","AFRA2074",-67,-67);
addOffice("Proconsul","CAEC2078",-67,-67);
addOffice("Proconsul","ACIL2119",-66,-66);
addOffice("Proconsul","AUFI2222",-66,-66);
addOffice("Proconsul","CAEC2078",-66,-66);
addOffice("Proconsul","CALP2164",-66,-66);
addOffice("Proconsul","LICI1903",-66,-66);
addOffice("Proconsul","MARC2151",-66,-66);
addOffice("Proconsul","POMP1976",-66,-66);
addOffice("Proconsul","CAEC2078",-65,-65);
addOffice("Proconsul","CALP2164",-65,-65);
addOffice("Proconsul","LICI1903",-65,-65);
addOffice("Proconsul","MARC2151",-65,-65);
addOffice("Proconsul","POMP1976",-65,-65);
addOffice("Proconsul","VARI2102",-65,-65);
addOffice("Proconsul","CAEC2078",-64,-64);
addOffice("Proconsul","LICI1903",-64,-64);
addOffice("Proconsul","LICI2085",-64,-64);
addOffice("Proconsul","MANL2205",-64,-64);
addOffice("Proconsul","MARC2151",-64,-64);
addOffice("Proconsul","POMP1976",-64,-64);
addOffice("Proconsul","CALP2164",-64,-64);
addOffice("Proconsul","CAEC2078",-63,-63);
addOffice("Proconsul","LICI1903",-63,-63);
addOffice("Proconsul","LICI2085",-63,-63);
addOffice("Proconsul","MANL2205",-63,-63);
addOffice("Proconsul","MARC2151",-63,-63);
addOffice("Proconsul","POMP1976",-63,-63);
addOffice("Proconsul","CALP2164",-63,-63);
addOffice("Proconsul","ANTO1969",-62,-62);
addOffice("Proconsul","CAEC2040",-62,-62);
addOffice("Proconsul","CAEC2078",-62,-62);
addOffice("Proconsul","COSC2286",-62,-62);
addOffice("Proconsul","POMP1976",-62,-62);
addOffice("Proconsul","POMP2287",-62,-62);
addOffice("Proconsul","ANTO1969",-61,-61);
addOffice("Proconsul","POMP1976",-61,-61);
addOffice("Proconsul","POMP2287",-61,-61);
addOffice("Proconsul","TULL2216",-61,-61);
addOffice("Proconsul","CAEC2953",-60,-60);
addOffice("Proconsul","ANTO1969",-60,-60);
addOffice("Proconsul","OCTA2104",-60,-60);
addOffice("Proconsul","POMP2287",-60,-60);
addOffice("Proconsul","TULL2216",-60,-60);
addOffice("Proconsul","CALP2168",-60,-60);
addOffice("Proconsul","AFRA2074",-59,-59);
addOffice("Proconsul","CORN2082",-59,-59);
addOffice("Proconsul","OCTA2104",-59,-59);
addOffice("Proconsul","POMP2287",-59,-59);
addOffice("Proconsul","TULL2216",-59,-59);
addOffice("Proconsul","CALP2168",-59,-59);
addOffice("Proconsul","CAEC2247",-59,-59);
addOffice("Proconsul","AMPI2291",-58,-58);
addOffice("Proconsul","CORN2082",-58,-58);
addOffice("Proconsul","TULL2216",-58,-58);
addOffice("Proconsul","VETT2344",-58,-58);
addOffice("Proconsul","CALP2168",-57,-57);
addOffice("Proconsul","FABI2357",-57,-57);
addOffice("Proconsul","GABI2234",-57,-57);
addOffice("Proconsul","POMP1976",-57,-57);
addOffice("Proconsul","VETT2344",-57,-57);
addOffice("Proconsul","AMPI2291",-57,-57);
addOffice("Proconsul","CAEC2247",-56,-56);
addOffice("Proconsul","CAEC2263",-56,-56);
addOffice("Proconsul","CALP2168",-56,-56);
addOffice("Proconsul","GABI2234",-56,-56);
addOffice("Proconsul","POMP1976",-56,-56);
addOffice("Proconsul","QUIN2376",-56,-56);
addOffice("Proconsul","SEPT2377",-56,-56);
addOffice("Proconsul","VALE2409",-56,-56);
addOffice("Proconsul","AMPI2291",-56,-56);
addOffice("Proconsul","ANCH2110",-55,-55);
addOffice("Proconsul","CAEC2247",-55,-55);
addOffice("Proconsul","CALP2168",-55,-55);
addOffice("Proconsul","CLAU2062",-55,-55);
addOffice("Proconsul","GABI2234",-55,-55);
addOffice("Proconsul","POMP1976",-55,-55);
addOffice("Proconsul","QUIN2376",-55,-55);
addOffice("Proconsul","ANCH2110",-54,-54);
addOffice("Proconsul","CLAU2062",-54,-54);
addOffice("Proconsul","LICI1981",-54,-54);
addOffice("Proconsul","POMP1976",-54,-54);
addOffice("Proconsul","CAEC2347",-54,-54);
addOffice("Proconsul","CLAU2062",-53,-53);
addOffice("Proconsul","COSC2348",-53,-53);
addOffice("Proconsul","LICI1981",-53,-53);
addOffice("Proconsul","POMP1976",-53,-53);
addOffice("Proconsul","POMP1976",-52,-52);
addOffice("Proconsul","COSC2348",-52,-52);
addOffice("Proconsul","CALP2272",-51,-51);
addOffice("Proconsul","CONS2359",-51,-51);
addOffice("Proconsul","POMP1976",-51,-51);
addOffice("Proconsul","TULL2072",-51,-51);
addOffice("Proconsul","COSC2348",-51,-51);
addOffice("Proconsul","TREM3401",-51,-51);
addOffice("Proconsul","SANQ2968",-50,-50);
addOffice("Proconsul","CALP2272",-50,-50);
addOffice("Proconsul","CONS2359",-50,-50);
addOffice("Proconsul","POMP1976",-50,-50);
addOffice("Proconsul","TULL2072",-50,-50);
addOffice("Proconsul","HORT2554",-50,-50);
addOffice("Proconsul","TREM3401",-50,-50);
addOffice("Proconsul","CAEC2347",-49,-49);
addOffice("Proconsul","CALP2272",-49,-49);
addOffice("Proconsul","DOMI2264",-49,-49);
addOffice("Proconsul","POMP1976",-49,-49);
addOffice("Proconsul","TULL2072",-49,-49);
addOffice("Proconsul","AEMI2341",-48,-48);
addOffice("Proconsul","ALLI2324",-48,-48);
addOffice("Proconsul","CAEC2347",-48,-48);
addOffice("Proconsul","CALP2272",-48,-48);
addOffice("Proconsul","CASS2575",-48,-48);
addOffice("Proconsul","CLAU2397",-48,-48);
addOffice("Proconsul","CORN2356",-48,-48);
addOffice("Proconsul","DOMI2264",-48,-48);
addOffice("Proconsul","DOMI2313",-48,-48);
addOffice("Proconsul","POMP1976",-48,-48);
addOffice("Proconsul","TULL2072",-48,-48);
addOffice("Proconsul","RABI2568",-48,-48);
addOffice("Proconsul","MARC2567",-47,-47);
addOffice("Proconsul","AEMI2341",-47,-47);
addOffice("Proconsul","ALLI2324",-47,-47);
addOffice("Proconsul","CAEC2347",-47,-47);
addOffice("Proconsul","COEL2408",-47,-47);
addOffice("Proconsul","DOMI2313",-47,-47);
addOffice("Proconsul","TREB2336",-47,-47);
addOffice("Proconsul","TULL2072",-47,-47);
addOffice("Proconsul","VIBI2495",-47,-47);
addOffice("Proconsul","RABI2568",-47,-47);
addOffice("Proconsul","MARC2567",-46,-46);
addOffice("Proconsul","ACIL2583",-46,-46);
addOffice("Proconsul","ALLI2324",-46,-46);
addOffice("Proconsul","CAEC2347",-46,-46);
addOffice("Proconsul","CANI2486",-46,-46);
addOffice("Proconsul","NONI2598",-46,-46);
addOffice("Proconsul","SALL2429",-46,-46);
addOffice("Proconsul","SULP2182",-46,-46);
addOffice("Proconsul","SULP2088",-46,-46);
addOffice("Proconsul","TREB2336",-46,-46);
addOffice("Proconsul","VIBI2495",-46,-46);
addOffice("Proconsul","ACIL2583",-45,-45);
addOffice("Proconsul","CURI2641",-45,-45);
addOffice("Proconsul","FURF2498",-45,-45);
addOffice("Proconsul","HIRT2449",-45,-45);
addOffice("Proconsul","MARC2389",-45,-45);
addOffice("Proconsul","PEDI2370",-45,-45);
addOffice("Proconsul","SALL2429",-45,-45);
addOffice("Proconsul","SERV2433",-45,-45);
addOffice("Proconsul","SULP2182",-45,-45);
addOffice("Proconsul","SULP2088",-45,-45);
addOffice("Proconsul","VATI2297",-45,-45);
addOffice("Proconsul","VIBI2495",-45,-45);
addOffice("Proconsul","ACIL2583",-44,-44);
addOffice("Proconsul","AEMI2341",-44,-44);
addOffice("Proconsul","CASS2458",-44,-44);
addOffice("Proconsul","CORN2573",-44,-44);
addOffice("Proconsul","HORT2554",-44,-44);
addOffice("Proconsul","IUNI2459",-44,-44);
addOffice("Proconsul","IUNI2489",-44,-44);
addOffice("Proconsul","MARC2389",-44,-44);
addOffice("Proconsul","MUNA2450",-44,-44);
addOffice("Proconsul","SALL2429",-44,-44);
addOffice("Proconsul","SERV2433",-44,-44);
addOffice("Proconsul","STAI2588",-44,-44);
addOffice("Proconsul","TILL2634",-44,-44);
addOffice("Proconsul","TREB2336",-44,-44);
addOffice("Proconsul","VATI2297",-44,-44);
addOffice("Proconsul","VIBI2495",-44,-44);
addOffice("Proconsul","CORD2946",-44,-44);
addOffice("Proconsul","AEMI2341",-43,-43);
addOffice("Proconsul","ANTO2497",-43,-43);
addOffice("Proconsul","ANTO2392",-43,-43);
addOffice("Proconsul","CASS2458",-43,-43);
addOffice("Proconsul","CORN2515",-43,-43);
addOffice("Proconsul","CORN2573",-43,-43);
addOffice("Proconsul","HORT2554",-43,-43);
addOffice("Proconsul","IUNI2459",-43,-43);
addOffice("Proconsul","IUNI2489",-43,-43);
addOffice("Proconsul","MARC2389",-43,-43);
addOffice("Proconsul","MUNA2450",-43,-43);
addOffice("Proconsul","POMP2254",-43,-43);
addOffice("Proconsul","STAI2588",-43,-43);
addOffice("Proconsul","TILL2634",-43,-43);
addOffice("Proconsul","TREB2336",-43,-43);
addOffice("Proconsul","VATI2297",-43,-43);
addOffice("Proconsul","CASS2458",-42,-42);
addOffice("Proconsul","CORN2774",-42,-42);
addOffice("Proconsul","FUFI2321",-42,-42);
addOffice("Proconsul","HORT2554",-42,-42);
addOffice("Proconsul","IUNI2459",-42,-42);
addOffice("Proconsul","MARC2711",-42,-42);
addOffice("Proconsul","POMP2254",-42,-42);
addOffice("Proconsul","STAI2588",-42,-42);
addOffice("Proconsul","VATI2297",-42,-42);
addOffice("Proconsul","CORN2573",-42,-42);
addOffice("Proconsul","FUFI2321",-41,-41);
addOffice("Proconsul","MARC2711",-41,-41);
addOffice("Proconsul","MUNA2450",-41,-41);
addOffice("Proconsul","POMP2254",-41,-41);
addOffice("Proconsul","STAI2588",-41,-41);
addOffice("Proconsul","VIPS2808",-41,-41);
addOffice("Proconsul","FUFI2321",-40,-40);
addOffice("Proconsul","MARC2711",-40,-40);
addOffice("Proconsul","MUNA2450",-40,-40);
addOffice("Proconsul","POMP2254",-40,-40);
addOffice("Proconsul","VIPS2808",-40,-40);
addOffice("Proconsul","CLOD3097",-40,-40);
addOffice("Proconsul","ASIN2553",-39,-39);
addOffice("Proconsul","DOMI2699",-39,-39);
addOffice("Proconsul","DOMI2313",-39,-39);
addOffice("Proconsul","MUNA2450",-39,-39);
addOffice("Proconsul","POMP2254",-39,-39);
addOffice("Proconsul","VENT2638",-39,-39);
addOffice("Proconsul","VIPS2808",-39,-39);
addOffice("Proconsul","COCC2806",-38,-38);
addOffice("Proconsul","DOMI2699",-38,-38);
addOffice("Proconsul","DOMI2313",-38,-38);
addOffice("Proconsul","MUNA2450",-38,-38);
addOffice("Proconsul","POMP2254",-38,-38);
addOffice("Proconsul","SOSI2840",-38,-38);
addOffice("Proconsul","VENT2638",-38,-38);
addOffice("Proconsul","VIPS2808",-38,-38);
addOffice("Proconsul","COCC2806",-37,-37);
addOffice("Proconsul","DOMI2699",-37,-37);
addOffice("Proconsul","DOMI2313",-37,-37);
addOffice("Proconsul","POMP2254",-37,-37);
addOffice("Proconsul","SOSI2840",-37,-37);
addOffice("Proconsul","CALV2584",-36,-36);
addOffice("Proconsul","DOMI2699",-36,-36);
addOffice("Proconsul","DOMI2313",-36,-36);
addOffice("Proconsul","NORB2713",-36,-36);
addOffice("Proconsul","POMP2254",-36,-36);
addOffice("Proconsul","SOSI2840",-36,-36);
addOffice("Proconsul","STAT2822",-36,-36);
addOffice("Proconsul","VIPS2808",-36,-36);
addOffice("Proconsul","CALV2584",-35,-35);
addOffice("Proconsul","DOMI2699",-35,-35);
addOffice("Proconsul","MARC2534",-35,-35);
addOffice("Proconsul","MUNA2450",-35,-35);
addOffice("Proconsul","NORB2713",-35,-35);
addOffice("Proconsul","POMP2254",-35,-35);
addOffice("Proconsul","SOSI2840",-35,-35);
addOffice("Proconsul","STAT2822",-35,-35);
addOffice("Proconsul","TITI2834",-35,-35);
addOffice("Proconsul","VIPS2808",-35,-35);
addOffice("Proconsul","ASIN2898",-34,-34);
addOffice("Proconsul","CORN2717",-34,-34);
addOffice("Proconsul","DOMI2699",-34,-34);
addOffice("Proconsul","MARC2534",-34,-34);
addOffice("Proconsul","NORB2713",-34,-34);
addOffice("Proconsul","SOSI2840",-34,-34);
addOffice("Proconsul","STAT2822",-34,-34);
addOffice("Proconsul","VIPS2808",-34,-34);
addOffice("Proconsul","CORN2717",-33,-33);
addOffice("Proconsul","HERE2911",-33,-33);
addOffice("Proconsul","MARC2534",-33,-33);
addOffice("Proconsul","STAT2822",-33,-33);
addOffice("Proconsul","CORN2717",-32,-32);
addOffice("Proconsul","OPPI2916",-32,-32);
addOffice("Proconsul","STAT2822",-32,-32);
addOffice("Proconsul","VIPS2808",-32,-32);
addOffice("Proconsul","CAER2945",-32,-32);
addOffice("Proconsul","OCTA3757",-32,-32);
addOffice("Proconsul","QUIN3416",-32,-32);
addOffice("Proconsul","OPPI2916",-31,-31);
addOffice("Proconsul","SOSI2840",-31,-31);
addOffice("Proconsul","STAT2822",-31,-31);
addOffice("Proconsul","VIPS2808",-31,-31);
addOffice("Proconsul","OCTA3757",-31,-31);
addOffice("Proconsul","VINI2496",-28,-28);
addOffice("Proconsul","VINI2496",-27,-27);
addOffice("Quaestor","AEMI3039",-509,-509);
addOffice("Quaestor","MINU0006",-509,-509);
addOffice("Quaestor","VETU0007",-509,-509);
addOffice("Quaestor","CLAU0032",-496,-496);
addOffice("Quaestor","FABI0078",-485,-485);
addOffice("Quaestor","VALE0079",-485,-485);
addOffice("Quaestor","CORN0144",-459,-459);
addOffice("Quaestor","SERV0145",-459,-459);
addOffice("Quaestor","QUIN0114",-458,-458);
addOffice("Quaestor","VALE0149",-458,-458);
addOffice("Quaestor","VALE0180",-446,-446);
addOffice("Quaestor","AEMI0203",-446,-446);
addOffice("Quaestor","SEXT0309",-414,-414);
addOffice("Quaestor","AELI0321",-409,-409);
addOffice("Quaestor","FABI0322",-409,-409);
addOffice("Quaestor","PAPI0323",-409,-409);
addOffice("Quaestor","SILI0324",-409,-409);
addOffice("Quaestor","CARV0395",-391,-391);
addOffice("Quaestor","CLAU0591",-316,-316);
addOffice("Quaestor","AEMI2940",-300,-300);
addOffice("Quaestor","ANNI3451",-300,-300);
addOffice("Quaestor","OPIM0648",-294,-294);
addOffice("Quaestor","SERG3060",-241,-241);
addOffice("Quaestor","FABI0712",-237,-237);
addOffice("Quaestor","FABI0712",-236,-236);
addOffice("Quaestor","OCTA0798",-230,-230);
addOffice("Quaestor","TERE0818",-222,-222);
addOffice("Quaestor","FULV0838",-218,-218);
addOffice("Quaestor","LUCR0839",-218,-218);
addOffice("Quaestor","SEMP0860",-217,-217);
addOffice("Quaestor","ATIL0875",-216,-216);
addOffice("Quaestor","FURI0876",-216,-216);
addOffice("Quaestor","CAEC0905",-214,-214);
addOffice("Quaestor","CORN0877",-212,-212);
addOffice("Quaestor","FLAM0989",-209,-209);
addOffice("Quaestor","TREM1021",-206,-206);
addOffice("Quaestor","VALE1022",-206,-206);
addOffice("Quaestor","QUIN0999",-206,-206);
addOffice("Quaestor","PORC0907",-204,-204);
addOffice("Quaestor","LAEL0992",-202,-202);
addOffice("Quaestor","ANON3064",-200,-200);
addOffice("Quaestor","CORN1077",-200,-200);
addOffice("Quaestor","AURE1116",-196,-196);
addOffice("Quaestor","FABI1117",-196,-196);
addOffice("Quaestor","CORN1016",-196,-196);
addOffice("Quaestor","AEMI1134",-195,-195);
addOffice("Quaestor","POST1143",-194,-194);
addOffice("Quaestor","FURI1179",-190,-190);
addOffice("Quaestor","FABI1208",-188,-188);
addOffice("Quaestor","FABI1209",-188,-188);
addOffice("Quaestor","PETI1219",-188,-188);
addOffice("Quaestor","MANL1413",-168,-168);
addOffice("Quaestor","STER1414",-168,-168);
addOffice("Quaestor","CORN1415",-167,-167);
addOffice("Quaestor","TERE1486",-154,-154);
addOffice("Quaestor","LICI1500",-152,-152);
addOffice("Quaestor","LICI1500",-151,-151);
addOffice("Quaestor","CORN1506",-150,-150);
addOffice("Quaestor","FULC1518",-148,-148);
addOffice("Quaestor","PUBL1536",-146,-146);
addOffice("Quaestor","SEMP1548",-145,-145);
addOffice("Quaestor","TREM1558",-143,-143);
addOffice("Quaestor","SEMP1525",-137,-137);
addOffice("Quaestor","FABI1594",-134,-134);
addOffice("Quaestor","FABI1615",-132,-132);
addOffice("Quaestor","AQUI3047",-128,-128);
addOffice("Quaestor","SEMP1598",-126,-126);
addOffice("Quaestor","MARI1660",-121,-121);
addOffice("Quaestor","ALBI1667",-120,-120);
addOffice("Quaestor","ANNI1676",-119,-119);
addOffice("Quaestor","AURE1683",-117,-117);
addOffice("Quaestor","ANTO1705",-113,-113);
addOffice("Quaestor","SEXT1723",-111,-111);
addOffice("Quaestor","LICI1679",-111,-111);
addOffice("Quaestor","VETT3642",-110,-110);
addOffice("Quaestor","CLAU1753",-110,-110);
addOffice("Quaestor","LICI1679",-110,-110);
addOffice("Quaestor","MUCI1692",-109,-109);
addOffice("Quaestor","SERV1734",-109,-109);
addOffice("Quaestor","LUTA1878",-109,-109);
addOffice("Quaestor","LUTA1878",-108,-108);
addOffice("Quaestor","BILL1742",-108,-108);
addOffice("Quaestor","CORN1746",-107,-107);
addOffice("Quaestor","POMP1767",-106,-106);
addOffice("Quaestor","OCTA1754",-105,-105);
addOffice("Quaestor","SERV1755",-105,-105);
addOffice("Quaestor","APPU1766",-105,-105);
addOffice("Quaestor","APPU1766",-104,-104);
addOffice("Quaestor","CALP1795",-103,-103);
addOffice("Quaestor","LIVI1756",-102,-102);
addOffice("Quaestor","VETU1782",-102,-102);
addOffice("Quaestor","NORB1777",-101,-101);
addOffice("Quaestor","GABI1790",-101,-101);
addOffice("Quaestor","ANON3054",-100,-100);
addOffice("Quaestor","OCTA4682",-100,-100);
addOffice("Quaestor","PAVU3055",-100,-100);
addOffice("Quaestor","FUND5159",-100,-100);
addOffice("Quaestor","CORN1794",-100,-100);
addOffice("Quaestor","CALP1795",-100,-100);
addOffice("Quaestor","SERV1796",-100,-100);
addOffice("Quaestor","SAUF1809",-100,-100);
addOffice("Quaestor","CLAU1807",-99,-99);
addOffice("Quaestor","MANL3463",-99,-99);
addOffice("Quaestor","EGNA3449",-97,-97);
addOffice("Quaestor","IULI1798",-96,-96);
addOffice("Quaestor","CLOE3676",-95,-95);
addOffice("Quaestor","MANL1833",-94,-94);
addOffice("Quaestor","SERG1834",-94,-94);
addOffice("Quaestor","ANON1832",-93,-93);
addOffice("Quaestor","SERT1818",-91,-91);
addOffice("Quaestor","AEMI1993",-91,-91);
addOffice("Quaestor","MINU1901",-89,-89);
addOffice("Quaestor","VIBI3063",-88,-88);
addOffice("Quaestor","LICI1903",-88,-88);
addOffice("Quaestor","CLAU2021",-87,-87);
addOffice("Quaestor","HERE3051",-87,-87);
addOffice("Quaestor","TREM2157",-87,-87);
addOffice("Quaestor","HIRT1960",-86,-86);
addOffice("Quaestor","HIRT1960",-85,-85);
addOffice("Quaestor","TERE1963",-85,-85);
addOffice("Quaestor","FONT1965",-84,-84);
addOffice("Quaestor","IUNI1966",-84,-84);
addOffice("Quaestor","VERR1967",-84,-84);
addOffice("Quaestor","PUPI1974",-83,-83);
addOffice("Quaestor","CAEC3045",-83,-83);
addOffice("Quaestor","MANL2250",-81,-81);
addOffice("Quaestor","CORN2012",-81,-81);
addOffice("Quaestor","FABI2013",-81,-81);
addOffice("Quaestor","MANL2014",-81,-81);
addOffice("Quaestor","TARQ2015",-81,-81);
addOffice("Quaestor","POMP3776",-81,-81);
addOffice("Quaestor","VALE2117",-81,-81);
addOffice("Quaestor","PUBL2025",-80,-80);
addOffice("Quaestor","PUBL3504",-80,-80);
addOffice("Quaestor","HIRT2033",-79,-79);
addOffice("Quaestor","OCTA2036",-79,-79);
addOffice("Quaestor","POMP3053",-79,-79);
addOffice("Quaestor","SEPT3057",-78,-78);
addOffice("Quaestor","IULI2044",-77,-77);
addOffice("Quaestor","AELI2045",-77,-77);
addOffice("Quaestor","MARI2053",-76,-76);
addOffice("Quaestor","MEMM2020",-76,-76);
addOffice("Quaestor","HORT1902",-76,-76);
addOffice("Quaestor","AUTR2070",-75,-75);
addOffice("Quaestor","TULL2072",-75,-75);
addOffice("Quaestor","URBI2089",-75,-75);
addOffice("Quaestor","CASS2257",-75,-75);
addOffice("Quaestor","URBI2089",-74,-74);
addOffice("Quaestor","LICI2085",-74,-74);
addOffice("Quaestor","OPPI2086",-74,-74);
addOffice("Quaestor","SULP2088",-74,-74);
addOffice("Quaestor","AXIU2128",-74,-74);
addOffice("Quaestor","POMP2287",-74,-74);
addOffice("Quaestor","CLAU2134",-74,-74);
addOffice("Quaestor","VISE2027",-74,-74);
addOffice("Quaestor","RANC2135",-74,-74);
addOffice("Quaestor","MAEN2133",-74,-74);
addOffice("Quaestor","PUBL2132",-74,-74);
addOffice("Quaestor","MINU2131",-74,-74);
addOffice("Quaestor","CORN2290",-74,-74);
addOffice("Quaestor","OCTA2104",-73,-73);
addOffice("Quaestor","POST2105",-73,-73);
addOffice("Quaestor","TORA2106",-73,-73);
addOffice("Quaestor","VALE2107",-73,-73);
addOffice("Quaestor","CAEC2137",-73,-73);
addOffice("Quaestor","CAES2138",-72,-72);
addOffice("Quaestor","VETT2344",-72,-72);
addOffice("Quaestor","COEL2154",-71,-71);
addOffice("Quaestor","CURI2155",-71,-71);
addOffice("Quaestor","CURT2156",-71,-71);
addOffice("Quaestor","VALE1992",-71,-71);
addOffice("Quaestor","AURE1909",-71,-71);
addOffice("Quaestor","CREP2184",-71,-71);
addOffice("Quaestor","VETT2344",-71,-71);
addOffice("Quaestor","TREM3401",-71,-71);
addOffice("Quaestor","AQUI4686",-70,-70);
addOffice("Quaestor","CALP2168",-70,-70);
addOffice("Quaestor","PLAE2169",-70,-70);
addOffice("Quaestor","QUIN3291",-70,-70);
addOffice("Quaestor","SICI2170",-70,-70);
addOffice("Quaestor","CAEP3041",-70,-70);
addOffice("Quaestor","CAEP3042",-70,-70);
addOffice("Quaestor","POPI2159",-70,-70);
addOffice("Quaestor","VERG2267",-70,-70);
addOffice("Quaestor","IULI1957",-69,-69);
addOffice("Quaestor","SULP2182",-69,-69);
addOffice("Quaestor","TULL2216",-68,-68);
addOffice("Quaestor","SENT3034",-68,-68);
addOffice("Quaestor","SENT3034",-67,-67);
addOffice("Quaestor","PLAE2087",-67,-67);
addOffice("Quaestor","SERV3917",-67,-67);
addOffice("Quaestor","AEMI2262",-66,-66);
addOffice("Quaestor","CAEC2263",-66,-66);
addOffice("Quaestor","DOMI2264",-66,-66);
addOffice("Quaestor","PLAU2265",-66,-66);
addOffice("Quaestor","SOSI2266",-66,-66);
addOffice("Quaestor","ANCH2110",-65,-65);
addOffice("Quaestor","CLAU2398",-64,-64);
addOffice("Quaestor","LOLL2284",-64,-64);
addOffice("Quaestor","PORC2241",-64,-64);
addOffice("Quaestor","ATIL2294",-63,-63);
addOffice("Quaestor","FADI2295",-63,-63);
addOffice("Quaestor","SEST2296",-63,-63);
addOffice("Quaestor","VATI2297",-63,-63);
addOffice("Quaestor","ALLI2324",-62,-62);
addOffice("Quaestor","IUVE2308",-62,-62);
addOffice("Quaestor","CLOD2219",-61,-61);
addOffice("Quaestor","SEXT2323",-61,-61);
addOffice("Quaestor","SERV2433",-61,-61);
addOffice("Quaestor","CURT3402",-61,-61);
addOffice("Quaestor","APPU3037",-60,-60);
addOffice("Quaestor","CAEC2953",-60,-60);
addOffice("Quaestor","SERV3059",-60,-60);
addOffice("Quaestor","CLAU2952",-60,-60);
addOffice("Quaestor","NUME2334",-60,-60);
addOffice("Quaestor","TREB2336",-60,-60);
addOffice("Quaestor","AEMI2350",-60,-60);
addOffice("Quaestor","CAEC2347",-60,-60);
addOffice("Quaestor","AEMI2350",-59,-59);
addOffice("Quaestor","CAEC2351",-59,-59);
addOffice("Quaestor","FAVO2352",-59,-59);
addOffice("Quaestor","CALP2366",-58,-58);
addOffice("Quaestor","PLAN2312",-58,-58);
addOffice("Quaestor","FURF2498",-58,-58);
addOffice("Quaestor","CANI3422",-58,-58);
addOffice("Quaestor","TREB2336",-58,-58);
addOffice("Quaestor","NONI2403",-57,-57);
addOffice("Quaestor","CAEL2417",-57,-57);
addOffice("Quaestor","COEL2408",-56,-56);
addOffice("Quaestor","SERV3255",-56,-56);
addOffice("Quaestor","SULP2430",-56,-56);
addOffice("Quaestor","LICI2372",-55,-55);
addOffice("Quaestor","MINU2466",-55,-55);
addOffice("Quaestor","SALL2429",-55,-55);
addOffice("Quaestor","SCRI2443",-55,-55);
addOffice("Quaestor","CASS2458",-55,-55);
addOffice("Quaestor","CASS2481",-55,-55);
addOffice("Quaestor","MUNA2450",-55,-55);
addOffice("Quaestor","CASS2481",-54,-54);
addOffice("Quaestor","IUNI2459",-54,-54);
addOffice("Quaestor","CORN2300",-54,-54);
addOffice("Quaestor","LICI2328",-54,-54);
addOffice("Quaestor","LIGA2442",-54,-54);
addOffice("Quaestor","SEST2444",-54,-54);
addOffice("Quaestor","SEXT2468",-54,-54);
addOffice("Quaestor","CASS2481",-53,-53);
addOffice("Quaestor","IUNI2459",-53,-53);
addOffice("Quaestor","CANI2486",-53,-53);
addOffice("Quaestor","CASS2481",-52,-52);
addOffice("Quaestor","ATEI2479",-52,-52);
addOffice("Quaestor","CAEC2480",-52,-52);
addOffice("Quaestor","EPPI2482",-52,-52);
addOffice("Quaestor","SERV3056",-52,-52);
addOffice("Quaestor","CASS2481",-51,-51);
addOffice("Quaestor","ANTO2392",-51,-51);
addOffice("Quaestor","ANTO2497",-51,-51);
addOffice("Quaestor","FURI2499",-51,-51);
addOffice("Quaestor","MESC2500",-51,-51);
addOffice("Quaestor","FABI2379",-51,-51);
addOffice("Quaestor","CLAU3066",-51,-51);
addOffice("Quaestor","ACIL3067",-51,-51);
addOffice("Quaestor","PUBL2228",-51,-51);
addOffice("Quaestor","ANNI3069",-51,-51);
addOffice("Quaestor","ANN-3070",-51,-51);
addOffice("Quaestor","AN-3071",-51,-51);
addOffice("Quaestor","ATIL3072",-51,-51);
addOffice("Quaestor","CALP3073",-51,-51);
addOffice("Quaestor","CORN3074",-51,-51);
addOffice("Quaestor","ANON2667",-51,-51);
addOffice("Quaestor","D-3076",-51,-51);
addOffice("Quaestor","D-3077",-51,-51);
addOffice("Quaestor","GN-3078",-51,-51);
addOffice("Quaestor","OPPI3079",-51,-51);
addOffice("Quaestor","SCRI3080",-51,-51);
addOffice("Quaestor","PORC2404",-51,-51);
addOffice("Quaestor","RU-3083",-51,-51);
addOffice("Quaestor","TE-3084",-51,-51);
addOffice("Quaestor","TRI-3085",-51,-51);
addOffice("Quaestor","TRI-3086",-51,-51);
addOffice("Quaestor","POMP2633",-51,-51);
addOffice("Quaestor","POS-3090",-51,-51);
addOffice("Quaestor","POS-3091",-51,-51);
addOffice("Quaestor","P-3093",-51,-51);
addOffice("Quaestor","ANNI3293",-51,-51);
addOffice("Quaestor","CANI3294",-51,-51);
addOffice("Quaestor","ANNI3322",-51,-51);
addOffice("Quaestor","HORT2554",-51,-51);
addOffice("Quaestor","AMPU2979",-50,-50);
addOffice("Quaestor","APPU2941",-50,-50);
addOffice("Quaestor","SANQ2968",-50,-50);
addOffice("Quaestor","FONT3471",-50,-50);
addOffice("Quaestor","ANTI2522",-50,-50);
addOffice("Quaestor","ANTO2523",-50,-50);
addOffice("Quaestor","COEL2524",-50,-50);
addOffice("Quaestor","MARI2525",-50,-50);
addOffice("Quaestor","CALP2543",-50,-50);
addOffice("Quaestor","IUNI2489",-50,-50);
addOffice("Quaestor","IULI2559",-50,-50);
addOffice("Quaestor","PUPI2661",-50,-50);
addOffice("Quaestor","LUCR3808",-50,-50);
addOffice("Quaestor","RAES3340",-49,-49);
addOffice("Quaestor","MARC2540",-49,-49);
addOffice("Quaestor","NERI2541",-49,-49);
addOffice("Quaestor","QUIN2542",-49,-49);
addOffice("Quaestor","SEXT2602",-49,-49);
addOffice("Quaestor","POMP3777",-49,-49);
addOffice("Quaestor","APPU2716",-48,-48);
addOffice("Quaestor","APPU2612",-48,-48);
addOffice("Quaestor","CLAU2570",-48,-48);
addOffice("Quaestor","CLAU2571",-48,-48);
addOffice("Quaestor","CORN2572",-48,-48);
addOffice("Quaestor","CORN2573",-48,-48);
addOffice("Quaestor","IULI2374",-48,-48);
addOffice("Quaestor","PLAE2574",-48,-48);
addOffice("Quaestor","SALL2429",-48,-48);
addOffice("Quaestor","SERV4606",-48,-48);
addOffice("Quaestor","APPU2612",-47,-47);
addOffice("Quaestor","GALL2605",-47,-47);
addOffice("Quaestor","APPU2716",-47,-47);
addOffice("Quaestor","IULI2600",-47,-47);
addOffice("Quaestor","POMP2601",-47,-47);
addOffice("Quaestor","DECI2628",-47,-47);
addOffice("Quaestor","TULL3062",-47,-47);
addOffice("Quaestor","IULI2600",-46,-46);
addOffice("Quaestor","GALL2605",-46,-46);
addOffice("Quaestor","TERE2611",-46,-46);
addOffice("Quaestor","APPU2639",-45,-45);
addOffice("Quaestor","ANTI2640",-45,-45);
addOffice("Quaestor","CASC2130",-45,-45);
addOffice("Quaestor","CORN4704",-44,-44);
addOffice("Quaestor","CORN2550",-44,-44);
addOffice("Quaestor","CORN2689",-44,-44);
addOffice("Quaestor","CORN2394",-44,-44);
addOffice("Quaestor","EGNA2690",-44,-44);
addOffice("Quaestor","RUTI2691",-44,-44);
addOffice("Quaestor","SEST2729",-44,-44);
addOffice("Quaestor","TURU2692",-44,-44);
addOffice("Quaestor","APPU3040",-44,-44);
addOffice("Quaestor","CORN4703",-44,-44);
addOffice("Quaestor","ALLI3087",-43,-43);
addOffice("Quaestor","B-3088",-43,-43);
addOffice("Quaestor","ANNI3092",-43,-43);
addOffice("Quaestor","FURI3096",-43,-43);
addOffice("Quaestor","CNOR5118",-43,-43);
addOffice("Quaestor","APPU3040",-43,-43);
addOffice("Quaestor","CASS2723",-43,-43);
addOffice("Quaestor","TITI2724",-43,-43);
addOffice("Quaestor","MANL2725",-43,-43);
addOffice("Quaestor","TULL2632",-43,-43);
addOffice("Quaestor","CNOR5118",-42,-42);
addOffice("Quaestor","PLAE2773",-42,-42);
addOffice("Quaestor","LIVI3050",-41,-41);
addOffice("Quaestor","BARB2800",-41,-41);
addOffice("Quaestor","DECI2801",-41,-41);
addOffice("Quaestor","GELL2802",-41,-41);
addOffice("Quaestor","PEDI2803",-41,-41);
addOffice("Quaestor","MEMM3015",-41,-41);
addOffice("Quaestor","ATIN3044",-40,-40);
addOffice("Quaestor","HEDI3049",-40,-40);
addOffice("Quaestor","SEST3249",-40,-40);
addOffice("Quaestor","SOSI2840",-39,-39);
addOffice("Quaestor","VOCO3061",-39,-39);
addOffice("Quaestor","TITI2834",-36,-36);
addOffice("Quaestor","SEMP3052",-36,-36);
addOffice("Quaestor","VALE3849",-36,-36);
addOffice("Quaestor","VALE2914",-36,-36);
addOffice("Quaestor","CAER2945",-32,-32);
addOffice("Quaestor","PAQU3458",-32,-32);
addOffice("Quaestor","ACIL3035",-29,-29);
addOffice("Rex Sacrorum","PAPI0009",-509,-509);
addOffice("Rex Sacrorum","POST0690",-280,-280);
addOffice("Rex Sacrorum","MARC0975",-250,-250);
addOffice("Rex Sacrorum","MARC0975",-210,-210);
addOffice("Rex Sacrorum","CORN0980",-208,-208);
addOffice("Rex Sacrorum","CLOE1287",-180,-180);
addOffice("Rex Sacrorum","CLAU2134",-74,-74);
addOffice("Rex Sacrorum","CLAU2190",-60,-60);
addOffice("Rex Sacrorum","CLAU2190",-57,-57);
addOffice("Senator","POPI3229",-509,-484);
addOffice("Senator","PUBL3240",-509,-484);
addOffice("Senator","AEBU3299",-509,-484);
addOffice("Senator","ANNI3323",-307,-307);
addOffice("Senator","AEMI3331",-200,-175);
addOffice("Senator","AEMI4706",-200,-175);
addOffice("Senator","LUCI3814",-200,-175);
addOffice("Senator","TEID4631",-200,-175);
addOffice("Senator","MANI3222",-184,-184);
addOffice("Senator","FULV3693",-174,-174);
addOffice("Senator","TERE3522",-170,-170);
addOffice("Senator","ACIL3297",-170,-170);
addOffice("Senator","EGNA3174",-165,-165);
addOffice("Senator","FONT3189",-165,-165);
addOffice("Senator","OFID3224",-165,-165);
addOffice("Senator","PORC3239",-165,-165);
addOffice("Senator","SEMP3251",-165,-165);
addOffice("Senator","CLAU3429",-165,-165);
addOffice("Senator","FONT3195",-161,-161);
addOffice("Senator","MANL1808",-161,-161);
addOffice("Senator","ACIL3298",-155,-155);
addOffice("Senator","SULP4610",-150,-150);
addOffice("Senator","LUTA3200",-140,-140);
addOffice("Senator","SEMP3259",-140,-140);
addOffice("Senator","STAT3274",-140,-140);
addOffice("Senator","ANNI3136",-135,-135);
addOffice("Senator","ANNI3137",-135,-135);
addOffice("Senator","COPO3170",-134,-134);
addOffice("Senator","PAPI3235",-134,-134);
addOffice("Senator","PETT3773",-132,-132);
addOffice("Senator","AFIN3134",-129,-129);
addOffice("Senator","AFIN3289",-129,-129);
addOffice("Senator","ANNI3288",-129,-129);
addOffice("Senator","ANTI3282",-129,-129);
addOffice("Senator","ANTI3138",-129,-129);
addOffice("Senator","APPU3146",-129,-129);
addOffice("Senator","AUFI3148",-129,-129);
addOffice("Senator","CAEC3152",-129,-129);
addOffice("Senator","COEL3158",-129,-129);
addOffice("Senator","CARV3160",-129,-129);
addOffice("Senator","CLAU3167",-129,-129);
addOffice("Senator","DIDI3172",-129,-129);
addOffice("Senator","DOMI3173",-129,-129);
addOffice("Senator","COSC3175",-129,-129);
addOffice("Senator","GENU3187",-129,-129);
addOffice("Senator","GESS3188",-129,-129);
addOffice("Senator","FALE3192",-129,-129);
addOffice("Senator","FILI3194",-129,-129);
addOffice("Senator","LABE3197",-129,-129);
addOffice("Senator","LOLL3198",-129,-129);
addOffice("Senator","HERE3199",-129,-129);
addOffice("Senator","LICI3206",-129,-129);
addOffice("Senator","LUCI3207",-129,-129);
addOffice("Senator","NAUT3214",-129,-129);
addOffice("Senator","MUNI3215",-129,-129);
addOffice("Senator","OCTA3220",-129,-129);
addOffice("Senator","MEMM1702",-129,-129);
addOffice("Senator","NEME3223",-129,-129);
addOffice("Senator","POMP3225",-129,-129);
addOffice("Senator","POPI3226",-129,-129);
addOffice("Senator","PLAE3237",-129,-129);
addOffice("Senator","POPI3238",-129,-129);
addOffice("Senator","RUBR3248",-129,-129);
addOffice("Senator","SERR3252",-129,-129);
addOffice("Senator","SILI3253",-129,-129);
addOffice("Senator","SILI3272",-129,-129);
addOffice("Senator","ATIL3332",-129,-129);
addOffice("Senator","CORN3779",-129,-129);
addOffice("Senator","SEMP3818",-129,-129);
addOffice("Senator","LUCI3810",-125,-100);
addOffice("Senator","PAPI3770",-125,-100);
addOffice("Senator","CASS3425",-115,-115);
addOffice("Senator","VOLC3279",-100,-75);
addOffice("Senator","CAEL3336",-100,-75);
addOffice("Senator","PLAU3231",-100,-100);
addOffice("Senator","VERR3842",-90,-90);
addOffice("Senator","SERG4603",-90,-90);
addOffice("Senator","LICI3203",-88,-63);
addOffice("Senator","STAT3267",-87,-62);
addOffice("Senator","COEL1956",-87,-87);
addOffice("Senator","BAEB5095",-82,-82);
addOffice("Senator","CONS5096",-82,-82);
addOffice("Senator","DOMI5097",-82,-82);
addOffice("Senator","LAET5098",-82,-82);
addOffice("Senator","LAMP5152",-82,-82);
addOffice("Senator","PAPI5100",-82,-82);
addOffice("Senator","SALT5101",-82,-82);
addOffice("Senator","APPU5102",-82,-82);
addOffice("Senator","GRAN4272",-82,-82);
addOffice("Senator","ANON5104",-82,-82);
addOffice("Senator","MARC1947",-82,-82);
addOffice("Senator","DOMI1991",-82,-82);
addOffice("Senator","LIVI2018",-82,-82);
addOffice("Senator","INST2055",-82,-82);
addOffice("Senator","OCTA2057",-82,-82);
addOffice("Senator","TARQ2058",-82,-82);
addOffice("Senator","INST2059",-82,-82);
addOffice("Senator","ANTO2146",-82,-82);
addOffice("Senator","MANL2149",-82,-82);
addOffice("Senator","FANN2220",-82,-82);
addOffice("Senator","NORB3510",-82,-82);
addOffice("Senator","VIBI3526",-82,-82);
addOffice("Senator","MARC3552",-82,-82);
addOffice("Senator","HIRT3707",-82,-82);
addOffice("Senator","CORN3869",-82,-82);
addOffice("Senator","LUCR3899",-82,-82);
addOffice("Senator","PLAE3234",-82,-82);
addOffice("Senator","FIDU3465",-82,-82);
addOffice("Senator","VENU2004",-82,-82);
addOffice("Senator","ATTI3333",-79,-54);
addOffice("Senator","PETI3236",-78,-78);
addOffice("Senator","LUSC3211",-76,-76);
addOffice("Senator","MANI3221",-76,-76);
addOffice("Senator","LUCI3811",-76,-76);
addOffice("Senator","ATTI3151",-75,-75);
addOffice("Senator","OCTA3218",-75,-75);
addOffice("Senator","ANNI3325",-75,-75);
addOffice("Senator","OCTA3760",-75,-75);
addOffice("Senator","ANON3196",-74,-49);
addOffice("Senator","OCTA3759",-74,-49);
addOffice("Senator","AQUI3147",-74,-74);
addOffice("Senator","ATIL3153",-74,-74);
addOffice("Senator","CAUL3161",-74,-74);
addOffice("Senator","CAUD3163",-74,-74);
addOffice("Senator","CONS3169",-74,-74);
addOffice("Senator","FIDI3193",-74,-74);
addOffice("Senator","IUVE3205",-74,-74);
addOffice("Senator","HEIU3210",-74,-74);
addOffice("Senator","SEPT3254",-74,-74);
addOffice("Senator","SATU3261",-74,-74);
addOffice("Senator","BAEB3305",-74,-74);
addOffice("Senator","EGNA3447",-74,-74);
addOffice("Senator","MINU3704",-74,-74);
addOffice("Senator","CALI3144",-73,-48);
addOffice("Senator","RUTI3256",-72,-72);
addOffice("Senator","CLAU3162",-71,-71);
addOffice("Senator","POPI3228",-71,-71);
addOffice("Senator","EGNA3179",-70,-70);
addOffice("Senator","ANON3184",-70,-70);
addOffice("Senator","IUNI3204",-70,-70);
addOffice("Senator","LUCR3208",-70,-70);
addOffice("Senator","POPI3227",-70,-70);
addOffice("Senator","TITI3271",-70,-70);
addOffice("Senator","VATI3846",-70,-70);
addOffice("Senator","TITI3856",-70,-70);
addOffice("Senator","LUCI3212",-67,-67);
addOffice("Senator","ANNI3139",-66,-66);
addOffice("Senator","VARG3269",-66,-66);
addOffice("Senator","TUDI3275",-66,-66);
addOffice("Senator","QUIN3823",-66,-66);
addOffice("Senator","VOLU2195",-66,-66);
addOffice("Senator","RABI1912",-63,-63);
addOffice("Senator","ANNI3140",-63,-63);
addOffice("Senator","CORN3164",-63,-63);
addOffice("Senator","CORN3165",-63,-63);
addOffice("Senator","CORN3166",-63,-63);
addOffice("Senator","CORN3177",-63,-63);
addOffice("Senator","FULV3185",-63,-63);
addOffice("Senator","PORC3244",-63,-63);
addOffice("Senator","SAEN3260",-63,-63);
addOffice("Senator","TERE3270",-63,-63);
addOffice("Senator","CORN3440",-63,-63);
addOffice("Senator","LICI3797",-63,-63);
addOffice("Senator","PLOT2315",-60,-60);
addOffice("Senator","ALBA3142",-60,-60);
addOffice("Senator","AMNA3320",-60,-60);
addOffice("Senator","OPPI3230",-57,-57);
addOffice("Senator","ANNA3321",-55,-55);
addOffice("Senator","TANU3851",-55,-55);
addOffice("Senator","APPU3154",-54,-54);
addOffice("Senator","IUVE3587",-54,-54);
addOffice("Senator","CORN3180",-52,-52);
addOffice("Senator","TEID3273",-52,-52);
addOffice("Senator","VIBI3280",-52,-52);
addOffice("Senator","CORN3441",-52,-52);
addOffice("Senator","VOLU4619",-50,-50);
addOffice("Senator","ANON3805",-49,-24);
addOffice("Senator","RUBR3247",-49,-49);
addOffice("Senator","CURT3442",-49,-49);
addOffice("Senator","LICI3795",-49,-49);
addOffice("Senator","SULP3671",-49,-49);
addOffice("Senator","TUTI3263",-48,-48);
addOffice("Senator","TITI3857",-47,-47);
addOffice("Senator","CALP3171",-46,-46);
addOffice("Senator","PLAE3232",-46,-46);
addOffice("Senator","FULV3696",-46,-46);
addOffice("Senator","FURI3697",-46,-46);
addOffice("Senator","AQUI2618",-46,-46);
addOffice("Senator","PUBL3802",-46,-46);
addOffice("Senator","VALG3264",-45,-45);
addOffice("Senator","POMP3787",-45,-45);
addOffice("Senator","OCTA5122",-44,-19);
addOffice("Senator","SEXT5126",-44,-44);
addOffice("Senator","PATI2578",-44,-44);
addOffice("Senator","PATI2728",-44,-44);
addOffice("Senator","ANTI2778",-44,-44);
addOffice("Senator","SERV2686",-44,-44);
addOffice("Senator","ANIC3143",-44,-44);
addOffice("Senator","CAEC3150",-44,-44);
addOffice("Senator","ERUC3181",-44,-44);
addOffice("Senator","FLAV3186",-44,-44);
addOffice("Senator","GELL3191",-44,-44);
addOffice("Senator","PLAU3233",-44,-44);
addOffice("Senator","QUIN3243",-44,-44);
addOffice("Senator","POPI3246",-44,-44);
addOffice("Senator","SERR3250",-44,-44);
addOffice("Senator","CAEC3310",-44,-44);
addOffice("Senator","ASEL3327",-44,-44);
addOffice("Senator","OCTA3758",-44,-44);
addOffice("Senator","PETR3772",-44,-44);
addOffice("Senator","RUBR3831",-44,-44);
addOffice("Senator","SPUR4607",-44,-44);
addOffice("Senator","STAT4608",-44,-44);
addOffice("Senator","SERG4602",-43,-18);
addOffice("Senator","AEMI5108",-43,-43);
addOffice("Senator","LABI5110",-43,-43);
addOffice("Senator","LIGA5111",-43,-43);
addOffice("Senator","LIGA5147",-43,-43);
addOffice("Senator","ACIL5113",-43,-43);
addOffice("Senator","ANTI5114",-43,-43);
addOffice("Senator","ANON4695",-43,-43);
addOffice("Senator","CANI5116",-43,-43);
addOffice("Senator","LUCI5120",-43,-43);
addOffice("Senator","POMP5123",-43,-43);
addOffice("Senator","POMP5125",-43,-43);
addOffice("Senator","VENT5129",-43,-43);
addOffice("Senator","VETU4701",-43,-43);
addOffice("Senator","VOLU5130",-43,-43);
addOffice("Senator","MARC4921",-43,-43);
addOffice("Senator","POMP2254",-43,-43);
addOffice("Senator","LIGA2506",-43,-43);
addOffice("Senator","LUCR2560",-43,-43);
addOffice("Senator","NASI2562",-43,-43);
addOffice("Senator","CAES2701",-43,-43);
addOffice("Senator","AEMI2726",-43,-43);
addOffice("Senator","CASS2742",-43,-43);
addOffice("Senator","LOLL2749",-43,-43);
addOffice("Senator","PORC2754",-43,-43);
addOffice("Senator","LABI2777",-43,-43);
addOffice("Senator","CORN2781",-43,-43);
addOffice("Senator","VENT2791",-43,-43);
addOffice("Senator","TISI2815",-43,-43);
addOffice("Senator","LICI2860",-43,-43);
addOffice("Senator","ARRU2918",-43,-43);
addOffice("Senator","CAEC2949",-43,-43);
addOffice("Senator","CAEC3421",-43,-43);
addOffice("Senator","HOSI3501",-43,-43);
addOffice("Senator","OPPI3896",-43,-43);
addOffice("Senator","AEMI3935",-43,-43);
addOffice("Senator","OCTA4346",-43,-43);
addOffice("Senator","EGNA4691",-43,-43);
addOffice("Senator","EGNA4692",-43,-43);
addOffice("Senator","FIDU3465",-43,-43);
addOffice("Senator","ASIN3156",-43,-43);
addOffice("Senator","DECI3183",-43,-43);
addOffice("Senator","NONI3213",-43,-43);
addOffice("Senator","QUIN3242",-43,-43);
addOffice("Senator","SILI3262",-43,-43);
addOffice("Senator","VELL3268",-43,-43);
addOffice("Senator","AUFU3311",-43,-43);
addOffice("Senator","ALBE3315",-43,-43);
addOffice("Senator","CAES3339",-43,-43);
addOffice("Senator","ANON3426",-43,-43);
addOffice("Senator","DOMI3446",-43,-43);
addOffice("Senator","HATE3702",-43,-43);
addOffice("Senator","HELV3703",-43,-43);
addOffice("Senator","HIRT3706",-43,-43);
addOffice("Senator","HOST2684",-43,-43);
addOffice("Senator","IULI3742",-43,-43);
addOffice("Senator","SULP4461",-43,-43);
addOffice("Senator","FLAV3468",-40,-40);
addOffice("Senator","CORN3785",-40,-40);
addOffice("Senator","AEMI2931",-39,-39);
addOffice("Senator","ANON3276",-39,-39);
addOffice("Senator","AELI3292",-39,-39);
addOffice("Senator","GEMI3701",-39,-39);
addOffice("Senator","LICI3750",-39,-39);
addOffice("Senator","LICI3804",-39,-39);
addOffice("Senator","SEDI3821",-39,-39);
addOffice("Senator","SERG4604",-39,-39);
addOffice("Senator","TILL3855",-36,-36);
addOffice("Senator","PRIS3800",-35,-35);
addOffice("Senator","AELI3304",-32,-32);
addOffice("Senator","TERE3853",-32,-32);
addOffice("Senator","POST3245",-31,-31);
addOffice("Senator","AELI3302",-31,-31);
addOffice("Senator","ARTI3330",-31,-31);
addOffice("Senator","CLAU3430",-31,-31);
addOffice("Senator","EGNA3448",-31,-31);
addOffice("Senator","FLAV3470",-31,-31);
addOffice("Senator","OVIN3763",-31,-31);
addOffice("Senator","PAPI3769",-31,-31);
addOffice("Senator","PAPI3771",-31,-31);
addOffice("Senator","CORN3781",-31,-31);
addOffice("Senator","LICI3796",-31,-31);
addOffice("Senator","LICI3803",-31,-31);
addOffice("Senator","SEIU3820",-31,-31);
addOffice("Senator","THOR3854",-31,-31);
addOffice("Senator","SEPT4601",-31,-31);
addOffice("Senator","STAT4609",-31,-31);
addOffice("Suffect Censor","CORN0390",-393,-393);
addOffice("Suffect Consul","VALE0003",-509,-509);
addOffice("Suffect Consul","LUCR0004",-509,-509);
addOffice("Suffect Consul","HORA0005",-509,-509);
addOffice("Suffect Consul","VERG0107",-478,-478);
addOffice("Suffect Consul","QUIN0142",-460,-460);
addOffice("Suffect Consul","MINU0147",-458,-458);
addOffice("Suffect Consul","FURI0127",-453,-453);
addOffice("Suffect Consul","PAPI0212",-444,-444);
addOffice("Suffect Consul","SEMP0213",-444,-444);
addOffice("Suffect Consul","VALE0238",-437,-437);
addOffice("Suffect Consul","LUCR0387",-393,-393);
addOffice("Suffect Consul","SULP0388",-393,-393);
addOffice("Suffect Consul","FULV0615",-305,-305);
addOffice("Suffect Consul","VALE0522",-299,-299);
addOffice("Suffect Consul","DECI0685",-265,-265);
addOffice("Suffect Consul","ATIL0703",-256,-256);
addOffice("Suffect Consul","AEMI0792",-221,-221);
addOffice("Suffect Consul","ATIL0806",-217,-217);
addOffice("Suffect Consul","CLAU0810",-215,-215);
addOffice("Suffect Consul","FABI0712",-215,-215);
addOffice("Suffect Consul","FULV1194",-180,-180);
addOffice("Suffect Consul","VALE1200",-176,-176);
addOffice("Suffect Consul","CORN1362",-162,-162);
addOffice("Suffect Consul","DOMI1366",-162,-162);
addOffice("Suffect Consul","ACIL1270",-154,-154);
addOffice("Suffect Consul","CLAU1599",-130,-130);
addOffice("Suffect Consul","AURE1683",-108,-108);
addOffice("Suffect Consul","CORN1872",-87,-87);
addOffice("Suffect Consul","VALE1802",-86,-86);
addOffice("Suffect Consul","MARC1764",-86,-86);
addOffice("Suffect Consul","PERP1826",-86,-86);
addOffice("Suffect Consul","SERV2203",-68,-68);
addOffice("Suffect Consul","FABI2379",-45,-45);
addOffice("Suffect Consul","TREB2336",-45,-45);
addOffice("Suffect Consul","CANI2486",-45,-45);
addOffice("Suffect Consul","CORN2515",-44,-44);
addOffice("Suffect Consul","IULI2597",-43,-43);
addOffice("Suffect Consul","PEDI2370",-43,-43);
addOffice("Suffect Consul","CARR2608",-43,-43);
addOffice("Suffect Consul","VENT2638",-43,-43);
addOffice("Suffect Consul","CORN2819",-40,-40);
addOffice("Suffect Consul","CANI2741",-40,-40);
addOffice("Suffect Consul","COCC2767",-39,-39);
addOffice("Suffect Consul","ALFE2766",-39,-39);
addOffice("Suffect Consul","CORN2664",-38,-38);
addOffice("Suffect Consul","MARC2534",-38,-38);
addOffice("Suffect Consul","STAT2822",-37,-37);
addOffice("Suffect Consul","NONI2598",-36,-36);
addOffice("Suffect Consul","MARC2865",-36,-36);
addOffice("Suffect Consul","MARC2389",-36,-36);
addOffice("Suffect Consul","PEDU2885",-35,-35);
addOffice("Suffect Consul","CORN3783",-35,-35);
addOffice("Suffect Consul","SEMP2823",-34,-34);
addOffice("Suffect Consul","AEMI2895",-34,-34);
addOffice("Suffect Consul","MEMM2896",-34,-34);
addOffice("Suffect Consul","HERE2911",-34,-34);
addOffice("Suffect Consul","AUTR2905",-33,-33);
addOffice("Suffect Consul","FLAV2906",-33,-33);
addOffice("Suffect Consul","FONT2861",-33,-33);
addOffice("Suffect Consul","ACIL2907",-33,-33);
addOffice("Suffect Consul","VINI2496",-33,-33);
addOffice("Suffect Consul","LARO2908",-33,-33);
addOffice("Suffect Consul","CORN2912",-32,-32);
addOffice("Suffect Consul","VALE2913",-32,-32);
addOffice("Suffect Consul","VALE2758",-31,-31);
addOffice("Suffect Consul","TITI2834",-31,-31);
addOffice("Suffect Consul","POMP4667",-31,-31);
addOffice("Suffect Consul","SAEN3838",-30,-30);
addOffice("Suffect Consul","SEST2729",-23,-23);
addOffice("Suffect Master of the Horse","FABI0592",-315,-315);
addOffice("Suffect Praetor","CURI0641",-283,-283);
addOffice("Suffect Praetor","AEMI4635",-216,-216);
addOffice("Suffect Praetor","MANL1151",-189,-189);
addOffice("Suffect Praetor","CLAU1125",-180,-180);
addOffice("Suffect Praetor","SEMP2823",-40,-40);
addOffice("Suffect Praetor","VALE2758",-40,-40);
addOffice("Suffect Praetor","ASEL2910",-33,-33);
addOffice("Suffect Tribune of the Plebs","MUCI1604",-133,-133);
addOffice("Suffect Tribune of the Plebs","MINU1605",-133,-133);
addOffice("Suffect Tribune of the Plebs","MUMM1606",-133,-133);
addOffice("Suffect Tribune of the Plebs","SCRI2443",-50,-50);
addOffice("Tribune of the Plebs","APPU2998",-493,-493);
addOffice("Tribune of the Plebs","CICE3003",-493,-493);
addOffice("Tribune of the Plebs","FURI3004",-493,-493);
addOffice("Tribune of the Plebs","CREP3005",-493,-493);
addOffice("Tribune of the Plebs","GLIT3010",-493,-493);
addOffice("Tribune of the Plebs","LICI3013",-493,-493);
addOffice("Tribune of the Plebs","OLLI3020",-493,-493);
addOffice("Tribune of the Plebs","PAPI3027",-493,-493);
addOffice("Tribune of the Plebs","ALBI0039",-493,-493);
addOffice("Tribune of the Plebs","IUNI0040",-493,-493);
addOffice("Tribune of the Plebs","LICI0041",-493,-493);
addOffice("Tribune of the Plebs","LICI0042",-493,-493);
addOffice("Tribune of the Plebs","SICI0043",-493,-493);
addOffice("Tribune of the Plebs","VISC0044",-493,-493);
addOffice("Tribune of the Plebs","SICI0050",-492,-492);
addOffice("Tribune of the Plebs","DECI0046",-491,-491);
addOffice("Tribune of the Plebs","SICI0043",-491,-491);
addOffice("Tribune of the Plebs","RABU0064",-486,-486);
addOffice("Tribune of the Plebs","MUCI0065",-486,-486);
addOffice("Tribune of the Plebs","CASS0020",-486,-486);
addOffice("Tribune of the Plebs","MAEN0083",-483,-483);
addOffice("Tribune of the Plebs","LICI0087",-481,-481);
addOffice("Tribune of the Plebs","PONT0089",-480,-480);
addOffice("Tribune of the Plebs","CONS0099",-476,-476);
addOffice("Tribune of the Plebs","GENU0100",-476,-476);
addOffice("Tribune of the Plebs","CAED0102",-475,-475);
addOffice("Tribune of the Plebs","STAT0103",-475,-475);
addOffice("Tribune of the Plebs","GENU0108",-473,-473);
addOffice("Tribune of the Plebs","PUBL0111",-472,-472);
addOffice("Tribune of the Plebs","LAET0115",-471,-471);
addOffice("Tribune of the Plebs","PUBL0111",-471,-471);
addOffice("Tribune of the Plebs","DUIL0117",-470,-470);
addOffice("Tribune of the Plebs","ICIL0047",-470,-470);
addOffice("Tribune of the Plebs","MECI0118",-470,-470);
addOffice("Tribune of the Plebs","NUMI0119",-470,-470);
addOffice("Tribune of the Plebs","SICC0120",-470,-470);
addOffice("Tribune of the Plebs","TERE0135",-462,-462);
addOffice("Tribune of the Plebs","TITI0136",-462,-462);
addOffice("Tribune of the Plebs","VERG0139",-461,-461);
addOffice("Tribune of the Plebs","VOLS0140",-461,-461);
addOffice("Tribune of the Plebs","VERG0139",-460,-460);
addOffice("Tribune of the Plebs","VOLS0140",-460,-460);
addOffice("Tribune of the Plebs","VERG0139",-459,-459);
addOffice("Tribune of the Plebs","VOLS0140",-459,-459);
addOffice("Tribune of the Plebs","VERG0139",-458,-458);
addOffice("Tribune of the Plebs","VOLS0140",-458,-458);
addOffice("Tribune of the Plebs","VERG0139",-457,-457);
addOffice("Tribune of the Plebs","VOLS0140",-457,-457);
addOffice("Tribune of the Plebs","ICIL0154",-456,-456);
addOffice("Tribune of the Plebs","ALIE0155",-456,-456);
addOffice("Tribune of the Plebs","ICIL0154",-455,-455);
addOffice("Tribune of the Plebs","ALIE0155",-455,-455);
addOffice("Tribune of the Plebs","CALV0160",-454,-454);
addOffice("Tribune of the Plebs","SICC0161",-454,-454);
addOffice("Tribune of the Plebs","HOST3011",-451,-451);
addOffice("Tribune of the Plebs","APRO0182",-449,-449);
addOffice("Tribune of the Plebs","DUIL0117",-449,-449);
addOffice("Tribune of the Plebs","ICIL0154",-449,-449);
addOffice("Tribune of the Plebs","NUMI0183",-449,-449);
addOffice("Tribune of the Plebs","OPPI0184",-449,-449);
addOffice("Tribune of the Plebs","POMP0185",-449,-449);
addOffice("Tribune of the Plebs","SICI0186",-449,-449);
addOffice("Tribune of the Plebs","TITI0187",-449,-449);
addOffice("Tribune of the Plebs","VERG0188",-449,-449);
addOffice("Tribune of the Plebs","VILL0189",-449,-449);
addOffice("Tribune of the Plebs","ATER0197",-448,-448);
addOffice("Tribune of the Plebs","TARP0158",-448,-448);
addOffice("Tribune of the Plebs","TREB0198",-448,-448);
addOffice("Tribune of the Plebs","CANU0207",-445,-445);
addOffice("Tribune of the Plebs","FURN0208",-445,-445);
addOffice("Tribune of the Plebs","POET0216",-442,-442);
addOffice("Tribune of the Plebs","POET0216",-441,-441);
addOffice("Tribune of the Plebs","CAEC0227",-439,-439);
addOffice("Tribune of the Plebs","IUNI0228",-439,-439);
addOffice("Tribune of the Plebs","TITI0229",-439,-439);
addOffice("Tribune of the Plebs","MINU0147",-439,-439);
addOffice("Tribune of the Plebs","MAEL0242",-436,-436);
addOffice("Tribune of the Plebs","IUNI0276",-423,-423);
addOffice("Tribune of the Plebs","ANTI0280",-422,-422);
addOffice("Tribune of the Plebs","ASEL0281",-422,-422);
addOffice("Tribune of the Plebs","SPUR0282",-422,-422);
addOffice("Tribune of the Plebs","TEMP0277",-422,-422);
addOffice("Tribune of the Plebs","HORT0283",-422,-422);
addOffice("Tribune of the Plebs","ANTI0287",-420,-420);
addOffice("Tribune of the Plebs","POMP0288",-420,-420);
addOffice("Tribune of the Plebs","CANU0289",-420,-420);
addOffice("Tribune of the Plebs","MAEC0298",-416,-416);
addOffice("Tribune of the Plebs","METI0299",-416,-416);
addOffice("Tribune of the Plebs","DECI0304",-415,-415);
addOffice("Tribune of the Plebs","SEXT0308",-414,-414);
addOffice("Tribune of the Plebs","ICIL0313",-412,-412);
addOffice("Tribune of the Plebs","MENE0317",-410,-410);
addOffice("Tribune of the Plebs","ICIL0313",-409,-409);
addOffice("Tribune of the Plebs","ICIL0319",-409,-409);
addOffice("Tribune of the Plebs","ICIL0320",-409,-409);
addOffice("Tribune of the Plebs","ACUT0348",-401,-401);
addOffice("Tribune of the Plebs","CURI0349",-401,-401);
addOffice("Tribune of the Plebs","LACE0350",-401,-401);
addOffice("Tribune of the Plebs","METI0351",-401,-401);
addOffice("Tribune of the Plebs","MINU0352",-401,-401);
addOffice("Tribune of the Plebs","TREB0353",-401,-401);
addOffice("Tribune of the Plebs","SICI0385",-395,-395);
addOffice("Tribune of the Plebs","POMP0378",-395,-395);
addOffice("Tribune of the Plebs","VERG0379",-395,-395);
addOffice("Tribune of the Plebs","POMP0378",-394,-394);
addOffice("Tribune of the Plebs","SICI0385",-394,-394);
addOffice("Tribune of the Plebs","VERG0379",-394,-394);
addOffice("Tribune of the Plebs","SICI0385",-393,-393);
addOffice("Tribune of the Plebs","APPU0394",-391,-391);
addOffice("Tribune of the Plebs","MARC0413",-389,-389);
addOffice("Tribune of the Plebs","SICI0425",-387,-387);
addOffice("Tribune of the Plebs","MENE0434",-384,-384);
addOffice("Tribune of the Plebs","PUBL0435",-384,-384);
addOffice("Tribune of the Plebs","LICI0468",-376,-376);
addOffice("Tribune of the Plebs","SEXT0469",-376,-376);
addOffice("Tribune of the Plebs","LICI0468",-375,-375);
addOffice("Tribune of the Plebs","SEXT0469",-375,-375);
addOffice("Tribune of the Plebs","LICI0468",-374,-374);
addOffice("Tribune of the Plebs","SEXT0469",-374,-374);
addOffice("Tribune of the Plebs","LICI0468",-373,-373);
addOffice("Tribune of the Plebs","SEXT0469",-373,-373);
addOffice("Tribune of the Plebs","LICI0468",-372,-372);
addOffice("Tribune of the Plebs","SEXT0469",-372,-372);
addOffice("Tribune of the Plebs","LICI0468",-371,-371);
addOffice("Tribune of the Plebs","SEXT0469",-371,-371);
addOffice("Tribune of the Plebs","LICI0468",-370,-370);
addOffice("Tribune of the Plebs","SEXT0469",-370,-370);
addOffice("Tribune of the Plebs","LICI0468",-369,-369);
addOffice("Tribune of the Plebs","SEXT0469",-369,-369);
addOffice("Tribune of the Plebs","LICI0468",-368,-368);
addOffice("Tribune of the Plebs","SEXT0469",-368,-368);
addOffice("Tribune of the Plebs","LICI0468",-367,-367);
addOffice("Tribune of the Plebs","SEXT0469",-367,-367);
addOffice("Tribune of the Plebs","POMP0496",-362,-362);
addOffice("Tribune of the Plebs","POET0499",-358,-358);
addOffice("Tribune of the Plebs","DUIL0506",-357,-357);
addOffice("Tribune of the Plebs","MENE0507",-357,-357);
addOffice("Tribune of the Plebs","GENU0530",-342,-342);
addOffice("Tribune of the Plebs","FLAV0566",-327,-327);
addOffice("Tribune of the Plebs","FLAV0566",-323,-323);
addOffice("Tribune of the Plebs","LIVI0580",-320,-320);
addOffice("Tribune of the Plebs","MAEL0581",-320,-320);
addOffice("Tribune of the Plebs","NUMI0582",-320,-320);
addOffice("Tribune of the Plebs","ANTI0583",-319,-319);
addOffice("Tribune of the Plebs","OVIN0594",-313,-313);
addOffice("Tribune of the Plebs","COMI0598",-312,-312);
addOffice("Tribune of the Plebs","ATIL0600",-311,-311);
addOffice("Tribune of the Plebs","MARC0601",-311,-311);
addOffice("Tribune of the Plebs","DECI0602",-311,-311);
addOffice("Tribune of the Plebs","SEMP0603",-310,-310);
addOffice("Tribune of the Plebs","FURI0607",-308,-308);
addOffice("Tribune of the Plebs","FLAV0616",-305,-305);
addOffice("Tribune of the Plebs","FLAV0616",-304,-304);
addOffice("Tribune of the Plebs","AQUI0667",-300,-300);
addOffice("Tribune of the Plebs","OGUL0631",-300,-300);
addOffice("Tribune of the Plebs","OGUL0632",-300,-300);
addOffice("Tribune of the Plebs","CURI0641",-298,-298);
addOffice("Tribune of the Plebs","SCAN0650",-293,-293);
addOffice("Tribune of the Plebs","AELI0670",-285,-285);
addOffice("Tribune of the Plebs","MAEN0686",-279,-279);
addOffice("Tribune of the Plebs","FULV0699",-270,-270);
addOffice("Tribune of the Plebs","FUND0755",-248,-248);
addOffice("Tribune of the Plebs","PULL0756",-248,-248);
addOffice("Tribune of the Plebs","PLAE3024",-242,-242);
addOffice("Tribune of the Plebs","GENU0769",-241,-241);
addOffice("Tribune of the Plebs","PAPI3016",-240,-240);
addOffice("Tribune of the Plebs","FLAM0793",-232,-232);
addOffice("Tribune of the Plebs","METI0825",-220,-220);
addOffice("Tribune of the Plebs","CLAU0837",-218,-218);
addOffice("Tribune of the Plebs","METI0859",-217,-217);
addOffice("Tribune of the Plebs","BAEB0872",-216,-216);
addOffice("Tribune of the Plebs","MINU0873",-216,-216);
addOffice("Tribune of the Plebs","SCRI0874",-216,-216);
addOffice("Tribune of the Plebs","OPPI0895",-215,-215);
addOffice("Tribune of the Plebs","CAEC0905",-213,-213);
addOffice("Tribune of the Plebs","CARV0927",-212,-212);
addOffice("Tribune of the Plebs","CARV0928",-212,-212);
addOffice("Tribune of the Plebs","SERV0929",-212,-212);
addOffice("Tribune of the Plebs","AQUI0941",-211,-211);
addOffice("Tribune of the Plebs","SEMP0942",-211,-211);
addOffice("Tribune of the Plebs","SERV0931",-211,-211);
addOffice("Tribune of the Plebs","ARRE0962",-210,-210);
addOffice("Tribune of the Plebs","ARRE0963",-210,-210);
addOffice("Tribune of the Plebs","LUCR0965",-210,-210);
addOffice("Tribune of the Plebs","PUBL0988",-209,-209);
addOffice("Tribune of the Plebs","BAEB1035",-204,-204);
addOffice("Tribune of the Plebs","CINC1036",-204,-204);
addOffice("Tribune of the Plebs","CLAU0997",-204,-204);
addOffice("Tribune of the Plebs","LICI1037",-204,-204);
addOffice("Tribune of the Plebs","SILI1038",-204,-204);
addOffice("Tribune of the Plebs","SILI1039",-204,-204);
addOffice("Tribune of the Plebs","BAEB1035",-203,-203);
addOffice("Tribune of the Plebs","ACIL1063",-201,-201);
addOffice("Tribune of the Plebs","MINU1064",-201,-201);
addOffice("Tribune of the Plebs","PORC3025",-200,-200);
addOffice("Tribune of the Plebs","VALL3038",-200,-200);
addOffice("Tribune of the Plebs","PORC3295",-200,-200);
addOffice("Tribune of the Plebs","BAEB1076",-200,-200);
addOffice("Tribune of the Plebs","SEMP0976",-200,-200);
addOffice("Tribune of the Plebs","IUNI3012",-199,-199);
addOffice("Tribune of the Plebs","PORC1084",-199,-199);
addOffice("Tribune of the Plebs","FULV1072",-198,-198);
addOffice("Tribune of the Plebs","CURI1094",-198,-198);
addOffice("Tribune of the Plebs","FULV1104",-197,-197);
addOffice("Tribune of the Plebs","OPPI1105",-197,-197);
addOffice("Tribune of the Plebs","AFRA1227",-196,-196);
addOffice("Tribune of the Plebs","ATIN1113",-196,-196);
addOffice("Tribune of the Plebs","LICI1114",-196,-196);
addOffice("Tribune of the Plebs","MARC1115",-196,-196);
addOffice("Tribune of the Plebs","FUND1130",-195,-195);
addOffice("Tribune of the Plebs","IUNI1131",-195,-195);
addOffice("Tribune of the Plebs","IUNI1132",-195,-195);
addOffice("Tribune of the Plebs","VALE1133",-195,-195);
addOffice("Tribune of the Plebs","BAEB1163",-194,-194);
addOffice("Tribune of the Plebs","AELI1152",-193,-193);
addOffice("Tribune of the Plebs","SEMP1157",-193,-193);
addOffice("Tribune of the Plebs","TITI1167",-192,-192);
addOffice("Tribune of the Plebs","TITI1168",-192,-192);
addOffice("Tribune of the Plebs","PLAE3022",-192,-192);
addOffice("Tribune of the Plebs","SEMP1171",-191,-191);
addOffice("Tribune of the Plebs","ATIL0964",-190,-190);
addOffice("Tribune of the Plebs","SEMP1195",-189,-189);
addOffice("Tribune of the Plebs","SEMP1196",-189,-189);
addOffice("Tribune of the Plebs","TERE1135",-189,-189);
addOffice("Tribune of the Plebs","VALE1207",-188,-188);
addOffice("Tribune of the Plebs","ABUR1215",-187,-187);
addOffice("Tribune of the Plebs","MUMM1216",-187,-187);
addOffice("Tribune of the Plebs","MUMM1217",-187,-187);
addOffice("Tribune of the Plebs","PETI1218",-187,-187);
addOffice("Tribune of the Plebs","PETI1219",-187,-187);
addOffice("Tribune of the Plebs","SEMP1182",-187,-187);
addOffice("Tribune of the Plebs","CAEL1243",-184,-184);
addOffice("Tribune of the Plebs","FANN1244",-184,-184);
addOffice("Tribune of the Plebs","MINU1245",-184,-184);
addOffice("Tribune of the Plebs","NAEV1246",-184,-184);
addOffice("Tribune of the Plebs","ORCH1257",-182,-182);
addOffice("Tribune of the Plebs","VILL1279",-180,-180);
addOffice("Tribune of the Plebs","AELI1312",-177,-177);
addOffice("Tribune of the Plebs","AELI1429",-177,-177);
addOffice("Tribune of the Plebs","LICI1314",-177,-177);
addOffice("Tribune of the Plebs","PAPI1315",-177,-177);
addOffice("Tribune of the Plebs","LICI1374",-177,-177);
addOffice("Tribune of the Plebs","LICI1425",-177,-177);
addOffice("Tribune of the Plebs","MAEV3460",-176,-176);
addOffice("Tribune of the Plebs","PAPI3017",-173,-173);
addOffice("Tribune of the Plebs","LUCR1357",-172,-172);
addOffice("Tribune of the Plebs","MARC1358",-172,-172);
addOffice("Tribune of the Plebs","MARC1359",-172,-172);
addOffice("Tribune of the Plebs","CLAU1318",-171,-171);
addOffice("Tribune of the Plebs","FULV1369",-171,-171);
addOffice("Tribune of the Plebs","AUFI1386",-170,-170);
addOffice("Tribune of the Plebs","IUVE1387",-170,-170);
addOffice("Tribune of the Plebs","FURI3001",-170,-170);
addOffice("Tribune of the Plebs","RUTI1397",-169,-169);
addOffice("Tribune of the Plebs","VOCO1398",-169,-169);
addOffice("Tribune of the Plebs","TREM1412",-168,-168);
addOffice("Tribune of the Plebs","ANTO1443",-167,-167);
addOffice("Tribune of the Plebs","POMP1444",-167,-167);
addOffice("Tribune of the Plebs","SEMP1445",-167,-167);
addOffice("Tribune of the Plebs","PLAE3023",-167,-167);
addOffice("Tribune of the Plebs","AURE1485",-154,-154);
addOffice("Tribune of the Plebs","CAEC1424",-154,-154);
addOffice("Tribune of the Plebs","AELI1496",-153,-153);
addOffice("Tribune of the Plebs","FUFI1497",-153,-153);
addOffice("Tribune of the Plebs","ATIN1509",-149,-149);
addOffice("Tribune of the Plebs","CALP1510",-149,-149);
addOffice("Tribune of the Plebs","SCRI1511",-149,-149);
addOffice("Tribune of the Plebs","SCAN1512",-149,-149);
addOffice("Tribune of the Plebs","LAEL1524",-148,-148);
addOffice("Tribune of the Plebs","LIVI1535",-146,-146);
addOffice("Tribune of the Plebs","LICI1547",-145,-145);
addOffice("Tribune of the Plebs","DIDI1557",-143,-143);
addOffice("Tribune of the Plebs","FANN3464",-142,-142);
addOffice("Tribune of the Plebs","MUCI1567",-141,-141);
addOffice("Tribune of the Plebs","CLAU1570",-140,-140);
addOffice("Tribune of the Plebs","GABI1541",-139,-139);
addOffice("Tribune of the Plebs","CURI1577",-138,-138);
addOffice("Tribune of the Plebs","LICI1578",-138,-138);
addOffice("Tribune of the Plebs","ANTI1582",-137,-137);
addOffice("Tribune of the Plebs","CASS1583",-137,-137);
addOffice("Tribune of the Plebs","RUTI1585",-136,-136);
addOffice("Tribune of the Plebs","OCTA1607",-133,-133);
addOffice("Tribune of the Plebs","RUBR1608",-133,-133);
addOffice("Tribune of the Plebs","SATU1609",-133,-133);
addOffice("Tribune of the Plebs","SEMP1525",-133,-133);
addOffice("Tribune of the Plebs","AELI1622",-132,-132);
addOffice("Tribune of the Plebs","ATIN1618",-131,-131);
addOffice("Tribune of the Plebs","PAPI1623",-131,-131);
addOffice("Tribune of the Plebs","ATIN1618",-130,-130);
addOffice("Tribune of the Plebs","PAPI1623",-130,-130);
addOffice("Tribune of the Plebs","FANN1523",-130,-130);
addOffice("Tribune of the Plebs","IUNI1638",-126,-126);
addOffice("Tribune of the Plebs","PAPI3014",-125,-125);
addOffice("Tribune of the Plebs","IUNI0885",-124,-124);
addOffice("Tribune of the Plebs","AUFE1644",-123,-123);
addOffice("Tribune of the Plebs","SEMP1598",-123,-123);
addOffice("Tribune of the Plebs","IUNI0885",-123,-123);
addOffice("Tribune of the Plebs","MARC1652",-123,-123);
addOffice("Tribune of the Plebs","ACIL1650",-122,-122);
addOffice("Tribune of the Plebs","FULV1624",-122,-122);
addOffice("Tribune of the Plebs","LIVI1651",-122,-122);
addOffice("Tribune of the Plebs","MARC1652",-122,-122);
addOffice("Tribune of the Plebs","RUBR1653",-122,-122);
addOffice("Tribune of the Plebs","SEMP1598",-122,-122);
addOffice("Tribune of the Plebs","MAEV1658",-121,-121);
addOffice("Tribune of the Plebs","MINU1686",-121,-121);
addOffice("Tribune of the Plebs","CALP1663",-120,-120);
addOffice("Tribune of the Plebs","DECI1666",-120,-120);
addOffice("Tribune of the Plebs","LICI1720",-120,-120);
addOffice("Tribune of the Plebs","MARI1660",-119,-119);
addOffice("Tribune of the Plebs","THOR1722",-119,-119);
addOffice("Tribune of the Plebs","THOR1722",-118,-118);
addOffice("Tribune of the Plebs","MEMM3380",-115,-115);
addOffice("Tribune of the Plebs","PEDU1704",-113,-113);
addOffice("Tribune of the Plebs","MEMM1595",-111,-111);
addOffice("Tribune of the Plebs","BAEB1719",-111,-111);
addOffice("Tribune of the Plebs","THOR1722",-111,-111);
addOffice("Tribune of the Plebs","OTAC4689",-110,-110);
addOffice("Tribune of the Plebs","ANNI1724",-110,-110);
addOffice("Tribune of the Plebs","LICI1725",-110,-110);
addOffice("Tribune of the Plebs","MAMI1733",-109,-109);
addOffice("Tribune of the Plebs","LICI1679",-107,-107);
addOffice("Tribune of the Plebs","MANL1745",-107,-107);
addOffice("Tribune of the Plebs","COEL1744",-107,-107);
addOffice("Tribune of the Plebs","MUCI1692",-106,-106);
addOffice("Tribune of the Plebs","CASS1762",-104,-104);
addOffice("Tribune of the Plebs","DOMI1763",-104,-104);
addOffice("Tribune of the Plebs","MARC1764",-104,-104);
addOffice("Tribune of the Plebs","CLOD1765",-104,-104);
addOffice("Tribune of the Plebs","POMP1767",-104,-104);
addOffice("Tribune of the Plebs","APPU1766",-103,-103);
addOffice("Tribune of the Plebs","AURE1774",-103,-103);
addOffice("Tribune of the Plebs","BAEB1775",-103,-103);
addOffice("Tribune of the Plebs","DIDI1776",-103,-103);
addOffice("Tribune of the Plebs","NORB1777",-103,-103);
addOffice("Tribune of the Plebs","ANTI0897",-103,-103);
addOffice("Tribune of the Plebs","POMP1781",-102,-102);
addOffice("Tribune of the Plebs","SERV1734",-101,-101);
addOffice("Tribune of the Plebs","CORN3287",-100,-100);
addOffice("Tribune of the Plebs","APPU1766",-100,-100);
addOffice("Tribune of the Plebs","FURI1804",-100,-100);
addOffice("Tribune of the Plebs","POMP1805",-100,-100);
addOffice("Tribune of the Plebs","PORC1806",-100,-100);
addOffice("Tribune of the Plebs","OCTA3018",-99,-99);
addOffice("Tribune of the Plebs","PORC1806",-99,-99);
addOffice("Tribune of the Plebs","TITI4367",-99,-99);
addOffice("Tribune of the Plebs","APPU1811",-99,-99);
addOffice("Tribune of the Plebs","CALI1812",-99,-99);
addOffice("Tribune of the Plebs","CANU1813",-99,-99);
addOffice("Tribune of the Plebs","PORC1841",-99,-99);
addOffice("Tribune of the Plebs","FURI1804",-99,-99);
addOffice("Tribune of the Plebs","POMP1805",-99,-99);
addOffice("Tribune of the Plebs","PORC1806",-99,-99);
addOffice("Tribune of the Plebs","SERV1814",-98,-98);
addOffice("Tribune of the Plebs","APPU1811",-98,-98);
addOffice("Tribune of the Plebs","CALI1812",-98,-98);
addOffice("Tribune of the Plebs","CANU1813",-98,-98);
addOffice("Tribune of the Plebs","DURO1817",-97,-97);
addOffice("Tribune of the Plebs","PORC3029",-95,-95);
addOffice("Tribune of the Plebs","PORC3029",-94,-94);
addOffice("Tribune of the Plebs","PORC3029",-93,-93);
addOffice("Tribune of the Plebs","PORC3029",-93,-93);
addOffice("Tribune of the Plebs","PORC3029",-92,-92);
addOffice("Tribune of the Plebs","PAPI1843",-92,-92);
addOffice("Tribune of the Plebs","VELL3036",-91,-91);
addOffice("Tribune of the Plebs","PORC3029",-91,-91);
addOffice("Tribune of the Plebs","LIVI1756",-91,-91);
addOffice("Tribune of the Plebs","SAUF1853",-91,-91);
addOffice("Tribune of the Plebs","IUNI3008",-91,-91);
addOffice("Tribune of the Plebs","MINI3021",-91,-91);
addOffice("Tribune of the Plebs","PORC3638",-91,-91);
addOffice("Tribune of the Plebs","FUFI3691",-91,-91);
addOffice("Tribune of the Plebs","SEST1854",-91,-91);
addOffice("Tribune of the Plebs","PORC3029",-90,-90);
addOffice("Tribune of the Plebs","CAEC1875",-90,-90);
addOffice("Tribune of the Plebs","PAPI1835",-90,-90);
addOffice("Tribune of the Plebs","SCRI1876",-90,-90);
addOffice("Tribune of the Plebs","VARI1877",-90,-90);
addOffice("Tribune of the Plebs","CALP2951",-90,-90);
addOffice("Tribune of the Plebs","POMP3788",-90,-90);
addOffice("Tribune of the Plebs","FUFI3691",-90,-90);
addOffice("Tribune of the Plebs","CALP1896",-90,-90);
addOffice("Tribune of the Plebs","CASS1897",-89,-89);
addOffice("Tribune of the Plebs","MEMM1898",-89,-89);
addOffice("Tribune of the Plebs","PAPI2011",-89,-89);
addOffice("Tribune of the Plebs","PLAU1900",-89,-89);
addOffice("Tribune of the Plebs","CALP1896",-89,-89);
addOffice("Tribune of the Plebs","ANTI1932",-88,-88);
addOffice("Tribune of the Plebs","SULP1886",-88,-88);
addOffice("Tribune of the Plebs","HERE2024",-88,-88);
addOffice("Tribune of the Plebs","TERE1963",-87,-87);
addOffice("Tribune of the Plebs","LUCI1938",-87,-87);
addOffice("Tribune of the Plebs","MAGI1939",-87,-87);
addOffice("Tribune of the Plebs","MILO1941",-87,-87);
addOffice("Tribune of the Plebs","VERG1942",-87,-87);
addOffice("Tribune of the Plebs","CAEL3755",-87,-87);
addOffice("Tribune of the Plebs","MARI1940",-86,-86);
addOffice("Tribune of the Plebs","POPI1959",-86,-86);
addOffice("Tribune of the Plebs","CAEL3755",-86,-86);
addOffice("Tribune of the Plebs","IUNI1973",-83,-83);
addOffice("Tribune of the Plebs","VALE1989",-82,-82);
addOffice("Tribune of the Plebs","PUBL3031",-82,-82);
addOffice("Tribune of the Plebs","CAEC2078",-82,-82);
addOffice("Tribune of the Plebs","TITI3455",-82,-82);
addOffice("Tribune of the Plebs","REMM3028",-81,-81);
addOffice("Tribune of the Plebs","ACIL2119",-78,-78);
addOffice("Tribune of the Plebs","TERP2043",-77,-77);
addOffice("Tribune of the Plebs","CORN2064",-77,-77);
addOffice("Tribune of the Plebs","SICI2052",-76,-76);
addOffice("Tribune of the Plebs","OPIM2069",-75,-75);
addOffice("Tribune of the Plebs","QUIN2081",-74,-74);
addOffice("Tribune of the Plebs","LICI2103",-73,-73);
addOffice("Tribune of the Plebs","LOLL2177",-71,-71);
addOffice("Tribune of the Plebs","PLAU2167",-70,-70);
addOffice("Tribune of the Plebs","PLAU2276",-70,-70);
addOffice("Tribune of the Plebs","CORN2181",-69,-69);
addOffice("Tribune of the Plebs","MANL2049",-69,-69);
addOffice("Tribune of the Plebs","VISE2027",-69,-69);
addOffice("Tribune of the Plebs","CORN2082",-68,-68);
addOffice("Tribune of the Plebs","ANTI2208",-68,-68);
addOffice("Tribune of the Plebs","ANTO1969",-68,-68);
addOffice("Tribune of the Plebs","CAEC2040",-68,-68);
addOffice("Tribune of the Plebs","FUND1789",-68,-68);
addOffice("Tribune of the Plebs","HOST2211",-68,-68);
addOffice("Tribune of the Plebs","MARC2212",-68,-68);
addOffice("Tribune of the Plebs","POPI2213",-68,-68);
addOffice("Tribune of the Plebs","VALE2214",-68,-68);
addOffice("Tribune of the Plebs","VOLC2215",-68,-68);
addOffice("Tribune of the Plebs","COEL2997",-68,-68);
addOffice("Tribune of the Plebs","FALC2999",-68,-68);
addOffice("Tribune of the Plebs","CAEC2247",-68,-68);
addOffice("Tribune of the Plebs","POPI2159",-68,-68);
addOffice("Tribune of the Plebs","CAEC2137",-68,-68);
addOffice("Tribune of the Plebs","CORN2233",-67,-67);
addOffice("Tribune of the Plebs","GABI2234",-67,-67);
addOffice("Tribune of the Plebs","PAPI2235",-67,-67);
addOffice("Tribune of the Plebs","ROSC2236",-67,-67);
addOffice("Tribune of the Plebs","SERV2237",-67,-67);
addOffice("Tribune of the Plebs","TREB2238",-67,-67);
addOffice("Tribune of the Plebs","COEL2997",-67,-67);
addOffice("Tribune of the Plebs","FALC2999",-67,-67);
addOffice("Tribune of the Plebs","MANI2260",-66,-66);
addOffice("Tribune of the Plebs","MEMM2261",-66,-66);
addOffice("Tribune of the Plebs","PAPI2273",-65,-65);
addOffice("Tribune of the Plebs","FABI2281",-64,-64);
addOffice("Tribune of the Plebs","MUCI2282",-64,-64);
addOffice("Tribune of the Plebs","AEBU2996",-64,-64);
addOffice("Tribune of the Plebs","LICI3006",-64,-64);
addOffice("Tribune of the Plebs","LUCI3007",-64,-64);
addOffice("Tribune of the Plebs","FABI3000",-64,-64);
addOffice("Tribune of the Plebs","AMPI2291",-63,-63);
addOffice("Tribune of the Plebs","CAEC2263",-63,-63);
addOffice("Tribune of the Plebs","LABI2292",-63,-63);
addOffice("Tribune of the Plebs","SERV2293",-63,-63);
addOffice("Tribune of the Plebs","TITI3032",-63,-63);
addOffice("Tribune of the Plebs","CAEC2247",-62,-62);
addOffice("Tribune of the Plebs","CALP2305",-62,-62);
addOffice("Tribune of the Plebs","FABR2306",-62,-62);
addOffice("Tribune of the Plebs","MARI2307",-62,-62);
addOffice("Tribune of the Plebs","MINU2131",-62,-62);
addOffice("Tribune of the Plebs","PORC2241",-62,-62);
addOffice("Tribune of the Plebs","AUFI2319",-61,-61);
addOffice("Tribune of the Plebs","CAEC2320",-61,-61);
addOffice("Tribune of the Plebs","FUFI2321",-61,-61);
addOffice("Tribune of the Plebs","PREC3030",-60,-60);
addOffice("Tribune of the Plebs","PAPI3019",-60,-60);
addOffice("Tribune of the Plebs","PILE3774",-60,-60);
addOffice("Tribune of the Plebs","FLAV2332",-60,-60);
addOffice("Tribune of the Plebs","HERE2333",-60,-60);
addOffice("Tribune of the Plebs","ALFI2346",-59,-59);
addOffice("Tribune of the Plebs","ANCH2110",-59,-59);
addOffice("Tribune of the Plebs","COSC2348",-59,-59);
addOffice("Tribune of the Plebs","DOMI2313",-59,-59);
addOffice("Tribune of the Plebs","FANN2340",-59,-59);
addOffice("Tribune of the Plebs","NIGI2349",-59,-59);
addOffice("Tribune of the Plebs","VATI2297",-59,-59);
addOffice("Tribune of the Plebs","CAEC2347",-59,-59);
addOffice("Tribune of the Plebs","AELI2361",-58,-58);
addOffice("Tribune of the Plebs","CLOD2219",-58,-58);
addOffice("Tribune of the Plebs","NINN2363",-58,-58);
addOffice("Tribune of the Plebs","NOVI2364",-58,-58);
addOffice("Tribune of the Plebs","TERE2365",-58,-58);
addOffice("Tribune of the Plebs","ANNI2381",-57,-57);
addOffice("Tribune of the Plebs","ATIL2294",-57,-57);
addOffice("Tribune of the Plebs","CEST2382",-57,-57);
addOffice("Tribune of the Plebs","CISP2383",-57,-57);
addOffice("Tribune of the Plebs","FABR2385",-57,-57);
addOffice("Tribune of the Plebs","FADI2295",-57,-57);
addOffice("Tribune of the Plebs","MESS2386",-57,-57);
addOffice("Tribune of the Plebs","NUME2334",-57,-57);
addOffice("Tribune of the Plebs","SEST2296",-57,-57);
addOffice("Tribune of the Plebs","CURT3402",-57,-57);
addOffice("Tribune of the Plebs","CANI2401",-56,-56);
addOffice("Tribune of the Plebs","CASS2402",-56,-56);
addOffice("Tribune of the Plebs","NONI2403",-56,-56);
addOffice("Tribune of the Plebs","PLAN2312",-56,-56);
addOffice("Tribune of the Plebs","PLAU2276",-56,-56);
addOffice("Tribune of the Plebs","PORC2404",-56,-56);
addOffice("Tribune of the Plebs","RACI2406",-56,-56);
addOffice("Tribune of the Plebs","RUTI2407",-56,-56);
addOffice("Tribune of the Plebs","ANTI2640",-56,-56);
addOffice("Tribune of the Plebs","PROC2405",-56,-56);
addOffice("Tribune of the Plebs","AQUI2421",-55,-55);
addOffice("Tribune of the Plebs","ATEI2422",-55,-55);
addOffice("Tribune of the Plebs","TREB2336",-55,-55);
addOffice("Tribune of the Plebs","MAMI2423",-55,-55);
addOffice("Tribune of the Plebs","ROSC2424",-55,-55);
addOffice("Tribune of the Plebs","PEDU2426",-55,-55);
addOffice("Tribune of the Plebs","FABI2427",-55,-55);
addOffice("Tribune of the Plebs","ALLI2324",-55,-55);
addOffice("Tribune of the Plebs","LAEL2438",-54,-54);
addOffice("Tribune of the Plebs","MEMM2439",-54,-54);
addOffice("Tribune of the Plebs","MUCI2440",-54,-54);
addOffice("Tribune of the Plebs","TERE2441",-54,-54);
addOffice("Tribune of the Plebs","COEL2408",-53,-53);
addOffice("Tribune of the Plebs","LICI2456",-53,-53);
addOffice("Tribune of the Plebs","LUCI2457",-53,-53);
addOffice("Tribune of the Plebs","CAEL2417",-52,-52);
addOffice("Tribune of the Plebs","MANI2476",-52,-52);
addOffice("Tribune of the Plebs","MUNA2477",-52,-52);
addOffice("Tribune of the Plebs","POMP2478",-52,-52);
addOffice("Tribune of the Plebs","SALL2429",-52,-52);
addOffice("Tribune of the Plebs","VIBI3284",-51,-51);
addOffice("Tribune of the Plebs","CAEL2493",-51,-51);
addOffice("Tribune of the Plebs","CORN2494",-51,-51);
addOffice("Tribune of the Plebs","VIBI2495",-51,-51);
addOffice("Tribune of the Plebs","VINI2496",-51,-51);
addOffice("Tribune of the Plebs","COEL3436",-51,-51);
addOffice("Tribune of the Plebs","AMPU2979",-50,-50);
addOffice("Tribune of the Plebs","APPU2941",-50,-50);
addOffice("Tribune of the Plebs","CAEC2953",-50,-50);
addOffice("Tribune of the Plebs","FRUT2955",-50,-50);
addOffice("Tribune of the Plebs","SANQ2968",-50,-50);
addOffice("Tribune of the Plebs","FURN2521",-50,-50);
addOffice("Tribune of the Plebs","ANTO2392",-49,-49);
addOffice("Tribune of the Plebs","AURE2538",-49,-49);
addOffice("Tribune of the Plebs","CAEC2480",-49,-49);
addOffice("Tribune of the Plebs","CASS2481",-49,-49);
addOffice("Tribune of the Plebs","MARC2534",-49,-49);
addOffice("Tribune of the Plebs","RUBR2539",-49,-49);
addOffice("Tribune of the Plebs","CASS2458",-49,-49);
addOffice("Tribune of the Plebs","CAEL3338",-49,-49);
addOffice("Tribune of the Plebs","HIRT2449",-48,-48);
addOffice("Tribune of the Plebs","ASIN2553",-47,-47);
addOffice("Tribune of the Plebs","CORN2515",-47,-47);
addOffice("Tribune of the Plebs","TREB2671",-47,-47);
addOffice("Tribune of the Plebs","ANTO2497",-46,-46);
addOffice("Tribune of the Plebs","PONT2637",-45,-45);
addOffice("Tribune of the Plebs","VENT2638",-45,-45);
addOffice("Tribune of the Plebs","DECI2743",-45,-45);
addOffice("Tribune of the Plebs","TITI3454",-45,-45);
addOffice("Tribune of the Plebs","VALE3584",-45,-45);
addOffice("Tribune of the Plebs","POMP4618",-45,-45);
addOffice("Tribune of the Plebs","ANTO2523",-44,-44);
addOffice("Tribune of the Plebs","CAES2676",-44,-44);
addOffice("Tribune of the Plebs","CANN2677",-44,-44);
addOffice("Tribune of the Plebs","CARF2678",-44,-44);
addOffice("Tribune of the Plebs","CASS2575",-44,-44);
addOffice("Tribune of the Plebs","DECI2679",-44,-44);
addOffice("Tribune of the Plebs","EPID2680",-44,-44);
addOffice("Tribune of the Plebs","HELV2681",-44,-44);
addOffice("Tribune of the Plebs","HOST2620",-44,-44);
addOffice("Tribune of the Plebs","HOST2621",-44,-44);
addOffice("Tribune of the Plebs","NONI2685",-44,-44);
addOffice("Tribune of the Plebs","FLAM2687",-44,-44);
addOffice("Tribune of the Plebs","ANON4605",-44,-44);
addOffice("Tribune of the Plebs","APPU2612",-43,-43);
addOffice("Tribune of the Plebs","APPU2716",-43,-43);
addOffice("Tribune of the Plebs","CORN2717",-43,-43);
addOffice("Tribune of the Plebs","SALV2718",-43,-43);
addOffice("Tribune of the Plebs","SERV2719",-43,-43);
addOffice("Tribune of the Plebs","SERV2720",-43,-43);
addOffice("Tribune of the Plebs","TERE2611",-43,-43);
addOffice("Tribune of the Plebs","TITI2721",-43,-43);
addOffice("Tribune of the Plebs","VIPS2808",-43,-43);
addOffice("Tribune of the Plebs","CLOD2769",-42,-42);
addOffice("Tribune of the Plebs","HOST2770",-42,-42);
addOffice("Tribune of the Plebs","INST2771",-42,-42);
addOffice("Tribune of the Plebs","RUFR2755",-42,-42);
addOffice("Tribune of the Plebs","FALC2799",-41,-41);
addOffice("Tribune of the Plebs","CLOE2991",-40,-40);
addOffice("Tribune of the Plebs","FONT2861",-39,-39);
addOffice("Tribune of the Plebs","PETR3026",-33,-33);
addOffice("Tribune of the Plebs","NONI2915",-32,-32);
addOffice("Tribune of the Plebs","CAER2945",-32,-32);
addOffice("Tribune of the Plebs","MEMM3015",-32,-32);
addOffice("Tribune of the Plebs","PAQU3458",-31,-31);
addOffice("Tribune of the Plebs","CEST2947",-13,-13);
addOffice("Triumph","VALE0003",-509,-509);
addOffice("Triumph","POST0015",-505,-505);
addOffice("Triumph","VALE0013",-505,-505);
addOffice("Triumph","LUCR0010",-504,-504);
addOffice("Triumph","VALE0003",-504,-504);
addOffice("Triumph","MENE0018",-503,-503);
addOffice("Ovation","POST0015",-503,-503);
addOffice("Triumph","CASS0020",-502,-502);
addOffice("Triumph","VERG0019",-502,-502);
addOffice("Triumph","POST0027",-496,-496);
addOffice("Triumph","SERV0033",-495,-495);
addOffice("Triumph","VALE0037",-494,-494);
addOffice("Ovation","AQUI0062",-487,-487);
addOffice("Triumph","SICI0061",-487,-487);
addOffice("Triumph","CASS0020",-486,-486);
addOffice("Triumph","VALE0051",-475,-475);
addOffice("Ovation","MANL0105",-474,-474);
addOffice("Triumph","QUIN0114",-468,-468);
addOffice("Triumph","LUCR0133",-462,-462);
addOffice("Ovation","VETU0134",-462,-462);
addOffice("Triumph","CORN0143",-459,-459);
addOffice("Triumph","FABI0124",-459,-459);
addOffice("Triumph","QUIN0142",-458,-458);
addOffice("Triumph","HORA0181",-449,-449);
addOffice("Triumph","VALE0180",-449,-449);
addOffice("Triumph","GEGA0199",-443,-443);
addOffice("Triumph","AEMI0203",-437,-437);
addOffice("Triumph","VALE0238",-437,-437);
addOffice("Triumph","POST0249",-431,-431);
addOffice("Triumph","CORN0239",-428,-428);
addOffice("Triumph","AEMI0203",-426,-426);
addOffice("Ovation","FABI0329",-421,-421);
addOffice("Ovation","AEMI0316",-410,-410);
addOffice("Ovation","VALE0301",-410,-410);
addOffice("Triumph","FURI0340",-396,-396);
addOffice("Ovation","MANL0391",-392,-392);
addOffice("Triumph","VALE0306",-392,-392);
addOffice("Triumph","FURI0340",-390,-390);
addOffice("Triumph","FURI0340",-389,-389);
addOffice("Triumph","CORN0432",-385,-385);
addOffice("Triumph","QUIN0415",-380,-380);
addOffice("Triumph","FURI0340",-367,-367);
addOffice("Triumph","CLAU0335",-362,-362);
addOffice("Triumph","QUIN0483",-361,-361);
addOffice("Triumph","SULP0445",-361,-361);
addOffice("Ovation","FABI0498",-360,-360);
addOffice("Triumph","POET0499",-360,-360);
addOffice("Triumph","PLAU0502",-358,-358);
addOffice("Triumph","SULP0445",-358,-358);
addOffice("Triumph","MARC0505",-357,-357);
addOffice("Triumph","MARC0505",-356,-356);
addOffice("Triumph","FABI0498",-354,-354);
addOffice("Triumph","POPI0491",-350,-350);
addOffice("Triumph","VALE0522",-346,-346);
addOffice("Triumph","CORN0510",-343,-343);
addOffice("Triumph","VALE0522",-343,-343);
addOffice("Triumph","MANL0497",-340,-340);
addOffice("Triumph","PUBL0517",-339,-339);
addOffice("Triumph","FURI0526",-338,-338);
addOffice("Triumph","MAEN0540",-338,-338);
addOffice("Triumph","VALE0522",-335,-335);
addOffice("Triumph","AEMI0529",-329,-329);
addOffice("Triumph","PLAU0561",-329,-329);
addOffice("Triumph","PUBL0517",-326,-326);
addOffice("Triumph","PAPI0534",-324,-324);
addOffice("Triumph","FABI0559",-322,-322);
addOffice("Triumph","FULV0572",-322,-322);
addOffice("Triumph","PAPI0534",-319,-319);
addOffice("Triumph","SULP0541",-314,-314);
addOffice("Triumph","DECI0596",-312,-312);
addOffice("Triumph","VALE0570",-312,-312);
addOffice("Triumph","AEMI0588",-311,-311);
addOffice("Triumph","IUNI0587",-311,-311);
addOffice("Triumph","FABI0559",-309,-309);
addOffice("Triumph","PAPI0534",-309,-309);
addOffice("Triumph","MARC0610",-306,-306);
addOffice("Triumph","FULV0615",-305,-305);
addOffice("Triumph","MINU0614",-305,-305);
addOffice("Triumph","POST0609",-305,-305);
addOffice("Triumph","SEMP0603",-304,-304);
addOffice("Triumph","SULP0617",-304,-304);
addOffice("Triumph","IUNI0587",-302,-302);
addOffice("Triumph","VALE0522",-301,-301);
addOffice("Triumph","FULV0636",-299,-299);
addOffice("Triumph","FULV0629",-298,-298);
addOffice("Triumph","FABI0559",-295,-295);
addOffice("Triumph","ATIL0647",-294,-294);
addOffice("Triumph","POST0609",-294,-294);
addOffice("Triumph","CARV0649",-293,-293);
addOffice("Triumph","PAPI0640",-293,-293);
addOffice("Triumph","FABI0642",-291,-291);
addOffice("Triumph","POST0609",-291,-291);
addOffice("Triumph","CORN0658",-290,-290);
addOffice("Triumph","CURI0641",-290,-290);
addOffice("Triumph","CURI0641",-290,-290);
addOffice("Ovation","CURI0641",-289,-289);
addOffice("Triumph","CORN0674",-283,-283);
addOffice("Triumph","DOMI0638",-283,-283);
addOffice("Ovation","CURI0641",-283,-283);
addOffice("Triumph","FABR0675",-282,-282);
addOffice("Triumph","MARC0681",-281,-281);
addOffice("Triumph","AEMI0680",-280,-280);
addOffice("Triumph","CORU0683",-280,-280);
addOffice("Triumph","FABR0675",-278,-278);
addOffice("Triumph","IUNI0657",-277,-277);
addOffice("Triumph","FABI0642",-276,-276);
addOffice("Triumph","CORN0688",-275,-275);
addOffice("Triumph","CURI0641",-275,-275);
addOffice("Triumph","CLAU0668",-273,-273);
addOffice("Triumph","CARV0649",-272,-272);
addOffice("Triumph","PAPI0640",-272,-272);
addOffice("Triumph","CORN0698",-270,-270);
addOffice("Triumph","CLAU0702",-268,-268);
addOffice("Triumph","SEMP0701",-268,-268);
addOffice("Triumph","ATIL0703",-267,-267);
addOffice("Triumph","IULI0704",-267,-267);
addOffice("Triumph","FABI0692",-266,-266);
addOffice("Triumph","FABI0692",-266,-266);
addOffice("Triumph","IUNI0707",-266,-266);
addOffice("Triumph","IUNI0707",-266,-266);
addOffice("Triumph","CLAU0713",-264,-264);
addOffice("Triumph","FULV0699",-264,-264);
addOffice("Triumph","CLAU0713",-263,-263);
addOffice("Triumph","VALE0716",-263,-263);
addOffice("Naval","DUIL0724",-260,-260);
addOffice("Triumph","CORN0722",-259,-259);
addOffice("Triumph","AQUI0726",-258,-258);
addOffice("Triumph","SULP0728",-258,-258);
addOffice("Triumph","ATIL0727",-257,-257);
addOffice("Naval","ATIL0732",-257,-257);
addOffice("Naval","MANL0734",-256,-256);
addOffice("Naval","AEMI0739",-254,-254);
addOffice("Naval","FULV0738",-254,-254);
addOffice("Triumph","CORN0723",-253,-253);
addOffice("Triumph","SEMP0743",-253,-253);
addOffice("Triumph","AURE0746",-252,-252);
addOffice("Triumph","CAEC0751",-250,-250);
addOffice("Naval","LUTA0765",-241,-241);
addOffice("Triumph","LUTA0768",-241,-241);
addOffice("Triumph","MANL0758",-241,-241);
addOffice("Naval","VALE0767",-241,-241);
addOffice("Triumph","CORN0782",-235,-235);
addOffice("Triumph","MANL0787",-235,-235);
addOffice("Triumph","CARV0789",-234,-234);
addOffice("Triumph","FABI0712",-233,-233);
addOffice("Triumph","POMP0791",-233,-233);
addOffice("Triumph","PAPI4665",-231,-231);
addOffice("Naval","FULV0803",-228,-228);
addOffice("Triumph","AEMI0812",-225,-225);
addOffice("Triumph","FLAM0793",-223,-223);
addOffice("Triumph","FURI0814",-223,-223);
addOffice("Triumph","CLAU0810",-222,-222);
addOffice("Triumph","CORN0817",-222,-222);
addOffice("Triumph","AEMI0826",-219,-219);
addOffice("Triumph","LIVI0827",-219,-219);
addOffice("Triumph","CLAU0810",-211,-211);
addOffice("Triumph","CLAU0810",-211,-211);
addOffice("Triumph","FABI0712",-209,-209);
addOffice("Triumph","CLAU0908",-207,-207);
addOffice("Triumph","LIVI0827",-207,-207);
addOffice("Triumph","CORN0878",-206,-206);
addOffice("Triumph","CORN0878",-201,-201);
addOffice("Ovation","CORN1023",-200,-200);
addOffice("Triumph","FURI0967",-200,-200);
addOffice("Triumph","CORN1065",-197,-197);
addOffice("Triumph","MINU1062",-197,-197);
addOffice("Triumph","CLAU0997",-196,-196);
addOffice("Ovation","CORN1085",-196,-196);
addOffice("Ovation","HELV1093",-195,-195);
addOffice("Triumph","MINU1064",-195,-195);
addOffice("Triumph","PORC0907",-194,-194);
addOffice("Triumph","QUIN0999",-194,-194);
addOffice("Triumph","CORN1077",-191,-191);
addOffice("Ovation","FULV1109",-191,-191);
addOffice("Triumph","ACIL1063",-190,-190);
addOffice("Triumph","AEMI1134",-189,-189);
addOffice("Naval","AEMI1175",-189,-189);
addOffice("Triumph","CORN1016",-189,-189);
addOffice("Naval","FABI1117",-188,-188);
addOffice("Triumph","FULV1109",-187,-187);
addOffice("Triumph","MANL1103",-187,-187);
addOffice("Ovation","MANL1204",-185,-185);
addOffice("Triumph","CALP1222",-184,-184);
addOffice("Triumph","QUIN1226",-184,-184);
addOffice("Ovation","TERE1183",-182,-182);
addOffice("Triumph","AEMI1134",-181,-181);
addOffice("Triumph","BAEB1163",-180,-180);
addOffice("Triumph","CORN1212",-180,-180);
addOffice("Triumph","FULV1242",-180,-180);
addOffice("Triumph","FULV1242",-179,-179);
addOffice("Triumph","POST1278",-178,-178);
addOffice("Triumph","SEMP1182",-178,-178);
addOffice("Triumph","CLAU1125",-177,-177);
addOffice("Triumph","AEMI1067",-175,-175);
addOffice("Triumph","MUCI1288",-175,-175);
addOffice("Triumph","SEMP1182",-175,-175);
addOffice("Triumph","TITI1168",-175,-175);
addOffice("Ovation","CLAU1290",-174,-174);
addOffice("Triumph","CICE1340",-172,-172);
addOffice("Triumph","AEMI1134",-167,-167);
addOffice("Triumph","ANIC1408",-167,-167);
addOffice("Naval","OCTA1356",-167,-167);
addOffice("Triumph","CLAU1318",-166,-166);
addOffice("Triumph","SULP1173",-166,-166);
addOffice("Triumph","FULV1369",-158,-158);
addOffice("Triumph","CLAU1318",-155,-155);
addOffice("Triumph","CORN1396",-155,-155);
addOffice("Triumph","OPIM1476",-154,-154);
addOffice("Triumph","MUMM1495",-152,-152);
addOffice("Triumph","LICI1484",-151,-151);
addOffice("Triumph","CAEC1424",-146,-146);
addOffice("Triumph","CORN1504",-146,-146);
addOffice("Triumph","MUMM1495",-145,-145);
addOffice("Triumph","CLAU1452",-143,-143);
addOffice("Triumph","FABI1422",-143,-143);
addOffice("Triumph","CAEC1424",-142,-142);
addOffice("Triumph","LICI1554",-142,-142);
addOffice("Triumph","SERV1556",-138,-138);
addOffice("Triumph","FULV1576",-135,-135);
addOffice("Triumph","COSC1589",-133,-133);
addOffice("Triumph","IUNI1565",-133,-133);
addOffice("Triumph","CORN1504",-132,-132);
addOffice("Ovation","PERP1600",-132,-132);
addOffice("Ovation","RUPI1591",-132,-132);
addOffice("Triumph","SEMP1548",-129,-129);
addOffice("Triumph","AQUI1614",-126,-126);
addOffice("Triumph","FULV1624",-123,-123);
addOffice("Triumph","AURE1627",-122,-122);
addOffice("Triumph","SEXT1634",-122,-122);
addOffice("Triumph","CAEC1635",-121,-121);
addOffice("Triumph","DOMI1630",-120,-120);
addOffice("Triumph","FABI1594",-120,-120);
addOffice("Triumph","MARC1655",-117,-117);
addOffice("Triumph","CAEC1649",-117,-117);
addOffice("Triumph","AEMI1645",-115,-115);
addOffice("Triumph","CAEC1677",-111,-111);
addOffice("Triumph","CAEC1701",-111,-111);
addOffice("Triumph","LIVI1651",-110,-110);
addOffice("Triumph","SERV1629",-107,-107);
addOffice("Triumph","CAEC1693",-106,-106);
addOffice("Triumph","MINU1686",-106,-106);
addOffice("Triumph","MARI1660",-104,-104);
addOffice("Triumph","ALBU1750",-104,-104);
addOffice("Triumph","MARI1660",-102,-102);
addOffice("Triumph","LUTA1731",-101,-101);
addOffice("Triumph","MARI1660",-101,-101);
addOffice("Triumph","ANTO1705",-100,-100);
addOffice("Triumph","DIDI1776",-100,-100);
addOffice("Ovation","AQUI1757",-99,-99);
addOffice("Triumph","CORN1791",-98,-98);
addOffice("Triumph","DIDI1776",-93,-93);
addOffice("Triumph","LICI1780",-93,-93);
addOffice("Triumph","POMP1767",-89,-89);
addOffice("Triumph","SERV1814",-88,-88);
addOffice("Triumph","CORN1746",-81,-81);
addOffice("Triumph","LICI1930",-81,-81);
addOffice("Triumph","VALE1821",-81,-81);
addOffice("Triumph","POMP1976",-81,-81);
addOffice("Triumph","POMP1976",-80,-80);
addOffice("Triumph","VALE1821",-80,-80);
addOffice("Triumph","CORN1979",-77,-77);
addOffice("Triumph","SERV1814",-74,-74);
addOffice("Triumph","AURE1866",-74,-74);
addOffice("Triumph","AURE1866",-73,-73);
addOffice("Triumph","SCRI1876",-72,-72);
addOffice("Triumph","CAEC1889",-71,-71);
addOffice("Ovation","LICI1981",-71,-71);
addOffice("Triumph","POMP1976",-71,-71);
addOffice("Triumph","TERE1982",-71,-71);
addOffice("Triumph","AFRA2074",-70,-70);
addOffice("Triumph","PUPI1974",-69,-69);
addOffice("Triumph","LICI1903",-63,-63);
addOffice("Triumph","MARC2151",-63,-63);
addOffice("Triumph","CAEC2078",-62,-62);
addOffice("Triumph","POMP1976",-61,-61);
addOffice("Triumph","POMP2311",-54,-54);
addOffice("Triumph","CAEC2347",-54,-54);
addOffice("Triumph","CAEC2347",-53,-53);
addOffice("Triumph","CORN2290",-51,-51);
addOffice("Triumph","AEMI2341",-47,-47);
addOffice("Triumph","IULI1957",-46,-46);
addOffice("Triumph","IULI1957",-46,-46);
addOffice("Triumph","IULI1957",-46,-46);
addOffice("Triumph","IULI1957",-46,-46);
addOffice("Triumph","FABI2379",-45,-45);
addOffice("Triumph","IULI1957",-45,-45);
addOffice("Triumph","PEDI2370",-45,-45);
addOffice("Ovation","IULI1957",-44,-44);
addOffice("Triumph","AEMI2341",-43,-43);
addOffice("Triumph","MUNA2450",-43,-43);
addOffice("Triumph","IUNI2489",-43,-43);
addOffice("Triumph","VATI2297",-42,-42);
addOffice("Triumph","ANTO2523",-41,-41);
addOffice("Ovation","ANTO2392",-40,-40);
addOffice("Ovation","IULI2597",-40,-40);
addOffice("Triumph","ASIN2553",-39,-39);
addOffice("Triumph","MARC2711",-39,-39);
addOffice("Triumph","VENT2638",-38,-38);
addOffice("Triumph","VIPS2808",-38,-38);
addOffice("Triumph","DOMI2313",-36,-36);
addOffice("Ovation","IULI2597",-36,-36);
addOffice("Triumph","NORB2713",-34,-34);
addOffice("Triumph","SOSI2840",-34,-34);
addOffice("Triumph","STAT2822",-34,-34);
addOffice("Triumph","ANTO2392",-34,-34);
addOffice("Triumph","CLAU2867",-33,-33);
addOffice("Triumph","CORN2717",-33,-33);
addOffice("Triumph","MARC2534",-33,-33);
addOffice("Urban Prefect","LUCR0004",-509,-509);
addOffice("Urban Prefect","SEMP0028",-499,-499);
addOffice("Urban Prefect","SEMP0028",-496,-496);
addOffice("Urban Prefect","LARC0017",-494,-494);
addOffice("Urban Prefect","LARC0012",-487,-487);
addOffice("Urban Prefect","SERV0123",-465,-465);
addOffice("Urban Prefect","VALE0079",-464,-464);
addOffice("Urban Prefect","FABI0124",-462,-462);
addOffice("Urban Prefect","LUCR0133",-459,-459);
addOffice("Urban Prefect","FABI0124",-458,-458);
addOffice("Urban Prefect","PAPI0533",-325,-325);
addOffice("Urban Prefect","IULI2044",-47,-47);
addOffice("Urban Prefect","IULI2597",-47,-47);
addOffice("Urban Prefect","MUNA2450",-45,-45);
addOffice("Urban Prefect","LIVI3403",-45,-45);
addOffice("Urban Prefect","MAEC2850",-31,-31);
addOffice("Grass Crown","SICC0161",-455,-455);
addOffice("Grass Crown","DECI0515",-343,-343);
addOffice("Grass Crown","FABI0712",-217,-217);
addOffice("Grass Crown","CORN1504",-147,-147);
addOffice("Grass Crown","CORN1746",-89,-89);
addOffice("Grass Crown","IULI2597",-27,-27);


addPerson("VALE0067","Marcus (Valerius) Laevinus","TRUE",-425,"","citizen.png");
addPerson("TULL0069","Manius Tullius Tolerinus","TRUE",-425,"","citizen.png");
addPerson("MANI0191","Sextus Manilius","",-375,"","citizen.png");
addPerson("OPPI0192","Marcus Oppius","",-375,"","citizen.png");
addPerson("SALO0531","Publius Salonius","",-275,"","citizen.png");
addPerson("QUIN0568","Lucius Quinctius","TRUE",-275,"","citizen.png");
addPerson("COMI0569","Lucius Cominius","",-275,"","citizen.png");
addPerson("PUBL0578","? Publilius","",-250,"","citizen.png");
addPerson("LAET0599","Gaius Laetorius Mergus","",-250,"","citizen.png");
addPerson("CLAU0714","Gaius Claudius","TRUE",-200,"","citizen.png");
addPerson("CAEC0725","Gaius Caecilius","",-200,"","citizen.png");
addPerson("CAED0729","Quintus Caedicius","",-200,"","citizen.png");
addPerson("CALP0730","Marcus Calpurnius Flamma","",-200,"","citizen.png");
addPerson("LABE0731","? Laberius","",-200,"","citizen.png");
addPerson("NAUT0736","? Nautius","TRUE",-200,"","citizen.png");
addPerson("AURE0748","Publius Aurelius Pecuniola","",-200,"","citizen.png");
addPerson("CASS0749","Quintus Cassius","",-200,"","citizen.png");
addPerson("VALE0750","? Valerius","TRUE",-200,"","citizen.png");
addPerson("PUBL0881","Lucius Publicius Bibulus","",-150,"","citizen.png");
addPerson("MARC0943","Lucius Marcius Septimius","",-150,"","citizen.png");
addPerson("PERS5042","Gaius Persius","",-150,"","citizen.png");
addPerson("DECI0990","Gaius Decimius Flavus","",-150,"","citizen.png");
addPerson("SEMP0991","Marcus Sempronius Tuditanus","",-150,"","citizen.png");
addPerson("LICI3749","Marcus Licinius","",-209,"","citizen.png");
addPerson("MANL0998","Aulus Manlius","TRUE",-208,"","citizen.png");
addPerson("AURU1013","Gaius Aurunculeius","",-150,"","citizen.png");
addPerson("VERG1015","Lucius Verginius","",-150,"","citizen.png");
addPerson("MATI1027","Publius Matienus","",-205,"","citizen.png");
addPerson("OCTA1028","Gaius Octavius","",-150,"","citizen.png");
addPerson("SERG1029","Marcus Sergius","",-205,"","citizen.png");
addPerson("COSC1045","Marcus Cosconius","",-203,"","citizen.png");
addPerson("MAEV1047","Marcus Maevius","",-203,"","citizen.png");
addPerson("FURI5165","Marcus Furius","",-150,"","citizen.png");
addPerson("IUVE1106","Titus Iuventius (Thalna)","",-197,"","citizen.png");
addPerson("LIGU1107","Gnaeus Ligurius","",-197,"","citizen.png");
addPerson("CLAU1119","Publius Claudius","",-196,"","citizen.png");
addPerson("OGUL0973","Marcus Ogulnius","",-196,"","citizen.png");
addPerson("MINU1158","Publius Minucius","",-125,"","citizen.png");
addPerson("MINU1335","Quintus Minucius","",-100,"","citizen.png");
addPerson("GENU1160","Marcus Genucius","",-193,"","citizen.png");
addPerson("MARC1161","Marcus Marcius","",-193,"","citizen.png");
addPerson("MARC1162","Quintus Marcius","",-193,"","citizen.png");
addPerson("AEMI1180","Marcus Aemilius Lepidus","TRUE",-125,"","citizen.png");
addPerson("AURE1260","Lucius Aurelius Cotta","",-125,"","citizen.png");
addPerson("SERV1266","Marcus Servilius","",-100,"","citizen.png");
addPerson("SULP1267","Lucius Sulpicius","",-125,"","citizen.png");
addPerson("FULV1281","Marcus Fulvius (Nobilior)","",-125,"","citizen.png");
addPerson("AEBU1300","Marcus Aebutius","TRUE",-125,"","citizen.png");
addPerson("AELI1301","Gaius Aelius (or","",-125,"","citizen.png");
addPerson("AELI1302","Titus Aelius","",-125,"","citizen.png");
addPerson("ATIU1303","Lucius Atius","",-125,"","citizen.png");
addPerson("LICI1305","Marcus Licinius Strabo","",-178,"","citizen.png");
addPerson("MANL1370","? Manlius Acidinus","TRUE",-100,"","citizen.png");
addPerson("POMP1372","Lucius Pompeius","",-100,"","citizen.png");
addPerson("DIGI1388","Sextus Digitius","",-100,"","citizen.png");
addPerson("POST1416","Gaius Postumius","TRUE",-100,"","citizen.png");
addPerson("OPPI1571","? Oppius","",-140,"","citizen.png");
addPerson("SEMP1597","? Sempronius Asellio","",-75,"","citizen.png");
addPerson("SEMP1597","? Sempronius Asellio","",-75,"","citizen.png");
addPerson("LUSI1769","Gaius Lusius","",-104,"","citizen.png");
addPerson("FONT3101","Manius Fonteius","",0,"","citizen.png");
addPerson("ATTI1904","Publius Attius","",-25,"","citizen.png");
addPerson("MALO1905","Marcus Maloleius","",-25,"","citizen.png");
addPerson("ANNI1908","Titus Annius Luscus or Rufus","",-25,"","citizen.png");
addPerson("VOLU1910","Lucius Volumnius","",-50,"","citizen.png");
addPerson("POMP1911","Titus Pompeius (Longinus)","",-25,"","citizen.png");
addPerson("AEBU1913","Decimus Aebutius","",-87,"","citizen.png");
addPerson("TEIE1914","Marcus Teiedius","TRUE",-25,"","citizen.png");
addPerson("FUND1915","Gaius Fundilius","",-25,"","citizen.png");
addPerson("MAIA1916","? M(aia)nius","",-25,"","citizen.png");
addPerson("PETR4559","Lucius Petronius","",-25,"","citizen.png");
addPerson("ANNI1944","Publius Annius","",-25,"","citizen.png");
addPerson("CLAU1945","Appius Claudius","",-25,"","citizen.png");
addPerson("ERUC1961","? Erucius","",-25,"","citizen.png");
addPerson("GABI1962","Aulus Gabinius","",-25,"","citizen.png");
addPerson("MINU1934","Lucius Minucius Basilus","",-70,"","citizen.png");
addPerson("RAEC4582","Lucius Raecius","",0,"","citizen.png");
addPerson("MUNA5059","? Munatius Rufus","",0,"","citizen.png");
addPerson("OCTA2243","Lucius Octavius","",0,"","citizen.png");
addPerson("MEVU2299","Gaius Mevulanus","",0,"","citizen.png");
addPerson("SILI2411","Titus Silius","",0,"","citizen.png");
addPerson("VOLU2491","Gaius Volusenus Quadratus","",25,"","citizen.png");
addPerson("CURT2445","Marcus Curtius Postumus","",0,"","citizen.png");
addPerson("LABE2446","Quintus Laberius Durus","",-54,"","citizen.png");
addPerson("PETR2447","? Petronius","",-53,"","citizen.png");
addPerson("ORFI3762","Marcus Orfius","",0,"","citizen.png");
addPerson("TREB4537","Gaius Trebatius Testa","",-4,"","citizen.png");
addPerson("PETR2447","? Petronius","",-53,"","citizen.png");
addPerson("ARIS2485","Marcus Aristius","",0,"","citizen.png");
addPerson("FUFI2501","Quintus Fufidius (step)","",25,"","citizen.png");
addPerson("LUCI2502","Sextus Lucilius","",-51,"","citizen.png");
addPerson("FUFI2501","Quintus Fufidius (step)","",25,"","citizen.png");
addPerson("SCAP2527","Marcus Scaptius","",25,"","citizen.png");
addPerson("PUBL5060","Lucius Publius","",25,"","citizen.png");
addPerson("PUBL5061","Marcus Publius","",25,"","citizen.png");
addPerson("PUBL5062","Marcus Publius","",25,"","citizen.png");
addPerson("ATIL4620","Sextus Atilius Serranus","",25,"","citizen.png");
addPerson("POMP5089","Gaius Pompeius","",25,"","citizen.png");
addPerson("SERV2547","Gaius Servilius Brocchus","",25,"","citizen.png");
addPerson("TEUT2548","Gaius Teutius","",25,"","citizen.png");
addPerson("VULT2549","Gaius Vulteius Capito","",-49,"","citizen.png");
addPerson("SENT3258","Gaius Sentius Saturninus","",-25,"","citizen.png");
addPerson("CLUS3431","Publius Clusius Gallus","",25,"","citizen.png");
addPerson("ATIL4620","Sextus Atilius Serranus","",25,"","citizen.png");
addPerson("FELG4550","Gaius Felginas","",-48,"","citizen.png");
addPerson("GRAN4551","Aulus Granius","",-48,"","citizen.png");
addPerson("SACR4553","Marcus - Sacrativir","",25,"","citizen.png");
addPerson("TUTI4477","? Tuticanus Gallus","",25,"","citizen.png");
addPerson("TITI2576","Lucius Titius Hispanus","",-46,"","citizen.png");
addPerson("AVIE2614","Gaius Avienus","",25,"","citizen.png");
addPerson("FONT2615","Aulus Fonteius","",25,"","citizen.png");
addPerson("TITI2576","Lucius Titius Hispanus","",-46,"","citizen.png");
addPerson("TITI2617","? Titius Hispanus","",-46,"","citizen.png");
addPerson("CEST5063","Marcus Cestius Primus","",25,"","citizen.png");
addPerson("CEST5063","Marcus Cestius Primus","",25,"","citizen.png");
addPerson("CATI2730","Gaius Catius Vestinus","",25,"","citizen.png");
addPerson("HORA2731","Quintus Horatius Flaccus","",-8,"","citizen.png");
addPerson("POPI2732","Gaius Popillius Laenas","",25,"","citizen.png");
addPerson("PINA3108","Quintus Pinarius","",25,"","citizen.png");
addPerson("CAEC3335","Quintus Caecilius Atticus","",25,"","citizen.png");
addPerson("FIRM3466","Lucius Firmius","",25,"","citizen.png");
addPerson("POMP5124","? Pompeius Varus","",25,"","citizen.png");
addPerson("HORA2731","Quintus Horatius Flaccus","",-8,"","citizen.png");
addPerson("NONI5064","? Nonius","",25,"","citizen.png");
addPerson("POMP5124","? Pompeius Varus","",25,"","citizen.png");
addPerson("FERI2809","Marcus Feridius","",25,"","citizen.png");
addPerson("MAEN5065","Lucius Maenius","",25,"","citizen.png");
addPerson("OFIL5066","? Ofillius","",25,"","citizen.png");
addPerson("FLAV2870","? Flavius Gallus","",-36,"","citizen.png");
addPerson("OFIL2871","? Ofillius","",25,"","citizen.png");
addPerson("MARI2881","Titus Marius Siculus","",25,"","citizen.png");
addPerson("BAEB2921","Gaius Baebius","",25,"","citizen.png");
addPerson("CINC5067","Marcus Cincius","",25,"","citizen.png");
addPerson("ANON5068","? - Maximus","",25,"","citizen.png");
addPerson("ACLU5069","Gaius Aclutius Gallus","",25,"","citizen.png");
addPerson("QUIN5070","Publius Quinctius","",25,"","citizen.png");
addPerson("SERG5071","Lucius Sergius Lepidus","",25,"","citizen.png");
addPerson("TITI5072","Manius Titius","",25,"","citizen.png");
addPerson("VIBI5074","Gaius Vibius Pansa","",25,"","citizen.png");
addPerson("CURT3654","Quintus Curtius","",-50,"","citizen.png");
addPerson("CURT3654","Quintus Curtius","",-50,"","citizen.png");
addPerson("URBI3664","Quintus Urbinius","",-50,"","citizen.png");
addPerson("URBI3664","Quintus Urbinius","",-50,"","citizen.png");
addPerson("FURI3558","Lucius Furius Brocchus","",0,"","citizen.png");
addPerson("CARI3674","Titus Carisius","",25,"","citizen.png");
addPerson("GEGA0052","Lucius Geganius","TRUE",-425,"","citizen.png");
addPerson("GEGA0052","Lucius Geganius","TRUE",-425,"","citizen.png");
addPerson("FULC0233","Gaius Fulcinnius","",-438,"","citizen.png");
addPerson("CLOE0234","? Cloelius Tullus","TRUE",-438,"","citizen.png");
addPerson("ANTI0235","Spurius Antius","",-438,"","citizen.png");
addPerson("ROSC0236","Lucius Roscius","",-438,"","citizen.png");
addPerson("CORU0799","Gaius Coruncanius","",-175,"","citizen.png");
addPerson("CORU0800","Lucius Coruncanius","",-230,"","citizen.png");
addPerson("IUNI0801","Publius Iunius","",-230,"","citizen.png");
addPerson("LICI0840","Gaius Licinius (Varus)","",-150,"","citizen.png");
addPerson("FABI0883","Quintus Fabius Pictor","TRUE",-150,"","citizen.png");
addPerson("ACIL0968","Manius Acilius","",-150,"","citizen.png");
addPerson("GENU0969","Lucius Genucius","",-150,"","citizen.png");
addPerson("POET0970","Publius Poetelius","",-150,"","citizen.png");
addPerson("POPI0971","Publius Popillius (Laenas)","",-150,"","citizen.png");
addPerson("ANTI1000","Sextus Antistius","",-150,"","citizen.png");
addPerson("RAEC1001","Marcus Raecius","",-150,"","citizen.png");
addPerson("CORN1197","Gnaeus Cornelius Merula","TRUE",-125,"","citizen.png");
addPerson("CORN1197","Gnaeus Cornelius Merula","TRUE",-125,"","citizen.png");
addPerson("ANON1258","Marcus -","",-125,"","citizen.png");
addPerson("MINU1335","Quintus Minucius","",-100,"","citizen.png");
addPerson("CORN1343","Marcus Cornelius Mammula","TRUE",-100,"","citizen.png");
addPerson("CAEC1344","Marcus Caecilius Denter","",-100,"","citizen.png");
addPerson("DECI1360","Marcus Decimius","",-100,"","citizen.png");
addPerson("CAEC1348","Marcus Caecilius","",-100,"","citizen.png");
addPerson("DECI1364","Lucius Decimius","",-100,"","citizen.png");
addPerson("PLAE1365","Gaius Plaetorius","",-100,"","citizen.png");
addPerson("ABUR1375","Gaius Aburius","",-100,"","citizen.png");
addPerson("SICI1389","Gnaeus Sicinius","",-100,"","citizen.png");
addPerson("MEMM1391","Titus Memmius","",-100,"","citizen.png");
addPerson("NUMI1399","Titus Numisius Tarquiniensis","",-100,"","citizen.png");
addPerson("HOST1418","Gaius Hostilius (Tubulus)","",-100,"","citizen.png");
addPerson("TERE1446","Publius Terentius Tuscivicanus","",-100,"","citizen.png");
addPerson("MANI1447","Publius Manilius","",-100,"","citizen.png");
addPerson("IUNI1448","Lucius Iunius (Brutus)","",-100,"","citizen.png");
addPerson("NUMI1399","Titus Numisius Tarquiniensis","",-100,"","citizen.png");
addPerson("CANI1392","Marcus Caninius Rebilus","",-150,"","citizen.png");
addPerson("MEMM1462","Quintus Memmius","",-100,"","citizen.png");
addPerson("MANL1463","Titus Manlius","TRUE",-100,"","citizen.png");
addPerson("SERG1464","Manius Sergius","TRUE",-100,"","citizen.png");
addPerson("MARC1403","Quintus Marcius Philippus","",-100,"","citizen.png");
addPerson("CORN1469","Gnaeus Cornelius Merula","TRUE",-100,"","citizen.png");
addPerson("SERV1470","? Servilius Glaucia","",-100,"","citizen.png");
addPerson("APUS1473","Publius Apustius","",-100,"","citizen.png");
addPerson("PETR1479","Gaius Petronius","",-100,"","citizen.png");
addPerson("CLAU1481","Gaius Claudius Centho","TRUE",-155,"","citizen.png");
addPerson("AURU1482","Gaius Aurunculeius","",-100,"","citizen.png");
addPerson("CLAU1481","Gaius Claudius Centho","TRUE",-155,"","citizen.png");
addPerson("AURU1482","Gaius Aurunculeius","",-100,"","citizen.png");
addPerson("CORN1469","Gnaeus Cornelius Merula","TRUE",-100,"","citizen.png");
addPerson("FLAM1489","? Flaminius","",-100,"","citizen.png");
addPerson("MINU1259","Lucius Minucius Thermus","",-100,"","citizen.png");
addPerson("ANON1498","Quintus -","",-100,"","citizen.png");
addPerson("MANL1515","Lucius Manlius Vulso","TRUE",-75,"","citizen.png");
addPerson("TERE1537","Aulus Terentius Varro","",-75,"","citizen.png");
addPerson("PETR1549","Marcus Petronius","",-75,"","citizen.png");
addPerson("TERE1537","Aulus Terentius Varro","",-75,"","citizen.png");
addPerson("PLOT1706","Quintus Plotius","",-50,"","citizen.png");
addPerson("DOMI1707","Marcus Domitius","",-50,"","citizen.png");
addPerson("MEMM1714","Lucius Memmius","",-50,"","citizen.png");
addPerson("MANL1917","? Manlius Maltinus","",-25,"","citizen.png");
addPerson("MANC1918","? Mancinus","",-25,"","citizen.png");
addPerson("MANL1917","? Manlius Maltinus","",-25,"","citizen.png");
addPerson("MANC1918","? Mancinus","",-25,"","citizen.png");
addPerson("OCTA4681","Gnaeus Octavius","",-50,"","citizen.png");
addPerson("MINU1936","? Minucius Rufus","",-25,"","citizen.png");
addPerson("POPI1937","Gaius Popillius","",-25,"","citizen.png");
addPerson("LUCI2244","Lucius (Lucilius or Lucius) Bassus","",0,"","citizen.png");
addPerson("SERV2277","? Servilius","",0,"","citizen.png");
addPerson("POMP2253","Gnaeus Pompeius Magnus","",-45,"","citizen.png");
addPerson("VALE2564","Gaius Valerius Triarius","",25,"","citizen.png");
addPerson("POMP2253","Gnaeus Pompeius Magnus","",-45,"","citizen.png");
addPerson("VALE2564","Gaius Valerius Triarius","",25,"","citizen.png");
addPerson("CISP5167","Lucius Cispius (Laevus)","",25,"","citizen.png");
addPerson("IULI2829","Gaius Iulius Helenus","",25,"","citizen.png");
addPerson("POMP2831","Gnaeus Pompeius Menecrates","",25,"","citizen.png");
addPerson("POMP2832","Gnaeus Pompeius Menodorus","",-35,"","citizen.png");
addPerson("POMP2831","Gnaeus Pompeius Menecrates","",25,"","citizen.png");
addPerson("POMP2832","Gnaeus Pompeius Menodorus","",-35,"","citizen.png");
addPerson("POMP2831","Gnaeus Pompeius Menecrates","",25,"","citizen.png");
addPerson("NASI2852","Quintus Nasidius","",25,"","citizen.png");
addPerson("POMP2853","Gnaeus Pompeius Apollophanes","",25,"","citizen.png");
addPerson("POMP2854","? Pompeius Demochares","",-36,"","citizen.png");
addPerson("POMP2832","Gnaeus Pompeius Menodorus","",-35,"","citizen.png");
addPerson("POMP2832","Gnaeus Pompeius Menodorus","",-35,"","citizen.png");
addPerson("MARI2881","Titus Marius Siculus","",25,"","citizen.png");
addPerson("POMP2853","Gnaeus Pompeius Apollophanes","",25,"","citizen.png");
addPerson("POMP2854","? Pompeius Demochares","",-36,"","citizen.png");
addPerson("POMP2832","Gnaeus Pompeius Menodorus","",-35,"","citizen.png");
addPerson("POMP2832","Gnaeus Pompeius Menodorus","",-35,"","citizen.png");
addPerson("NASI2852","Quintus Nasidius","",25,"","citizen.png");
addPerson("OCTA2920","Marcus Octavius","",25,"","citizen.png");
addPerson("TARI2924","Lucius Tarius Rufus","",25,"","citizen.png");
addPerson("BAEB2921","Gaius Baebius","",25,"","citizen.png");
addPerson("CLAU5054","Gaius Claudius Sardus","",25,"","citizen.png");
addPerson("OPIM3126","Marcus Opimius","",150,"","citizen.png");
addPerson("COEL4647","Gaius Coelius Caldus","",-25,"","citizen.png");
addPerson("OTAC2060","Marcus Otacilius","",-25,"","citizen.png");
addPerson("OTAC2060","Marcus Otacilius","",-25,"","citizen.png");
addPerson("VALE2061","Lucius Valerius","",-25,"","citizen.png");
addPerson("LICI2933","Gaius Licinius Calvus","",0,"","citizen.png");
addPerson("MUCI2934","Gaius Mucius Scaevola","",0,"","citizen.png");
addPerson("SICC0090","Titus Siccius","TRUE",-425,"","citizen.png");
addPerson("SICC0090","Titus Siccius","TRUE",-425,"","citizen.png");
addPerson("FABI0604","Caeso Fabius (Maximus)","TRUE",-250,"","citizen.png");
addPerson("CLAU0605","Gaius Claudius","TRUE",-250,"","citizen.png");
addPerson("MANL0646","Lucius Manlius Torquatus","TRUE",-225,"","citizen.png");
addPerson("CAED0651","Gaius Caedicius","",-225,"","citizen.png");
addPerson("MAEC0653","Octavius Maecius","",-225,"","citizen.png");
addPerson("NAUT0654","Spurius Nautius","TRUE",-225,"","citizen.png");
addPerson("PAPI0655","Spurius Papirius (Cursor)","TRUE",-225,"","citizen.png");
addPerson("TREB0656","Titus Trebonius","",-225,"","citizen.png");
addPerson("CALP0737","? Calpurnius Crassus","",-200,"","citizen.png");
addPerson("CLAU0784","Marcus Claudius Clineas","",-236,"","citizen.png");
addPerson("POMP0843","Sextus Pomponius","",-150,"","citizen.png");
addPerson("CINC0862","Publius Cincius","",-150,"","citizen.png");
addPerson("AURE0884","Gaius Aurelius","",-150,"","citizen.png");
addPerson("APUS0898","Lucius Apustius","",-150,"","citizen.png");
addPerson("MAEC0899","Titus Maecilius Croto","",-150,"","citizen.png");
addPerson("IUNI0932","Decimus Iunius","",-150,"","citizen.png");
addPerson("FONT0944","Tiberius Fonteius","",-150,"","citizen.png");
addPerson("FULV0945","Gaius Fulvius Flaccus","",-150,"","citizen.png");
addPerson("POPI0947","Titus Popillius","",-150,"","citizen.png");
addPerson("FULV0945","Gaius Fulvius Flaccus","",-150,"","citizen.png");
addPerson("LUCR1017","Marcus Lucretius","",-150,"","citizen.png");
addPerson("MARC0943","Lucius Marcius Septimius","",-150,"","citizen.png");
addPerson("PLEM1026","Quintus Pleminius","",-150,"","citizen.png");
addPerson("CLAU1079","Gaius Claudius Centho","TRUE",-150,"","citizen.png");
addPerson("CAEC1080","Marcus Caecilius","",-150,"","citizen.png");
addPerson("TITI1082","Publius Titinius","",-150,"","citizen.png");
addPerson("HOST1071","Lucius Hostilius Cato","",-125,"","citizen.png");
addPerson("AEMI1185","Marcus Aemilius (Regillus)","TRUE",-190,"","citizen.png");
addPerson("AEMI1186","Lucius Aemilius Scaurus","TRUE",-125,"","citizen.png");
addPerson("IUVE1236","Lucius Iuventius Thalna","",-125,"","citizen.png");
addPerson("QUIN1237","Titus Quinctilius Varus","TRUE",-125,"","citizen.png");
addPerson("MINU1259","Lucius Minucius Thermus","",-100,"","citizen.png");
addPerson("AURE1260","Lucius Aurelius Cotta","",-125,"","citizen.png");
addPerson("ACIL1268","Lucius Acilius","",-125,"","citizen.png");
addPerson("FULV1247","Marcus Fulvius Flaccus","",-100,"","citizen.png");
addPerson("MINU1259","Lucius Minucius Thermus","",-100,"","citizen.png");
addPerson("MINU1259","Lucius Minucius Thermus","",-100,"","citizen.png");
addPerson("MINU1259","Lucius Minucius Thermus","",-100,"","citizen.png");
addPerson("MINU1380","Titus Minucius Rufus","",-100,"","citizen.png");
addPerson("COEL1393","Lucius Coelius Antipater","",-100,"","citizen.png");
addPerson("FURI1308","Gaius Furius","TRUE",-100,"","citizen.png");
addPerson("MARC1403","Quintus Marcius Philippus","",-100,"","citizen.png");
addPerson("COEL1393","Lucius Coelius Antipater","",-100,"","citizen.png");
addPerson("ANIC1430","Gnaeus Anicius","",-100,"","citizen.png");
addPerson("ATIL1431","Lucius Atilius","",-100,"","citizen.png");
addPerson("SERG1434","Marcus Sergius Silus","",-100,"","citizen.png");
addPerson("OCCI1559","Quintus Occius Achilles","",-75,"","citizen.png");
addPerson("OCCI1559","Quintus Occius Achilles","",-75,"","citizen.png");
addPerson("OCCI1559","Quintus Occius Achilles","",-75,"","citizen.png");
addPerson("OCCI1559","Quintus Occius Achilles","",-75,"","citizen.png");
addPerson("AEMI1668","? Aemilius","",-50,"","citizen.png");
addPerson("POST1671","? Postumius","",-50,"","citizen.png");
addPerson("AEMI1783","Marcus Aemilius Scaurus","TRUE",-102,"","citizen.png");
addPerson("IUNI3114","Lucius Iunius","",0,"","citizen.png");
addPerson("LUCC1845","Lucius Lucceius","",-25,"","citizen.png");
addPerson("FONT1884","? Fonteius","",-91,"","citizen.png");
addPerson("ACIL1880","Lucius Acilius","",-25,"","citizen.png");
addPerson("BAEB1881","Gaius Baebius","",-25,"","citizen.png");
addPerson("FONT1884","? Fonteius","",-91,"","citizen.png");
addPerson("PLAU1885","Aulus Plautius (Plotius)","",-25,"","citizen.png");
addPerson("OTAC1924","? Otacilius","",-25,"","citizen.png");
addPerson("ANON1922","? - Lucanus","",-25,"","citizen.png");
addPerson("GRAT1933","Marcus Gratidius","",-88,"","citizen.png");
addPerson("MINU1934","Lucius Minucius Basilus","",-70,"","citizen.png");
addPerson("MUMM1935","Gaius Mummius","",-25,"","citizen.png");
addPerson("MUNA1952","Lucius Munatius (Plancus)","",-25,"","citizen.png");
addPerson("PLAU1885","Aulus Plautius (Plotius)","",-25,"","citizen.png");
addPerson("FLAV1946","Gaius Flavius Fimbria","",-85,"","citizen.png");
addPerson("FLAV1946","Gaius Flavius Fimbria","",-85,"","citizen.png");
addPerson("CLUI1978","Titus Cluilius","",-25,"","citizen.png");
addPerson("QUIN1997","? Quinctius","",-25,"","citizen.png");
addPerson("TERE2001","Aulus Terentius Varro","",-25,"","citizen.png");
addPerson("POST3794","Aulus (Postumius) Albinus","",-25,"","citizen.png");
addPerson("IUNI2019","Marcus Iunius","",-25,"","citizen.png");
addPerson("THOR2034","Lucius Thorius Balbus","",-79,"","citizen.png");
addPerson("VALE3113","Lucius Valerius Praeconinus","",-78,"","citizen.png");
addPerson("AQUI2041","? Aquinius","",-25,"","citizen.png");
addPerson("CORN2048","? Cornelius Scipio","TRUE",-77,"","citizen.png");
addPerson("LAEL2056","Decimus Laelius","",-77,"","citizen.png");
addPerson("LAEL2056","Decimus Laelius","",-77,"","citizen.png");
addPerson("TITU2076","Lucius Titurius Sabinus","",0,"","citizen.png");
addPerson("FONT3101","Manius Fonteius","",0,"","citizen.png");
addPerson("ANON2090","Mamercus -","",0,"","citizen.png");
addPerson("MANI2091","? Manius","",0,"","citizen.png");
addPerson("ANNI2092","Gaius Annius Bellienus","",0,"","citizen.png");
addPerson("FONT2093","Gaius Fonteius","",0,"","citizen.png");
addPerson("MALL2094","Lucius Mallius","",0,"","citizen.png");
addPerson("SALL2097","Gaius Salluvius Naso","",0,"","citizen.png");
addPerson("TITU2076","Lucius Titurius Sabinus","",0,"","citizen.png");
addPerson("FURI2113","Lucius Furius","",0,"","citizen.png");
addPerson("FULV2114","? Fulvius","",0,"","citizen.png");
addPerson("GALL2115","Gaius Gallius","",0,"","citizen.png");
addPerson("SALL2097","Gaius Salluvius Naso","",0,"","citizen.png");
addPerson("TADI2116","Publius Tadius","",0,"","citizen.png");
addPerson("VOCO2118","? Voconius","",0,"","citizen.png");
addPerson("ANON3283","Mamercus -","",0,"","citizen.png");
addPerson("TITU2076","Lucius Titurius Sabinus","",0,"","citizen.png");
addPerson("CERV2112","Publius Cervius","",0,"","citizen.png");
addPerson("FABI2141","Marcus Fabius Hadrianus","",0,"","citizen.png");
addPerson("MUMM2142","? Mummius","",0,"","citizen.png");
addPerson("POMP2143","Marcus Pompeius","",0,"","citizen.png");
addPerson("SORN2144","? Sornatius","",0,"","citizen.png");
addPerson("TADI2116","Publius Tadius","",0,"","citizen.png");
addPerson("POMP2143","Marcus Pompeius","",0,"","citizen.png");
addPerson("TADI2116","Publius Tadius","",0,"","citizen.png");
addPerson("FABI2141","Marcus Fabius Hadrianus","",0,"","citizen.png");
addPerson("SORN2144","? Sornatius","",0,"","citizen.png");
addPerson("FABI2141","Marcus Fabius Hadrianus","",0,"","citizen.png");
addPerson("SORN2144","? Sornatius","",0,"","citizen.png");
addPerson("LUCI2244","Lucius (Lucilius or Lucius) Bassus","",0,"","citizen.png");
addPerson("MANL2275","? Manlius Priscus","",0,"","citizen.png");
addPerson("MANL2314","? Manlius Lentinus","",0,"","citizen.png");
addPerson("GRAT2326","Marcus Gratidius","",0,"","citizen.png");
addPerson("MANL2314","? Manlius Lentinus","",0,"","citizen.png");
addPerson("GRAT2326","Marcus Gratidius","",0,"","citizen.png");
addPerson("MANL2314","? Manlius Lentinus","",0,"","citizen.png");
addPerson("GRAT2326","Marcus Gratidius","",0,"","citizen.png");
addPerson("AURU2369","Lucius Aurunculeius Cotta","",-54,"","citizen.png");
addPerson("TITU2371","Quintus Titurius Sabinus","",-54,"","citizen.png");
addPerson("AURU2369","Lucius Aurunculeius Cotta","",-54,"","citizen.png");
addPerson("CORN4196","? Cornelius Sisenna","",0,"","citizen.png");
addPerson("SERV2390","? Servilius","",0,"","citizen.png");
addPerson("ANON2391","? - Servianus","",0,"","citizen.png");
addPerson("TITU2371","Quintus Titurius Sabinus","",-54,"","citizen.png");
addPerson("AURU2369","Lucius Aurunculeius Cotta","",-54,"","citizen.png");
addPerson("TITU2371","Quintus Titurius Sabinus","",-54,"","citizen.png");
addPerson("AURU2369","Lucius Aurunculeius Cotta","",-54,"","citizen.png");
addPerson("TITU2371","Quintus Titurius Sabinus","",-54,"","citizen.png");
addPerson("AURU2369","Lucius Aurunculeius Cotta","",-54,"","citizen.png");
addPerson("TITU2371","Quintus Titurius Sabinus","",-54,"","citizen.png");
addPerson("OCTA2451","? Octavius","",-53,"","citizen.png");
addPerson("VARG2452","? Vargunteius","",-53,"","citizen.png");
addPerson("FABI2462","Quintus Fabius Vergilianus","",0,"","citizen.png");
addPerson("IUNI2463","Marcus Iunius Silanus","",0,"","citizen.png");
addPerson("MEGA2465","? Megabocchus","",-53,"","citizen.png");
addPerson("OCTA2451","? Octavius","",-53,"","citizen.png");
addPerson("VALE2488","Gaius Valerius Flaccus","TRUE",0,"","citizen.png");
addPerson("VARG2452","? Vargunteius","",-53,"","citizen.png");
addPerson("FABI2462","Quintus Fabius Vergilianus","",0,"","citizen.png");
addPerson("SEMP2487","Marcus Sempronius Rutilius","",0,"","citizen.png");
addPerson("VALE2488","Gaius Valerius Flaccus","TRUE",0,"","citizen.png");
addPerson("VOLC2474","Gaius Volcacius Tullus","",25,"","citizen.png");
addPerson("ANNE2504","Marcus Anneius","",25,"","citizen.png");
addPerson("TITI2507","Titus Titius","",0,"","citizen.png");
addPerson("TULL2508","Lucius Tullius","",25,"","citizen.png");
addPerson("VALE2488","Gaius Valerius Flaccus","TRUE",0,"","citizen.png");
addPerson("VOLC2474","Gaius Volcacius Tullus","",25,"","citizen.png");
addPerson("FABI2462","Quintus Fabius Vergilianus","",0,"","citizen.png");
addPerson("ANNE2504","Marcus Anneius","",25,"","citizen.png");
addPerson("TULL2508","Lucius Tullius","",25,"","citizen.png");
addPerson("VOLC2474","Gaius Volcacius Tullus","",25,"","citizen.png");
addPerson("VOLC2474","Gaius Volcacius Tullus","",25,"","citizen.png");
addPerson("TONG3858","Titus Tongius","",25,"","citizen.png");
addPerson("CANU2585","Lucius Canuleius","",25,"","citizen.png");
addPerson("POMP2587","Marcus Pomponius","",25,"","citizen.png");
addPerson("TILL2589","Quintus Tillius Cimber","",25,"","citizen.png");
addPerson("VOLC2474","Gaius Volcacius Tullus","",25,"","citizen.png");
addPerson("POMP2253","Gnaeus Pompeius Magnus","",-45,"","citizen.png");
addPerson("DIDI2619","Gaius Didius","",-45,"","citizen.png");
addPerson("AURE2644","? Aurelius","",25,"","citizen.png");
addPerson("BAEB2645","? Baebius","",-44,"","citizen.png");
addPerson("DIDI2619","Gaius Didius","",-45,"","citizen.png");
addPerson("HORA2647","? Horatius","",25,"","citizen.png");
addPerson("LATI2648","? Latinius","",25,"","citizen.png");
addPerson("PETR2649","Marcus Petrucidius","",25,"","citizen.png");
addPerson("VENU2650","? Venuleius","",25,"","citizen.png");
addPerson("OCTA2697","Marcus Octavius Marsus","",-43,"","citizen.png");
addPerson("BAEB2645","? Baebius","",-44,"","citizen.png");
addPerson("IUNI3114","Lucius Iunius","",0,"","citizen.png");
addPerson("OCTA2697","Marcus Octavius Marsus","",-43,"","citizen.png");
addPerson("CALP2739","Lucius Calpurnius Bibulus","",-32,"","citizen.png");
addPerson("CALP2740","Lucius Calpurnius Piso","",25,"","citizen.png");
addPerson("HORA2647","? Horatius","",25,"","citizen.png");
addPerson("LATI2648","? Latinius","",25,"","citizen.png");
addPerson("MARI2750","Sextus Marius","",25,"","citizen.png");
addPerson("PEDA2751","? (Pedanius) Costa","",25,"","citizen.png");
addPerson("PEDU2752","Gaius Peducaeus","",-43,"","citizen.png");
addPerson("TITI2757","Gaius Titius","",25,"","citizen.png");
addPerson("VENU2650","? Venuleius","",25,"","citizen.png");
addPerson("CALP2739","Lucius Calpurnius Bibulus","",-32,"","citizen.png");
addPerson("FANN2782","? Fannius (Caepio?)","",25,"","citizen.png");
addPerson("MANL2783","Titus Manlius Torquatus","TRUE",25,"","citizen.png");
addPerson("PAQU2786","Quintus Paquius Rufus","",25,"","citizen.png");
addPerson("PEDA2751","? (Pedanius) Costa","",25,"","citizen.png");
addPerson("SALV2788","Quintus Salvidienus Rufus","",-40,"","citizen.png");
addPerson("TURI2790","Marcus Turius","",25,"","citizen.png");
addPerson("ATEI2804","? Ateius","",25,"","citizen.png");
addPerson("CANI2814","Gaius Caninius","",25,"","citizen.png");
addPerson("ATEI2804","? Ateius","",25,"","citizen.png");
addPerson("IULI2829","Gaius Iulius Helenus","",25,"","citizen.png");
addPerson("LIVI2830","Gaius Livius","",25,"","citizen.png");
addPerson("POMP2831","Gnaeus Pompeius Menecrates","",25,"","citizen.png");
addPerson("POMP2832","Gnaeus Pompeius Menodorus","",-35,"","citizen.png");
addPerson("TURI2790","Marcus Turius","",25,"","citizen.png");
addPerson("POMP2841","? Pompaedius (or Poppaedius) Silo","",25,"","citizen.png");
addPerson("POMP2831","Gnaeus Pompeius Menecrates","",25,"","citizen.png");
addPerson("POMP2832","Gnaeus Pompeius Menodorus","",-35,"","citizen.png");
addPerson("IUNI3114","Lucius Iunius","",0,"","citizen.png");
addPerson("NASI2852","Quintus Nasidius","",25,"","citizen.png");
addPerson("POMP2841","? Pompaedius (or Poppaedius) Silo","",25,"","citizen.png");
addPerson("POMP2853","Gnaeus Pompeius Apollophanes","",25,"","citizen.png");
addPerson("POMP2854","? Pompeius Demochares","",-36,"","citizen.png");
addPerson("POMP2831","Gnaeus Pompeius Menecrates","",25,"","citizen.png");
addPerson("POMP2832","Gnaeus Pompeius Menodorus","",-35,"","citizen.png");
addPerson("POMP2832","Gnaeus Pompeius Menodorus","",-35,"","citizen.png");
addPerson("LAPR2873","Quintus Lapronius","",25,"","citizen.png");
addPerson("OPPI2874","? Oppius Statianus","",-36,"","citizen.png");
addPerson("PLIN2875","Lucius Plinius Rufus","",25,"","citizen.png");
addPerson("POMP2853","Gnaeus Pompeius Apollophanes","",25,"","citizen.png");
addPerson("POMP2854","? Pompeius Demochares","",-36,"","citizen.png");
addPerson("POMP2832","Gnaeus Pompeius Menodorus","",-35,"","citizen.png");
addPerson("TITI2880","? Titinius","",25,"","citizen.png");
addPerson("CURI2892","? Curius","",-35,"","citizen.png");
addPerson("POMP2832","Gnaeus Pompeius Menodorus","",-35,"","citizen.png");
addPerson("HELV2903","Marcus Helvius","",25,"","citizen.png");
addPerson("NASI2852","Quintus Nasidius","",25,"","citizen.png");
addPerson("TARI2924","Lucius Tarius Rufus","",25,"","citizen.png");
addPerson("UTTI2978","? Uttiedius Afer","",-29,"","citizen.png");
addPerson("NOVI2310","Lucius Novius Niger","",0,"","citizen.png");
addPerson("FABI2484","Lucius Fabius","",0,"","citizen.png");
addPerson("CORN2393","Quintus Cornelius","",0,"","citizen.png");
addPerson("FLAV4652","Marcus Flavius","",25,"","citizen.png");
addPerson("FLAV4652","Marcus Flavius","",25,"","citizen.png");
addPerson("HERE2418","Lucius Herennius Balbus","",0,"","citizen.png");
addPerson("HERE2418","Lucius Herennius Balbus","",0,"","citizen.png");
addPerson("LICI2706","? Licinius","",25,"","citizen.png");
addPerson("ANON5041","? - Hegeas","",-150,"","citizen.png");
addPerson("BIES5045","? Biesius","",-100,"","citizen.png");
addPerson("OCTA2002","? (Octavius) Balbus","",-25,"","citizen.png");
addPerson("POMP2145","Marcus Pomponius","",0,"","citizen.png");
addPerson("POMP4579","? Pompeius Trogus","",0,"","citizen.png");
addPerson("ANON5048","? - Dumnorix","",0,"","citizen.png");
addPerson("TREB2473","Gaius Trebonius","",0,"","citizen.png");
addPerson("ANON5049","? - Cotus","",0,"","citizen.png");
addPerson("VOLU2491","Gaius Volusenus Quadratus","",25,"","citizen.png");
addPerson("ANON5050","? - Vertiscus","",0,"","citizen.png");
addPerson("ATIU2510","Quintus Atius Varus","",25,"","citizen.png");
addPerson("VOLU2491","Gaius Volusenus Quadratus","",25,"","citizen.png");
addPerson("ATIU2510","Quintus Atius Varus","",25,"","citizen.png");
addPerson("VOLU2491","Gaius Volusenus Quadratus","",25,"","citizen.png");
addPerson("PACI3433","? Pacideius","",25,"","citizen.png");
addPerson("PACI3434","? Pacideius","",25,"","citizen.png");
addPerson("AURI4571","Lucius Aurifex","",-25,"","citizen.png");
addPerson("PLAN4116","Gnaeus Plancius","",-25,"","citizen.png");
addPerson("VARI4596","Publius Varius","",0,"","citizen.png");
addPerson("VELL2836","Gaius Velleius","",-40,"","citizen.png");
addPerson("TURP4565","? Turpio (Sutorius)","",0,"","citizen.png");
addPerson("VETT4597","? Vettius Salassus","",-41,"","citizen.png");
addPerson("AEMI4567","Lucius Aemilius","",25,"","citizen.png");
addPerson("CUPI2700","Gaius Cupiennius","",25,"","citizen.png");
addPerson("AFRA5043","Gaius Afranius","",-100,"","citizen.png");
addPerson("CARV5044","Marcus Carvilius Spoletinus","",-100,"","citizen.png");
addPerson("COPO3112","Quintus Coponius","",-100,"","citizen.png");
addPerson("ANON3117","#NAME?","",-50,"","citizen.png");
addPerson("COEL3435","? Coelius","",-25,"","citizen.png");
addPerson("SABI3111","Manius Sabidius","",25,"","citizen.png");
addPerson("APPU3452","? Appuleius","",25,"","citizen.png");
addPerson("OCTA2920","Marcus Octavius","",25,"","citizen.png");
addPerson("PINA2795","Lucius Pinarius Scarpus","",25,"","citizen.png");
addPerson("ANON3124","#NAME?","",25,"","citizen.png");
addPerson("COSC3125","? Cosconius","",25,"","citizen.png");
addPerson("PULL3128","? Pullius","",25,"","citizen.png");
addPerson("LUSI3809","Numerius Lusius Nomentanus","",50,"","citizen.png");
addPerson("CORN3439","Lucius Cornelius","",-25,"","citizen.png");
addPerson("VIBI4589","? Vibius (Sicca)","",0,"","citizen.png");
addPerson("ANON3462","? - Mamurra","",25,"","citizen.png");
addPerson("CLOD2511","Lucius Clodius","",0,"","citizen.png");
addPerson("PACO2512","Quintus (Paconius?) Lepta","",25,"","citizen.png");
addPerson("PACO2512","Quintus (Paconius?) Lepta","",25,"","citizen.png");
addPerson("AMPI5090","Titus Ampius Menander","",25,"","citizen.png");
addPerson("MAGI2552","Numerius Magius","",25,"","citizen.png");
addPerson("PLAN4578","Marcus Planius Heres","",25,"","citizen.png");
addPerson("FLAV2744","Gaius Flavius Hemicillus","",-42,"","citizen.png");
addPerson("CORN2816","Gaius Cornelius Gallus","",-26,"","citizen.png");
addPerson("ATIL4570","Gaius Atilius Glabrio","",25,"","citizen.png");
addPerson("VELL2836","Gaius Velleius","",-40,"","citizen.png");
addPerson("CORN2816","Gaius Cornelius Gallus","",-26,"","citizen.png");
addPerson("CORN2816","Gaius Cornelius Gallus","",-26,"","citizen.png");
addPerson("NUS5056","? (-)nus","",25,"","citizen.png");
addPerson("SATA5058","Titus Satanus Sabinus","",25,"","citizen.png");
addPerson("VIBE0677","Decius Vibellius Campanus","",-182,"","citizen.png");
addPerson("DECI5039","Numerius Decimius","",-150,"","citizen.png");
addPerson("ANIC5040","Marcus Anicius","",-150,"","citizen.png");
addPerson("NAEV0910","Quintus Naevius Crista","",-150,"","citizen.png");
addPerson("ACCA0934","Vibius Accaus","",-150,"","citizen.png");
addPerson("TURP1735","Titus Turpilius Silanus","",-109,"","citizen.png");
addPerson("CALP3344","Gnaeus Calpurnius","",-150,"","citizen.png");
addPerson("CLAU3428","Publius Claudius Nero","",-75,"","citizen.png");
addPerson("ATIL1669","Lucius Atilius Nomentanus","",-50,"","citizen.png");
addPerson("TITI1770","Marcus Titinius","",-50,"","citizen.png");
addPerson("ACIL4370","Titus Acilius","",-25,"","citizen.png");
addPerson("PETI5075","Quintus Petillius","",-25,"","citizen.png");
addPerson("TERE5076","Lucius Terentius","",-25,"","citizen.png");
addPerson("TERE5077","Titus Terentius","",-25,"","citizen.png");
addPerson("VETT5078","Lucius Vettius","",-25,"","citizen.png");
addPerson("FORN5079","Gaius Fornasidius","",-25,"","citizen.png");
addPerson("HOST5080","Marcus Hostilius","",-25,"","citizen.png");
addPerson("AEBU4369","Lucius Aebutius","",-25,"","citizen.png");
addPerson("ROSI5081","Quintus Rosidius","",-25,"","citizen.png");
addPerson("HERI5082","Gaius Herius","",-25,"","citizen.png");
addPerson("PONT5083","Lucius Pontius","",-25,"","citizen.png");
addPerson("FULV5084","Aulus Fulvius","",-25,"","citizen.png");
addPerson("AMPU4375","Quintus Ampudius","",-25,"","citizen.png");
addPerson("MINU1934","Lucius Minucius Basilus","",-70,"","citizen.png");
addPerson("BUSS4386","Gnaeus Bussenius","",-25,"","citizen.png");
addPerson("LUCA3807","Marcus Lucanius","",-25,"","citizen.png");
addPerson("IUNI4621","Lucius Iunius","",-25,"","citizen.png");
addPerson("LAET4622","Gaius Laetorius","",-25,"","citizen.png");
addPerson("NONI4623","Lucius Nonius","",-25,"","citizen.png");
addPerson("NONI4624","Titus Nonius","",-25,"","citizen.png");
addPerson("OPIM4625","Lucius Opimius","",-25,"","citizen.png");
addPerson("OTAC4626","Manius Otacilius","",-25,"","citizen.png");
addPerson("PEDA4627","Publius Pedanius","",-25,"","citizen.png");
addPerson("PETR4628","Titus Petronius","",-25,"","citizen.png");
addPerson("POMP4629","Sextus Pompeius","",-25,"","citizen.png");
addPerson("VETU4630","Titus Veturius","",-25,"","citizen.png");
addPerson("CORN5131","? Cornelius Phagites","",-25,"","citizen.png");
addPerson("CALP3343","Publius Calpurnius Lanarius","",-25,"","citizen.png");
addPerson("PERP5106","? (Perperna)","",-72,"","citizen.png");
addPerson("GEMI3700","? Geminius","",-25,"","citizen.png");
addPerson("AUFI2147","? Aufidius","",0,"","citizen.png");
addPerson("ANON2111","? - Barba","",0,"","citizen.png");
addPerson("AUFI2147","? Aufidius","",0,"","citizen.png");
addPerson("VARI3847","Titus Varius Sabinus","",0,"","citizen.png");
addPerson("CAES3341","Sextus Caesius","",0,"","citizen.png");
addPerson("SILI2411","Titus Silius","",0,"","citizen.png");
addPerson("TERR2412","Titus Terrasidius","",0,"","citizen.png");
addPerson("VELA2414","Quintus Velanius","",0,"","citizen.png");
addPerson("TREB2473","Gaius Trebonius","",0,"","citizen.png");
addPerson("FABR2528","? (Fabricius or Perperna?) Veiento","",25,"","citizen.png");
addPerson("SERV5091","Publius Servilius Strabo","",25,"","citizen.png");
addPerson("LIGA3806","Publius Ligarius","",25,"","citizen.png");
addPerson("FULV3695","? Fulvius Postumus","",25,"","citizen.png");
addPerson("LIGA3806","Publius Ligarius","",25,"","citizen.png");
addPerson("LIGA3806","Publius Ligarius","",25,"","citizen.png");
addPerson("APON3326","Quintus Aponius","",25,"","citizen.png");
addPerson("LIGA3806","Publius Ligarius","",25,"","citizen.png");
addPerson("QUIN3826","Titus Quin(c)tius Scapula","",25,"","citizen.png");
addPerson("CASS3424","? Cassius Barba","",25,"","citizen.png");
addPerson("CURT3443","Publius Curtius (Salassus)","",-45,"","citizen.png");
addPerson("LUCC5119","Gnaeus Lucceius","",-25,"","citizen.png");
addPerson("DELL2810","Quintus Dellius","",25,"","citizen.png");
addPerson("DELL2810","Quintus Dellius","",25,"","citizen.png");
addPerson("IUNI2747","Marcus Iunius Silanus","TRUE",0,"","citizen.png");
addPerson("BAGI3306","Publius Bagiennus","",25,"","citizen.png");
addPerson("ATIL5115","? Atilius","",25,"","citizen.png");
addPerson("TERE5127","Marcus Terentius Varro","",-42,"","citizen.png");
addPerson("VETU4702","? Vetulinus Vetulinus","",25,"","citizen.png");
addPerson("DELL2810","Quintus Dellius","",25,"","citizen.png");
addPerson("VOLU4558","? Volumnius","",-42,"","citizen.png");
addPerson("ANON2796","Lucius - Varus","TRUE",25,"","citizen.png");
addPerson("TULL2563","Marcus Tullius Cicero","",0,"","citizen.png");
addPerson("IUNI2747","Marcus Iunius Silanus","TRUE",0,"","citizen.png");
addPerson("LICI3837","? Licinius Sacer(dos)","",25,"","citizen.png");
addPerson("CAE3309","Lucius Cae(-)","",25,"","citizen.png");
addPerson("AUFI3312","Marcus Aufi(dius) Scaeva","",25,"","citizen.png");
addPerson("ANON3319","Publius Al(-)","",25,"","citizen.png");
addPerson("CALP3342","Publius Calp-","",25,"","citizen.png");
addPerson("ANON3423","? - Cap(-)","",25,"","citizen.png");
addPerson("ANON3765","? - Cap-","",25,"","citizen.png");
addPerson("TREB3859","? Trebonius","",25,"","citizen.png");
addPerson("CARI2872","Publius Carisius","",25,"","citizen.png");
addPerson("AUFI3312","Marcus Aufi(dius) Scaeva","",25,"","citizen.png");
addPerson("CAE3309","Lucius Cae(-)","",25,"","citizen.png");
addPerson("ANON3319","Publius Al(-)","",25,"","citizen.png");
addPerson("CALP3342","Publius Calp-","",25,"","citizen.png");
addPerson("ANON3423","? - Cap(-)","",25,"","citizen.png");
addPerson("ANON3765","? - Cap-","",25,"","citizen.png");
addPerson("LICI3837","? Licinius Sacer(dos)","",25,"","citizen.png");
addPerson("TREB3859","? Trebonius","",25,"","citizen.png");
addPerson("DELL2810","Quintus Dellius","",25,"","citizen.png");
addPerson("LAET0034","Marcus Laetorius","",-425,"","citizen.png");
addPerson("AEMI0785","Manius Aemilius (Lepidus)","TRUE",-211,"","citizen.png");
addPerson("LIVI0786","Marcus Livius Salinator","",-175,"","citizen.png");
addPerson("AEMI0785","Manius Aemilius (Lepidus)","TRUE",-211,"","citizen.png");
addPerson("SEMP1338","Gaius Sempronius Longus","",-100,"","citizen.png");
addPerson("COEL4647","Gaius Coelius Caldus","",-25,"","citizen.png");
addPerson("AELI3480","? Aelius","",-150,"","citizen.png");
addPerson("QUIN3747","? Q(uinctius)","",-150,"","citizen.png");
addPerson("AELI3480","? Aelius","",-150,"","citizen.png");
addPerson("QUIN3747","? Q(uinctius)","",-150,"","citizen.png");
addPerson("AELI3480","? Aelius","",-150,"","citizen.png");
addPerson("TERE3485","Gaius (Terentius) Varro","",-150,"","citizen.png");
addPerson("AELI3487","Gaius Aelius","",-150,"","citizen.png");
addPerson("AELI3480","? Aelius","",-150,"","citizen.png");
addPerson("TERE3485","Gaius (Terentius) Varro","",-150,"","citizen.png");
addPerson("AELI3487","Gaius Aelius","",-150,"","citizen.png");
addPerson("LUTA3665","Quintus L(utatius) C(erco) or C(atulus)","",-150,"","citizen.png");
addPerson("TERE3485","Gaius (Terentius) Varro","",-150,"","citizen.png");
addPerson("DURM3746","? D(urmius) or D(uillius)","",-100,"","citizen.png");
addPerson("PL[A3544","Lucius Pl[autius] H[ypsaeus]","",-125,"","citizen.png");
addPerson("CAEC3614","? (Caecilius) Metellus","",-125,"","citizen.png");
addPerson("MAEN3639","Publius Maenius","",-125,"","citizen.png");
addPerson("BAEB3679","? (Baebius) Tamphilus","",-125,"","citizen.png");
addPerson("AURE3748","? Au(relius?) or An(-)","",-125,"","citizen.png");
addPerson("AUTR3482","Lucius Autronius","",-125,"","citizen.png");
addPerson("CALP3530","Gnaeus Calpurnius","",-125,"","citizen.png");
addPerson("MAMI3564","Lucius Mamilius","",-125,"","citizen.png");
addPerson("TITI3609","Marcus Titinius","",-125,"","citizen.png");
addPerson("MARI3657","Quintus Marius","",-125,"","citizen.png");
addPerson("FURI3666","Spurius Furius","",-125,"","citizen.png");
addPerson("Q[UI3672","Sextus Q[uinctilius]","",-125,"","citizen.png");
addPerson("ANON3673","? - Todus","",-125,"","citizen.png");
addPerson("COEL1393","Lucius Coelius Antipater","",-100,"","citizen.png");
addPerson("DECI1239","Gaius Decimius Flavus","",-184,"","citizen.png");
addPerson("MATI3613","? Matienus","",-100,"","citizen.png");
addPerson("FURI3650","? (Furius) Purpurio","",-100,"","citizen.png");
addPerson("IUVE3678","? (Iuventius) Thalna","",-100,"","citizen.png");
addPerson("ACIL3483","? Acilius or Naevius Balbus","",-100,"","citizen.png");
addPerson("SAE[3516","Gaius Sae[nius]","",-100,"","citizen.png");
addPerson("CORN3528","Lucius (Cornelius) Cinna","",-100,"","citizen.png");
addPerson("OPEI3626","? Opei[mius]","",-100,"","citizen.png");
addPerson("OPEI3627","? Opeimi[us]","",-100,"","citizen.png");
addPerson("AELI3646","? (Aelius) Pae[tus]","",-100,"","citizen.png");
addPerson("FURI3651","? (Furius) Purpurio","",-100,"","citizen.png");
addPerson("CLUV3669","? Cluvius Saxula","",-100,"","citizen.png");
addPerson("PAPI3683","? (Papirius) Turdus","",-100,"","citizen.png");
addPerson("VALE3684","? Valerius","",-100,"","citizen.png");
addPerson("TERE1537","Aulus Terentius Varro","",-75,"","citizen.png");
addPerson("CLUV3778","Gaius Cluvius Saxula","",-100,"","citizen.png");
addPerson("PINA3623","? Pinarius Natta","",-75,"","citizen.png");
addPerson("ATIL3668","? (Atilius) Saranus","",-100,"","citizen.png");
addPerson("IUVE3521","Gaius (Iuventius) Thalna","",-100,"","citizen.png");
addPerson("SCRI1269","Gaius Scribonius","",-100,"","citizen.png");
addPerson("MAIA3503","Gaius Maianius","",-100,"","citizen.png");
addPerson("SAUF3579","Lucius Saufeius","",-100,"","citizen.png");
addPerson("CORN3629","Publius Cornelius Sulla","TRUE",-100,"","citizen.png");
addPerson("ANON3667","? - Safra","",-100,"","citizen.png");
addPerson("DECI5163","? (Decimius) Flavus","",-100,"","citizen.png");
addPerson("IUNI3502","Gaius Iunius","",-75,"","citizen.png");
addPerson("ITIU3560","Lucius Itius or Iteius or Iteilius","",-75,"","citizen.png");
addPerson("PINA3623","? Pinarius Natta","",-75,"","citizen.png");
addPerson("SEMP3580","Lucius Sempronius Pitio","",-75,"","citizen.png");
addPerson("ATIL3593","Marcus Atilius Saranus","",-75,"","citizen.png");
addPerson("CUPI3556","Lucius Cupiennius","",-75,"","citizen.png");
addPerson("ANTE3489","Gaius Antestius","",-75,"","citizen.png");
addPerson("CURI3497","Gaius Curiatius Trigeminus","",-75,"","citizen.png");
addPerson("TITI3523","Gaius Titinius","",-75,"","citizen.png");
addPerson("ATIL1669","Lucius Atilius Nomentanus","",-50,"","citizen.png");
addPerson("VALE3524","Gaius Valerius Flaccus","",-75,"","citizen.png");
addPerson("AUFI3594","Marcus Aufidius Rusticus","",-75,"","citizen.png");
addPerson("SPUR3479","Aulus Spuri[us] or Spuri[lius]","",-75,"","citizen.png");
addPerson("AURE3595","Marcus Aurelius Cotta","",-75,"","citizen.png");
addPerson("RENI3515","Gaius Renius","",-75,"","citizen.png");
addPerson("GELL3533","Gnaeus Gellius","",-75,"","citizen.png");
addPerson("AELI3628","Publius (Aelius) Paetus","",-75,"","citizen.png");
addPerson("BAEB3597","Marcus Baebius Tamphilus","",-75,"","citizen.png");
addPerson("VETU3682","Tiberius Veturius","",-75,"","citizen.png");
addPerson("SERV3519","Gaius Servilius","",-75,"","citizen.png");
addPerson("LUCR3534","Gnaeus Lucretius Trio","",-75,"","citizen.png");
addPerson("ANTE3545","Lucius Antestius Gragulus","",-75,"","citizen.png");
addPerson("MINU3491","Gaius Minucius Augurinus","",-75,"","citizen.png");
addPerson("CURI3498","Gaius Curiatius Trigeminus","",-75,"","citizen.png");
addPerson("TREB3582","Lucius Trebanius","",-75,"","citizen.png");
addPerson("ABUR3486","Gaius Aburius Geminus","",-75,"","citizen.png");
addPerson("MINU3681","Tiberius Minucius Augurinus","",-75,"","citizen.png");
addPerson("NUMI3511","Gaius Numitorius","",-75,"","citizen.png");
addPerson("MINU3567","Lucius Minucius","",-75,"","citizen.png");
addPerson("CALP3632","Publius Calpurnius","",-75,"","citizen.png");
addPerson("ABUR3589","Marcus Aburius Geminus","",-75,"","citizen.png");
addPerson("FABR3601","Marcus Fabrinius","",-75,"","citizen.png");
addPerson("MAEN3640","Publius Maenius Ant[ias]","",-75,"","citizen.png");
addPerson("POST1800","Lucius Postumius Albinus","TRUE",-50,"","citizen.png");
addPerson("OPIM3126","Marcus Opimius","",150,"","citizen.png");
addPerson("ACIL3590","Marcus Acilius","",-75,"","citizen.png");
addPerson("VARG3611","Marcus Vargunteius","",-75,"","citizen.png");
addPerson("DOMI3532","Gnaeus Domitius (Calvinus?, Ahenobarbus?)","",-75,"","citizen.png");
addPerson("CLOE3675","Titus Cloelius","",-75,"","citizen.png");
addPerson("SERV3518","Gaius Servilius Vatia","",-75,"","citizen.png");
addPerson("CASS3492","Gaius Cassius","",-75,"","citizen.png");
addPerson("FABI3622","Numerius Fabius Pictor","",-75,"","citizen.png");
addPerson("QUIN3825","Titus Q(uinctius) (Flamininus)","TRUE",-75,"","citizen.png");
addPerson("PORC3607","Marcus Porcius Laeca","",-75,"","citizen.png");
addPerson("FANN3602","Marcus Fannius","",-50,"","citizen.png");
addPerson("PLUT3513","Gaius Plutius","",-50,"","citizen.png");
addPerson("TULL3610","Marcus Tullius","",-50,"","citizen.png");
addPerson("FURI3603","Marcus Furius Philus","",-50,"","citizen.png");
addPerson("MANL3476","Aulus Manlius Ser[gianus]","",-50,"","citizen.png");
addPerson("ANON3786","Gaius F-","",-50,"","citizen.png");
addPerson("ROSC3830","Lucius R(oscius)","",-50,"","citizen.png");
addPerson("PUBL3505","Gaius Publicius Malleolus","",-80,"","citizen.png");
addPerson("CORN3531","Gnaeus Cornelius Sisenna","",-50,"","citizen.png");
addPerson("POMP3573","Lucius Pomponius","",-50,"","citizen.png");
addPerson("PORC3574","Lucius Porcius Licinus","",-50,"","citizen.png");
addPerson("FULV3536","Gnaeus Fulvius","",-50,"","citizen.png");
addPerson("CALI3598","Marcus Calidius","",-50,"","citizen.png");
addPerson("MANL3476","Aulus Manlius Ser[gianus]","",-50,"","citizen.png");
addPerson("ANON3786","Gaius F-","",-50,"","citizen.png");
addPerson("ROSC3830","Lucius R(oscius)","",-50,"","citizen.png");
addPerson("FULV3536","Gnaeus Fulvius","",-50,"","citizen.png");
addPerson("CALI3598","Marcus Calidius","",-50,"","citizen.png");
addPerson("CORN3527","? Cornelius Cethegus","",-50,"","citizen.png");
addPerson("CIPI3600","Marcus Cipius","",-50,"","citizen.png");
addPerson("FONT3500","Gaius Fonteius","",-50,"","citizen.png");
addPerson("AEMI3617","Manius Aemilius Lepidus","TRUE",-50,"","citizen.png");
addPerson("CORN3527","? Cornelius Cethegus","",-50,"","citizen.png");
addPerson("CIPI3600","Marcus Cipius","",-50,"","citizen.png");
addPerson("FONT3500","Gaius Fonteius","",-50,"","citizen.png");
addPerson("AEMI3617","Manius Aemilius Lepidus","TRUE",-50,"","citizen.png");
addPerson("CORN3529","Gnaeus Cornelius Blasio","",-50,"","citizen.png");
addPerson("CAES3549","Lucius Caesius","",-50,"","citizen.png");
addPerson("Q[UI3680","Tiberius Q[uinctius]","",-50,"","citizen.png");
addPerson("CORN3529","Gnaeus Cornelius Blasio","",-50,"","citizen.png");
addPerson("CAES3549","Lucius Caesius","",-50,"","citizen.png");
addPerson("Q[UI3680","Tiberius Q[uinctius]","",-50,"","citizen.png");
addPerson("MEMM1714","Lucius Memmius","",-50,"","citizen.png");
addPerson("MEMM1714","Lucius Memmius","",-50,"","citizen.png");
addPerson("FONT3619","Manius Fonteius","",-50,"","citizen.png");
addPerson("FONT3619","Manius Fonteius","",-50,"","citizen.png");
addPerson("SULP3520","Gaius Sulpicius Galba","",-50,"","citizen.png");
addPerson("MEMM1714","Lucius Memmius","",-50,"","citizen.png");
addPerson("HOST3559","Lucius Hostilius Tubulus","",-50,"","citizen.png");
addPerson("THOR2034","Lucius Thorius Balbus","",-79,"","citizen.png");
addPerson("FABI3499","Gaius Fabius Hadrianus","",-50,"","citizen.png");
addPerson("CASS3550","Lucius Cassius Caecianus","",-50,"","citizen.png");
addPerson("IULI3561","Lucius Iulius","",-50,"","citizen.png");
addPerson("LUCI3604","Marcus Lucilius Rufus","",-50,"","citizen.png");
addPerson("SERV3608","Marcus Servilius","",-50,"","citizen.png");
addPerson("SERV3645","Publius Servilius Rullus","",-50,"","citizen.png");
addPerson("CORN3780","Publius Cornelius Lentulus","",-50,"","citizen.png");
addPerson("POMP3572","Lucius Pomponius Molo","",-25,"","citizen.png");
addPerson("ALLI3488","Gaius Allius Bala","",-25,"","citizen.png");
addPerson("IUNI3538","Decimus Iunius Silanus","",-25,"","citizen.png");
addPerson("TITI3663","Quintus Titius (Mutto)","",-25,"","citizen.png");
addPerson("PORC3599","Marcus Porcius Cato","",-25,"","citizen.png");
addPerson("TITU2076","Lucius Titurius Sabinus","",0,"","citizen.png");
addPerson("RUBR3576","Lucius Rubrius Dossenus","",-25,"","citizen.png");
addPerson("GARG3542","Gaius Gargonius","",-25,"","citizen.png");
addPerson("OGUL3625","? Ogul[nius]","",-25,"","citizen.png");
addPerson("IULI3562","Lucius Iulius Bursio","",-25,"","citizen.png");
addPerson("FONT3620","Manius Fonteius","",-25,"","citizen.png");
addPerson("MAMI3506","Gaius Mamilius Limetanus","",-25,"","citizen.png");
addPerson("CREP3635","Publius Crepusius","",-25,"","citizen.png");
addPerson("POST3478","Aulus Postumius Albinus","",-25,"","citizen.png");
addPerson("MARI3507","Gaius Marius Capito","",-25,"","citizen.png");
addPerson("VOLU3586","Lucius Volumnius Strabo","",-25,"","citizen.png");
addPerson("NAEV3509","Gaius Naevius Balbus","",-25,"","citizen.png");
addPerson("PAPI3569","Lucius Papius","",-25,"","citizen.png");
addPerson("CASS3551","Lucius Cassius Longinus","",-25,"","citizen.png");
addPerson("VOLT3612","Marcus Volteius","",-25,"","citizen.png");
addPerson("SATR3643","Publius Satrienus","",-25,"","citizen.png");
addPerson("LUCR3563","Lucius Lucretius Trio","",-25,"","citizen.png");
addPerson("RUST3577","Lucius Rustius","",-25,"","citizen.png");
addPerson("EGNA3176","Gaius Egnatius Maximus","",-25,"","citizen.png");
addPerson("FARS3557","Lucius Farsuleius Mensor","",-25,"","citizen.png");
addPerson("COSS3554","Lucius Cossutius Sabula","",0,"","citizen.png");
addPerson("POST3792","Gaius Postumius AT or TA","",0,"","citizen.png");
addPerson("POMP3661","Quintus Pomponius Rufus","",0,"","citizen.png");
addPerson("CREP3653","Quintus Crepereius Rocus","",0,"","citizen.png");
addPerson("AXIU3547","Lucius Axius Naso","",0,"","citizen.png");
addPerson("AQUI3618","Manius Aquillius Crassus","",0,"","citizen.png");
addPerson("MUCI2191","Publius Mucius Scaevola","",-57,"","citizen.png");
addPerson("POMP3660","Quintus Pomponius Musa","",0,"","citizen.png");
addPerson("CONS3495","Gaius Considius Nonianus","",0,"","citizen.png");
addPerson("SERV3517","Gaius Servilius","",0,"","citizen.png");
addPerson("FONT3636","Publius Fonteius Capito","",0,"","citizen.png");
addPerson("VALE3615","Marcus Valerius Messalla","",0,"","citizen.png");
addPerson("ACIL3616","Manius Acilius","",25,"","citizen.png");
addPerson("SICI3662","Quintus Sicinius","",25,"","citizen.png");
addPerson("LICI3474","Aulus Licinius Nerva","",25,"","citizen.png");
addPerson("ANTI3490","Gaius Antius Restio","",25,"","citizen.png");
addPerson("CONS3496","Gaius Considius Paetus","",25,"","citizen.png");
addPerson("PAPI3570","Lucius Papius Celsus","",25,"","citizen.png");
addPerson("LOLL2890","Lucius Lollius Palicanus","",25,"","citizen.png");
addPerson("SEPU3644","Publius Sepullius Macer","",25,"","citizen.png");
addPerson("METT2367","Marcus Mettius","",25,"","citizen.png");
addPerson("ACCO3630","Publius Accoleius Lariscolus","",25,"","citizen.png");
addPerson("PETI3648","? Petillius Capitolinus","",25,"","citizen.png");
addPerson("NUMO3512","Gaius Numonius Vaala","",25,"","citizen.png");
addPerson("SERV3581","Lucius Servius Rufus","",25,"","citizen.png");
addPerson("ARRI3592","Marcus Arrius Secundus","",25,"","citizen.png");
addPerson("PINA3670","Lucius Pinarius Scarpus","",25,"","citizen.png");
addPerson("ANTO2503","Decimus Antonius","",0,"","citizen.png");
addPerson("VALE0132","Manius Valerius (Maximus)","TRUE",-463,"","citizen.png");
addPerson("PUBL0635","Titus Publilius","",-295,"","citizen.png");
addPerson("GENU0633","Gaius Genucius (Augurinus)","",-295,"","citizen.png");
addPerson("MINU0634","Marcus Minucius Faesus","",-250,"","citizen.png");
addPerson("MAMI0740","Quintus Mamilius Turrinus","",-200,"","citizen.png");
addPerson("MAMI0740","Quintus Mamilius Turrinus","",-200,"","citizen.png");
addPerson("IULI4658","Gaius Iulius","TRUE",-200,"","citizen.png");
addPerson("FABI1053","Quintus Fabius Maximus","TRUE",-196,"","citizen.png");
addPerson("CORN1285","Publius Cornelius Scipio","TRUE",-150,"","citizen.png");
addPerson("VETU1337","Tiberius Veturius Gracchus","",-100,"","citizen.png");
addPerson("COEL4647","Gaius Coelius Caldus","",-25,"","citizen.png");
addPerson("FONT1867","? Fonteius","",-25,"","citizen.png");
addPerson("UTTI2978","? Uttiedius Afer","",-29,"","citizen.png");
addPerson("IUNI2747","Marcus Iunius Silanus","TRUE",0,"","citizen.png");
addPerson("APPU2927","Sextus Appuleius","",0,"","citizen.png");
addPerson("IUNI2929","Lucius Iunius Silanus","TRUE",-12,"","citizen.png");
addPerson("IUNI2747","Marcus Iunius Silanus","TRUE",0,"","citizen.png");
addPerson("TULL2563","Marcus Tullius Cicero","",0,"","citizen.png");
addPerson("VERS5107","? Versius","",-71,"","citizen.png");
addPerson("MAEC2148","? Maecenas","",-71,"","citizen.png");
addPerson("PAPI4577","Lucius Papirius Potamo","",0,"","citizen.png");
addPerson("VERS5107","? Versius","",-71,"","citizen.png");
addPerson("MAEC2148","? Maecenas","",-71,"","citizen.png");
addPerson("FULV3694","Quintus Fulvius (Nobilior?)","",-50,"","citizen.png");
addPerson("ANON3116","#NAME?","",-150,"","citizen.png");
addPerson("LUCI1785","Gaius (Lucilius) Hirrus","",-50,"","citizen.png");
addPerson("LUCI1785","Gaius (Lucilius) Hirrus","",-50,"","citizen.png");
addPerson("POPI3790","Marcus Popillius Laenas","",-25,"","citizen.png");
addPerson("ATIL2246","Publius Atilius","",0,"","citizen.png");
addPerson("OCTA2243","Lucius Octavius","",0,"","citizen.png");
addPerson("POMP2252","Marcus Pomponius","",0,"","citizen.png");
addPerson("ATIL2246","Publius Atilius","",0,"","citizen.png");
addPerson("POMP2252","Marcus Pomponius","",0,"","citizen.png");
addPerson("OCTA2243","Lucius Octavius","",0,"","citizen.png");
addPerson("ATIL2246","Publius Atilius","",0,"","citizen.png");
addPerson("POMP2252","Marcus Pomponius","",0,"","citizen.png");
addPerson("OCTA2243","Lucius Octavius","",0,"","citizen.png");
addPerson("ALFI3317","Publius Alf(ius) or Alf(enus) Primus","",50,"","citizen.png");
addPerson("NUNN3753","Gaius Nunnuleius Nudus","",50,"","citizen.png");
addPerson("POBL3801","Quintus Poblicius","",25,"","citizen.png");
addPerson("PUBL2623","Marcus Publicius","",25,"","citizen.png");
addPerson("FLAV2744","Gaius Flavius Hemicillus","",-42,"","citizen.png");
addPerson("FLAV2744","Gaius Flavius Hemicillus","",-42,"","citizen.png");
addPerson("PLAU2923","Gaius Plautius Rufus","",25,"","citizen.png");
addPerson("RESI3827","Titus Resius","",25,"","citizen.png");
addPerson("PULL5085","Lucius Pullienus","",-25,"","citizen.png");
addPerson("AEBU5086","Manius Aebutius","",-25,"","citizen.png");
addPerson("SALV5087","Publius Salvienus","",-25,"","citizen.png");
addPerson("OTAC5088","Lucius Otacilius","",-25,"","citizen.png");
addPerson("PACC5092","Lucius Paccius Capito","",25,"","citizen.png");
addPerson("FURI5093","Aulus Furius Tertius","",25,"","citizen.png");
addPerson("AMPI5094","? Ampius Menas","",25,"","citizen.png");
addPerson("FIRM3466","Lucius Firmius","",25,"","citizen.png");
addPerson("TERE2544","? (Terentius) Varro","",25,"","citizen.png");
addPerson("POMP2253","Gnaeus Pompeius Magnus","",-45,"","citizen.png");
addPerson("PUBL2623","Marcus Publicius","",25,"","citizen.png");
addPerson("MINA2613","Marcus Minatius Sabinus","",25,"","citizen.png");
addPerson("POMP2253","Gnaeus Pompeius Magnus","",-45,"","citizen.png");
addPerson("MINA2613","Marcus Minatius Sabinus","",25,"","citizen.png");
addPerson("PUBL2623","Marcus Publicius","",25,"","citizen.png");
addPerson("NASI2852","Quintus Nasidius","",25,"","citizen.png");
addPerson("IUNI3114","Lucius Iunius","",0,"","citizen.png");
addPerson("FLAV2744","Gaius Flavius Hemicillus","",-42,"","citizen.png");
addPerson("PEDA2751","? (Pedanius) Costa","",25,"","citizen.png");
addPerson("NASI2852","Quintus Nasidius","",25,"","citizen.png");
addPerson("PEDA2751","? (Pedanius) Costa","",25,"","citizen.png");
addPerson("FLAV2744","Gaius Flavius Hemicillus","",-42,"","citizen.png");
addPerson("SALV2788","Quintus Salvidienus Rufus","",-40,"","citizen.png");
addPerson("POR-3791","Decius Por-","",25,"","citizen.png");
addPerson("LICI3837","? Licinius Sacer(dos)","",25,"","citizen.png");
addPerson("TREB3859","? Trebonius","",25,"","citizen.png");
addPerson("POR-3791","Decius Por-","",25,"","citizen.png");
addPerson("LICI3837","? Licinius Sacer(dos)","",25,"","citizen.png");
addPerson("TREB3859","? Trebonius","",25,"","citizen.png");
addPerson("LOLL2890","Lucius Lollius Palicanus","",25,"","citizen.png");
addPerson("IUNI2747","Marcus Iunius Silanus","TRUE",0,"","citizen.png");
addPerson("COSS3484","Gaius Cossutius Maridianus","",25,"","citizen.png");
addPerson("AEMI3543","Lucius Aemilius Buca","",25,"","citizen.png");
addPerson("EQUI1803","Lucius Equitius","",-100,"","citizen.png");
addPerson("COSC3553","Lucius Cosconius","",-50,"","citizen.png");
addPerson("AURE3596","Marcus Aurelius Scaurus","",-50,"","citizen.png");
addPerson("BRAI1839","Quintus Braitius Sura","",-25,"","citizen.png");
addPerson("BRAI1839","Quintus Braitius Sura","",-25,"","citizen.png");
addPerson("BRAI1839","Quintus Braitius Sura","",-25,"","citizen.png");
addPerson("BRAI1839","Quintus Braitius Sura","",-25,"","citizen.png");
addPerson("BRAI1839","Quintus Braitius Sura","",-25,"","citizen.png");
addPerson("BRAI1839","Quintus Braitius Sura","",-25,"","citizen.png");
addPerson("BRAI1839","Quintus Braitius Sura","",-25,"","citizen.png");
addPerson("BRAI1839","Quintus Braitius Sura","",-25,"","citizen.png");
addPerson("VEHI3844","Lucius Vehilius","",25,"","citizen.png");
addPerson("ANON3457","Marcus -","",-50,"","citizen.png");
addPerson("CORN2071","Publius Cornelius Lentulus","TRUE",0,"","citizen.png");
addPerson("CORN2071","Publius Cornelius Lentulus","TRUE",0,"","citizen.png");
addPerson("CALP2274","Gnaeus Calpurnius Piso","",-64,"","citizen.png");
addPerson("CALP2274","Gnaeus Calpurnius Piso","",-64,"","citizen.png");
addPerson("LAEL2775","Decimus Laelius Balbus","",-42,"","citizen.png");
addPerson("PACC3764","? Pacceius","",50,"","citizen.png");
addPerson("PACC3767","Gaius Paccius Balbus","",50,"","citizen.png");
addPerson("BAEB3099","Quintus Baebius","",-50,"","citizen.png");
addPerson("ANON1697","Gaius - Aarcellus (or Marcellus)","",-50,"","citizen.png");
addPerson("ANON1697","Gaius - Aarcellus (or Marcellus)","",-50,"","citizen.png");
addPerson("TERE2544","? (Terentius) Varro","",25,"","citizen.png");
addPerson("MINA2613","Marcus Minatius Sabinus","",25,"","citizen.png");
addPerson("MINA2613","Marcus Minatius Sabinus","",25,"","citizen.png");
addPerson("LICI2727","Publius Licinius","",25,"","citizen.png");
addPerson("IUNI2747","Marcus Iunius Silanus","TRUE",0,"","citizen.png");
addPerson("IUNI2747","Marcus Iunius Silanus","TRUE",0,"","citizen.png");
addPerson("CORN2816","Gaius Cornelius Gallus","",-26,"","citizen.png");
addPerson("NUMI2703","? (Numisius) Nucula","",25,"","citizen.png");
addPerson("ANON2705","? - Cafo","",25,"","citizen.png");
addPerson("SCRI3103","Lucius (Scribonius) Libo","",25,"","citizen.png");
addPerson("PUBL3068","Quintus (Publicius) Mall(eolus)","",25,"","citizen.png");
addPerson("IUNI2747","Marcus Iunius Silanus","TRUE",0,"","citizen.png");
addPerson("PUPI3822","Aulus Pupius Rufus","",25,"","citizen.png");
addPerson("VIBI3525","Gaius Vibius Varus","",25,"","citizen.png");
addPerson("MUSS3568","Lucius Mussidius Longus","",25,"","citizen.png");
addPerson("CLOD3633","Publius Clodius","",25,"","citizen.png");
addPerson("LIVI2629","Lucius Livineius Regulus","",25,"","citizen.png");
addPerson("CENT0861","Gaius Centenius","",-217,"","citizen.png");
addPerson("POMP0906","? Pomponius","",-150,"","citizen.png");
addPerson("PLEM1026","Quintus Pleminius","",-150,"","citizen.png");
addPerson("OPPI2109","Gaius Oppius","",0,"","citizen.png");
addPerson("ARRU3094","Gaius Arruntanus Balbus","",25,"","citizen.png");
addPerson("SERV4584","Publius Servilius","",0,"","citizen.png");
addPerson("VETT4157","? Vettius Chilo","",0,"","citizen.png");
addPerson("VIBI4598","Lucius Vibius","",0,"","citizen.png");
addPerson("ANTI4568","Gaius Antistius","",0,"","citizen.png");
addPerson("TULL4586","Lucius Tullius","",0,"","citizen.png");
addPerson("CUSP4592","Publius Cuspius","",0,"","citizen.png");
addPerson("RUPI4583","Publius Rupilius","",0,"","citizen.png");
addPerson("IUNI4046","Marcus Iunius Brutus","",-25,"","citizen.png");
addPerson("APPI4569","? Appicius","",-25,"","citizen.png");
addPerson("ERUC4575","Gaius Erucius","",-25,"","citizen.png");
addPerson("COMI4573","Publius Cominius","",0,"","citizen.png");
addPerson("COMI4574","Gaius Cominius","",0,"","citizen.png");
addPerson("POMP0918","Titus Pomponius Veientanus","",-150,"","citizen.png");
addPerson("POST4224","Marcus Postumius Pyrgensis","",-150,"","citizen.png");
addPerson("CAEL4391","Marcus Caelius","",0,"","citizen.png");
addPerson("PAPI4590","Marcus Papirius","",0,"","citizen.png");
addPerson("CARP4572","Lucius Carpinatius","",0,"","citizen.png");
addPerson("HERE3972","Sextus Herennius","",-25,"","citizen.png");
addPerson("VERR4587","Quintus Verres","",0,"","citizen.png");
addPerson("PUBL4580","? Publicius","",0,"","citizen.png");
addPerson("IUNI4144","Publius Iunius","",-25,"","citizen.png");
addPerson("RABO4581","Lucius Rabonius","",-25,"","citizen.png");
addPerson("TETT4585","Publius Tettius","",-25,"","citizen.png");
addPerson("TADI4595","Quintus Tadius","",-25,"","citizen.png");
addPerson("PERP4593","Titus Perperna Quadra","",25,"","citizen.png");
addPerson("FABI0715","Caeso Fabius","",-200,"","citizen.png");
addPerson("ANTI0842","Marcus Antistius","",-82,"","citizen.png");
addPerson("HERE0848","Gaius Herennius","",-150,"","citizen.png");
addPerson("ANTI3290","Lucius Antistius","",-150,"","citizen.png");
addPerson("STAT0915","Quintus Statorius","",-150,"","citizen.png");
addPerson("AQUI0972","Publius Aquillius","",-150,"","citizen.png");
addPerson("OGUL0973","Marcus Ogulnius","",-196,"","citizen.png");
addPerson("LICI1002","Lucius Licinius Pollio","",-150,"","citizen.png");
addPerson("SERG1049","Lucius Sergius","TRUE",-150,"","citizen.png");
addPerson("FABI1050","Lucius Fabius","TRUE",-150,"","citizen.png");
addPerson("CALP1096","Lucius Calpurnius","",-125,"","citizen.png");
addPerson("ANTO1181","Quintus Antonius","",-125,"","citizen.png");
addPerson("CLAU1184","Marcus Claudius Lepidus","",-125,"","citizen.png");
addPerson("AURE1198","Marcus Aurelius Cotta","",-125,"","citizen.png");
addPerson("IUVE1236","Lucius Iuventius Thalna","",-125,"","citizen.png");
addPerson("QUIN1237","Titus Quinctilius Varus","TRUE",-125,"","citizen.png");
addPerson("AURE1260","Lucius Aurelius Cotta","",-125,"","citizen.png");
addPerson("MINU1259","Lucius Minucius Thermus","",-100,"","citizen.png");
addPerson("AEBU1306","? Aebutius","",-125,"","citizen.png");
addPerson("MINU1259","Lucius Minucius Thermus","",-100,"","citizen.png");
addPerson("CARV1376","Spurius Carvilius","",-100,"","citizen.png");
addPerson("FULV1247","Marcus Fulvius Flaccus","",-100,"","citizen.png");
addPerson("FULV1378","Marcus Fulvius (Nobilior)","",-100,"","citizen.png");
addPerson("MARC1379","Publius Marcius Rex","",-100,"","citizen.png");
addPerson("FULV1247","Marcus Fulvius Flaccus","",-100,"","citizen.png");
addPerson("CANI1392","Marcus Caninius Rebilus","",-150,"","citizen.png");
addPerson("BAEB1400","Lucius Baebius","",-100,"","citizen.png");
addPerson("BAEB1400","Lucius Baebius","",-100,"","citizen.png");
addPerson("ANTO1421","Aulus Antonius","",-100,"","citizen.png");
addPerson("CORN1423","Lucius Cornelius Lentulus","TRUE",-100,"","citizen.png");
addPerson("DECI1405","Publius Decius Subolo","",-100,"","citizen.png");
addPerson("PERP1426","Marcus Perperna","",-100,"","citizen.png");
addPerson("PETI1427","Lucius Petillius","",-100,"","citizen.png");
addPerson("POMP1428","? Pompeius","",-100,"","citizen.png");
addPerson("PAPI1538","Gaius Papirius (Carbo)","",-75,"","citizen.png");
addPerson("FLAV1946","Gaius Flavius Fimbria","",-85,"","citizen.png");
addPerson("RUTI3834","? Rutilius","",-25,"","citizen.png");
addPerson("CALI3420","? Calidius","",-25,"","citizen.png");
addPerson("GABI1962","Aulus Gabinius","",-25,"","citizen.png");
addPerson("PACC2017","? Paccianus","",-25,"","citizen.png");
addPerson("PACC2017","? Paccianus","",-25,"","citizen.png");
addPerson("VOLS3841","? Volscius","",0,"","citizen.png");
addPerson("SEXT2186","? Sextilius","",0,"","citizen.png");
addPerson("SEXT2186","? Sextilius","",0,"","citizen.png");
addPerson("OCTA2243","Lucius Octavius","",0,"","citizen.png");
addPerson("METT2367","Marcus Mettius","",25,"","citizen.png");
addPerson("VALE2368","Gaius Valerius Procillus","",0,"","citizen.png");
addPerson("SILI2411","Titus Silius","",0,"","citizen.png");
addPerson("TERR2412","Titus Terrasidius","",0,"","citizen.png");
addPerson("TREB2413","Marcus Trebius Gallus","",0,"","citizen.png");
addPerson("VELA2414","Quintus Velanius","",0,"","citizen.png");
addPerson("ROSC3828","? Roscius","",0,"","citizen.png");
addPerson("ROSC3829","? Roscius","",0,"","citizen.png");
addPerson("ANTO2503","Decimus Antonius","",0,"","citizen.png");
addPerson("MAGI2552","Numerius Magius","",25,"","citizen.png");
addPerson("CLOD2577","Aulus Clodius","",25,"","citizen.png");
addPerson("PLOT2579","Marcus Plotius","",25,"","citizen.png");
addPerson("POST2580","Aulus Postumius Albinus","",25,"","citizen.png");
addPerson("TIBU2582","Marcus Tiburtius","",25,"","citizen.png");
addPerson("VIBU2566","Lucius Vibullius Rufus","",25,"","citizen.png");
addPerson("CAEC2813","? Caecina","",25,"","citizen.png");
addPerson("CISP2626","? Cispius Laevus","",25,"","citizen.png");
addPerson("ANON2736","? - Nerva","",25,"","citizen.png");
addPerson("VOLU2737","? Volumnius Flaccus","",25,"","citizen.png");
addPerson("DELL2810","Quintus Dellius","",25,"","citizen.png");
addPerson("MANI2811","? Manius","",25,"","citizen.png");
addPerson("COCC2863","Lucius Cocceius Nerva","",25,"","citizen.png");
addPerson("CAEC2813","? Caecina","",25,"","citizen.png");
addPerson("SENT3258","Gaius Sentius Saturninus","",-25,"","citizen.png");
addPerson("DELL2810","Quintus Dellius","",25,"","citizen.png");
addPerson("COCC2863","Lucius Cocceius Nerva","",25,"","citizen.png");
addPerson("CALP2739","Lucius Calpurnius Bibulus","",-32,"","citizen.png");
addPerson("DELL2810","Quintus Dellius","",25,"","citizen.png");
addPerson("DELL2810","Quintus Dellius","",25,"","citizen.png");
addPerson("DELL2810","Quintus Dellius","",25,"","citizen.png");
addPerson("ATIU2510","Quintus Atius Varus","",25,"","citizen.png");
addPerson("OPPI2869","Marcus Oppius Capito","",25,"","citizen.png");
addPerson("GRAN2610","? Granius Petro","",-46,"","citizen.png");
addPerson("VIBI2848","? Vibius Maximus","",25,"","citizen.png");
addPerson("AQUI4636","Lucius Aquinius","",-325,"","citizen.png");
addPerson("HERE4657","Marcus Herennius Siculus","",-121,"","citizen.png");
addPerson("AEMI4634","? Aemilius Potensis","",-50,"","citizen.png");
addPerson("COEL4646","Publius Coelius Etruscus","",-51,"","citizen.png");
addPerson("POST4668","Gaius Postumius","",-25,"","citizen.png");
addPerson("VOLC4678","Gaius Volcatius","",-44,"","citizen.png");
addPerson("SPUR4671","? Spurinna","",25,"","citizen.png");
addPerson("VOLC4678","Gaius Volcatius","",-44,"","citizen.png");
addPerson("AEMI0785","Manius Aemilius (Lepidus)","TRUE",-211,"","citizen.png");
addPerson("LIVI0786","Marcus Livius Salinator","",-175,"","citizen.png");
addPerson("FULV1286","Quintus Fulvius Nobilior","",-75,"","citizen.png");
addPerson("COEL3129","Lucius Coelius Caldus","",-25,"","citizen.png");
addPerson("ATIL0887","Marcus Atilius","",-150,"","citizen.png");
addPerson("PORC1271","Lucius Porcius Licinus","",-100,"","citizen.png");
addPerson("IUNI1543","Decimus Iunius Silanus","",-75,"","citizen.png");
addPerson("BATT4637","? Battakes","",-50,"","citizen.png");
addPerson("GENU4656","? Genucius","",-25,"","citizen.png");
addPerson("GENU4656","? Genucius","",-25,"","citizen.png");
addPerson("ANON4638","? - Calliphana","",-25,"","citizen.png");
addPerson("CASP4641","? Casponia Maxima","",-25,"","citizen.png");
addPerson("FAVO4651","? Favonia","",-25,"","citizen.png");
addPerson("CANT0892","Lucius Cantilius","",-216,"","citizen.png");
addPerson("CANT0892","Lucius Cantilius","",-216,"","citizen.png");
addPerson("TERE4675","Gnaeus Terentius","",-125,"","citizen.png");
addPerson("TERE4675","Gnaeus Terentius","",-125,"","citizen.png");
addPerson("FUND4653","Lucius Fundilius","",-56,"","citizen.png");
addPerson("FURI0831","? Furius Bibaculus","TRUE",-221,"","citizen.png");
addPerson("GENU4655","Gaius Genucius","",-25,"","citizen.png");
addPerson("LICI4659","Gaius Licinius Sacerdos","",-125,"","citizen.png");
addPerson("MANI4660","? Manius","",-250,"","citizen.png");
addPerson("MEFU3472","Titus Mefu-","",-150,"","citizen.png");
addPerson("PUPI0864","Gaius Pupius","",-150,"","citizen.png");
addPerson("OPPI0084","? Oppia","TRUE",-483,"","citizen.png");
addPerson("ORBI0112","? Orbinia","",-472,"","citizen.png");
addPerson("POST0291","? Postumia","TRUE",-350,"","citizen.png");
addPerson("MINU0545","? Minucia","TRUE",-337,"","citizen.png");
addPerson("SEXT0693","? Sextilia","",-273,"","citizen.png");
addPerson("SEXT0693","? Sextilia","",-273,"","citizen.png");
addPerson("CAPA4639","? Caparronia","",-266,"","citizen.png");
addPerson("SEXT0693","? Sextilia","",-273,"","citizen.png");
addPerson("CAPA4639","? Caparronia","",-266,"","citizen.png");
addPerson("TUCC0802","? Tuccia (or Luccia)","",-175,"","citizen.png");
addPerson("TUCC0802","? Tuccia (or Luccia)","",-175,"","citizen.png");
addPerson("OPIM0894","? Opimia","",-216,"","citizen.png");
addPerson("FLOR0893","? Floronia","",-216,"","citizen.png");
addPerson("OPIM0894","? Opimia","",-216,"","citizen.png");
addPerson("FLOR0893","? Floronia","",-216,"","citizen.png");
addPerson("AEMI3132","? Aemilia","TRUE",-125,"","citizen.png");
addPerson("AEMI4633","? Aemilia","TRUE",-125,"","citizen.png");
addPerson("CLAU1560","? Claudia","TRUE",-75,"","citizen.png");
addPerson("CLAU1560","? Claudia","TRUE",-75,"","citizen.png");
addPerson("AEMI1698","? Aemilia","TRUE",-114,"","citizen.png");
addPerson("LICI1646","? Licinia","",-113,"","citizen.png");
addPerson("MARC1700","? Marcia","",-113,"","citizen.png");
addPerson("LICI1646","? Licinia","",-113,"","citizen.png");
addPerson("AEMI1698","? Aemilia","TRUE",-114,"","citizen.png");
addPerson("MARC1700","? Marcia","",-113,"","citizen.png");
addPerson("PERP2200","? Perpennia","",0,"","citizen.png");
addPerson("POPI2201","? Popillia","",0,"","citizen.png");
addPerson("FONT2202","? Fonteia","",0,"","citizen.png");
addPerson("FONT2202","? Fonteia","",0,"","citizen.png");
addPerson("LICI2122","? Licinia","",0,"","citizen.png");
addPerson("FABI2121","? Fabia","TRUE",0,"","citizen.png");
addPerson("ARRU2199","? Arruntia","",0,"","citizen.png");
addPerson("FABI2121","? Fabia","TRUE",0,"","citizen.png");
addPerson("LICI2122","? Licinia","",0,"","citizen.png");
addPerson("PERP2200","? Perpennia","",0,"","citizen.png");
addPerson("POPI2201","? Popillia","",0,"","citizen.png");
addPerson("ARRU2199","? Arruntia","",0,"","citizen.png");
addPerson("OCCI2857","? Occia","",19,"","citizen.png");
addPerson("SULP4672","? Sulpicia","TRUE",-225,"","citizen.png");
addPerson("SULP4674","Titus Sulpicius","",25,"","citizen.png");
addPerson("USIA4676","? Usia Prima","",25,"","citizen.png");
addPerson("VINU4677","Lucius Vinulleius Lucullus","",25,"","citizen.png");
addPerson("POET4617","Gaius Poetelius","",-250,"","citizen.png");
addPerson("NUNN4616","Aulus Nunnius","",-25,"","citizen.png");
addPerson("ANTI4614","? Antistius","",-350,"","citizen.png");
addPerson("POMP4615","? Pompilius","",-350,"","citizen.png");
addPerson("MEGA3100","Gaius Megabocchus","",0,"","citizen.png");
addPerson("POMP2253","Gnaeus Pompeius Magnus","",-45,"","citizen.png");
addPerson("POMP2253","Gnaeus Pompeius Magnus","",-45,"","citizen.png");
addPerson("LURI2776","Marcus Lurius","",25,"","citizen.png");
addPerson("FUFI2807","Gaius Fuficius Fango","",-40,"","citizen.png");
addPerson("LURI2776","Marcus Lurius","",25,"","citizen.png");
addPerson("SALV2788","Quintus Salvidienus Rufus","",-40,"","citizen.png");
addPerson("TURI2790","Marcus Turius","",25,"","citizen.png");
addPerson("FUFI2807","Gaius Fuficius Fango","",-40,"","citizen.png");
addPerson("LURI2776","Marcus Lurius","",25,"","citizen.png");
addPerson("SALV2788","Quintus Salvidienus Rufus","",-40,"","citizen.png");
addPerson("ATIU2849","Marcus Atius Balbus","",25,"","citizen.png");
addPerson("CALP2739","Lucius Calpurnius Bibulus","",-32,"","citizen.png");
addPerson("FUFI2888","? Fufius Geminus","",25,"","citizen.png");
addPerson("ANON2889","? - Hiero","",25,"","citizen.png");
addPerson("LOLL2890","Lucius Lollius Palicanus","",25,"","citizen.png");
addPerson("CALP2739","Lucius Calpurnius Bibulus","",-32,"","citizen.png");
addPerson("FUFI2888","? Fufius Geminus","",25,"","citizen.png");
addPerson("LOLL2890","Lucius Lollius Palicanus","",25,"","citizen.png");
addPerson("CALP2739","Lucius Calpurnius Bibulus","",-32,"","citizen.png");
addPerson("CALP2739","Lucius Calpurnius Bibulus","",-32,"","citizen.png");
addPerson("DIDI2919","Quintus Didius","",25,"","citizen.png");
addPerson("LURI2776","Marcus Lurius","",25,"","citizen.png");
addPerson("OCTA2920","Marcus Octavius","",25,"","citizen.png");
addPerson("PINA2795","Lucius Pinarius Scarpus","",25,"","citizen.png");
addPerson("AFRA5043","Gaius Afranius","",-100,"","citizen.png");
addPerson("CARV5044","Marcus Carvilius Spoletinus","",-100,"","citizen.png");
addPerson("LICI5046","? Licinius Lucullus","",-50,"","citizen.png");
addPerson("ACIL1880","Lucius Acilius","",-25,"","citizen.png");
addPerson("VALE5047","Publius Valerius","",0,"","citizen.png");
addPerson("AMPI5094","? Ampius Menas","",25,"","citizen.png");
addPerson("HORA2731","Quintus Horatius Flaccus","",-8,"","citizen.png");
addPerson("SEXT2969","Publius Sextius","",-25,"","citizen.png");
addPerson("PLIN2875","Lucius Plinius Rufus","",25,"","citizen.png");
addPerson("VALE0060","? Valeria","TRUE",-425,"","citizen.png");
addPerson("AEMI0981","Marcus Aemilius Papus","TRUE",-210,"","citizen.png");
addPerson("AEMI0981","Marcus Aemilius Papus","TRUE",-210,"","citizen.png");
addPerson("CLOE4644","Publius Cloelius Siculus","TRUE",-175,"","citizen.png");
addPerson("FABI4650","Servius Fabius Pictor","TRUE",-75,"","citizen.png");
addPerson("SULP4673","? Sulpicius","TRUE",0,"","citizen.png");
addPerson("LAEN3119","Quintus Laenius","",25,"","citizen.png");
addPerson("MANL0536","Titus Manlius (Torquatus)","TRUE",-340,"","citizen.png");
addPerson("DASI0844","? Dasius","",-150,"","citizen.png");
addPerson("STAT0886","Marius Statilius","",-150,"","citizen.png");
addPerson("ATIL0900","Lucius Atilius","",-150,"","citizen.png");
addPerson("VALE0901","Lucius Valerius Antias","",-150,"","citizen.png");
addPerson("VALE0902","Publius Valerius Flaccus","TRUE",-150,"","citizen.png");
addPerson("LIVI0909","Marcus Livius (Macatus)","",-150,"","citizen.png");
addPerson("LIVI0909","Marcus Livius (Macatus)","",-150,"","citizen.png");
addPerson("PINA0917","Lucius Pinarius","",-150,"","citizen.png");
addPerson("POMP0918","Titus Pomponius Veientanus","",-150,"","citizen.png");
addPerson("ATIN0935","Marcus Atinius","",-150,"","citizen.png");
addPerson("LIVI0909","Marcus Livius (Macatus)","",-150,"","citizen.png");
addPerson("LIVI0909","Marcus Livius (Macatus)","",-150,"","citizen.png");
addPerson("PERS5042","Gaius Persius","",-150,"","citizen.png");
addPerson("LIVI0909","Marcus Livius (Macatus)","",-150,"","citizen.png");
addPerson("QUIN0974","Decimus Quinctius","",-210,"","citizen.png");
addPerson("LIVI0909","Marcus Livius (Macatus)","",-150,"","citizen.png");
addPerson("ARRE1003","Lucius Arrenius","",-150,"","citizen.png");
addPerson("AULI1004","Manius Aulius","",-208,"","citizen.png");
addPerson("CLAU1018","Publius Claudius","",-150,"","citizen.png");
addPerson("AMPI1069","Gaius Ampius","",-201,"","citizen.png");
addPerson("IUNI1123","Marcus Iunius Silanus","",-196,"","citizen.png");
addPerson("SEMP1124","Titus Sempronius Gracchus","",-196,"","citizen.png");
addPerson("ATIN1145","Marcus Atinius","",-194,"","citizen.png");
addPerson("SEMP1146","Publius Sempronius","",-194,"","citizen.png");
addPerson("ORFI1174","Sextus Orfidienus","",-125,"","citizen.png");
addPerson("ORBI3761","Lucius Orbius","",-125,"","citizen.png");
addPerson("SCRI1269","Gaius Scribonius","",-100,"","citizen.png");
addPerson("COMI1292","? Cominius","",-125,"","citizen.png");
addPerson("PORC1271","Lucius Porcius Licinus","",-100,"","citizen.png");
addPerson("SALV1435","? Salvius","",-100,"","citizen.png");
addPerson("BAEB1450","Aulus Baebius","",-100,"","citizen.png");
addPerson("GABI1451","? Gabinius","",-100,"","citizen.png");
addPerson("TITI1612","Gaius Titius","",-75,"","citizen.png");
addPerson("AEMI1668","? Aemilius","",-50,"","citizen.png");
addPerson("POST1671","? Postumius","",-50,"","citizen.png");
addPerson("MAGI3461","? Magius","",-50,"","citizen.png");
addPerson("MAGI3461","? Magius","",-50,"","citizen.png");
addPerson("GRAT1786","Marcus Gratidius","",-102,"","citizen.png");
addPerson("CALP1797","Quintus Calpurnius Piso","",-50,"","citizen.png");
addPerson("AEFI3300","Marcus Aeficius Calvinus","",50,"","citizen.png");
addPerson("PETR4559","Lucius Petronius","",-25,"","citizen.png");
addPerson("AUFI2147","? Aufidius","",0,"","citizen.png");
addPerson("MAEC2148","? Maecenas","",-71,"","citizen.png");
addPerson("CORN3438","Gaius Cornelius","",0,"","citizen.png");
addPerson("CORN3438","Gaius Cornelius","",0,"","citizen.png");
addPerson("IUNI4145","? Iunius","",0,"","citizen.png");
addPerson("IUNI2189","Publius Iunius","",0,"","citizen.png");
addPerson("PEDU2317","Lucius Peducaeus","",0,"","citizen.png");
addPerson("SILI2411","Titus Silius","",0,"","citizen.png");
addPerson("ATRI2453","Quintus Atrius","",0,"","citizen.png");
addPerson("ROSC3828","? Roscius","",0,"","citizen.png");
addPerson("ROSC3829","? Roscius","",0,"","citizen.png");
addPerson("EGNA2472","? Egnatius","",0,"","citizen.png");
addPerson("VOLC2474","Gaius Volcacius Tullus","",25,"","citizen.png");
addPerson("SCAP2490","Marcus Scaptius","",0,"","citizen.png");
addPerson("MATI4576","Publius Matinius","",0,"","citizen.png");
addPerson("GAVI2529","Lucius Gavius","",25,"","citizen.png");
addPerson("SCAP2527","Marcus Scaptius","",25,"","citizen.png");
addPerson("ATTI2555","Gaius Attius Paelignus","",25,"","citizen.png");
addPerson("FLAM2557","? Flaminius Flamma","",25,"","citizen.png");
addPerson("GALL2558","Gaius Gallonius","",25,"","citizen.png");
addPerson("MINU2561","? Minucius","",25,"","citizen.png");
addPerson("TULL2563","Marcus Tullius Cicero","",0,"","citizen.png");
addPerson("VIBI2565","? Vibius","",25,"","citizen.png");
addPerson("VIBU2566","Lucius Vibullius Rufus","",25,"","citizen.png");
addPerson("ACCI4566","Gaius Accius Paelignus","",25,"","citizen.png");
addPerson("CASS2591","Lucius Cassius","",25,"","citizen.png");
addPerson("MINU2561","? Minucius","",25,"","citizen.png");
addPerson("OPIM2593","Marcus Opimius","",25,"","citizen.png");
addPerson("OTAC2594","? Otacilius","",25,"","citizen.png");
addPerson("POMP2595","Gnaeus Pompeius Theophanes","",25,"","citizen.png");
addPerson("STAB2596","Lucius Staberius","",25,"","citizen.png");
addPerson("TULL2563","Marcus Tullius Cicero","",0,"","citizen.png");
addPerson("IUST3743","? Iustuleius","",-48,"","citizen.png");
addPerson("TETT2606","Titus Tettius","",25,"","citizen.png");
addPerson("RUFI3832","? Rufio or Rufinus","",25,"","citizen.png");
addPerson("ANON2625","Quintus - Aquila","",25,"","citizen.png");
addPerson("CORN2627","Publius Cornelius","",25,"","citizen.png");
addPerson("MINU2630","Gaius Minucius Reginus","",25,"","citizen.png");
addPerson("RUBR2631","Marcus Rubrius","",25,"","citizen.png");
addPerson("CAUC2651","Publius Caucilius","",25,"","citizen.png");
addPerson("CLOD2652","? Clodius Arquitius","",25,"","citizen.png");
addPerson("MUNA2653","Lucius Munatius Flaccus","",25,"","citizen.png");
addPerson("VIBI2654","Lucius Vibius Paciacus (or Pacciaecus)","",25,"","citizen.png");
addPerson("RUTI2656","Marcus Rutilius","",25,"","citizen.png");
addPerson("CLOD2760","Gaius Clodius","",25,"","citizen.png");
addPerson("FABI2761","? Fabius","",25,"","citizen.png");
addPerson("SEXT2763","Lucius Sextilius Rufus","",25,"","citizen.png");
addPerson("TULL2563","Marcus Tullius Cicero","",0,"","citizen.png");
addPerson("VOLU2765","Publius Volumnius Eutrapelus","",25,"","citizen.png");
addPerson("CLOD2792","Gaius Clodius","",25,"","citizen.png");
addPerson("FABI2761","? Fabius","",25,"","citizen.png");
addPerson("ANON2794","? - Helix","",25,"","citizen.png");
addPerson("PINA2795","Lucius Pinarius Scarpus","",25,"","citizen.png");
addPerson("ROSC2797","? Roscius","",-42,"","citizen.png");
addPerson("TULL2563","Marcus Tullius Cicero","",0,"","citizen.png");
addPerson("CURT2817","Quintus Curtius Salassus","",-41,"","citizen.png");
addPerson("SERV2835","Publius Servilius Rullus","",25,"","citizen.png");
addPerson("IULI2843","Gaius Iulius Demetrius","",25,"","citizen.png");
addPerson("MACH2856","? Machaeras","",25,"","citizen.png");
addPerson("MACH3459","? Macheras","",25,"","citizen.png");
addPerson("ANON5051","? - Sabinus","",25,"","citizen.png");
addPerson("MARI2881","Titus Marius Siculus","",25,"","citizen.png");
addPerson("MIND2882","Marcus Mindius Marcellus","",25,"","citizen.png");
addPerson("CURI2892","? Curius","",-35,"","citizen.png");
addPerson("POMP2832","Gnaeus Pompeius Menodorus","",-35,"","citizen.png");
addPerson("HORT5052","Quintus Hortensius","",25,"","citizen.png");
addPerson("PROC5053","Gaius Proculeius","",25,"","citizen.png");
addPerson("IULI5055","Gaius Iulius Papius","",25,"","citizen.png");
addPerson("ANON5051","? - Sabinus","",25,"","citizen.png");
addPerson("DUIL0514","Gaius Duillius","",-300,"","citizen.png");
addPerson("PAPI0516","Marcus Papirius","TRUE",-300,"","citizen.png");
addPerson("VALE0537","Marcus Valerius","TRUE",-275,"","citizen.png");
addPerson("CORN0606","Publius Cornelius","TRUE",-250,"","citizen.png");
addPerson("CORN0678","? Cornelius","",-225,"","citizen.png");
addPerson("VALE0679","Lucius Valerius (Flaccus)","TRUE",-282,"","citizen.png");
addPerson("CORN1282","Lucius Cornelius Dolabella","TRUE",-125,"","citizen.png");
addPerson("CORN1282","Lucius Cornelius Dolabella","TRUE",-125,"","citizen.png");
addPerson("CORN1282","Lucius Cornelius Dolabella","TRUE",-125,"","citizen.png");
addPerson("FURI1308","Gaius Furius","TRUE",-100,"","citizen.png");
addPerson("CORN0752","Publius Cornelius Sulla","TRUE",-200,"","citizen.png");
addPerson("QUIN3824","Lucius Quinctius","TRUE",-226,"","citizen.png");
addPerson("SULP0816","Quintus Sulpicius","TRUE",-150,"","citizen.png");
addPerson("CLAU4642","Gaius Claudius","TRUE",-150,"","citizen.png");
addPerson("CLAU4642","Gaius Claudius","TRUE",-150,"","citizen.png");
addPerson("CORN3133","Publius Cornelius Scipio","",-125,"","citizen.png");
addPerson("CORN4649","Publius Cornelius Scipio","TRUE",-170,"","citizen.png");
addPerson("CLOE4644","Publius Cloelius Siculus","TRUE",-175,"","citizen.png");
addPerson("VETU1031","Tiberius Veturius Philo","TRUE",-204,"","citizen.png");
addPerson("POST1800","Lucius Postumius Albinus","TRUE",-50,"","citizen.png");
addPerson("CORN2416","Lucius Cornelius Lentulus","TRUE",0,"","citizen.png");
addPerson("MULV0772","Marcus Mulvius","",-175,"","citizen.png");
addPerson("LOLL0773","Gnaeus Lollius","",-175,"","citizen.png");
addPerson("SEXT0774","Lucius Sextilius","",-175,"","citizen.png");
addPerson("VILL0950","Publius Villius","",-150,"","citizen.png");
addPerson("FURI0831","? Furius Bibaculus","TRUE",-221,"","citizen.png");
addPerson("PAPI5170","Publius Papirius Maso","",-150,"","citizen.png");
addPerson("HERE0848","Gaius Herennius","",-150,"","citizen.png");
addPerson("PAPI0849","Gaius Papirius Maso","TRUE",-150,"","citizen.png");
addPerson("CORN0851","Gnaeus Cornelius Scipio","TRUE",-150,"","citizen.png");
addPerson("SERV1070","Publius Servilius","TRUE",-150,"","citizen.png");
addPerson("HOST1071","Lucius Hostilius Cato","",-125,"","citizen.png");
addPerson("SERV1070","Publius Servilius","TRUE",-150,"","citizen.png");
addPerson("HOST1071","Lucius Hostilius Cato","",-125,"","citizen.png");
addPerson("AEBU0218","Marcus Aebutius Helva","TRUE",-375,"","citizen.png");
addPerson("FULV0595","Publius Fulvius Longus","",-250,"","citizen.png");
addPerson("ANON1147","Quintus -","",-125,"","citizen.png");
addPerson("SALO1148","Gaius Salonius","",-100,"","citizen.png");
addPerson("IUNI1149","Decimus Iunius Brutus","",-125,"","citizen.png");
addPerson("FULV1247","Marcus Fulvius Flaccus","",-100,"","citizen.png");
addPerson("POPI1284","Publius Popillius Laenas","",-125,"","citizen.png");
addPerson("DECI1405","Publius Decius Subolo","",-100,"","citizen.png");
addPerson("PAPI0008","Gaius Papirius","TRUE",-450,"","citizen.png");
addPerson("PAPI0194","Marcus Papirius (Crassus)","TRUE",-375,"","citizen.png");
addPerson("CORN3782","Publius Cornelius Scapula","",-301,"","citizen.png");
addPerson("FABI0403","Gaius Fabius Dorsuo","TRUE",-325,"","citizen.png");
addPerson("PAPI4662","Gaius Papirius Maso","TRUE",250,"","citizen.png");
addPerson("MAMI0740","Quintus Mamilius Turrinus","",-200,"","citizen.png");
addPerson("PAPI4662","Gaius Papirius Maso","TRUE",250,"","citizen.png");
addPerson("SCAN0890","Publius Scantinius","",-216,"","citizen.png");
addPerson("SCAN0890","Publius Scantinius","",-216,"","citizen.png");
addPerson("SULP1060","Gaius Sulpicius Galba","TRUE",-199,"","citizen.png");
addPerson("SERV1266","Marcus Servilius","",-100,"","citizen.png");
addPerson("MUCI2191","Publius Mucius Scaevola","",-57,"","citizen.png");
addPerson("MUCI2191","Publius Mucius Scaevola","",-57,"","citizen.png");
addPerson("QUIN2192","Sextus Quinctilius (Varus)","TRUE",-64,"","citizen.png");
addPerson("PINA2373","Lucius Pinarius Natta","TRUE",-56,"","citizen.png");
addPerson("TULL2563","Marcus Tullius Cicero","",0,"","citizen.png");
addPerson("APPU1347","Quintus Appuleius","",-100,"","citizen.png");
addPerson("CAEC1348","Marcus Caecilius","",-100,"","citizen.png");
addPerson("SALO1148","Gaius Salonius","",-100,"","citizen.png");
addPerson("MUNA1350","Gaius Munatius","",-100,"","citizen.png");
addPerson("ANIC1860","Quintus Anicius","",-25,"","citizen.png");
addPerson("DECI1861","Gaius Decidius Rufus","",-25,"","citizen.png");
addPerson("EGNA1863","Gaius Egnatius Rufus","",-25,"","citizen.png");
addPerson("ANON1864","Gaius -","",-25,"","citizen.png");
addPerson("SEMP1436","Titus Sempronius Musca","",-100,"","citizen.png");
addPerson("NAEV1437","Lucius Naevius Balbus","",-100,"","citizen.png");
addPerson("APPU1438","Gaius Appuleius Saturninus","",-100,"","citizen.png");
addPerson("PUBL4669","? Publicia","",-154,"","citizen.png");
addPerson("PUBL4669","? Publicia","",-154,"","citizen.png");
addPerson("PUBL2197","? Publicia","",0,"","citizen.png");
addPerson("PESC1516","Gaius Pescennius","",-100,"","citizen.png");
addPerson("CALP3121","Lucius Calpurnius","",50,"","citizen.png");
addPerson("LUCI3120","Gaius Lucilius (Hirrus?)","",25,"","citizen.png");



addOffice("Tribunus Militum","HERM0011",-508,-508);
addOffice("Tribunus Militum","LARC0012",-508,-508);
addOffice("Tribunus Militum","LUCR0010",-508,-508);
addOffice("Tribunus Militum","VALE0013",-508,-508);
addOffice("Tribunus Militum","POST0027",-504,-504);
addOffice("Tribunus Militum","VERG0019",-486,-486);
addOffice("Tribunus Militum","VALE0067",-486,-486);
addOffice("Tribunus Militum","COMI0021",-486,-486);
addOffice("Tribunus Militum","TULL0069",-486,-486);
addOffice("Tribunus Militum","VETU0007",-486,-486);
addOffice("Tribunus Militum","SEMP0028",-486,-486);
addOffice("Tribunus Militum","VERG0035",-486,-486);
addOffice("Tribunus Militum","VERG0031",-486,-486);
addOffice("Tribunus Militum","MUCI0065",-486,-486);
addOffice("Tribunus Militum","FURI0059",-486,-486);
addOffice("Tribunus Militum","MANI0191",-449,-449);
addOffice("Tribunus Militum","OPPI0192",-449,-449);
addOffice("Tribunus Militum","CORN0239",-437,-437);
addOffice("Tribunus Militum","MANL0497",-361,-361);
addOffice("Tribunus Militum","VALE0522",-349,-349);
addOffice("Tribunus Militum","DECI0515",-343,-343);
addOffice("Tribunus Militum","SALO0531",-342,-342);
addOffice("Tribunus Militum","QUIN0568",-326,-326);
addOffice("Tribunus Militum","COMI0569",-325,-325);
addOffice("Tribunus Militum","PUBL0578",-321,-321);
addOffice("Tribunus Militum","CLAU0591",-313,-313);
addOffice("Tribunus Militum","CLAU0591",-312,-312);
addOffice("Tribunus Militum","LAET0599",-312,-312);
addOffice("Tribunus Militum","CLAU0591",-311,-311);
addOffice("Tribunus Militum","FABI0642",-297,-297);
addOffice("Tribunus Militum","VALE0570",-297,-297);
addOffice("Tribunus Militum","CLAU0714",-264,-264);
addOffice("Tribunus Militum","CAEC0725",-260,-260);
addOffice("Tribunus Militum","CAED0729",-258,-258);
addOffice("Tribunus Militum","CALP0730",-258,-258);
addOffice("Tribunus Militum","LABE0731",-258,-258);
addOffice("Tribunus Militum","NAUT0736",-256,-256);
addOffice("Tribunus Militum","AURE0748",-252,-252);
addOffice("Tribunus Militum","CASS0749",-252,-252);
addOffice("Tribunus Militum","VALE0750",-252,-252);
addOffice("Tribunus Militum","FABI0712",-238,-238);
addOffice("Tribunus Militum","FABI0712",-237,-237);
addOffice("Tribunus Militum","CLAU0858",-216,-216);
addOffice("Tribunus Militum","CORN0877",-216,-216);
addOffice("Tribunus Militum","CORN0878",-216,-216);
addOffice("Tribunus Militum","FABI0879",-216,-216);
addOffice("Tribunus Militum","OCTA0880",-216,-216);
addOffice("Tribunus Militum","PUBL0881",-216,-216);
addOffice("Tribunus Militum","SEMP0882",-216,-216);
addOffice("Tribunus Militum","PORC0907",-214,-214);
addOffice("Tribunus Militum","CLAU0908",-212,-212);
addOffice("Tribunus Militum","VALE0930",-212,-212);
addOffice("Tribunus Militum","MARC0943",-211,-211);
addOffice("Tribunus Militum","PERS5042",-210,-210);
addOffice("Tribunus Militum","FURI0967",-210,-210);
addOffice("Tribunus Militum","DECI0990",-209,-209);
addOffice("Tribunus Militum","SEMP0991",-209,-209);
addOffice("Tribunus Militum","HELV1093",-209,-209);
addOffice("Tribunus Militum","LICI3749",-209,-209);
addOffice("Tribunus Militum","CLAU0997",-208,-208);
addOffice("Tribunus Militum","MANL0998",-208,-208);
addOffice("Tribunus Militum","QUIN0999",-208,-208);
addOffice("Tribunus Militum","AURU1013",-207,-207);
addOffice("Tribunus Militum","CLAU1014",-207,-207);
addOffice("Tribunus Militum","VERG1015",-207,-207);
addOffice("Tribunus Militum","CORN1009",-205,-205);
addOffice("Tribunus Militum","MATI1027",-205,-205);
addOffice("Tribunus Militum","OCTA1028",-205,-205);
addOffice("Tribunus Militum","SERG1029",-205,-205);
addOffice("Tribunus Militum","COSC1045",-203,-203);
addOffice("Tribunus Militum","HELV1046",-203,-203);
addOffice("Tribunus Militum","MAEV1047",-203,-203);
addOffice("Tribunus Militum","MINU1064",-202,-202);
addOffice("Tribunus Militum","FURI5165",-201,-201);
addOffice("Tribunus Militum","AEMI1134",-198,-198);
addOffice("Tribunus Militum","CLAU1118",-198,-198);
addOffice("Tribunus Militum","AEMI1134",-197,-197);
addOffice("Tribunus Militum","IUVE1106",-197,-197);
addOffice("Tribunus Militum","LIGU1107",-197,-197);
addOffice("Tribunus Militum","AEMI1134",-196,-196);
addOffice("Tribunus Militum","CLAU1118",-196,-196);
addOffice("Tribunus Militum","CLAU1119",-196,-196);
addOffice("Tribunus Militum","OGUL0973",-196,-196);
addOffice("Tribunus Militum","ATIN1220",-194,-194);
addOffice("Tribunus Militum","MINU1158",-193,-193);
addOffice("Tribunus Militum","MINU1335",-193,-193);
addOffice("Tribunus Militum","GENU1160",-193,-193);
addOffice("Tribunus Militum","MARC1161",-193,-193);
addOffice("Tribunus Militum","MARC1162",-193,-193);
addOffice("Tribunus Militum","PORC0907",-191,-191);
addOffice("Tribunus Militum","PORC0907",-191,-191);
addOffice("Tribunus Militum","AEMI1180",-190,-190);
addOffice("Tribunus Militum","MAEN1225",-182,-182);
addOffice("Tribunus Militum","TERE1075",-182,-182);
addOffice("Tribunus Militum","SULP1173",-181,-181);
addOffice("Tribunus Militum","AURE1260",-181,-181);
addOffice("Tribunus Militum","IULI1265",-181,-181);
addOffice("Tribunus Militum","SERV1266",-181,-181);
addOffice("Tribunus Militum","SULP1267",-181,-181);
addOffice("Tribunus Militum","MAEN1225",-181,-181);
addOffice("Tribunus Militum","TERE1075",-181,-181);
addOffice("Tribunus Militum","POST1420",-180,-180);
addOffice("Tribunus Militum","FULV1281",-180,-180);
addOffice("Tribunus Militum","MAEN1225",-180,-180);
addOffice("Tribunus Militum","TERE1075",-180,-180);
addOffice("Tribunus Militum","AEBU1300",-178,-178);
addOffice("Tribunus Militum","AELI1301",-178,-178);
addOffice("Tribunus Militum","AELI1302",-178,-178);
addOffice("Tribunus Militum","ATIU1303",-178,-178);
addOffice("Tribunus Militum","CASS1304",-178,-178);
addOffice("Tribunus Militum","LICI1305",-178,-178);
addOffice("Tribunus Militum","CLAU1125",-171,-171);
addOffice("Tribunus Militum","CORN1362",-171,-171);
addOffice("Tribunus Militum","MANL1370",-171,-171);
addOffice("Tribunus Militum","MUCI1289",-171,-171);
addOffice("Tribunus Militum","POMP1372",-171,-171);
addOffice("Tribunus Militum","CASS1304",-170,-170);
addOffice("Tribunus Militum","DIGI1388",-170,-170);
addOffice("Tribunus Militum","CASS1304",-169,-169);
addOffice("Tribunus Militum","POPI1283",-169,-169);
addOffice("Tribunus Militum","CASS1304",-168,-168);
addOffice("Tribunus Militum","CORN1415",-168,-168);
addOffice("Tribunus Militum","CORN1396",-168,-168);
addOffice("Tribunus Militum","POST1416",-168,-168);
addOffice("Tribunus Militum","POST1278",-168,-168);
addOffice("Tribunus Militum","SULP1417",-168,-168);
addOffice("Tribunus Militum","SULP1173",-168,-168);
addOffice("Tribunus Militum","POST1420",-167,-167);
addOffice("Tribunus Militum","CORN1396",-167,-167);
addOffice("Tribunus Militum","SULP1417",-167,-167);
addOffice("Tribunus Militum","SULP1173",-167,-167);
addOffice("Tribunus Militum","CORN1504",-151,-151);
addOffice("Tribunus Militum","CORN1506",-150,-150);
addOffice("Tribunus Militum","CORN1396",-150,-150);
addOffice("Tribunus Militum","CORN1504",-149,-149);
addOffice("Tribunus Militum","CORN1506",-149,-149);
addOffice("Tribunus Militum","CORN1513",-149,-149);
addOffice("Tribunus Militum","CORN1504",-148,-148);
addOffice("Tribunus Militum","FANN1523",-141,-141);
addOffice("Tribunus Militum","OPPI1571",-140,-140);
addOffice("Tribunus Militum","MEMM1595",-134,-134);
addOffice("Tribunus Militum","RUTI1596",-134,-134);
addOffice("Tribunus Militum","SEMP1597",-134,-134);
addOffice("Tribunus Militum","SEMP1598",-134,-134);
addOffice("Tribunus Militum","MEMM1595",-133,-133);
addOffice("Tribunus Militum","RUTI1596",-133,-133);
addOffice("Tribunus Militum","SEMP1597",-133,-133);
addOffice("Tribunus Militum","SEMP1598",-133,-133);
addOffice("Tribunus Militum","MARI1660",-124,-124);
addOffice("Tribunus Militum","LIVI1756",-105,-105);
addOffice("Tribunus Militum","LUSI1769",-104,-104);
addOffice("Tribunus Militum","CORN1746",-103,-103);
addOffice("Tribunus Militum","FONT3101",-101,-101);
addOffice("Tribunus Militum","OCTA4682",-100,-31);
addOffice("Tribunus Militum","IULI1799",-100,-100);
addOffice("Tribunus Militum","IULI1798",-100,-100);
addOffice("Tribunus Militum","IULI1798",-99,-99);
addOffice("Tribunus Militum","SERT1818",-97,-97);
addOffice("Tribunus Militum","SERT1818",-96,-96);
addOffice("Tribunus Militum","SERT1818",-95,-95);
addOffice("Tribunus Militum","SERT1818",-94,-94);
addOffice("Tribunus Militum","SERT1818",-93,-93);
addOffice("Tribunus Militum","HORT1902",-89,-89);
addOffice("Tribunus Militum","LICI1903",-89,-89);
addOffice("Tribunus Militum","ATTI1904",-89,-89);
addOffice("Tribunus Militum","MALO1905",-89,-89);
addOffice("Tribunus Militum","AEMI1993",-89,-89);
addOffice("Tribunus Militum","ANNI1908",-89,-89);
addOffice("Tribunus Militum","AURE1909",-89,-89);
addOffice("Tribunus Militum","VOLU1910",-89,-89);
addOffice("Tribunus Militum","POMP1911",-89,-89);
addOffice("Tribunus Militum","RABI1912",-89,-89);
addOffice("Tribunus Militum","AEBU1913",-89,-89);
addOffice("Tribunus Militum","TEIE1914",-89,-89);
addOffice("Tribunus Militum","FUND1915",-89,-89);
addOffice("Tribunus Militum","MAIA1916",-89,-89);
addOffice("Tribunus Militum","CORN2064",-89,-89);
addOffice("Tribunus Militum","CORN2007",-89,-89);
addOffice("Tribunus Militum","CORN1979",-89,-89);
addOffice("Tribunus Militum","PETR4559",-87,-87);
addOffice("Tribunus Militum","ANNI1944",-87,-87);
addOffice("Tribunus Militum","CLAU1945",-87,-87);
addOffice("Tribunus Militum","MARC1947",-87,-87);
addOffice("Tribunus Militum","ERUC1961",-86,-86);
addOffice("Tribunus Militum","GABI1962",-86,-86);
addOffice("Tribunus Militum","MINU1934",-86,-86);
addOffice("Tribunus Militum","VALE1992",-82,-82);
addOffice("Tribunus Militum","OCTA2057",-80,-80);
addOffice("Tribunus Militum","VISE2027",-80,-80);
addOffice("Tribunus Militum","VISE2027",-79,-79);
addOffice("Tribunus Militum","MEMM2020",-79,-79);
addOffice("Tribunus Militum","CAEC2040",-78,-78);
addOffice("Tribunus Militum","MEMM2020",-78,-78);
addOffice("Tribunus Militum","VALE1992",-78,-78);
addOffice("Tribunus Militum","MEMM2020",-77,-77);
addOffice("Tribunus Militum","VALE1992",-77,-77);
addOffice("Tribunus Militum","VALE1992",-76,-76);
addOffice("Tribunus Militum","VALE2107",-75,-75);
addOffice("Tribunus Militum","VALE2107",-74,-74);
addOffice("Tribunus Militum","POPI2159",-72,-72);
addOffice("Tribunus Militum","OCTA2104",-72,-72);
addOffice("Tribunus Militum","SERV3917",-72,-72);
addOffice("Tribunus Militum","IULI1957",-71,-71);
addOffice("Tribunus Militum","OCTA2104",-71,-71);
addOffice("Tribunus Militum","CAEC2480",-70,-70);
addOffice("Tribunus Militum","RAEC4582",-70,-70);
addOffice("Tribunus Militum","CREP2184",-69,-69);
addOffice("Tribunus Militum","CASS2257",-69,-69);
addOffice("Tribunus Militum","TREM3401",-69,-69);
addOffice("Tribunus Militum","MUNA5059",-67,-67);
addOffice("Tribunus Militum","PORC2241",-67,-67);
addOffice("Tribunus Militum","OCTA2243",-67,-67);
addOffice("Tribunus Militum","IUVE2308",-64,-64);
addOffice("Tribunus Militum","SEST2296",-64,-64);
addOffice("Tribunus Militum","CLOD2219",-64,-64);
addOffice("Tribunus Militum","PETR2280",-64,-64);
addOffice("Tribunus Militum","MEVU2299",-63,-63);
addOffice("Tribunus Militum","CORN2300",-63,-63);
addOffice("Tribunus Militum","PLAN2312",-62,-62);
addOffice("Tribunus Militum","SILI2411",-57,-57);
addOffice("Tribunus Militum","VOLU2491",-56,-56);
addOffice("Tribunus Militum","CURT2445",-54,-54);
addOffice("Tribunus Militum","LABE2446",-54,-54);
addOffice("Tribunus Militum","PETR2447",-54,-54);
addOffice("Tribunus Militum","ORFI3762",-54,-54);
addOffice("Tribunus Militum","TREB4537",-53,-53);
addOffice("Tribunus Militum","PETR2447",-53,-53);
addOffice("Tribunus Militum","ARIS2485",-52,-52);
addOffice("Tribunus Militum","FUFI2501",-51,-51);
addOffice("Tribunus Militum","LUCI2502",-51,-51);
addOffice("Tribunus Militum","FUFI2501",-50,-50);
addOffice("Tribunus Militum","SCAP2527",-50,-50);
addOffice("Tribunus Militum","PUBL5060",-49,-49);
addOffice("Tribunus Militum","PUBL5061",-49,-49);
addOffice("Tribunus Militum","PUBL5062",-49,-49);
addOffice("Tribunus Militum","ATIL4620",-49,-49);
addOffice("Tribunus Militum","POMP5089",-49,-49);
addOffice("Tribunus Militum","IULI2374",-49,-49);
addOffice("Tribunus Militum","SERV2547",-49,-49);
addOffice("Tribunus Militum","TEUT2548",-49,-49);
addOffice("Tribunus Militum","VULT2549",-49,-49);
addOffice("Tribunus Militum","SENT3258",-49,-49);
addOffice("Tribunus Militum","CLUS3431",-49,-49);
addOffice("Tribunus Militum","POMP3777",-49,-49);
addOffice("Tribunus Militum","ATIL4620",-49,-49);
addOffice("Tribunus Militum","FELG4550",-48,-48);
addOffice("Tribunus Militum","GRAN4551",-48,-48);
addOffice("Tribunus Militum","SACR4553",-48,-48);
addOffice("Tribunus Militum","TUTI4477",-48,-48);
addOffice("Tribunus Militum","SEPT2242",-48,-48);
addOffice("Tribunus Militum","TITI2576",-48,-48);
addOffice("Tribunus Militum","AVIE2614",-46,-46);
addOffice("Tribunus Militum","FONT2615",-46,-46);
addOffice("Tribunus Militum","MARC2389",-46,-46);
addOffice("Tribunus Militum","TITI2576",-46,-46);
addOffice("Tribunus Militum","TITI2617",-46,-46);
addOffice("Tribunus Militum","MARC2643",-45,-45);
addOffice("Tribunus Militum","CEST5063",-44,-44);
addOffice("Tribunus Militum","CEST5063",-43,-43);
addOffice("Tribunus Militum","CATI2730",-43,-43);
addOffice("Tribunus Militum","HORA2731",-43,-43);
addOffice("Tribunus Militum","POPI2732",-43,-43);
addOffice("Tribunus Militum","PINA3108",-43,-31);
addOffice("Tribunus Militum","CAEC3335",-43,-31);
addOffice("Tribunus Militum","FIRM3466",-43,-43);
addOffice("Tribunus Militum","POMP5124",-42,-42);
addOffice("Tribunus Militum","HORA2731",-42,-42);
addOffice("Tribunus Militum","NONI5064",-41,-41);
addOffice("Tribunus Militum","POMP5124",-41,-41);
addOffice("Tribunus Militum","FERI2809",-41,-41);
addOffice("Tribunus Militum","MAEN5065",-40,-40);
addOffice("Tribunus Militum","OFIL5066",-39,-39);
addOffice("Tribunus Militum","FLAV2870",-36,-36);
addOffice("Tribunus Militum","OFIL2871",-36,-36);
addOffice("Tribunus Militum","MARI2881",-35,-35);
addOffice("Tribunus Militum","BAEB2921",-32,-32);
addOffice("Tribunus Militum","CAER2945",-32,-32);
addOffice("Tribunus Militum","CINC5067",-30,-30);
addOffice("Tribunus Militum","ANON5068",-30,-30);
addOffice("Tribunus Militum","ACLU5069",-30,-30);
addOffice("Tribunus Militum","PAPI3771",-30,-30);
addOffice("Tribunus Militum","QUIN5070",-30,-30);
addOffice("Tribunus Militum","SERG5071",-30,-30);
addOffice("Tribunus Militum","TITI5072",-30,-30);
addOffice("Tribunus Militum","VIBI5074",-30,-30);
addOffice("Triumvir Agris Iudicandis Assignandis","SEMP1525",-133,-133);
addOffice("Triumvir Agris Iudicandis Assignandis","SEMP1598",-133,-133);
addOffice("Triumvir Agris Iudicandis Assignandis","CLAU1452",-133,-133);
addOffice("Triumvir Agris Iudicandis Assignandis","LICI1500",-133,-133);
addOffice("Triumvir Agris Iudicandis Assignandis","SEMP1598",-132,-132);
addOffice("Triumvir Agris Iudicandis Assignandis","CLAU1452",-132,-132);
addOffice("Triumvir Agris Iudicandis Assignandis","LICI1500",-132,-132);
addOffice("Triumvir Agris Iudicandis Assignandis","SEMP1598",-131,-131);
addOffice("Triumvir Agris Iudicandis Assignandis","CLAU1452",-131,-131);
addOffice("Triumvir Agris Iudicandis Assignandis","LICI1500",-131,-131);
addOffice("Triumvir Agris Iudicandis Assignandis","SEMP1598",-130,-130);
addOffice("Triumvir Agris Iudicandis Assignandis","FULV1624",-130,-130);
addOffice("Triumvir Agris Iudicandis Assignandis","PAPI1623",-130,-130);
addOffice("Triumvir Agris Iudicandis Assignandis","SEMP1598",-129,-129);
addOffice("Triumvir Agris Iudicandis Assignandis","FULV1624",-129,-129);
addOffice("Triumvir Agris Iudicandis Assignandis","PAPI1623",-129,-129);
addOffice("Triumvir Agris Dandis","SEMP1598",-121,-121);
addOffice("Triumvir Agris Dandis","FULV1624",-121,-121);
addOffice("Triumvir Agris Dandis","PAPI1623",-121,-121);
addOffice("Triumvir Agris Dandis","SULP1662",-121,-121);
addOffice("Triumvir Agris Dandis","PAPI1623",-121,-121);
addOffice("Triumvir Agris Dandis","CALP1663",-121,-121);
addOffice("Decemvir Stlitibus Iudicandis","CORN1506",-151,-151);
addOffice("Decemvir Stlitibus Iudicandis","LIVI1756",-101,-101);
addOffice("Decemvir Stlitibus Iudicandis","IULI1799",-100,-100);
addOffice("Decemvir Stlitibus Iudicandis","PAQU3458",-24,-24);
addOffice("Triumvir Monetalis","DOMI1763",-116,-116);
addOffice("Triumvir Monetalis","CURT3654",-116,-116);
addOffice("Triumvir Monetalis","CURT3654",-115,-115);
addOffice("Triumvir Monetalis","DOMI1763",-115,-115);
addOffice("Triumvir Monetalis","URBI3664",-111,-111);
addOffice("Triumvir Monetalis","CLAU1753",-110,-110);
addOffice("Triumvir Monetalis","URBI3664",-110,-110);
addOffice("Triumvir Monetalis","CLAU1753",-109,-109);
addOffice("Triumvir Monetalis","HOSI3501",-68,-68);
addOffice("Triumvir Monetalis","FURI3558",-63,-63);
addOffice("Triumvir Monetalis","CARI3674",-46,-46);
addOffice("Triumvir Monetalis","CORD2946",-46,-46);
addOffice("Decemvir Agris Dandis Attribuendis Iudicandis","IULI1798",-103,-103);
addOffice("Decemvir Agris Dandis Attribuendis Iudicandis","IULI1799",-100,-100);
addOffice("Iudex Quaestionis","CLAU1753",-98,-98);
addOffice("Iudex Quaestionis","ANTI1932",-85,-85);
addOffice("Iudex Quaestionis","FANN1972",-85,-85);
addOffice("Iudex Quaestionis","IUNI2068",-74,-74);
addOffice("Iudex Quaestionis","CURT2152",-70,-70);
addOffice("Iudex Quaestionis","FLAM2229",-66,-66);
addOffice("Iudex Quaestionis","PLAE2169",-66,-66);
addOffice("Iudex Quaestionis","VOCO2231",-66,-66);
addOffice("Iudex Quaestionis","IULI1957",-64,-64);
addOffice("Iudex Quaestionis","OCTA2104",-63,-63);
addOffice("Iudex Quaestionis","LICI2331",-59,-59);
addOffice("Iudex Quaestionis","VISE2027",-58,-58);
addOffice("Iudex Quaestionis","DOMI2399",-56,-56);
addOffice("Iudex Quaestionis","APPU2941",-50,-10);
addOffice("Legatus (Ambassador)","LARC0012",-508,-508);
addOffice("Legatus (Ambassador)","HERM0011",-507,-507);
addOffice("Legatus (Ambassador)","VALE0013",-501,-501);
addOffice("Legatus (Ambassador)","VALE0051",-492,-492);
addOffice("Legatus (Ambassador)","GEGA0052",-492,-492);
addOffice("Legatus (Ambassador)","VALE0051",-491,-491);
addOffice("Legatus (Ambassador)","GEGA0052",-491,-491);
addOffice("Legatus (Ambassador)","FABI0124",-466,-466);
addOffice("Legatus (Ambassador)","FABI0124",-458,-458);
addOffice("Legatus (Ambassador)","VOLU0137",-458,-458);
addOffice("Legatus (Ambassador)","POST0126",-458,-458);
addOffice("Legatus (Ambassador)","POST0125",-454,-454);
addOffice("Legatus (Ambassador)","MANL0105",-454,-454);
addOffice("Legatus (Ambassador)","SULP0138",-454,-454);
addOffice("Legatus (Ambassador)","SULP0138",-454,-454);
addOffice("Legatus (Ambassador)","POST0125",-453,-453);
addOffice("Legatus (Ambassador)","MANL0105",-453,-453);
addOffice("Legatus (Ambassador)","SULP0138",-453,-453);
addOffice("Legatus (Ambassador)","SULP0138",-453,-453);
addOffice("Legatus (Ambassador)","POST0125",-452,-452);
addOffice("Legatus (Ambassador)","MANL0105",-452,-452);
addOffice("Legatus (Ambassador)","SULP0138",-452,-452);
addOffice("Legatus (Ambassador)","SULP0138",-452,-452);
addOffice("Legatus (Ambassador)","FULC0233",-438,-438);
addOffice("Legatus (Ambassador)","CLOE0234",-438,-438);
addOffice("Legatus (Ambassador)","ANTI0235",-438,-438);
addOffice("Legatus (Ambassador)","ROSC0236",-438,-438);
addOffice("Legatus (Ambassador)","CORN0330",-398,-398);
addOffice("Legatus (Ambassador)","LICI0354",-398,-398);
addOffice("Legatus (Ambassador)","VALE0301",-398,-398);
addOffice("Legatus (Ambassador)","VALE0306",-398,-398);
addOffice("Legatus (Ambassador)","FABI0322",-398,-398);
addOffice("Legatus (Ambassador)","FABI0400",-398,-398);
addOffice("Legatus (Ambassador)","CORN0330",-397,-397);
addOffice("Legatus (Ambassador)","LICI0354",-397,-397);
addOffice("Legatus (Ambassador)","VALE0306",-397,-397);
addOffice("Legatus (Ambassador)","VALE0301",-397,-397);
addOffice("Legatus (Ambassador)","FABI0322",-397,-397);
addOffice("Legatus (Ambassador)","FABI0400",-397,-397);
addOffice("Legatus (Ambassador)","VALE0306",-394,-394);
addOffice("Legatus (Ambassador)","SERG0371",-394,-394);
addOffice("Legatus (Ambassador)","MANL0332",-394,-394);
addOffice("Legatus (Ambassador)","FABI0396",-391,-391);
addOffice("Legatus (Ambassador)","FABI0322",-391,-391);
addOffice("Legatus (Ambassador)","FABI0400",-391,-391);
addOffice("Legatus (Ambassador)","OGUL0632",-292,-292);
addOffice("Legatus (Ambassador)","FABR0675",-283,-283);
addOffice("Legatus (Ambassador)","POST0609",-282,-282);
addOffice("Legatus (Ambassador)","FABR0675",-280,-280);
addOffice("Legatus (Ambassador)","AEMI0676",-280,-280);
addOffice("Legatus (Ambassador)","CORN0674",-280,-280);
addOffice("Legatus (Ambassador)","FABR0675",-279,-279);
addOffice("Legatus (Ambassador)","AEMI0676",-279,-279);
addOffice("Legatus (Ambassador)","CORN0674",-279,-279);
addOffice("Legatus (Ambassador)","FABR0675",-279,-279);
addOffice("Legatus (Ambassador)","FABI0642",-273,-273);
addOffice("Legatus (Ambassador)","FABI0692",-273,-273);
addOffice("Legatus (Ambassador)","OGUL0632",-273,-273);
addOffice("Legatus (Ambassador)","CORU0799",-230,-230);
addOffice("Legatus (Ambassador)","CORU0800",-230,-230);
addOffice("Legatus (Ambassador)","IUNI0801",-230,-230);
addOffice("Legatus (Ambassador)","FABI0712",-218,-218);
addOffice("Legatus (Ambassador)","FABI0762",-218,-218);
addOffice("Legatus (Ambassador)","LIVI0827",-218,-218);
addOffice("Legatus (Ambassador)","AEMI0826",-218,-218);
addOffice("Legatus (Ambassador)","LICI0840",-218,-218);
addOffice("Legatus (Ambassador)","BAEB0830",-218,-218);
addOffice("Legatus (Ambassador)","FABI0883",-216,-216);
addOffice("Legatus (Ambassador)","ATIL0912",-210,-210);
addOffice("Legatus (Ambassador)","ACIL0968",-210,-210);
addOffice("Legatus (Ambassador)","GENU0969",-210,-210);
addOffice("Legatus (Ambassador)","POET0970",-210,-210);
addOffice("Legatus (Ambassador)","POPI0971",-210,-210);
addOffice("Legatus (Ambassador)","ANTI1000",-208,-208);
addOffice("Legatus (Ambassador)","RAEC1001",-208,-208);
addOffice("Legatus (Ambassador)","MANL0958",-208,-208);
addOffice("Legatus (Ambassador)","POMP1010",-205,-205);
addOffice("Legatus (Ambassador)","CATI0961",-205,-205);
addOffice("Legatus (Ambassador)","VALE0807",-205,-205);
addOffice("Legatus (Ambassador)","CAEC0996",-205,-205);
addOffice("Legatus (Ambassador)","SULP0987",-205,-205);
addOffice("Legatus (Ambassador)","TREM1021",-205,-205);
addOffice("Legatus (Ambassador)","VALE1022",-205,-205);
addOffice("Legatus (Ambassador)","VALE0807",-204,-204);
addOffice("Legatus (Ambassador)","CAEC0996",-204,-204);
addOffice("Legatus (Ambassador)","SULP0987",-204,-204);
addOffice("Legatus (Ambassador)","TREM1021",-204,-204);
addOffice("Legatus (Ambassador)","VALE1022",-204,-204);
addOffice("Legatus (Ambassador)","TERE0818",-203,-203);
addOffice("Legatus (Ambassador)","MAMI0982",-203,-203);
addOffice("Legatus (Ambassador)","AURE0870",-203,-203);
addOffice("Legatus (Ambassador)","CLAU0908",-201,-201);
addOffice("Legatus (Ambassador)","AEMI1067",-201,-201);
addOffice("Legatus (Ambassador)","SEMP0882",-201,-201);
addOffice("Legatus (Ambassador)","AURE0870",-201,-201);
addOffice("Legatus (Ambassador)","CLAU0908",-200,-200);
addOffice("Legatus (Ambassador)","AEMI1067",-200,-200);
addOffice("Legatus (Ambassador)","SEMP0882",-200,-200);
addOffice("Legatus (Ambassador)","AURE0870",-200,-200);
addOffice("Legatus (Ambassador)","TERE0818",-200,-200);
addOffice("Legatus (Ambassador)","LUCR1020",-200,-200);
addOffice("Legatus (Ambassador)","OCTA0880",-200,-200);
addOffice("Legatus (Ambassador)","CLAU0908",-200,-200);
addOffice("Legatus (Ambassador)","AEMI1067",-200,-200);
addOffice("Legatus (Ambassador)","SEMP0882",-200,-200);
addOffice("Legatus (Ambassador)","CLAU0908",-199,-199);
addOffice("Legatus (Ambassador)","AEMI1067",-199,-199);
addOffice("Legatus (Ambassador)","SEMP0882",-199,-199);
addOffice("Legatus (Ambassador)","AELI1006",-196,-196);
addOffice("Legatus (Ambassador)","CAEC0996",-196,-196);
addOffice("Legatus (Ambassador)","CORN0986",-196,-196);
addOffice("Legatus (Ambassador)","STER1086",-196,-196);
addOffice("Legatus (Ambassador)","SULP0936",-196,-196);
addOffice("Legatus (Ambassador)","TERE1075",-196,-196);
addOffice("Legatus (Ambassador)","VILL1034",-196,-196);
addOffice("Legatus (Ambassador)","CORN0877",-196,-196);
addOffice("Legatus (Ambassador)","CORN1023",-196,-196);
addOffice("Legatus (Ambassador)","SERV0919",-195,-195);
addOffice("Legatus (Ambassador)","CLAU0997",-195,-195);
addOffice("Legatus (Ambassador)","TERE1135",-195,-195);
addOffice("Legatus (Ambassador)","VILL1034",-195,-195);
addOffice("Legatus (Ambassador)","AELI1006",-195,-195);
addOffice("Legatus (Ambassador)","SULP0936",-195,-195);
addOffice("Legatus (Ambassador)","CORN0878",-193,-193);
addOffice("Legatus (Ambassador)","CORN1065",-193,-193);
addOffice("Legatus (Ambassador)","MINU1101",-193,-193);
addOffice("Legatus (Ambassador)","SULP0936",-193,-193);
addOffice("Legatus (Ambassador)","VILL1034",-193,-193);
addOffice("Legatus (Ambassador)","AELI1006",-193,-193);
addOffice("Legatus (Ambassador)","CORN0878",-193,-193);
addOffice("Legatus (Ambassador)","SULP0936",-192,-192);
addOffice("Legatus (Ambassador)","VILL1034",-192,-192);
addOffice("Legatus (Ambassador)","AELI1006",-192,-192);
addOffice("Legatus (Ambassador)","QUIN0999",-192,-192);
addOffice("Legatus (Ambassador)","OCTA0880",-192,-192);
addOffice("Legatus (Ambassador)","SERV0919",-192,-192);
addOffice("Legatus (Ambassador)","VILL1034",-192,-192);
addOffice("Legatus (Ambassador)","OCTA0880",-191,-191);
addOffice("Legatus (Ambassador)","QUIN0999",-191,-191);
addOffice("Legatus (Ambassador)","LIVI0952",-190,-190);
addOffice("Legatus (Ambassador)","MINU1062",-189,-189);
addOffice("Legatus (Ambassador)","FURI0967",-189,-189);
addOffice("Legatus (Ambassador)","MINU1064",-189,-189);
addOffice("Legatus (Ambassador)","CLAU1095",-189,-189);
addOffice("Legatus (Ambassador)","CORN1197",-189,-189);
addOffice("Legatus (Ambassador)","CORN1137",-189,-189);
addOffice("Legatus (Ambassador)","IUNI1131",-189,-189);
addOffice("Legatus (Ambassador)","AURU1177",-189,-189);
addOffice("Legatus (Ambassador)","AEMI1134",-189,-189);
addOffice("Legatus (Ambassador)","CORN0986",-189,-189);
addOffice("Legatus (Ambassador)","AELI1057",-189,-189);
addOffice("Legatus (Ambassador)","MINU1062",-188,-188);
addOffice("Legatus (Ambassador)","FURI0967",-188,-188);
addOffice("Legatus (Ambassador)","MINU1064",-188,-188);
addOffice("Legatus (Ambassador)","CLAU1095",-188,-188);
addOffice("Legatus (Ambassador)","CORN1197",-188,-188);
addOffice("Legatus (Ambassador)","CORN1137",-188,-188);
addOffice("Legatus (Ambassador)","IUNI1131",-188,-188);
addOffice("Legatus (Ambassador)","AURU1177",-188,-188);
addOffice("Legatus (Ambassador)","AEMI1134",-188,-188);
addOffice("Legatus (Ambassador)","CORN0986",-188,-188);
addOffice("Legatus (Ambassador)","AELI1057",-188,-188);
addOffice("Legatus (Ambassador)","CORN1016",-186,-186);
addOffice("Legatus (Ambassador)","CAEC0891",-185,-185);
addOffice("Legatus (Ambassador)","BAEB1163",-185,-185);
addOffice("Legatus (Ambassador)","SEMP1182",-185,-185);
addOffice("Legatus (Ambassador)","CLAU1235",-185,-185);
addOffice("Legatus (Ambassador)","CLAU1118",-184,-184);
addOffice("Legatus (Ambassador)","CAEC0891",-184,-184);
addOffice("Legatus (Ambassador)","BAEB1163",-184,-184);
addOffice("Legatus (Ambassador)","SEMP1182",-184,-184);
addOffice("Legatus (Ambassador)","CLAU1235",-184,-184);
addOffice("Legatus (Ambassador)","FURI0967",-183,-183);
addOffice("Legatus (Ambassador)","MINU1062",-183,-183);
addOffice("Legatus (Ambassador)","MANL1204",-183,-183);
addOffice("Legatus (Ambassador)","MARC1205",-183,-183);
addOffice("Legatus (Ambassador)","QUIN0999",-183,-183);
addOffice("Legatus (Ambassador)","CORN1016",-183,-183);
addOffice("Legatus (Ambassador)","CORN1077",-183,-183);
addOffice("Legatus (Ambassador)","ANON1258",-182,-182);
addOffice("Legatus (Ambassador)","POST1172",-175,-175);
addOffice("Legatus (Ambassador)","LAEL0992",-174,-174);
addOffice("Legatus (Ambassador)","VALE1201",-174,-174);
addOffice("Legatus (Ambassador)","DIGI1138",-174,-174);
addOffice("Legatus (Ambassador)","VALE1200",-174,-174);
addOffice("Legatus (Ambassador)","CLAU1118",-174,-174);
addOffice("Legatus (Ambassador)","MEMM1333",-174,-174);
addOffice("Legatus (Ambassador)","POPI1283",-174,-174);
addOffice("Legatus (Ambassador)","CANU1334",-174,-174);
addOffice("Legatus (Ambassador)","MINU1335",-174,-174);
addOffice("Legatus (Ambassador)","CLAU1118",-173,-173);
addOffice("Legatus (Ambassador)","CLAU1229",-173,-173);
addOffice("Legatus (Ambassador)","VALE1200",-173,-173);
addOffice("Legatus (Ambassador)","LUTA1327",-173,-173);
addOffice("Legatus (Ambassador)","BAEB1325",-173,-173);
addOffice("Legatus (Ambassador)","CORN1343",-173,-173);
addOffice("Legatus (Ambassador)","CAEC1344",-173,-173);
addOffice("Legatus (Ambassador)","LAEL0992",-173,-173);
addOffice("Legatus (Ambassador)","VALE1201",-173,-173);
addOffice("Legatus (Ambassador)","DIGI1138",-173,-173);
addOffice("Legatus (Ambassador)","VALE1200",-173,-173);
addOffice("Legatus (Ambassador)","CLAU1118",-173,-173);
addOffice("Legatus (Ambassador)","MEMM1333",-173,-173);
addOffice("Legatus (Ambassador)","POPI1283",-173,-173);
addOffice("Legatus (Ambassador)","CANU1334",-173,-173);
addOffice("Legatus (Ambassador)","CLAU1295",-172,-172);
addOffice("Legatus (Ambassador)","DECI1360",-172,-172);
addOffice("Legatus (Ambassador)","IUNI1131",-172,-172);
addOffice("Legatus (Ambassador)","DIGI1138",-172,-172);
addOffice("Legatus (Ambassador)","IUVE1139",-172,-172);
addOffice("Legatus (Ambassador)","CAEC1348",-172,-172);
addOffice("Legatus (Ambassador)","MARC1205",-172,-172);
addOffice("Legatus (Ambassador)","ATIL1140",-172,-172);
addOffice("Legatus (Ambassador)","CORN1362",-172,-172);
addOffice("Legatus (Ambassador)","CORN1363",-172,-172);
addOffice("Legatus (Ambassador)","DECI1364",-172,-172);
addOffice("Legatus (Ambassador)","SERV1291",-172,-172);
addOffice("Legatus (Ambassador)","TERE1183",-172,-172);
addOffice("Legatus (Ambassador)","PLAE1365",-172,-172);
addOffice("Legatus (Ambassador)","CICE1340",-172,-172);
addOffice("Legatus (Ambassador)","VALE1200",-172,-172);
addOffice("Legatus (Ambassador)","CLAU1032",-172,-172);
addOffice("Legatus (Ambassador)","POST1251",-172,-172);
addOffice("Legatus (Ambassador)","POST1172",-171,-171);
addOffice("Legatus (Ambassador)","DECI1373",-171,-171);
addOffice("Legatus (Ambassador)","LICI1374",-171,-171);
addOffice("Legatus (Ambassador)","POST1278",-171,-171);
addOffice("Legatus (Ambassador)","TERE1135",-171,-171);
addOffice("Legatus (Ambassador)","ABUR1375",-171,-171);
addOffice("Legatus (Ambassador)","LAEL0992",-170,-170);
addOffice("Legatus (Ambassador)","SEMP1214",-170,-170);
addOffice("Legatus (Ambassador)","IULI1265",-170,-170);
addOffice("Legatus (Ambassador)","SICI1389",-170,-170);
addOffice("Legatus (Ambassador)","CORN1390",-170,-170);
addOffice("Legatus (Ambassador)","MEMM1391",-170,-170);
addOffice("Legatus (Ambassador)","AEMI1471",-170,-170);
addOffice("Legatus (Ambassador)","NUMI1399",-169,-169);
addOffice("Legatus (Ambassador)","POPI1328",-168,-168);
addOffice("Legatus (Ambassador)","DECI1373",-168,-168);
addOffice("Legatus (Ambassador)","HOST1418",-168,-168);
addOffice("Legatus (Ambassador)","AELI1324",-167,-167);
addOffice("Legatus (Ambassador)","CICE1340",-167,-167);
addOffice("Legatus (Ambassador)","BAEB1409",-167,-167);
addOffice("Legatus (Ambassador)","TERE1446",-167,-167);
addOffice("Legatus (Ambassador)","MANI1447",-167,-167);
addOffice("Legatus (Ambassador)","POST1172",-167,-167);
addOffice("Legatus (Ambassador)","CLAU1125",-167,-167);
addOffice("Legatus (Ambassador)","FABI1117",-167,-167);
addOffice("Legatus (Ambassador)","MARC1205",-167,-167);
addOffice("Legatus (Ambassador)","LICI1354",-167,-167);
addOffice("Legatus (Ambassador)","DOMI1366",-167,-167);
addOffice("Legatus (Ambassador)","CORN1326",-167,-167);
addOffice("Legatus (Ambassador)","IUNI1448",-167,-167);
addOffice("Legatus (Ambassador)","NUMI1399",-167,-167);
addOffice("Legatus (Ambassador)","TERE1183",-167,-167);
addOffice("Legatus (Ambassador)","QUIN1449",-167,-167);
addOffice("Legatus (Ambassador)","LICI1425",-167,-167);
addOffice("Legatus (Ambassador)","CANI1392",-167,-167);
addOffice("Legatus (Ambassador)","LICI1321",-167,-167);
addOffice("Legatus (Ambassador)","SEMP1182",-165,-165);
addOffice("Legatus (Ambassador)","MEMM1462",-164,-164);
addOffice("Legatus (Ambassador)","MANL1463",-164,-164);
addOffice("Legatus (Ambassador)","SULP1173",-164,-164);
addOffice("Legatus (Ambassador)","SERG1464",-164,-164);
addOffice("Legatus (Ambassador)","CANU1334",-163,-163);
addOffice("Legatus (Ambassador)","MARC1403",-163,-163);
addOffice("Legatus (Ambassador)","IUNI1131",-163,-163);
addOffice("Legatus (Ambassador)","OCTA1356",-163,-163);
addOffice("Legatus (Ambassador)","LUCR1355",-163,-163);
addOffice("Legatus (Ambassador)","AURE1468",-163,-163);
addOffice("Legatus (Ambassador)","MANL1384",-162,-162);
addOffice("Legatus (Ambassador)","CORN1469",-162,-162);
addOffice("Legatus (Ambassador)","OCTA1356",-162,-162);
addOffice("Legatus (Ambassador)","LUCR1355",-162,-162);
addOffice("Legatus (Ambassador)","AURE1468",-162,-162);
addOffice("Legatus (Ambassador)","SEMP1182",-162,-162);
addOffice("Legatus (Ambassador)","CORN1465",-162,-162);
addOffice("Legatus (Ambassador)","SERV1470",-162,-162);
addOffice("Legatus (Ambassador)","APUS1473",-161,-161);
addOffice("Legatus (Ambassador)","CORN1474",-161,-161);
addOffice("Legatus (Ambassador)","FANN1461",-158,-158);
addOffice("Legatus (Ambassador)","FANN1461",-157,-157);
addOffice("Legatus (Ambassador)","CORN1362",-156,-156);
addOffice("Legatus (Ambassador)","APPU1346",-156,-156);
addOffice("Legatus (Ambassador)","PETR1479",-156,-156);
addOffice("Legatus (Ambassador)","CLAU1481",-156,-156);
addOffice("Legatus (Ambassador)","HORT1382",-156,-156);
addOffice("Legatus (Ambassador)","AURU1482",-156,-156);
addOffice("Legatus (Ambassador)","CLAU1481",-155,-155);
addOffice("Legatus (Ambassador)","HORT1382",-155,-155);
addOffice("Legatus (Ambassador)","AURU1482",-155,-155);
addOffice("Legatus (Ambassador)","ANIC1408",-155,-155);
addOffice("Legatus (Ambassador)","FANN1461",-155,-155);
addOffice("Legatus (Ambassador)","FABI1422",-155,-155);
addOffice("Legatus (Ambassador)","ANIC1408",-154,-154);
addOffice("Legatus (Ambassador)","FANN1461",-154,-154);
addOffice("Legatus (Ambassador)","FABI1422",-154,-154);
addOffice("Legatus (Ambassador)","CLAU1290",-154,-154);
addOffice("Legatus (Ambassador)","OPPI1487",-154,-154);
addOffice("Legatus (Ambassador)","POST1420",-154,-154);
addOffice("Legatus (Ambassador)","CORN1469",-154,-154);
addOffice("Legatus (Ambassador)","FLAM1489",-154,-154);
addOffice("Legatus (Ambassador)","POPI1563",-154,-154);
addOffice("Legatus (Ambassador)","PUPI1233",-154,-154);
addOffice("Legatus (Ambassador)","MINU1259",-154,-154);
addOffice("Legatus (Ambassador)","ANON1498",-153,-153);
addOffice("Legatus (Ambassador)","PORC0907",-153,-153);
addOffice("Legatus (Ambassador)","CORN1396",-152,-152);
addOffice("Legatus (Ambassador)","LICI1514",-149,-149);
addOffice("Legatus (Ambassador)","HOST1503",-149,-149);
addOffice("Legatus (Ambassador)","MANL1515",-149,-149);
addOffice("Legatus (Ambassador)","CLAU1318",-148,-148);
addOffice("Legatus (Ambassador)","AURE1468",-147,-147);
addOffice("Legatus (Ambassador)","IULI1265",-147,-147);
addOffice("Legatus (Ambassador)","LICI1520",-146,-146);
addOffice("Legatus (Ambassador)","POST1420",-146,-146);
addOffice("Legatus (Ambassador)","SEMP1521",-146,-146);
addOffice("Legatus (Ambassador)","TERE1537",-146,-146);
addOffice("Legatus (Ambassador)","AURE1468",-146,-146);
addOffice("Legatus (Ambassador)","PETR1549",-145,-145);
addOffice("Legatus (Ambassador)","LICI1520",-145,-145);
addOffice("Legatus (Ambassador)","POST1420",-145,-145);
addOffice("Legatus (Ambassador)","SEMP1521",-145,-145);
addOffice("Legatus (Ambassador)","TERE1537",-145,-145);
addOffice("Legatus (Ambassador)","AURE1468",-145,-145);
addOffice("Legatus (Ambassador)","SULP1417",-141,-141);
addOffice("Legatus (Ambassador)","CORN1504",-140,-140);
addOffice("Legatus (Ambassador)","CAEC1544",-140,-140);
addOffice("Legatus (Ambassador)","MUMM1542",-140,-140);
addOffice("Legatus (Ambassador)","CORN1504",-139,-139);
addOffice("Legatus (Ambassador)","CAEC1544",-139,-139);
addOffice("Legatus (Ambassador)","MUMM1542",-139,-139);
addOffice("Legatus (Ambassador)","CORN1513",-132,-132);
addOffice("Legatus (Ambassador)","OPIM1639",-116,-116);
addOffice("Legatus (Ambassador)","FABI1594",-113,-113);
addOffice("Legatus (Ambassador)","FABI1615",-113,-113);
addOffice("Legatus (Ambassador)","RUTI1596",-113,-113);
addOffice("Legatus (Ambassador)","PLOT1706",-113,-113);
addOffice("Legatus (Ambassador)","DOMI1707",-113,-113);
addOffice("Legatus (Ambassador)","FANN3464",-113,-113);
addOffice("Legatus (Ambassador)","AEMI1645",-112,-112);
addOffice("Legatus (Ambassador)","MEMM1714",-112,-112);
addOffice("Legatus (Ambassador)","MARI1660",-97,-97);
addOffice("Legatus (Ambassador)","AEMI1645",-93,-93);
addOffice("Legatus (Ambassador)","AQUI1757",-90,-90);
addOffice("Legatus (Ambassador)","AQUI1757",-89,-89);
addOffice("Legatus (Ambassador)","MANL1917",-89,-89);
addOffice("Legatus (Ambassador)","MANC1918",-89,-89);
addOffice("Legatus (Ambassador)","MANL1917",-88,-88);
addOffice("Legatus (Ambassador)","MANC1918",-88,-88);
addOffice("Legatus (Ambassador)","AQUI1757",-88,-88);
addOffice("Legatus (Ambassador)","LICI1930",-70,-70);
addOffice("Legatus (Ambassador)","TERE1982",-70,-70);
addOffice("Legatus (Ambassador)","LICI1930",-69,-69);
addOffice("Legatus (Ambassador)","TERE1982",-69,-69);
addOffice("Legatus (Ambassador)","LICI1930",-68,-68);
addOffice("Legatus (Ambassador)","TERE1982",-68,-68);
addOffice("Legatus (Ambassador)","LICI1930",-67,-67);
addOffice("Legatus (Ambassador)","TERE1982",-67,-67);
addOffice("Legatus (Ambassador)","LICI1930",-66,-66);
addOffice("Legatus (Ambassador)","TERE1982",-66,-66);
addOffice("Legatus (Ambassador)","CAEC2078",-60,-60);
addOffice("Legatus (Ambassador)","VALE1992",-60,-60);
addOffice("Legatus (Ambassador)","CORN2338",-60,-60);
addOffice("Legatus (Ambassador)","DOMI2313",-45,-45);
addOffice("Curator Viis Sternendis","CLAU1753",-94,-94);
addOffice("Curator Viis Sternendis","CLAU1753",-93,-93);
addOffice("Quinquevir Agris Dandis Assignandis","LIVI1756",-91,-91);
addOffice("Praefectus Classis","ATIL1140",-191,-191);
addOffice("Praefectus Classis","OCTA4681",-100,-100);
addOffice("Praefectus Classis","MINU1936",-88,-88);
addOffice("Praefectus Classis","POPI1937",-88,-88);
addOffice("Praefectus Classis","PLAU2970",-84,-84);
addOffice("Praefectus Classis","LUCI2244",-68,-68);
addOffice("Praefectus Classis","SERV2277",-65,-65);
addOffice("Praefectus Classis","IULI2559",-49,-49);
addOffice("Praefectus Classis","LUCR2560",-49,-49);
addOffice("Praefectus Classis","POMP2253",-49,-49);
addOffice("Praefectus Classis","VALE2564",-49,-49);
addOffice("Praefectus Classis","LUCR2560",-48,-48);
addOffice("Praefectus Classis","POMP2253",-48,-48);
addOffice("Praefectus Classis","VALE2564",-48,-48);
addOffice("Praefectus Classis","CISP5167",-46,-46);
addOffice("Praefectus Classis","IULI2829",-40,-40);
addOffice("Praefectus Classis","POMP2831",-40,-40);
addOffice("Praefectus Classis","POMP2832",-40,-40);
addOffice("Praefectus Classis","POMP2831",-39,-39);
addOffice("Praefectus Classis","POMP2832",-39,-39);
addOffice("Praefectus Classis","POMP2831",-38,-38);
addOffice("Praefectus Classis","NASI2852",-38,-38);
addOffice("Praefectus Classis","POMP2853",-38,-38);
addOffice("Praefectus Classis","POMP2854",-38,-38);
addOffice("Praefectus Classis","POMP2832",-38,-38);
addOffice("Praefectus Classis","POMP2832",-37,-37);
addOffice("Praefectus Classis","MARI2881",-37,-37);
addOffice("Praefectus Classis","POMP2853",-36,-36);
addOffice("Praefectus Classis","POMP2854",-36,-36);
addOffice("Praefectus Classis","POMP2832",-36,-36);
addOffice("Praefectus Classis","POMP2832",-35,-35);
addOffice("Praefectus Classis","TITI2834",-35,-35);
addOffice("Praefectus Classis","TURU2692",-32,-32);
addOffice("Praefectus Classis","NASI2852",-31,-31);
addOffice("Praefectus Classis","OCTA2920",-31,-31);
addOffice("Praefectus Classis","TARI2924",-31,-31);
addOffice("Praefectus Classis","INST2771",-31,-31);
addOffice("Praefectus Classis","TURU2692",-31,-31);
addOffice("Praefectus Classis","BAEB2921",-31,-31);
addOffice("Praefectus Classis","CLAU5054",-30,-30);
addOffice("Quindecemvir Sacris Faciundis","OPIM3126",-99,95);
addOffice("Quindecemvir Sacris Faciundis","COEL4647",-95,-81);
addOffice("Quindecemvir Sacris Faciundis","GABI1891",-81,-77);
addOffice("Quindecemvir Sacris Faciundis","OTAC2060",-77,-77);
addOffice("Quindecemvir Sacris Faciundis","VALE1992",-77,-77);
addOffice("Quindecemvir Sacris Faciundis","AURE2163",-77,-75);
addOffice("Quindecemvir Sacris Faciundis","OTAC2060",-76,-76);
addOffice("Quindecemvir Sacris Faciundis","VALE1992",-76,-54);
addOffice("Quindecemvir Sacris Faciundis","VALE2061",-76,-76);
addOffice("Quindecemvir Sacris Faciundis","GABI1891",-76,-70);
addOffice("Quindecemvir Sacris Faciundis","AURE2163",-74,-44);
addOffice("Quindecemvir Sacris Faciundis","PORC2241",-70,-47);
addOffice("Quindecemvir Sacris Faciundis","MANL2198",-69,-69);
addOffice("Quindecemvir Sacris Faciundis","MANL2198",-65,-46);
addOffice("Quindecemvir Sacris Faciundis","CLOD2219",-60,-58);
addOffice("Quindecemvir Sacris Faciundis","CLOD2219",-57,-52);
addOffice("Quindecemvir Sacris Faciundis","CORN2515",-51,-43);
addOffice("Quindecemvir Sacris Faciundis","CASS2458",-50,-44);
addOffice("Quindecemvir Sacris Faciundis","PORC2241",-46,-46);
addOffice("Quindecemvir Sacris Faciundis","CASS2458",-43,-42);
addOffice("Quindecemvir Sacris Faciundis","NORB2713",-39,-31);
addOffice("Quindecemvir Sacris Faciundis","POMP4667",-39,-31);
addOffice("Quindecemvir Sacris Faciundis","SOSI2840",-39,-34);
addOffice("Quindecemvir Sacris Faciundis","VALE2914",-39,-31);
addOffice("Quindecemvir Sacris Faciundis","VIPS2808",-39,-38);
addOffice("Quindecemvir Sacris Faciundis","AEMI2931",-39,-31);
addOffice("Quindecemvir Sacris Faciundis","COCC2806",-39,-31);
addOffice("Quindecemvir Sacris Faciundis","IULI2597",-39,-38);
addOffice("Quindecemvir Sacris Faciundis","LICI2933",-39,-31);
addOffice("Quindecemvir Sacris Faciundis","MARC2711",-39,-31);
addOffice("Quindecemvir Sacris Faciundis","MUCI2934",-39,-31);
addOffice("Quindecemvir Sacris Faciundis","VIPS2808",-37,-31);
addOffice("Quindecemvir Sacris Faciundis","IULI2597",-37,-31);
addOffice("Quindecemvir Sacris Faciundis","VALE2913",-35,-31);
addOffice("Quindecemvir Sacris Faciundis","SOSI2840",-33,-31);
addOffice("Legatus (Lieutenant)","LARC0012",-505,-505);
addOffice("Legatus (Lieutenant)","LARC0012",-504,-504);
addOffice("Legatus (Lieutenant)","LARC0017",-504,-504);
addOffice("Legatus (Lieutenant)","HERM0011",-499,-499);
addOffice("Legatus (Lieutenant)","VALE0013",-499,-499);
addOffice("Legatus (Lieutenant)","POST0027",-495,-495);
addOffice("Legatus (Lieutenant)","LARC0017",-493,-493);
addOffice("Legatus (Lieutenant)","SEMP0028",-487,-487);
addOffice("Legatus (Lieutenant)","SICC0090",-480,-480);
addOffice("Legatus (Lieutenant)","SICC0090",-479,-479);
addOffice("Legatus (Lieutenant)","SERV0098",-475,-475);
addOffice("Legatus (Lieutenant)","FURI0110",-464,-464);
addOffice("Legatus (Lieutenant)","VERG0122",-455,-455);
addOffice("Legatus (Lieutenant)","SICC0161",-449,-449);
addOffice("Legatus (Lieutenant)","POST0125",-446,-446);
addOffice("Legatus (Lieutenant)","SULP0138",-446,-446);
addOffice("Legatus (Lieutenant)","FABI0214",-437,-437);
addOffice("Legatus (Lieutenant)","QUIN0114",-437,-437);
addOffice("Legatus (Lieutenant)","FABI0214",-431,-431);
addOffice("Legatus (Lieutenant)","GEGA0199",-431,-431);
addOffice("Legatus (Lieutenant)","POST0258",-431,-431);
addOffice("Legatus (Lieutenant)","SULP0246",-431,-431);
addOffice("Legatus (Lieutenant)","QUIN0254",-426,-426);
addOffice("Legatus (Lieutenant)","SERV0327",-406,-406);
addOffice("Legatus (Lieutenant)","SULP0445",-362,-362);
addOffice("Legatus (Lieutenant)","VALE0522",-325,-325);
addOffice("Legatus (Lieutenant)","VALE0570",-325,-325);
addOffice("Legatus (Lieutenant)","FABI0604",-310,-310);
addOffice("Legatus (Lieutenant)","CLAU0605",-310,-310);
addOffice("Legatus (Lieutenant)","VALE0522",-310,-310);
addOffice("Legatus (Lieutenant)","DECI0596",-310,-310);
addOffice("Legatus (Lieutenant)","FULV0629",-302,-302);
addOffice("Legatus (Lieutenant)","FULV0629",-301,-301);
addOffice("Legatus (Lieutenant)","CORN0628",-297,-297);
addOffice("Legatus (Lieutenant)","CORN0628",-295,-295);
addOffice("Legatus (Lieutenant)","MANL0646",-295,-295);
addOffice("Legatus (Lieutenant)","MARC0601",-295,-295);
addOffice("Legatus (Lieutenant)","CAED0651",-293,-293);
addOffice("Legatus (Lieutenant)","CORN0628",-293,-293);
addOffice("Legatus (Lieutenant)","IUNI0652",-293,-293);
addOffice("Legatus (Lieutenant)","MAEC0653",-293,-293);
addOffice("Legatus (Lieutenant)","NAUT0654",-293,-293);
addOffice("Legatus (Lieutenant)","PAPI0655",-293,-293);
addOffice("Legatus (Lieutenant)","POST0609",-293,-293);
addOffice("Legatus (Lieutenant)","TREB0656",-293,-293);
addOffice("Legatus (Lieutenant)","VOLU0608",-293,-293);
addOffice("Legatus (Lieutenant)","CARV0649",-292,-292);
addOffice("Legatus (Lieutenant)","FABI0559",-292,-292);
addOffice("Legatus (Lieutenant)","FABI0559",-291,-291);
addOffice("Legatus (Lieutenant)","FABR0675",-279,-279);
addOffice("Legatus (Lieutenant)","CORN0689",-275,-275);
addOffice("Legatus (Lieutenant)","CALP0737",-256,-256);
addOffice("Legatus (Lieutenant)","CLAU0784",-236,-236);
addOffice("Legatus (Lieutenant)","CORN0817",-218,-218);
addOffice("Legatus (Lieutenant)","POMP0843",-218,-218);
addOffice("Legatus (Lieutenant)","CINC0862",-217,-217);
addOffice("Legatus (Lieutenant)","FULV0781",-217,-217);
addOffice("Legatus (Lieutenant)","AURE0884",-216,-216);
addOffice("Legatus (Lieutenant)","VALE0805",-216,-216);
addOffice("Legatus (Lieutenant)","APUS0898",-215,-215);
addOffice("Legatus (Lieutenant)","MAEC0899",-215,-215);
addOffice("Legatus (Lieutenant)","SEMP0833",-215,-215);
addOffice("Legatus (Lieutenant)","CLAU0908",-214,-214);
addOffice("Legatus (Lieutenant)","CLAU0858",-214,-214);
addOffice("Legatus (Lieutenant)","VALE0805",-214,-214);
addOffice("Legatus (Lieutenant)","CLAU0858",-213,-213);
addOffice("Legatus (Lieutenant)","FABI0712",-213,-213);
addOffice("Legatus (Lieutenant)","QUIN0916",-213,-213);
addOffice("Legatus (Lieutenant)","AURE0870",-212,-212);
addOffice("Legatus (Lieutenant)","FABI0879",-212,-212);
addOffice("Legatus (Lieutenant)","IUNI0932",-212,-212);
addOffice("Legatus (Lieutenant)","QUIN0916",-212,-212);
addOffice("Legatus (Lieutenant)","VETU0949",-212,-212);
addOffice("Legatus (Lieutenant)","ATIL0912",-211,-211);
addOffice("Legatus (Lieutenant)","FONT0944",-211,-211);
addOffice("Legatus (Lieutenant)","FULV0945",-211,-211);
addOffice("Legatus (Lieutenant)","MINU1062",-211,-211);
addOffice("Legatus (Lieutenant)","POPI0947",-211,-211);
addOffice("Legatus (Lieutenant)","PORC0948",-211,-211);
addOffice("Legatus (Lieutenant)","VETU0949",-211,-211);
addOffice("Legatus (Lieutenant)","SEMP0942",-210,-210);
addOffice("Legatus (Lieutenant)","CLAU0908",-209,-209);
addOffice("Legatus (Lieutenant)","CORN0938",-209,-209);
addOffice("Legatus (Lieutenant)","FABI0879",-209,-209);
addOffice("Legatus (Lieutenant)","FULV0945",-209,-209);
addOffice("Legatus (Lieutenant)","FABI0879",-208,-208);
addOffice("Legatus (Lieutenant)","CATI0961",-207,-207);
addOffice("Legatus (Lieutenant)","CORN1016",-207,-207);
addOffice("Legatus (Lieutenant)","LUCR1017",-207,-207);
addOffice("Legatus (Lieutenant)","CORN1016",-206,-206);
addOffice("Legatus (Lieutenant)","LAEL0992",-206,-206);
addOffice("Legatus (Lieutenant)","MARC0943",-206,-206);
addOffice("Legatus (Lieutenant)","CORN1016",-205,-205);
addOffice("Legatus (Lieutenant)","LAET0869",-205,-205);
addOffice("Legatus (Lieutenant)","PLEM1026",-205,-205);
addOffice("Legatus (Lieutenant)","CORN1016",-204,-204);
addOffice("Legatus (Lieutenant)","BAEB1052",-203,-203);
addOffice("Legatus (Lieutenant)","CORN1016",-203,-203);
addOffice("Legatus (Lieutenant)","LAEL0992",-203,-203);
addOffice("Legatus (Lieutenant)","CLAU1079",-200,-200);
addOffice("Legatus (Lieutenant)","CAEC1080",-200,-200);
addOffice("Legatus (Lieutenant)","FURI1081",-200,-200);
addOffice("Legatus (Lieutenant)","LAET0869",-200,-200);
addOffice("Legatus (Lieutenant)","TITI1082",-200,-200);
addOffice("Legatus (Lieutenant)","VALE0930",-200,-200);
addOffice("Legatus (Lieutenant)","APUS1088",-200,-200);
addOffice("Legatus (Lieutenant)","APUS1088",-199,-199);
addOffice("Legatus (Lieutenant)","LIVI0952",-199,-199);
addOffice("Legatus (Lieutenant)","LIVI0952",-198,-198);
addOffice("Legatus (Lieutenant)","QUIN0977",-198,-198);
addOffice("Legatus (Lieutenant)","QUIN0977",-197,-197);
addOffice("Legatus (Lieutenant)","SULP0936",-197,-197);
addOffice("Legatus (Lieutenant)","VILL1034",-197,-197);
addOffice("Legatus (Lieutenant)","CLAU1118",-195,-195);
addOffice("Legatus (Lieutenant)","QUIN0977",-195,-195);
addOffice("Legatus (Lieutenant)","CLAU1118",-194,-194);
addOffice("Legatus (Lieutenant)","PORC0907",-194,-194);
addOffice("Legatus (Lieutenant)","QUIN0977",-194,-194);
addOffice("Legatus (Lieutenant)","CLAU0997",-193,-193);
addOffice("Legatus (Lieutenant)","SEMP0976",-193,-193);
addOffice("Legatus (Lieutenant)","CLAU1118",-191,-191);
addOffice("Legatus (Lieutenant)","CORN1016",-191,-191);
addOffice("Legatus (Lieutenant)","PORC0907",-191,-191);
addOffice("Legatus (Lieutenant)","POST1172",-191,-191);
addOffice("Legatus (Lieutenant)","QUIN0977",-191,-191);
addOffice("Legatus (Lieutenant)","SEMP0976",-191,-191);
addOffice("Legatus (Lieutenant)","SULP1173",-191,-191);
addOffice("Legatus (Lieutenant)","VALE0930",-191,-191);
addOffice("Legatus (Lieutenant)","APUS1088",-190,-190);
addOffice("Legatus (Lieutenant)","CORN0878",-190,-190);
addOffice("Legatus (Lieutenant)","DIGI1138",-190,-190);
addOffice("Legatus (Lieutenant)","DOMI1110",-190,-190);
addOffice("Legatus (Lieutenant)","FABR1127",-190,-190);
addOffice("Legatus (Lieutenant)","HOST1007",-190,-190);
addOffice("Legatus (Lieutenant)","HOST1071",-190,-190);
addOffice("Legatus (Lieutenant)","APUS1088",-190,-190);
addOffice("Legatus (Lieutenant)","AEMI1185",-190,-190);
addOffice("Legatus (Lieutenant)","AEMI1186",-190,-190);
addOffice("Legatus (Lieutenant)","HELV1046",-189,-189);
addOffice("Legatus (Lieutenant)","MANL1100",-189,-189);
addOffice("Legatus (Lieutenant)","VALE1200",-189,-189);
addOffice("Legatus (Lieutenant)","IUVE1236",-185,-185);
addOffice("Legatus (Lieutenant)","QUIN1237",-185,-185);
addOffice("Legatus (Lieutenant)","MINU1259",-182,-182);
addOffice("Legatus (Lieutenant)","AURE1260",-182,-182);
addOffice("Legatus (Lieutenant)","SULP1173",-182,-182);
addOffice("Legatus (Lieutenant)","ACIL1268",-181,-181);
addOffice("Legatus (Lieutenant)","FULV1247",-181,-181);
addOffice("Legatus (Lieutenant)","MINU1259",-181,-181);
addOffice("Legatus (Lieutenant)","FULV1194",-181,-181);
addOffice("Legatus (Lieutenant)","VALE1232",-181,-181);
addOffice("Legatus (Lieutenant)","MINU1259",-180,-180);
addOffice("Legatus (Lieutenant)","MINU1259",-178,-178);
addOffice("Legatus (Lieutenant)","ATIL1140",-171,-171);
addOffice("Legatus (Lieutenant)","LICI1354",-171,-171);
addOffice("Legatus (Lieutenant)","LUCR1357",-171,-171);
addOffice("Legatus (Lieutenant)","MARC1205",-171,-171);
addOffice("Legatus (Lieutenant)","MINU1380",-171,-171);
addOffice("Legatus (Lieutenant)","MUCI1289",-171,-171);
addOffice("Legatus (Lieutenant)","VALE1232",-171,-171);
addOffice("Legatus (Lieutenant)","CLAU1290",-170,-170);
addOffice("Legatus (Lieutenant)","COEL1393",-170,-170);
addOffice("Legatus (Lieutenant)","FURI1308",-170,-170);
addOffice("Legatus (Lieutenant)","CLAU1229",-169,-169);
addOffice("Legatus (Lieutenant)","MARC1403",-169,-169);
addOffice("Legatus (Lieutenant)","LUCR1355",-169,-169);
addOffice("Legatus (Lieutenant)","COEL1393",-169,-169);
addOffice("Legatus (Lieutenant)","AELI1429",-168,-168);
addOffice("Legatus (Lieutenant)","ANIC1430",-168,-168);
addOffice("Legatus (Lieutenant)","ATIL1431",-168,-168);
addOffice("Legatus (Lieutenant)","FABI1422",-168,-168);
addOffice("Legatus (Lieutenant)","PORC1433",-168,-168);
addOffice("Legatus (Lieutenant)","SERG1434",-168,-168);
addOffice("Legatus (Lieutenant)","SULP1173",-168,-168);
addOffice("Legatus (Lieutenant)","CLUV1296",-168,-168);
addOffice("Legatus (Lieutenant)","FABI1422",-167,-167);
addOffice("Legatus (Lieutenant)","LICI1425",-167,-167);
addOffice("Legatus (Lieutenant)","HOST1508",-148,-148);
addOffice("Legatus (Lieutenant)","LAEL1524",-147,-147);
addOffice("Legatus (Lieutenant)","SEMP1525",-147,-147);
addOffice("Legatus (Lieutenant)","ATIL1572",-147,-147);
addOffice("Legatus (Lieutenant)","ATIL1499",-147,-147);
addOffice("Legatus (Lieutenant)","AURE1468",-146,-146);
addOffice("Legatus (Lieutenant)","MUMM1542",-146,-146);
addOffice("Legatus (Lieutenant)","LAEL1524",-146,-146);
addOffice("Legatus (Lieutenant)","SEMP1525",-146,-146);
addOffice("Legatus (Lieutenant)","OCCI1559",-143,-143);
addOffice("Legatus (Lieutenant)","OCCI1559",-142,-142);
addOffice("Legatus (Lieutenant)","OCCI1559",-141,-141);
addOffice("Legatus (Lieutenant)","OCCI1559",-140,-140);
addOffice("Legatus (Lieutenant)","FULV1581",-136,-136);
addOffice("Legatus (Lieutenant)","CAEC1424",-136,-136);
addOffice("Legatus (Lieutenant)","POMP1551",-136,-136);
addOffice("Legatus (Lieutenant)","FULV1624",-136,-136);
addOffice("Legatus (Lieutenant)","FABI1422",-134,-134);
addOffice("Legatus (Lieutenant)","FABI1422",-133,-133);
addOffice("Legatus (Lieutenant)","FABI1615",-132,-132);
addOffice("Legatus (Lieutenant)","SERV1629",-129,-129);
addOffice("Legatus (Lieutenant)","IUNI1565",-129,-129);
addOffice("Legatus (Lieutenant)","DOMI1630",-129,-129);
addOffice("Legatus (Lieutenant)","LATI1628",-129,-129);
addOffice("Legatus (Lieutenant)","SERV1629",-128,-128);
addOffice("Legatus (Lieutenant)","DOMI1630",-128,-128);
addOffice("Legatus (Lieutenant)","SERV1629",-127,-127);
addOffice("Legatus (Lieutenant)","DOMI1630",-127,-127);
addOffice("Legatus (Lieutenant)","AEMI1668",-120,-120);
addOffice("Legatus (Lieutenant)","HORT1670",-120,-120);
addOffice("Legatus (Lieutenant)","POST1671",-120,-120);
addOffice("Legatus (Lieutenant)","CAEC1665",-119,-119);
addOffice("Legatus (Lieutenant)","AEMI1645",-111,-111);
addOffice("Legatus (Lieutenant)","MINU1687",-110,-110);
addOffice("Legatus (Lieutenant)","POST1728",-110,-110);
addOffice("Legatus (Lieutenant)","PORC1682",-110,-110);
addOffice("Legatus (Lieutenant)","OPIM1639",-110,-110);
addOffice("Legatus (Lieutenant)","SULP1662",-110,-110);
addOffice("Legatus (Lieutenant)","MARI1660",-109,-109);
addOffice("Legatus (Lieutenant)","RUTI1596",-109,-109);
addOffice("Legatus (Lieutenant)","MINU1687",-109,-109);
addOffice("Legatus (Lieutenant)","MARI1660",-108,-108);
addOffice("Legatus (Lieutenant)","RUTI1596",-108,-108);
addOffice("Legatus (Lieutenant)","MINU1687",-108,-108);
addOffice("Legatus (Lieutenant)","CALP1712",-107,-107);
addOffice("Legatus (Lieutenant)","MANL1747",-107,-107);
addOffice("Legatus (Lieutenant)","MINU1687",-107,-107);
addOffice("Legatus (Lieutenant)","POPI1748",-107,-107);
addOffice("Legatus (Lieutenant)","RUTI1596",-107,-107);
addOffice("Legatus (Lieutenant)","AURE1683",-106,-106);
addOffice("Legatus (Lieutenant)","MANL1747",-106,-106);
addOffice("Legatus (Lieutenant)","MINU1687",-106,-106);
addOffice("Legatus (Lieutenant)","AURE1683",-105,-105);
addOffice("Legatus (Lieutenant)","MANL1747",-105,-105);
addOffice("Legatus (Lieutenant)","CORN1746",-104,-104);
addOffice("Legatus (Lieutenant)","AQUI1757",-103,-103);
addOffice("Legatus (Lieutenant)","AEMI1783",-102,-102);
addOffice("Legatus (Lieutenant)","CORN1746",-102,-102);
addOffice("Legatus (Lieutenant)","CLAU1784",-102,-102);
addOffice("Legatus (Lieutenant)","CORN1746",-101,-101);
addOffice("Legatus (Lieutenant)","IUNI3114",-100,-100);
addOffice("Legatus (Lieutenant)","RUTI1596",-97,-97);
addOffice("Legatus (Lieutenant)","SEMP1824",-96,-96);
addOffice("Legatus (Lieutenant)","PAPI1835",-94,-94);
addOffice("Legatus (Lieutenant)","CORN1836",-94,-94);
addOffice("Legatus (Lieutenant)","AEMI1645",-93,-93);
addOffice("Legatus (Lieutenant)","AEMI1645",-93,-93);
addOffice("Legatus (Lieutenant)","LUCC1845",-92,-92);
addOffice("Legatus (Lieutenant)","FONT1884",-91,-91);
addOffice("Legatus (Lieutenant)","MARI1660",-90,-90);
addOffice("Legatus (Lieutenant)","ACIL1880",-90,-90);
addOffice("Legatus (Lieutenant)","BAEB1881",-90,-90);
addOffice("Legatus (Lieutenant)","CAEC1869",-90,-90);
addOffice("Legatus (Lieutenant)","CLAU1784",-90,-90);
addOffice("Legatus (Lieutenant)","CORN1871",-90,-90);
addOffice("Legatus (Lieutenant)","CORN1882",-90,-90);
addOffice("Legatus (Lieutenant)","CORN1883",-90,-90);
addOffice("Legatus (Lieutenant)","CORN1746",-90,-90);
addOffice("Legatus (Lieutenant)","DIDI1776",-90,-90);
addOffice("Legatus (Lieutenant)","FONT1884",-90,-90);
addOffice("Legatus (Lieutenant)","LICI1780",-90,-90);
addOffice("Legatus (Lieutenant)","LUTA1731",-90,-90);
addOffice("Legatus (Lieutenant)","PERP1848",-90,-90);
addOffice("Legatus (Lieutenant)","PLAU1885",-90,-90);
addOffice("Legatus (Lieutenant)","POMP1767",-90,-90);
addOffice("Legatus (Lieutenant)","SERV1796",-90,-90);
addOffice("Legatus (Lieutenant)","SULP1850",-90,-90);
addOffice("Legatus (Lieutenant)","SULP1886",-90,-90);
addOffice("Legatus (Lieutenant)","VALE1887",-90,-90);
addOffice("Legatus (Lieutenant)","OTAC1924",-90,-90);
addOffice("Legatus (Lieutenant)","ANTO1705",-90,-90);
addOffice("Legatus (Lieutenant)","CAEC1869",-89,-89);
addOffice("Legatus (Lieutenant)","CORN1871",-89,-89);
addOffice("Legatus (Lieutenant)","CORN1746",-89,-89);
addOffice("Legatus (Lieutenant)","COSC1919",-89,-89);
addOffice("Legatus (Lieutenant)","DIDI1776",-89,-89);
addOffice("Legatus (Lieutenant)","GABI1920",-89,-89);
addOffice("Legatus (Lieutenant)","GELL1822",-89,-89);
addOffice("Legatus (Lieutenant)","IUNI1980",-89,-89);
addOffice("Legatus (Lieutenant)","ANON1922",-89,-89);
addOffice("Legatus (Lieutenant)","OCTA1754",-89,-89);
addOffice("Legatus (Lieutenant)","POST1728",-89,-89);
addOffice("Legatus (Lieutenant)","SULP1850",-89,-89);
addOffice("Legatus (Lieutenant)","SULP1886",-89,-89);
addOffice("Legatus (Lieutenant)","PAPI1835",-89,-89);
addOffice("Legatus (Lieutenant)","ANTO1705",-89,-89);
addOffice("Legatus (Lieutenant)","AEMI1865",-88,-88);
addOffice("Legatus (Lieutenant)","AQUI1757",-88,-88);
addOffice("Legatus (Lieutenant)","CAEC1869",-88,-88);
addOffice("Legatus (Lieutenant)","CORN1871",-88,-88);
addOffice("Legatus (Lieutenant)","GRAT1933",-88,-88);
addOffice("Legatus (Lieutenant)","MINU1934",-88,-88);
addOffice("Legatus (Lieutenant)","MUMM1935",-88,-88);
addOffice("Legatus (Lieutenant)","SULP1850",-88,-88);
addOffice("Legatus (Lieutenant)","MARC1947",-87,-87);
addOffice("Legatus (Lieutenant)","MARI1660",-87,-87);
addOffice("Legatus (Lieutenant)","HORT1951",-87,-87);
addOffice("Legatus (Lieutenant)","LICI1780",-87,-87);
addOffice("Legatus (Lieutenant)","MARI1940",-87,-87);
addOffice("Legatus (Lieutenant)","MILO1941",-87,-87);
addOffice("Legatus (Lieutenant)","MUNA1952",-87,-87);
addOffice("Legatus (Lieutenant)","PAPI1843",-87,-87);
addOffice("Legatus (Lieutenant)","PLAU1885",-87,-87);
addOffice("Legatus (Lieutenant)","SERT1818",-87,-87);
addOffice("Legatus (Lieutenant)","SERV1814",-87,-87);
addOffice("Legatus (Lieutenant)","VALE1802",-87,-87);
addOffice("Legatus (Lieutenant)","FLAV1946",-86,-86);
addOffice("Legatus (Lieutenant)","HORT1951",-86,-86);
addOffice("Legatus (Lieutenant)","MINU1901",-86,-86);
addOffice("Legatus (Lieutenant)","SCRI1876",-86,-86);
addOffice("Legatus (Lieutenant)","SULP1850",-86,-86);
addOffice("Legatus (Lieutenant)","FLAV1946",-85,-85);
addOffice("Legatus (Lieutenant)","HORT1951",-85,-85);
addOffice("Legatus (Lieutenant)","SCRI1876",-85,-85);
addOffice("Legatus (Lieutenant)","CARR1977",-83,-83);
addOffice("Legatus (Lieutenant)","CLUI1978",-83,-83);
addOffice("Legatus (Lieutenant)","CORN1979",-83,-83);
addOffice("Legatus (Lieutenant)","IUNI1980",-83,-83);
addOffice("Legatus (Lieutenant)","LICI1981",-83,-83);
addOffice("Legatus (Lieutenant)","TERE1982",-83,-83);
addOffice("Legatus (Lieutenant)","LIVI2018",-82,-82);
addOffice("Legatus (Lieutenant)","SERG1998",-82,-82);
addOffice("Legatus (Lieutenant)","AEMI1993",-82,-82);
addOffice("Legatus (Lieutenant)","AEMI1865",-82,-82);
addOffice("Legatus (Lieutenant)","COEL1995",-82,-82);
addOffice("Legatus (Lieutenant)","CORN1979",-82,-82);
addOffice("Legatus (Lieutenant)","FLAV1996",-82,-82);
addOffice("Legatus (Lieutenant)","LICI1981",-82,-82);
addOffice("Legatus (Lieutenant)","MARC1947",-82,-82);
addOffice("Legatus (Lieutenant)","MARC1764",-82,-82);
addOffice("Legatus (Lieutenant)","QUIN1997",-82,-82);
addOffice("Legatus (Lieutenant)","SERV1999",-82,-82);
addOffice("Legatus (Lieutenant)","SERV1814",-82,-82);
addOffice("Legatus (Lieutenant)","TERE2001",-82,-82);
addOffice("Legatus (Lieutenant)","POST3794",-82,-82);
addOffice("Legatus (Lieutenant)","SERG1998",-81,-81);
addOffice("Legatus (Lieutenant)","FONT1965",-81,-81);
addOffice("Legatus (Lieutenant)","LIVI2018",-81,-81);
addOffice("Legatus (Lieutenant)","IUNI2019",-81,-81);
addOffice("Legatus (Lieutenant)","MEMM2020",-81,-81);
addOffice("Legatus (Lieutenant)","CAEC2078",-81,-81);
addOffice("Legatus (Lieutenant)","SERG1998",-80,-80);
addOffice("Legatus (Lieutenant)","PAPI2011",-80,-80);
addOffice("Legatus (Lieutenant)","VERR1967",-80,-80);
addOffice("Legatus (Lieutenant)","THOR2034",-79,-79);
addOffice("Legatus (Lieutenant)","VERR1967",-79,-79);
addOffice("Legatus (Lieutenant)","VALE3113",-79,-79);
addOffice("Legatus (Lieutenant)","AQUI2041",-78,-78);
addOffice("Legatus (Lieutenant)","TERE1963",-78,-78);
addOffice("Legatus (Lieutenant)","ANTO2146",-77,-72);
addOffice("Legatus (Lieutenant)","CORN2048",-77,-77);
addOffice("Legatus (Lieutenant)","FONT1965",-77,-77);
addOffice("Legatus (Lieutenant)","IUNI1973",-77,-77);
addOffice("Legatus (Lieutenant)","PERP1986",-77,-77);
addOffice("Legatus (Lieutenant)","TERE1963",-77,-77);
addOffice("Legatus (Lieutenant)","LAEL2056",-77,-77);
addOffice("Legatus (Lieutenant)","AFRA2074",-77,-77);
addOffice("Legatus (Lieutenant)","OCTA2057",-76,-72);
addOffice("Legatus (Lieutenant)","FONT1965",-76,-76);
addOffice("Legatus (Lieutenant)","OCTA2057",-76,-76);
addOffice("Legatus (Lieutenant)","PERP1986",-76,-76);
addOffice("Legatus (Lieutenant)","TARQ2058",-76,-76);
addOffice("Legatus (Lieutenant)","TERE1963",-76,-76);
addOffice("Legatus (Lieutenant)","AFRA2074",-76,-76);
addOffice("Legatus (Lieutenant)","LAEL2056",-76,-76);
addOffice("Legatus (Lieutenant)","AFRA2074",-75,-75);
addOffice("Legatus (Lieutenant)","PERP1986",-75,-75);
addOffice("Legatus (Lieutenant)","POMP2075",-75,-75);
addOffice("Legatus (Lieutenant)","TERE1963",-75,-75);
addOffice("Legatus (Lieutenant)","TITU2076",-75,-75);
addOffice("Legatus (Lieutenant)","FONT3101",-75,-72);
addOffice("Legatus (Lieutenant)","ANON2090",-74,-74);
addOffice("Legatus (Lieutenant)","MANI2091",-74,-74);
addOffice("Legatus (Lieutenant)","ANNI2092",-74,-74);
addOffice("Legatus (Lieutenant)","FONT2093",-74,-74);
addOffice("Legatus (Lieutenant)","MALL2094",-74,-74);
addOffice("Legatus (Lieutenant)","MARC2095",-74,-74);
addOffice("Legatus (Lieutenant)","PERP1986",-74,-74);
addOffice("Legatus (Lieutenant)","RUTI2096",-74,-74);
addOffice("Legatus (Lieutenant)","SALL2097",-74,-74);
addOffice("Legatus (Lieutenant)","AFRA2074",-74,-74);
addOffice("Legatus (Lieutenant)","POMP2075",-74,-74);
addOffice("Legatus (Lieutenant)","VALE2117",-74,-74);
addOffice("Legatus (Lieutenant)","TITU2076",-74,-74);
addOffice("Legatus (Lieutenant)","ANCH2110",-73,-73);
addOffice("Legatus (Lieutenant)","AUTR2070",-73,-73);
addOffice("Legatus (Lieutenant)","FURI2113",-73,-73);
addOffice("Legatus (Lieutenant)","FULV2114",-73,-73);
addOffice("Legatus (Lieutenant)","GALL2115",-73,-73);
addOffice("Legatus (Lieutenant)","LICI2085",-73,-73);
addOffice("Legatus (Lieutenant)","MARC2095",-73,-73);
addOffice("Legatus (Lieutenant)","PERP1986",-73,-73);
addOffice("Legatus (Lieutenant)","SALL2097",-73,-73);
addOffice("Legatus (Lieutenant)","TADI2116",-73,-73);
addOffice("Legatus (Lieutenant)","VALE2117",-73,-73);
addOffice("Legatus (Lieutenant)","VOCO2118",-73,-73);
addOffice("Legatus (Lieutenant)","ANON3283",-73,-73);
addOffice("Legatus (Lieutenant)","AFRA2074",-73,-73);
addOffice("Legatus (Lieutenant)","TITU2076",-73,-73);
addOffice("Legatus (Lieutenant)","AFRA2074",-72,-72);
addOffice("Legatus (Lieutenant)","CERV2112",-72,-72);
addOffice("Legatus (Lieutenant)","FABI2141",-72,-72);
addOffice("Legatus (Lieutenant)","LICI2085",-72,-72);
addOffice("Legatus (Lieutenant)","MUMM2142",-72,-72);
addOffice("Legatus (Lieutenant)","PERP1986",-72,-72);
addOffice("Legatus (Lieutenant)","POMP2143",-72,-72);
addOffice("Legatus (Lieutenant)","SORN2144",-72,-72);
addOffice("Legatus (Lieutenant)","TADI2116",-72,-72);
addOffice("Legatus (Lieutenant)","VALE2117",-72,-72);
addOffice("Legatus (Lieutenant)","MARC2160",-71,-71);
addOffice("Legatus (Lieutenant)","POMP2143",-71,-71);
addOffice("Legatus (Lieutenant)","POMP2311",-71,-71);
addOffice("Legatus (Lieutenant)","QUIN2081",-71,-71);
addOffice("Legatus (Lieutenant)","TADI2116",-71,-71);
addOffice("Legatus (Lieutenant)","VALE2117",-71,-71);
addOffice("Legatus (Lieutenant)","MARC2173",-70,-70);
addOffice("Legatus (Lieutenant)","VALE2117",-70,-70);
addOffice("Legatus (Lieutenant)","FABI2141",-69,-69);
addOffice("Legatus (Lieutenant)","LICI2085",-69,-69);
addOffice("Legatus (Lieutenant)","VALE2117",-69,-69);
addOffice("Legatus (Lieutenant)","SORN2144",-69,-69);
addOffice("Legatus (Lieutenant)","CLOD2219",-68,-68);
addOffice("Legatus (Lieutenant)","FABI2141",-68,-68);
addOffice("Legatus (Lieutenant)","FANN2220",-68,-68);
addOffice("Legatus (Lieutenant)","LICI2067",-68,-68);
addOffice("Legatus (Lieutenant)","VALE1992",-68,-68);
addOffice("Legatus (Lieutenant)","VALE2117",-68,-68);
addOffice("Legatus (Lieutenant)","SORN2144",-68,-68);
addOffice("Legatus (Lieutenant)","LUCI2244",-67,-67);
addOffice("Legatus (Lieutenant)","LICI2067",-67,-67);
addOffice("Legatus (Lieutenant)","VALE2117",-67,-67);
addOffice("Legatus (Lieutenant)","CLOD2219",-67,-67);
addOffice("Legatus (Lieutenant)","COEL2997",-67,-67);
addOffice("Legatus (Lieutenant)","VALE1992",-67,-67);
addOffice("Legatus (Lieutenant)","CAEC2040",-67,-67);
addOffice("Legatus (Lieutenant)","AFRA2074",-66,-66);
addOffice("Legatus (Lieutenant)","CAEC2040",-66,-66);
addOffice("Legatus (Lieutenant)","GABI2234",-66,-66);
addOffice("Legatus (Lieutenant)","VALE1992",-66,-66);
addOffice("Legatus (Lieutenant)","AFRA2074",-65,-65);
addOffice("Legatus (Lieutenant)","ANTO1969",-65,-65);
addOffice("Legatus (Lieutenant)","CAEC2247",-65,-65);
addOffice("Legatus (Lieutenant)","GABI2234",-65,-65);
addOffice("Legatus (Lieutenant)","LOLL2249",-65,-65);
addOffice("Legatus (Lieutenant)","MANL2275",-65,-65);
addOffice("Legatus (Lieutenant)","AFRA2074",-64,-64);
addOffice("Legatus (Lieutenant)","CAEC2247",-64,-64);
addOffice("Legatus (Lieutenant)","GABI2234",-64,-64);
addOffice("Legatus (Lieutenant)","LOLL2249",-64,-64);
addOffice("Legatus (Lieutenant)","PLAU2276",-64,-64);
addOffice("Legatus (Lieutenant)","PETR2280",-64,-64);
addOffice("Legatus (Lieutenant)","CAEC2247",-63,-63);
addOffice("Legatus (Lieutenant)","GABI2234",-63,-63);
addOffice("Legatus (Lieutenant)","LICI2301",-63,-63);
addOffice("Legatus (Lieutenant)","PETR2280",-63,-63);
addOffice("Legatus (Lieutenant)","PLAU2276",-63,-63);
addOffice("Legatus (Lieutenant)","PUPI1974",-63,-63);
addOffice("Legatus (Lieutenant)","DOMI2313",-62,-62);
addOffice("Legatus (Lieutenant)","MANL2314",-62,-62);
addOffice("Legatus (Lieutenant)","MARI2307",-62,-62);
addOffice("Legatus (Lieutenant)","PETR2280",-62,-62);
addOffice("Legatus (Lieutenant)","PLAU2276",-62,-62);
addOffice("Legatus (Lieutenant)","PLOT2315",-62,-62);
addOffice("Legatus (Lieutenant)","PUPI1974",-62,-62);
addOffice("Legatus (Lieutenant)","SULP2316",-62,-62);
addOffice("Legatus (Lieutenant)","VATI2297",-62,-62);
addOffice("Legatus (Lieutenant)","ALLI2324",-61,-61);
addOffice("Legatus (Lieutenant)","AELI2325",-61,-61);
addOffice("Legatus (Lieutenant)","GRAT2326",-61,-61);
addOffice("Legatus (Lieutenant)","MARI2307",-61,-61);
addOffice("Legatus (Lieutenant)","MANL2314",-61,-61);
addOffice("Legatus (Lieutenant)","SULP2316",-61,-61);
addOffice("Legatus (Lieutenant)","AELI2325",-60,-60);
addOffice("Legatus (Lieutenant)","ALLI2324",-60,-60);
addOffice("Legatus (Lieutenant)","GRAT2326",-60,-60);
addOffice("Legatus (Lieutenant)","MANL2314",-60,-60);
addOffice("Legatus (Lieutenant)","MARI2307",-60,-60);
addOffice("Legatus (Lieutenant)","SULP2316",-60,-60);
addOffice("Legatus (Lieutenant)","AELI2325",-59,-59);
addOffice("Legatus (Lieutenant)","ALLI2324",-59,-59);
addOffice("Legatus (Lieutenant)","GRAT2326",-59,-59);
addOffice("Legatus (Lieutenant)","CLAU2062",-58,-58);
addOffice("Legatus (Lieutenant)","LABI2292",-58,-58);
addOffice("Legatus (Lieutenant)","AURU2369",-58,-58);
addOffice("Legatus (Lieutenant)","PEDI2370",-58,-58);
addOffice("Legatus (Lieutenant)","SULP2316",-58,-58);
addOffice("Legatus (Lieutenant)","TITU2371",-58,-58);
addOffice("Legatus (Lieutenant)","VATI2297",-58,-58);
addOffice("Legatus (Lieutenant)","FAVO2352",-58,-58);
addOffice("Legatus (Lieutenant)","AURU2369",-57,-57);
addOffice("Legatus (Lieutenant)","CORN4196",-57,-57);
addOffice("Legatus (Lieutenant)","LABI2292",-57,-57);
addOffice("Legatus (Lieutenant)","LICI2372",-57,-57);
addOffice("Legatus (Lieutenant)","MARC2389",-57,-57);
addOffice("Legatus (Lieutenant)","PEDI2370",-57,-57);
addOffice("Legatus (Lieutenant)","SERV2390",-57,-57);
addOffice("Legatus (Lieutenant)","ANON2391",-57,-57);
addOffice("Legatus (Lieutenant)","SULP2316",-57,-57);
addOffice("Legatus (Lieutenant)","TITU2371",-57,-57);
addOffice("Legatus (Lieutenant)","TULL2072",-57,-57);
addOffice("Legatus (Lieutenant)","TULL2216",-57,-57);
addOffice("Legatus (Lieutenant)","VALE1992",-57,-57);
addOffice("Legatus (Lieutenant)","VATI2297",-57,-57);
addOffice("Legatus (Lieutenant)","VERG2267",-57,-57);
addOffice("Legatus (Lieutenant)","AURU2369",-56,-56);
addOffice("Legatus (Lieutenant)","LABI2292",-56,-56);
addOffice("Legatus (Lieutenant)","LICI2372",-56,-56);
addOffice("Legatus (Lieutenant)","MARC2389",-56,-56);
addOffice("Legatus (Lieutenant)","PEDI2370",-56,-56);
addOffice("Legatus (Lieutenant)","SULP2316",-56,-56);
addOffice("Legatus (Lieutenant)","TITU2371",-56,-56);
addOffice("Legatus (Lieutenant)","TULL2216",-56,-56);
addOffice("Legatus (Lieutenant)","VALE1992",-56,-56);
addOffice("Legatus (Lieutenant)","VATI2297",-56,-56);
addOffice("Legatus (Lieutenant)","VERG2267",-56,-56);
addOffice("Legatus (Lieutenant)","AURU2369",-55,-55);
addOffice("Legatus (Lieutenant)","LABI2292",-55,-55);
addOffice("Legatus (Lieutenant)","NUME2334",-55,-55);
addOffice("Legatus (Lieutenant)","PLAE2169",-55,-55);
addOffice("Legatus (Lieutenant)","SULP2430",-55,-55);
addOffice("Legatus (Lieutenant)","TITU2371",-55,-55);
addOffice("Legatus (Lieutenant)","AFRA2074",-55,-55);
addOffice("Legatus (Lieutenant)","PETR2280",-55,-55);
addOffice("Legatus (Lieutenant)","AFRA2074",-54,-54);
addOffice("Legatus (Lieutenant)","AURU2369",-54,-54);
addOffice("Legatus (Lieutenant)","HIRT2449",-54,-54);
addOffice("Legatus (Lieutenant)","LABI2292",-54,-54);
addOffice("Legatus (Lieutenant)","LICI2372",-54,-54);
addOffice("Legatus (Lieutenant)","MESS2386",-54,-54);
addOffice("Legatus (Lieutenant)","MUNA2450",-54,-54);
addOffice("Legatus (Lieutenant)","PETR2280",-54,-54);
addOffice("Legatus (Lieutenant)","ROSC2424",-54,-54);
addOffice("Legatus (Lieutenant)","SULP2430",-54,-54);
addOffice("Legatus (Lieutenant)","TITU2371",-54,-54);
addOffice("Legatus (Lieutenant)","TREB2336",-54,-54);
addOffice("Legatus (Lieutenant)","TULL2216",-54,-54);
addOffice("Legatus (Lieutenant)","OCTA2451",-54,-54);
addOffice("Legatus (Lieutenant)","VARG2452",-54,-54);
addOffice("Legatus (Lieutenant)","ANTO2392",-54,-54);
addOffice("Legatus (Lieutenant)","FABI2427",-54,-54);
addOffice("Legatus (Lieutenant)","AFRA2074",-53,-53);
addOffice("Legatus (Lieutenant)","ANTI2461",-53,-53);
addOffice("Legatus (Lieutenant)","FABI2427",-53,-53);
addOffice("Legatus (Lieutenant)","FABI2462",-53,-53);
addOffice("Legatus (Lieutenant)","IUNI2463",-53,-53);
addOffice("Legatus (Lieutenant)","LABI2292",-53,-53);
addOffice("Legatus (Lieutenant)","LICI2372",-53,-53);
addOffice("Legatus (Lieutenant)","MARC2464",-53,-53);
addOffice("Legatus (Lieutenant)","MEGA2465",-53,-53);
addOffice("Legatus (Lieutenant)","MINU2466",-53,-53);
addOffice("Legatus (Lieutenant)","MUCI2440",-53,-53);
addOffice("Legatus (Lieutenant)","MUNA2450",-53,-53);
addOffice("Legatus (Lieutenant)","OCTA2451",-53,-53);
addOffice("Legatus (Lieutenant)","OCTA2467",-53,-53);
addOffice("Legatus (Lieutenant)","PETR2280",-53,-53);
addOffice("Legatus (Lieutenant)","SEXT2468",-53,-53);
addOffice("Legatus (Lieutenant)","SULP2430",-53,-53);
addOffice("Legatus (Lieutenant)","TREB2336",-53,-53);
addOffice("Legatus (Lieutenant)","TULL2216",-53,-53);
addOffice("Legatus (Lieutenant)","VALE2488",-53,-53);
addOffice("Legatus (Lieutenant)","VARG2452",-53,-53);
addOffice("Legatus (Lieutenant)","ANTO2392",-53,-53);
addOffice("Legatus (Lieutenant)","AFRA2074",-52,-52);
addOffice("Legatus (Lieutenant)","ANTI2461",-52,-52);
addOffice("Legatus (Lieutenant)","CANI2486",-52,-52);
addOffice("Legatus (Lieutenant)","FABI2427",-52,-52);
addOffice("Legatus (Lieutenant)","FABI2462",-52,-52);
addOffice("Legatus (Lieutenant)","IULI2044",-52,-52);
addOffice("Legatus (Lieutenant)","LABI2292",-52,-52);
addOffice("Legatus (Lieutenant)","MINU2466",-52,-52);
addOffice("Legatus (Lieutenant)","MUNA2450",-52,-52);
addOffice("Legatus (Lieutenant)","NIGI2349",-52,-52);
addOffice("Legatus (Lieutenant)","OCTA2467",-52,-52);
addOffice("Legatus (Lieutenant)","PETR2280",-52,-52);
addOffice("Legatus (Lieutenant)","SEMP2487",-52,-52);
addOffice("Legatus (Lieutenant)","SEXT2468",-52,-52);
addOffice("Legatus (Lieutenant)","SULP2430",-52,-52);
addOffice("Legatus (Lieutenant)","TREB2336",-52,-52);
addOffice("Legatus (Lieutenant)","TULL2216",-52,-52);
addOffice("Legatus (Lieutenant)","VALE2488",-52,-52);
addOffice("Legatus (Lieutenant)","VOLC2474",-52,-52);
addOffice("Legatus (Lieutenant)","ANTO2392",-52,-52);
addOffice("Legatus (Lieutenant)","AFRA2074",-51,-51);
addOffice("Legatus (Lieutenant)","ANNE2504",-51,-51);
addOffice("Legatus (Lieutenant)","ANTI2461",-51,-51);
addOffice("Legatus (Lieutenant)","CANI2486",-51,-51);
addOffice("Legatus (Lieutenant)","FABI2427",-51,-51);
addOffice("Legatus (Lieutenant)","FUFI2321",-51,-51);
addOffice("Legatus (Lieutenant)","IULI2044",-51,-51);
addOffice("Legatus (Lieutenant)","LABI2292",-51,-51);
addOffice("Legatus (Lieutenant)","LIGA2506",-51,-51);
addOffice("Legatus (Lieutenant)","MINU2466",-51,-51);
addOffice("Legatus (Lieutenant)","MUNA2450",-51,-51);
addOffice("Legatus (Lieutenant)","NIGI2349",-51,-51);
addOffice("Legatus (Lieutenant)","OCTA2467",-51,-51);
addOffice("Legatus (Lieutenant)","PETR2280",-51,-51);
addOffice("Legatus (Lieutenant)","POMP2311",-51,-51);
addOffice("Legatus (Lieutenant)","SEXT2468",-51,-51);
addOffice("Legatus (Lieutenant)","SULP2430",-51,-51);
addOffice("Legatus (Lieutenant)","TITI2507",-51,-51);
addOffice("Legatus (Lieutenant)","TREB2336",-51,-51);
addOffice("Legatus (Lieutenant)","TULL2508",-51,-51);
addOffice("Legatus (Lieutenant)","TULL2216",-51,-51);
addOffice("Legatus (Lieutenant)","VALE2488",-51,-51);
addOffice("Legatus (Lieutenant)","VATI2297",-51,-51);
addOffice("Legatus (Lieutenant)","VOLC2474",-51,-51);
addOffice("Legatus (Lieutenant)","FABI2462",-51,-51);
addOffice("Legatus (Lieutenant)","AFRA2074",-50,-50);
addOffice("Legatus (Lieutenant)","ANNE2504",-50,-50);
addOffice("Legatus (Lieutenant)","ANTI2461",-50,-50);
addOffice("Legatus (Lieutenant)","CANI2486",-50,-50);
addOffice("Legatus (Lieutenant)","FABI2427",-50,-50);
addOffice("Legatus (Lieutenant)","FUFI2321",-50,-50);
addOffice("Legatus (Lieutenant)","IULI2044",-50,-50);
addOffice("Legatus (Lieutenant)","LABI2292",-50,-50);
addOffice("Legatus (Lieutenant)","LIGA2506",-50,-50);
addOffice("Legatus (Lieutenant)","MINU2466",-50,-50);
addOffice("Legatus (Lieutenant)","MUNA2450",-50,-50);
addOffice("Legatus (Lieutenant)","PETR2280",-50,-50);
addOffice("Legatus (Lieutenant)","POMP2311",-50,-50);
addOffice("Legatus (Lieutenant)","TERE1963",-50,-50);
addOffice("Legatus (Lieutenant)","TREB2336",-50,-50);
addOffice("Legatus (Lieutenant)","TULL2508",-50,-50);
addOffice("Legatus (Lieutenant)","TULL2216",-50,-50);
addOffice("Legatus (Lieutenant)","VATI2297",-50,-50);
addOffice("Legatus (Lieutenant)","VOLC2474",-50,-50);
addOffice("Legatus (Lieutenant)","ANTO2392",-50,-50);
addOffice("Legatus (Lieutenant)","SULP2430",-50,-50);
addOffice("Legatus (Lieutenant)","RAES3340",-49,-49);
addOffice("Legatus (Lieutenant)","AFRA2074",-49,-49);
addOffice("Legatus (Lieutenant)","ANTO2497",-49,-49);
addOffice("Legatus (Lieutenant)","ASIN2553",-49,-49);
addOffice("Legatus (Lieutenant)","CALI2375",-49,-49);
addOffice("Legatus (Lieutenant)","CANI2486",-49,-49);
addOffice("Legatus (Lieutenant)","CORN2515",-49,-49);
addOffice("Legatus (Lieutenant)","FUFI2321",-49,-49);
addOffice("Legatus (Lieutenant)","HORT2554",-49,-49);
addOffice("Legatus (Lieutenant)","IULI2044",-49,-49);
addOffice("Legatus (Lieutenant)","IUNI2459",-49,-49);
addOffice("Legatus (Lieutenant)","IUNI2489",-49,-49);
addOffice("Legatus (Lieutenant)","LABI2292",-49,-49);
addOffice("Legatus (Lieutenant)","LICI2328",-49,-49);
addOffice("Legatus (Lieutenant)","LUCI2457",-49,-49);
addOffice("Legatus (Lieutenant)","MINU2466",-49,-49);
addOffice("Legatus (Lieutenant)","MUNA2450",-49,-49);
addOffice("Legatus (Lieutenant)","OCTA2467",-49,-49);
addOffice("Legatus (Lieutenant)","PETR2280",-49,-49);
addOffice("Legatus (Lieutenant)","POST2436",-49,-49);
addOffice("Legatus (Lieutenant)","SALL2429",-49,-49);
addOffice("Legatus (Lieutenant)","SCRI2518",-49,-49);
addOffice("Legatus (Lieutenant)","TERE1963",-49,-49);
addOffice("Legatus (Lieutenant)","TREB2336",-49,-49);
addOffice("Legatus (Lieutenant)","VALE2409",-49,-49);
addOffice("Legatus (Lieutenant)","VATI2297",-49,-49);
addOffice("Legatus (Lieutenant)","VOLC2474",-49,-49);
addOffice("Legatus (Lieutenant)","FABI2427",-49,-49);
addOffice("Legatus (Lieutenant)","FLAV2332",-49,-49);
addOffice("Legatus (Lieutenant)","PUPI2661",-49,-49);
addOffice("Legatus (Lieutenant)","LIGA2506",-49,-49);
addOffice("Legatus (Lieutenant)","TONG3858",-49,-49);
addOffice("Legatus (Lieutenant)","SULP2430",-49,-49);
addOffice("Legatus (Lieutenant)","ACIL2583",-48,-48);
addOffice("Legatus (Lieutenant)","AFRA2074",-48,-48);
addOffice("Legatus (Lieutenant)","ANTO2392",-48,-48);
addOffice("Legatus (Lieutenant)","ASIN2553",-48,-48);
addOffice("Legatus (Lieutenant)","CALI2375",-48,-48);
addOffice("Legatus (Lieutenant)","CALV2584",-48,-48);
addOffice("Legatus (Lieutenant)","CANU2585",-48,-48);
addOffice("Legatus (Lieutenant)","CASS2586",-48,-48);
addOffice("Legatus (Lieutenant)","CORN2515",-48,-48);
addOffice("Legatus (Lieutenant)","CORN2028",-48,-48);
addOffice("Legatus (Lieutenant)","FUFI2321",-48,-48);
addOffice("Legatus (Lieutenant)","GABI2234",-48,-48);
addOffice("Legatus (Lieutenant)","LABI2292",-48,-48);
addOffice("Legatus (Lieutenant)","MINU2466",-48,-48);
addOffice("Legatus (Lieutenant)","MUNA2450",-48,-48);
addOffice("Legatus (Lieutenant)","OCTA2467",-48,-48);
addOffice("Legatus (Lieutenant)","PETR2280",-48,-48);
addOffice("Legatus (Lieutenant)","POMP2587",-48,-48);
addOffice("Legatus (Lieutenant)","SCRI2518",-48,-48);
addOffice("Legatus (Lieutenant)","STAI2588",-48,-48);
addOffice("Legatus (Lieutenant)","TILL2589",-48,-48);
addOffice("Legatus (Lieutenant)","VALE2536",-48,-48);
addOffice("Legatus (Lieutenant)","VATI2297",-48,-48);
addOffice("Legatus (Lieutenant)","VOLC2474",-48,-48);
addOffice("Legatus (Lieutenant)","AFRA2074",-47,-47);
addOffice("Legatus (Lieutenant)","ATTI2455",-47,-47);
addOffice("Legatus (Lieutenant)","CALI2375",-47,-47);
addOffice("Legatus (Lieutenant)","CASS2458",-47,-47);
addOffice("Legatus (Lieutenant)","CORN2028",-47,-47);
addOffice("Legatus (Lieutenant)","FUFI2321",-47,-47);
addOffice("Legatus (Lieutenant)","GABI2234",-47,-47);
addOffice("Legatus (Lieutenant)","GALL2605",-47,-47);
addOffice("Legatus (Lieutenant)","IULI2374",-47,-47);
addOffice("Legatus (Lieutenant)","IUNI2489",-47,-47);
addOffice("Legatus (Lieutenant)","LABI2292",-47,-47);
addOffice("Legatus (Lieutenant)","MUNA2450",-47,-47);
addOffice("Legatus (Lieutenant)","OCTA2467",-47,-47);
addOffice("Legatus (Lieutenant)","PETR2280",-47,-47);
addOffice("Legatus (Lieutenant)","POMP2253",-47,-47);
addOffice("Legatus (Lieutenant)","SALL2429",-47,-47);
addOffice("Legatus (Lieutenant)","STAI2588",-47,-47);
addOffice("Legatus (Lieutenant)","VALE2536",-47,-47);
addOffice("Legatus (Lieutenant)","VATI2297",-47,-47);
addOffice("Legatus (Lieutenant)","AFRA2074",-46,-46);
addOffice("Legatus (Lieutenant)","AQUI2618",-46,-46);
addOffice("Legatus (Lieutenant)","ASIN2553",-46,-46);
addOffice("Legatus (Lieutenant)","ATTI2455",-46,-46);
addOffice("Legatus (Lieutenant)","CALP2543",-46,-46);
addOffice("Legatus (Lieutenant)","CASS2458",-46,-46);
addOffice("Legatus (Lieutenant)","CLAU2571",-46,-46);
addOffice("Legatus (Lieutenant)","DIDI2619",-46,-46);
addOffice("Legatus (Lieutenant)","FABI2379",-46,-46);
addOffice("Legatus (Lieutenant)","HOST2621",-46,-46);
addOffice("Legatus (Lieutenant)","IUNI2489",-46,-46);
addOffice("Legatus (Lieutenant)","LABI2292",-46,-46);
addOffice("Legatus (Lieutenant)","MESS2386",-46,-46);
addOffice("Legatus (Lieutenant)","MUNA2450",-46,-46);
addOffice("Legatus (Lieutenant)","OCTA2467",-46,-46);
addOffice("Legatus (Lieutenant)","OPPI2622",-46,-46);
addOffice("Legatus (Lieutenant)","PEDI2370",-46,-46);
addOffice("Legatus (Lieutenant)","PETR2280",-46,-46);
addOffice("Legatus (Lieutenant)","RABI2568",-46,-46);
addOffice("Legatus (Lieutenant)","SULP2088",-46,-46);
addOffice("Legatus (Lieutenant)","STAI2588",-46,-46);
addOffice("Legatus (Lieutenant)","VALE2536",-46,-46);
addOffice("Legatus (Lieutenant)","GALL2605",-46,-46);
addOffice("Legatus (Lieutenant)","ASIN2553",-45,-45);
addOffice("Legatus (Lieutenant)","ATTI2455",-45,-45);
addOffice("Legatus (Lieutenant)","AURE2644",-45,-45);
addOffice("Legatus (Lieutenant)","BAEB2645",-45,-45);
addOffice("Legatus (Lieutenant)","CAES2701",-45,-45);
addOffice("Legatus (Lieutenant)","CANI2486",-45,-45);
addOffice("Legatus (Lieutenant)","CORN2515",-45,-45);
addOffice("Legatus (Lieutenant)","DIDI2619",-45,-45);
addOffice("Legatus (Lieutenant)","FABI2379",-45,-45);
addOffice("Legatus (Lieutenant)","HORA2647",-45,-45);
addOffice("Legatus (Lieutenant)","LABI2292",-45,-45);
addOffice("Legatus (Lieutenant)","LATI2648",-45,-45);
addOffice("Legatus (Lieutenant)","PEDI2370",-45,-45);
addOffice("Legatus (Lieutenant)","PETR2649",-45,-45);
addOffice("Legatus (Lieutenant)","POMP2254",-45,-45);
addOffice("Legatus (Lieutenant)","SULP2088",-45,-45);
addOffice("Legatus (Lieutenant)","VALE2536",-45,-45);
addOffice("Legatus (Lieutenant)","VALE2409",-45,-45);
addOffice("Legatus (Lieutenant)","VENU2650",-45,-45);
addOffice("Legatus (Lieutenant)","OCTA2697",-44,-44);
addOffice("Legatus (Lieutenant)","BAEB2645",-44,-44);
addOffice("Legatus (Lieutenant)","EPPI2482",-44,-44);
addOffice("Legatus (Lieutenant)","FURN2521",-44,-44);
addOffice("Legatus (Lieutenant)","PONT2637",-44,-44);
addOffice("Legatus (Lieutenant)","TULL2072",-44,-44);
addOffice("Legatus (Lieutenant)","IUNI3114",-43,-42);
addOffice("Legatus (Lieutenant)","SERV2719",-43,-43);
addOffice("Legatus (Lieutenant)","OCTA2697",-43,-43);
addOffice("Legatus (Lieutenant)","ALLI2324",-43,-43);
addOffice("Legatus (Lieutenant)","ANTI2640",-43,-43);
addOffice("Legatus (Lieutenant)","ANTO2523",-43,-43);
addOffice("Legatus (Lieutenant)","CALP2739",-43,-43);
addOffice("Legatus (Lieutenant)","CALP2740",-43,-43);
addOffice("Legatus (Lieutenant)","CANI2741",-43,-43);
addOffice("Legatus (Lieutenant)","DECI2743",-43,-43);
addOffice("Legatus (Lieutenant)","FURN2521",-43,-43);
addOffice("Legatus (Lieutenant)","HORA2647",-43,-43);
addOffice("Legatus (Lieutenant)","CALV2584",-43,-43);
addOffice("Legatus (Lieutenant)","IUVE2308",-43,-43);
addOffice("Legatus (Lieutenant)","LATI2648",-43,-43);
addOffice("Legatus (Lieutenant)","LOLL2749",-43,-43);
addOffice("Legatus (Lieutenant)","MARI2750",-43,-43);
addOffice("Legatus (Lieutenant)","MUNA2477",-43,-43);
addOffice("Legatus (Lieutenant)","PEDA2751",-43,-43);
addOffice("Legatus (Lieutenant)","PEDU2752",-43,-43);
addOffice("Legatus (Lieutenant)","PONT2637",-43,-43);
addOffice("Legatus (Lieutenant)","PORC2754",-43,-43);
addOffice("Legatus (Lieutenant)","ROSC2424",-43,-43);
addOffice("Legatus (Lieutenant)","RUFR2755",-43,-43);
addOffice("Legatus (Lieutenant)","MINU2466",-43,-43);
addOffice("Legatus (Lieutenant)","SULP2316",-43,-43);
addOffice("Legatus (Lieutenant)","TITI2757",-43,-43);
addOffice("Legatus (Lieutenant)","TREB2671",-43,-43);
addOffice("Legatus (Lieutenant)","VALE2758",-43,-43);
addOffice("Legatus (Lieutenant)","VARI2675",-43,-43);
addOffice("Legatus (Lieutenant)","VENU2650",-43,-43);
addOffice("Legatus (Lieutenant)","COCC2767",-43,-35);
addOffice("Legatus (Lieutenant)","AQUI2618",-43,-43);
addOffice("Legatus (Lieutenant)","FANN2340",-42,-36);
addOffice("Legatus (Lieutenant)","LABI2777",-42,-41);
addOffice("Legatus (Lieutenant)","AEMI2350",-42,-42);
addOffice("Legatus (Lieutenant)","ANTI2778",-42,-42);
addOffice("Legatus (Lieutenant)","APPU2639",-42,-42);
addOffice("Legatus (Lieutenant)","CALP2739",-42,-42);
addOffice("Legatus (Lieutenant)","CORN2781",-42,-42);
addOffice("Legatus (Lieutenant)","CORN2394",-42,-42);
addOffice("Legatus (Lieutenant)","DECI2679",-42,-42);
addOffice("Legatus (Lieutenant)","DOMI2313",-42,-42);
addOffice("Legatus (Lieutenant)","FANN2782",-42,-42);
addOffice("Legatus (Lieutenant)","FANN2340",-42,-42);
addOffice("Legatus (Lieutenant)","MANL2783",-42,-42);
addOffice("Legatus (Lieutenant)","LOLL2749",-42,-42);
addOffice("Legatus (Lieutenant)","NORB2713",-42,-42);
addOffice("Legatus (Lieutenant)","PAQU2786",-42,-42);
addOffice("Legatus (Lieutenant)","PEDA2751",-42,-42);
addOffice("Legatus (Lieutenant)","SALV2788",-42,-42);
addOffice("Legatus (Lieutenant)","SERV2719",-42,-42);
addOffice("Legatus (Lieutenant)","SERV2720",-42,-42);
addOffice("Legatus (Lieutenant)","TILL2634",-42,-42);
addOffice("Legatus (Lieutenant)","TURI2790",-42,-42);
addOffice("Legatus (Lieutenant)","TURU2692",-42,-42);
addOffice("Legatus (Lieutenant)","VALE2758",-42,-42);
addOffice("Legatus (Lieutenant)","VARI2675",-42,-42);
addOffice("Legatus (Lieutenant)","VENT2791",-42,-42);
addOffice("Legatus (Lieutenant)","AQUI2618",-42,-42);
addOffice("Legatus (Lieutenant)","ATEI2804",-41,-41);
addOffice("Legatus (Lieutenant)","ALFE2766",-41,-41);
addOffice("Legatus (Lieutenant)","CANI2814",-41,-41);
addOffice("Legatus (Lieutenant)","DECI2679",-41,-41);
addOffice("Legatus (Lieutenant)","FURN2521",-41,-41);
addOffice("Legatus (Lieutenant)","TISI2815",-41,-41);
addOffice("Legatus (Lieutenant)","LABI2777",-40,-39);
addOffice("Legatus (Lieutenant)","ATEI2804",-40,-40);
addOffice("Legatus (Lieutenant)","CORN2550",-40,-40);
addOffice("Legatus (Lieutenant)","DECI2679",-40,-40);
addOffice("Legatus (Lieutenant)","IULI2829",-40,-40);
addOffice("Legatus (Lieutenant)","LIVI2830",-40,-40);
addOffice("Legatus (Lieutenant)","POMP2831",-40,-40);
addOffice("Legatus (Lieutenant)","POMP2832",-40,-40);
addOffice("Legatus (Lieutenant)","PEDU2426",-40,-40);
addOffice("Legatus (Lieutenant)","PEDU2885",-40,-40);
addOffice("Legatus (Lieutenant)","TURI2790",-40,-40);
addOffice("Legatus (Lieutenant)","TISI2815",-40,-40);
addOffice("Legatus (Lieutenant)","POMP2841",-39,-39);
addOffice("Legatus (Lieutenant)","POMP2831",-39,-39);
addOffice("Legatus (Lieutenant)","POMP2832",-39,-39);
addOffice("Legatus (Lieutenant)","TISI2815",-39,-39);
addOffice("Legatus (Lieutenant)","IUNI3114",-38,-36);
addOffice("Legatus (Lieutenant)","CORN2717",-38,-38);
addOffice("Legatus (Lieutenant)","NASI2852",-38,-38);
addOffice("Legatus (Lieutenant)","POMP2841",-38,-38);
addOffice("Legatus (Lieutenant)","POMP2853",-38,-38);
addOffice("Legatus (Lieutenant)","POMP2854",-38,-38);
addOffice("Legatus (Lieutenant)","POMP2831",-38,-38);
addOffice("Legatus (Lieutenant)","POMP2832",-38,-38);
addOffice("Legatus (Lieutenant)","TISI2815",-38,-38);
addOffice("Legatus (Lieutenant)","POMP2832",-37,-37);
addOffice("Legatus (Lieutenant)","TISI2815",-37,-37);
addOffice("Legatus (Lieutenant)","CARR2608",-36,-36);
addOffice("Legatus (Lieutenant)","CORN2717",-36,-36);
addOffice("Legatus (Lieutenant)","LAPR2873",-36,-36);
addOffice("Legatus (Lieutenant)","OPPI2874",-36,-36);
addOffice("Legatus (Lieutenant)","PLIN2875",-36,-36);
addOffice("Legatus (Lieutenant)","POMP2853",-36,-36);
addOffice("Legatus (Lieutenant)","POMP2854",-36,-36);
addOffice("Legatus (Lieutenant)","POMP2832",-36,-36);
addOffice("Legatus (Lieutenant)","TISI2815",-36,-36);
addOffice("Legatus (Lieutenant)","TITI2880",-36,-36);
addOffice("Legatus (Lieutenant)","FANN2340",-35,-35);
addOffice("Legatus (Lieutenant)","SCRI2518",-35,-35);
addOffice("Legatus (Lieutenant)","CURI2892",-35,-35);
addOffice("Legatus (Lieutenant)","POMP2832",-35,-35);
addOffice("Legatus (Lieutenant)","HELV2903",-34,-34);
addOffice("Legatus (Lieutenant)","LOLL2749",-31,-31);
addOffice("Legatus (Lieutenant)","NASI2852",-31,-31);
addOffice("Legatus (Lieutenant)","TARI2924",-31,-31);
addOffice("Consul Designatus","CORN2028",-66,-66);
addOffice("Consul Designatus","AUTR2070",-66,-66);
addOffice("Consul Designatus","IUNI2489",-43,-43);
addOffice("Consul Designatus","UTTI2978",-43,-33);
addOffice("Consul Designatus","FURN2521",-30,-30);
addOffice("Duovir Perduellionis","IULI1957",-63,-63);
addOffice("Duovir Perduellionis","IULI2044",-63,-63);
addOffice("Quaesitor","NOVI2310",-62,-62);
addOffice("Quaesitor","CLAU2952",-60,-31);
addOffice("Quaesitor","ALFI2346",-54,-54);
addOffice("Quaesitor","CONS2359",-52,-52);
addOffice("Quaesitor","CONS2435",-52,-52);
addOffice("Quaesitor","DOMI2264",-52,-52);
addOffice("Quaesitor","FABI2484",-52,-52);
addOffice("Quaesitor","FAVO2352",-52,-52);
addOffice("Quaesitor","MANL2250",-52,-52);
addOffice("Vigintivir Agris Dandis Assignandis","ATIU2329",-59,-59);
addOffice("Vigintivir Agris Dandis Assignandis","POMP1976",-59,-59);
addOffice("Vigintivir Agris Dandis Assignandis","TERE1963",-59,-59);
addOffice("Vigintivir Agris Dandis Assignandis","TREM2157",-59,-59);
addOffice("Quinquevir Agris Dandis Assignandis Iudicandis","VALE2107",-59,-59);
addOffice("Quinquevir Agris Dandis Assignandis Iudicandis","COSC2286",-59,-59);
addOffice("Quinquevir Agris Dandis Assignandis Iudicandis","LICI1981",-59,-59);
addOffice("Pontifex Minor","CORN2393",-85,-57);
addOffice("Pontifex Minor","VOLU2195",-80,-71);
addOffice("Pontifex Minor","ALBI2193",-77,-71);
addOffice("Pontifex Minor","VOLU2195",-70,-66);
addOffice("Pontifex Minor","ALBI2193",-70,-57);
addOffice("Pontifex Minor","TERE2365",-60,-58);
addOffice("Pontifex Minor","TERE2365",-57,-43);
addOffice("Pontifex Minor","FLAV4652",-50,-47);
addOffice("Pontifex Minor","FLAV4652",-46,-46);
addOffice("Septemvir Epulonum","NONI2598",-31,-31);
addOffice("Septemvir Epulonum","IULI2597",-31,-31);
addOffice("Septemvir Epulonum","CALV2584",-31,-31);
addOffice("Septemvir Epulonum","CEST2947",-13,-13);
addOffice("Lupercus","CAEL2417",-60,-57);
addOffice("Lupercus","HERE2418",-60,-57);
addOffice("Lupercus","CAEL2417",-56,-48);
addOffice("Lupercus","HERE2418",-56,-52);
addOffice("Lupercus","LICI2706",-50,-44);
addOffice("Lupercus","TULL2632",-46,-43);
addOffice("Praefectus Equitum","ANON5041",-216,-216);
addOffice("Praefectus Equitum","BIES5045",-153,-153);
addOffice("Praefectus Equitum","MARC1947",-87,-87);
addOffice("Praefectus Equitum","ANTO1969",-84,-84);
addOffice("Praefectus Equitum","OCTA2002",-82,-82);
addOffice("Praefectus Equitum","POMP2145",-72,-72);
addOffice("Praefectus Equitum","POMP4579",-66,-66);
addOffice("Praefectus Equitum","ANON5048",-58,-58);
addOffice("Praefectus Equitum","LICI2372",-58,-58);
addOffice("Praefectus Equitum","ANTO2392",-57,-57);
addOffice("Praefectus Equitum","ANTO2392",-56,-56);
addOffice("Praefectus Equitum","ANTO2392",-55,-55);
addOffice("Praefectus Equitum","TREB2473",-53,-53);
addOffice("Praefectus Equitum","ANON5049",-52,-52);
addOffice("Praefectus Equitum","VOLU2491",-52,-52);
addOffice("Praefectus Equitum","ANON5050",-51,-51);
addOffice("Praefectus Equitum","ATIU2510",-51,-51);
addOffice("Praefectus Equitum","VOLU2491",-51,-51);
addOffice("Praefectus Equitum","DOMI2399",-49,-49);
addOffice("Praefectus Equitum","ATIU2510",-48,-48);
addOffice("Praefectus Equitum","VOLU2491",-48,-48);
addOffice("Praefectus Equitum","PACI3433",-46,-46);
addOffice("Praefectus Equitum","PACI3434",-46,-46);
addOffice("Iudex","AURI4571",-123,-80);
addOffice("Iudex","PLAN4116",-96,-96);
addOffice("Iudex","HERE2024",-75,-75);
addOffice("Iudex","OCTA3759",-74,-74);
addOffice("Iudex","CASS2257",-74,-74);
addOffice("Iudex","EGNA3447",-74,-74);
addOffice("Iudex","AQUI3147",-74,-74);
addOffice("Iudex","ATIL3153",-74,-74);
addOffice("Iudex","CAUD3163",-74,-74);
addOffice("Iudex","CAUL3161",-74,-74);
addOffice("Iudex","FIDI3193",-74,-74);
addOffice("Iudex","ANON3196",-74,-74);
addOffice("Iudex","HEIU3210",-74,-74);
addOffice("Iudex","IUVE3205",-74,-74);
addOffice("Iudex","SATU3261",-74,-74);
addOffice("Iudex","SEPT3254",-74,-74);
addOffice("Iudex","POPI3227",-74,-74);
addOffice("Iudex","CASS2257",-70,-70);
addOffice("Iudex","LUCR3208",-70,-70);
addOffice("Iudex","TITI3271",-70,-70);
addOffice("Iudex","TREM3401",-70,-70);
addOffice("Iudex","VOLU2195",-66,-66);
addOffice("Iudex","AELI2635",-54,-54);
addOffice("Iudex","FURF2498",-52,-52);
addOffice("Iudex","VARI4596",-52,-52);
addOffice("Iudex","VELL2836",-52,-52);
addOffice("Iudex","TURP4565",-51,-51);
addOffice("Iudex","VETT4597",-51,-51);
addOffice("Iudex","LIVI2520",-50,-50);
addOffice("Iudex","SILI3262",-43,-43);
addOffice("Iudex","AEMI4567",-43,-43);
addOffice("Magister Equitum Designatus","IULI2597",-45,-45);
addOffice("Magister Equitum Designatus","DOMI2313",-45,-45);
addOffice("Praefectus Agris Dandis Assignandis","CLOV2655",-45,-45);
addOffice("Praefectus Agris Dandis Assignandis","ATEI2422",-44,-44);
addOffice("Praefectus Agris Dandis Assignandis","CUPI2700",-44,-44);
addOffice("Praefectus Agris Dandis Assignandis","PLAU3775",-44,-44);
addOffice("Triumvir Rei Publicae Constituendae","AEMI2341",-43,-43);
addOffice("Triumvir Rei Publicae Constituendae","ANTO2392",-43,-43);
addOffice("Triumvir Rei Publicae Constituendae","IULI2597",-43,-43);
addOffice("Triumvir Rei Publicae Constituendae","AEMI2341",-42,-42);
addOffice("Triumvir Rei Publicae Constituendae","ANTO2392",-42,-42);
addOffice("Triumvir Rei Publicae Constituendae","IULI2597",-42,-42);
addOffice("Triumvir Rei Publicae Constituendae","ANTO2392",-41,-41);
addOffice("Triumvir Rei Publicae Constituendae","IULI2597",-41,-41);
addOffice("Triumvir Rei Publicae Constituendae","AEMI2341",-41,-41);
addOffice("Triumvir Rei Publicae Constituendae","ANTO2392",-40,-40);
addOffice("Triumvir Rei Publicae Constituendae","IULI2597",-40,-40);
addOffice("Triumvir Rei Publicae Constituendae","AEMI2341",-40,-40);
addOffice("Triumvir Rei Publicae Constituendae","ANTO2392",-39,-39);
addOffice("Triumvir Rei Publicae Constituendae","IULI2597",-39,-39);
addOffice("Triumvir Rei Publicae Constituendae","AEMI2341",-39,-39);
addOffice("Triumvir Rei Publicae Constituendae","ANTO2392",-38,-38);
addOffice("Triumvir Rei Publicae Constituendae","IULI2597",-38,-38);
addOffice("Triumvir Rei Publicae Constituendae","AEMI2341",-38,-38);
addOffice("Triumvir Rei Publicae Constituendae","AEMI2341",-37,-37);
addOffice("Triumvir Rei Publicae Constituendae","ANTO2392",-37,-37);
addOffice("Triumvir Rei Publicae Constituendae","AEMI2341",-36,-36);
addOffice("Triumvir Rei Publicae Constituendae","ANTO2392",-36,-36);
addOffice("Triumvir Rei Publicae Constituendae","IULI2597",-36,-36);
addOffice("Triumvir Rei Publicae Constituendae","ANTO2392",-35,-35);
addOffice("Triumvir Rei Publicae Constituendae","IULI2597",-35,-35);
addOffice("Triumvir Rei Publicae Constituendae","ANTO2392",-34,-34);
addOffice("Triumvir Rei Publicae Constituendae","IULI2597",-34,-34);
addOffice("Triumvir Rei Publicae Constituendae","ANTO2392",-33,-33);
addOffice("Triumvir Rei Publicae Constituendae","IULI2597",-33,-33);
addOffice("Triumvir Rei Publicae Constituendae","ANTO2392",-32,-32);
addOffice("Triumvir Rei Publicae Constituendae","IULI2597",-32,-32);
addOffice("Legatus","AFRA5043",-169,-169);
addOffice("Legatus","CARV5044",-169,-169);
addOffice("Legatus","COPO3112",-151,-151);
addOffice("Legatus","ANON3117",-150,-101);
addOffice("Legatus","BILL1742",-101,-101);
addOffice("Legatus","COEL3435",-100,-75);
addOffice("Legatus","CLOE3676",-83,-83);
addOffice("Legatus","SEPT4600",-80,-80);
addOffice("Legatus","SEPT4600",-79,-79);
addOffice("Legatus","CORN2064",-76,-76);
addOffice("Legatus","POMP3776",-74,-74);
addOffice("Legatus","SENT3034",-68,-68);
addOffice("Legatus","SENT3034",-67,-67);
addOffice("Legatus","FALC2999",-67,-67);
addOffice("Legatus","POMP3776",-67,-67);
addOffice("Legatus","SABI3111",-60,-30);
addOffice("Legatus","APPU3452",-49,-49);
addOffice("Legatus","CAER2945",-32,-32);
addOffice("Legatus","OCTA2920",-31,-31);
addOffice("Legatus","PINA2795",-31,-31);
//addOffice("Triumvir - Unspecified","ANON3124",-509,-31);
addOffice("Triumvir - Unspecified","SERV3059",-60,-31);
//addOffice("Viocurus","COSC3125",-509,-43);
//addOffice("Viocurus","PULL3128",-509,-43);
addOffice("Curator Frumenti","MEMM3015",-34,-34);
addOffice("Flamen Iulialis","APPU3037",-50,-10);
addOffice("Flamen Iulialis","ANTO2392",-44,-31);
addOffice("Praefectus Fabrum","LUSI3809",-100,-1);
addOffice("Praefectus Fabrum","CORN3439",-78,-78);
addOffice("Praefectus Fabrum","LICI2085",-75,-75);
addOffice("Praefectus Fabrum","MARC2268",-66,-66);
addOffice("Praefectus Fabrum","VIBI4589",-63,-63);
addOffice("Praefectus Fabrum","CORN2819",-62,-62);
addOffice("Praefectus Fabrum","CORN2819",-61,-61);
addOffice("Praefectus Fabrum","CORN2819",-60,-60);
addOffice("Praefectus Fabrum","CORN2819",-59,-59);
addOffice("Praefectus Fabrum","ANON3462",-58,-50);
addOffice("Praefectus Fabrum","CLOD2511",-51,-51);
addOffice("Praefectus Fabrum","PACO2512",-51,-51);
addOffice("Praefectus Fabrum","PACO2512",-50,-50);
addOffice("Praefectus Fabrum","AMPI5090",-49,-49);
addOffice("Praefectus Fabrum","MAGI2552",-49,-49);
addOffice("Praefectus Fabrum","PLAN4578",-44,-44);
addOffice("Praefectus Fabrum","FLAV2744",-42,-42);
addOffice("Praefectus Fabrum","CORN2816",-41,-41);
addOffice("Praefectus Fabrum","ATIL4570",-41,-41);
addOffice("Praefectus Fabrum","VELL2836",-40,-40);
addOffice("Praefectus Fabrum","CORN2816",-40,-40);
addOffice("Praefectus Fabrum","CORN2816",-31,-31);
addOffice("Praefectus Fabrum","NUS5056",-30,-30);
addOffice("Praefectus Fabrum","SATA5058",-30,-30);
addOffice("Praefectus Socii","VIBE0677",-282,-282);
addOffice("Praefectus Socii","DECI5039",-217,-217);
addOffice("Praefectus Socii","ANIC5040",-216,-216);
addOffice("Praefectus Socii","NAEV0910",-214,-214);
addOffice("Praefectus Socii","ACCA0934",-212,-212);
addOffice("Praefectus Socii","TURP1735",-109,-109);
addOffice("Officer (Title Not Preserved)","CALP3344",-218,-203);
addOffice("Officer (Title Not Preserved)","CORN1090",-190,-190);
addOffice("Officer (Title Not Preserved)","FANN1523",-147,-147);
addOffice("Officer (Title Not Preserved)","FANN1523",-146,-146);
addOffice("Officer (Title Not Preserved)","CAEC1635",-143,-143);
addOffice("Officer (Title Not Preserved)","CAEC1635",-142,-142);
addOffice("Officer (Title Not Preserved)","CLAU3428",-125,-125);
addOffice("Officer (Title Not Preserved)","ATIL1669",-120,-120);
addOffice("Officer (Title Not Preserved)","TITI1770",-104,-104);
addOffice("Officer (Title Not Preserved)","ACIL4370",-89,-89);
addOffice("Officer (Title Not Preserved)","PETI5075",-89,-89);
addOffice("Officer (Title Not Preserved)","TERE5076",-89,-89);
addOffice("Officer (Title Not Preserved)","TERE5077",-89,-89);
addOffice("Officer (Title Not Preserved)","VETT5078",-89,-89);
addOffice("Officer (Title Not Preserved)","FORN5079",-89,-89);
addOffice("Officer (Title Not Preserved)","POMP1976",-89,-89);
addOffice("Officer (Title Not Preserved)","HOST5080",-89,-89);
addOffice("Officer (Title Not Preserved)","AEBU4369",-89,-89);
addOffice("Officer (Title Not Preserved)","ROSI5081",-89,-89);
addOffice("Officer (Title Not Preserved)","HERI5082",-89,-89);
addOffice("Officer (Title Not Preserved)","PONT5083",-89,-89);
addOffice("Officer (Title Not Preserved)","FULV5084",-89,-89);
addOffice("Officer (Title Not Preserved)","AMPU4375",-89,-89);
addOffice("Officer (Title Not Preserved)","MINU1934",-89,-89);
addOffice("Officer (Title Not Preserved)","BUSS4386",-89,-89);
addOffice("Officer (Title Not Preserved)","TULL2072",-89,-89);
addOffice("Officer (Title Not Preserved)","FULV3185",-89,-89);
addOffice("Officer (Title Not Preserved)","HIRT3707",-89,-89);
addOffice("Officer (Title Not Preserved)","LUCA3807",-89,-89);
addOffice("Officer (Title Not Preserved)","TARQ2058",-89,-89);
addOffice("Officer (Title Not Preserved)","INST2055",-89,-89);
addOffice("Officer (Title Not Preserved)","IUNI4621",-89,-89);
addOffice("Officer (Title Not Preserved)","LAET4622",-89,-89);
addOffice("Officer (Title Not Preserved)","MARC2567",-89,-89);
addOffice("Officer (Title Not Preserved)","NONI4623",-89,-89);
addOffice("Officer (Title Not Preserved)","NONI4624",-89,-89);
addOffice("Officer (Title Not Preserved)","OPIM4625",-89,-89);
addOffice("Officer (Title Not Preserved)","OPPI3230",-89,-89);
addOffice("Officer (Title Not Preserved)","OTAC4626",-89,-89);
addOffice("Officer (Title Not Preserved)","PEDA4627",-89,-89);
addOffice("Officer (Title Not Preserved)","PETR4628",-89,-89);
addOffice("Officer (Title Not Preserved)","POMP4629",-89,-89);
addOffice("Officer (Title Not Preserved)","SERG1998",-89,-89);
addOffice("Officer (Title Not Preserved)","VETU4630",-89,-89);
addOffice("Officer (Title Not Preserved)","COEL1956",-87,-87);
addOffice("Officer (Title Not Preserved)","LABI5110",-82,-81);
addOffice("Officer (Title Not Preserved)","CORN5131",-82,-81);
addOffice("Officer (Title Not Preserved)","ALBI2193",-82,-82);
addOffice("Officer (Title Not Preserved)","CALP3343",-81,-81);
addOffice("Officer (Title Not Preserved)","HIRT2033",-80,-80);
addOffice("Officer (Title Not Preserved)","HIRT3707",-80,-80);
addOffice("Officer (Title Not Preserved)","HIRT3707",-79,-79);
addOffice("Officer (Title Not Preserved)","FABI2013",-78,-72);
addOffice("Officer (Title Not Preserved)","HIRT3707",-78,-78);
addOffice("Officer (Title Not Preserved)","PERP5106",-77,-72);
addOffice("Officer (Title Not Preserved)","HERE2024",-77,-75);
addOffice("Officer (Title Not Preserved)","MARI2053",-77,-77);
addOffice("Officer (Title Not Preserved)","CORN2663",-77,-77);
addOffice("Officer (Title Not Preserved)","CORN3869",-77,-77);
addOffice("Officer (Title Not Preserved)","GEMI3700",-77,-77);
addOffice("Officer (Title Not Preserved)","HIRT3707",-77,-77);
addOffice("Officer (Title Not Preserved)","HERE2024",-76,-76);
addOffice("Officer (Title Not Preserved)","INST2055",-76,-76);
addOffice("Officer (Title Not Preserved)","HIRT3707",-76,-76);
addOffice("Officer (Title Not Preserved)","FANN2220",-75,-75);
addOffice("Officer (Title Not Preserved)","HERE2024",-75,-75);
addOffice("Officer (Title Not Preserved)","HIRT3707",-75,-75);
addOffice("Officer (Title Not Preserved)","FANN2220",-74,-74);
addOffice("Officer (Title Not Preserved)","AUFI2147",-73,-73);
addOffice("Officer (Title Not Preserved)","MANL2149",-73,-73);
addOffice("Officer (Title Not Preserved)","ANON2111",-73,-73);
addOffice("Officer (Title Not Preserved)","AUFI2147",-72,-72);
addOffice("Officer (Title Not Preserved)","MANL2149",-72,-72);
addOffice("Officer (Title Not Preserved)","VARI3847",-64,-64);
addOffice("Officer (Title Not Preserved)","CAES3341",-62,-62);
addOffice("Officer (Title Not Preserved)","SILI2411",-56,-56);
addOffice("Officer (Title Not Preserved)","TERR2412",-56,-56);
addOffice("Officer (Title Not Preserved)","VELA2414",-56,-56);
addOffice("Officer (Title Not Preserved)","TREB2473",-53,-53);
addOffice("Officer (Title Not Preserved)","FABR2528",-50,-50);
addOffice("Officer (Title Not Preserved)","CLAU2867",-50,-50);
addOffice("Officer (Title Not Preserved)","SERV5091",-49,-49);
addOffice("Officer (Title Not Preserved)","LICI2456",-49,-49);
addOffice("Officer (Title Not Preserved)","ANTI2461",-49,-49);
addOffice("Officer (Title Not Preserved)","RAES3340",-49,-49);
addOffice("Officer (Title Not Preserved)","LIGA3806",-49,-49);
addOffice("Officer (Title Not Preserved)","LIGA2506",-49,-49);
addOffice("Officer (Title Not Preserved)","RUPI2714",-49,-49);
addOffice("Officer (Title Not Preserved)","FULV3695",-48,-48);
addOffice("Officer (Title Not Preserved)","LICI2456",-48,-48);
addOffice("Officer (Title Not Preserved)","LIGA3806",-48,-48);
addOffice("Officer (Title Not Preserved)","LIGA2506",-48,-48);
addOffice("Officer (Title Not Preserved)","CARF2678",-47,-47);
addOffice("Officer (Title Not Preserved)","GALL2666",-47,-47);
addOffice("Officer (Title Not Preserved)","LIGA3806",-47,-47);
addOffice("Officer (Title Not Preserved)","LIGA2506",-47,-47);
addOffice("Officer (Title Not Preserved)","DOMI2313",-46,-46);
addOffice("Officer (Title Not Preserved)","HOST2620",-46,-46);
addOffice("Officer (Title Not Preserved)","VERG2267",-46,-46);
addOffice("Officer (Title Not Preserved)","MARC3115",-46,-46);
addOffice("Officer (Title Not Preserved)","APON3326",-46,-46);
addOffice("Officer (Title Not Preserved)","CORN3783",-46,-46);
addOffice("Officer (Title Not Preserved)","LIGA3806",-46,-46);
addOffice("Officer (Title Not Preserved)","LIGA2506",-46,-46);
addOffice("Officer (Title Not Preserved)","QUIN3826",-46,-46);
addOffice("Officer (Title Not Preserved)","CASS3424",-45,-45);
addOffice("Officer (Title Not Preserved)","CURT3443",-45,-45);
addOffice("Officer (Title Not Preserved)","LUCC5119",-44,-44);
addOffice("Officer (Title Not Preserved)","DELL2810",-44,-43);
addOffice("Officer (Title Not Preserved)","ANTI2461",-44,-44);
addOffice("Officer (Title Not Preserved)","FAVO2352",-43,-42);
addOffice("Officer (Title Not Preserved)","LIVI2520",-43,-42);
addOffice("Officer (Title Not Preserved)","QUIN2542",-43,-42);
addOffice("Officer (Title Not Preserved)","CASS2575",-43,-42);
addOffice("Officer (Title Not Preserved)","GELL2802",-43,-42);
addOffice("Officer (Title Not Preserved)","DELL2810",-43,-42);
addOffice("Officer (Title Not Preserved)","VOLU5130",-43,-43);
addOffice("Officer (Title Not Preserved)","CARF2678",-43,-43);
addOffice("Officer (Title Not Preserved)","CASS2742",-43,-43);
addOffice("Officer (Title Not Preserved)","DOMI2699",-43,-43);
addOffice("Officer (Title Not Preserved)","IUNI2747",-43,-43);
addOffice("Officer (Title Not Preserved)","BAGI3306",-43,-43);
addOffice("Officer (Title Not Preserved)","CALP2543",-43,-43);
addOffice("Officer (Title Not Preserved)","GALL2666",-43,-43);
addOffice("Officer (Title Not Preserved)","CLAU2867",-43,-43);
addOffice("Officer (Title Not Preserved)","ATIL5115",-42,-42);
addOffice("Officer (Title Not Preserved)","LUCI5120",-42,-42);
addOffice("Officer (Title Not Preserved)","TERE5127",-42,-42);
addOffice("Officer (Title Not Preserved)","VETU4701",-42,-42);
addOffice("Officer (Title Not Preserved)","VETU4702",-42,-42);
addOffice("Officer (Title Not Preserved)","VOLU5130",-42,-42);
addOffice("Officer (Title Not Preserved)","MINU2131",-42,-36);
addOffice("Officer (Title Not Preserved)","ANTI2461",-42,-36);
addOffice("Officer (Title Not Preserved)","MANL2725",-42,-42);
addOffice("Officer (Title Not Preserved)","DELL2810",-42,-32);
addOffice("Officer (Title Not Preserved)","LICI2860",-42,-42);
addOffice("Officer (Title Not Preserved)","AEMI2895",-42,-42);
addOffice("Officer (Title Not Preserved)","PETR3772",-42,-42);
addOffice("Officer (Title Not Preserved)","VOLU4558",-42,-42);
addOffice("Officer (Title Not Preserved)","DOMI2699",-42,-42);
addOffice("Officer (Title Not Preserved)","ANON2796",-42,-42);
addOffice("Officer (Title Not Preserved)","CALP2543",-42,-42);
addOffice("Officer (Title Not Preserved)","CASS2742",-42,-42);
addOffice("Officer (Title Not Preserved)","HIRT3706",-42,-42);
addOffice("Officer (Title Not Preserved)","RUPI2714",-42,-42);
addOffice("Officer (Title Not Preserved)","LUCI5120",-41,-30);
addOffice("Officer (Title Not Preserved)","TULL2563",-41,-41);
addOffice("Officer (Title Not Preserved)","TURU2692",-41,-41);
addOffice("Officer (Title Not Preserved)","CALP2543",-41,-41);
addOffice("Officer (Title Not Preserved)","TITI2834",-40,-40);
addOffice("Officer (Title Not Preserved)","CALP2543",-40,-40);
addOffice("Officer (Title Not Preserved)","CLAU2571",-39,-39);
addOffice("Officer (Title Not Preserved)","CALP2543",-39,-39);
addOffice("Officer (Title Not Preserved)","IUNI2747",-39,-39);
addOffice("Officer (Title Not Preserved)","CALP2543",-38,-38);
addOffice("Officer (Title Not Preserved)","LICI3837",-37,-37);
addOffice("Officer (Title Not Preserved)","CAE3309",-37,-37);
addOffice("Officer (Title Not Preserved)","AUFI3312",-37,-37);
addOffice("Officer (Title Not Preserved)","ANON3319",-37,-37);
addOffice("Officer (Title Not Preserved)","AN-3071",-37,-37);
addOffice("Officer (Title Not Preserved)","ANNI3322",-37,-37);
addOffice("Officer (Title Not Preserved)","ANNI3293",-37,-37);
addOffice("Officer (Title Not Preserved)","ATEI2479",-37,-37);
addOffice("Officer (Title Not Preserved)","CALP3342",-37,-37);
addOffice("Officer (Title Not Preserved)","CALP2543",-37,-37);
addOffice("Officer (Title Not Preserved)","ANON3423",-37,-37);
addOffice("Officer (Title Not Preserved)","ANON3765",-37,-37);
addOffice("Officer (Title Not Preserved)","CORN3074",-37,-37);
addOffice("Officer (Title Not Preserved)","TREB3859",-37,-37);
addOffice("Officer (Title Not Preserved)","CARI2872",-36,-36);
addOffice("Officer (Title Not Preserved)","AUFI3312",-36,-36);
addOffice("Officer (Title Not Preserved)","CAE3309",-36,-36);
addOffice("Officer (Title Not Preserved)","ANON3319",-36,-36);
addOffice("Officer (Title Not Preserved)","AN-3071",-36,-36);
addOffice("Officer (Title Not Preserved)","ANNI3322",-36,-36);
addOffice("Officer (Title Not Preserved)","ANNI3293",-36,-36);
addOffice("Officer (Title Not Preserved)","ATEI2479",-36,-36);
addOffice("Officer (Title Not Preserved)","CALP3342",-36,-36);
addOffice("Officer (Title Not Preserved)","CALP2543",-36,-36);
addOffice("Officer (Title Not Preserved)","ANON3423",-36,-36);
addOffice("Officer (Title Not Preserved)","ANON3765",-36,-36);
addOffice("Officer (Title Not Preserved)","CORN3074",-36,-36);
addOffice("Officer (Title Not Preserved)","LICI3837",-36,-36);
addOffice("Officer (Title Not Preserved)","TREB3859",-36,-36);
addOffice("Officer (Title Not Preserved)","MINU2131",-35,-35);
addOffice("Officer (Title Not Preserved)","ANTI2461",-35,-35);
addOffice("Officer (Title Not Preserved)","NASI2562",-35,-35);
addOffice("Officer (Title Not Preserved)","CASS2723",-35,-35);
addOffice("Officer (Title Not Preserved)","AEMI3935",-35,-35);
addOffice("Officer (Title Not Preserved)","DELL2810",-31,-31);
addOffice("Officer (Title Not Preserved)","LICI2860",-31,-31);
addOffice("Officer (Title Not Preserved)","AEMI3935",-31,-31);
addOffice("Officer (Title Not Preserved)","CAEC2949",-31,-31);
addOffice("Officer (Title Not Preserved)","CAEC3421",-31,-31);
addOffice("Decemvir Sacris Faciundis","LAET0034",-495,-495);
addOffice("Decemvir Sacris Faciundis","OGUL0632",-300,-257);
addOffice("Decemvir Sacris Faciundis","AEMI0785",-240,-237);
addOffice("Decemvir Sacris Faciundis","LIVI0786",-240,-237);
addOffice("Decemvir Sacris Faciundis","AEMI0785",-236,-211);
addOffice("Decemvir Sacris Faciundis","POMP0853",-230,-205);
addOffice("Decemvir Sacris Faciundis","PAPI0921",-220,-219);
addOffice("Decemvir Sacris Faciundis","SEMP0833",-220,-211);
addOffice("Decemvir Sacris Faciundis","SERV0931",-220,-212);
addOffice("Decemvir Sacris Faciundis","PAPI0921",-218,-213);
addOffice("Decemvir Sacris Faciundis","MUCI0822",-215,-210);
addOffice("Decemvir Sacris Faciundis","CORN0923",-215,-213);
addOffice("Decemvir Sacris Faciundis","CORN0938",-213,-173);
addOffice("Decemvir Sacris Faciundis","CORN1023",-213,-173);
addOffice("Decemvir Sacris Faciundis","CORN0923",-212,-212);
addOffice("Decemvir Sacris Faciundis","SERV0931",-211,-180);
addOffice("Decemvir Sacris Faciundis","AEMI4635",-211,-211);
addOffice("Decemvir Sacris Faciundis","SEMP0833",-210,-210);
addOffice("Decemvir Sacris Faciundis","SEMP0976",-210,-174);
addOffice("Decemvir Sacris Faciundis","MUCI0822",-209,-209);
addOffice("Decemvir Sacris Faciundis","LAET0869",-209,-194);
addOffice("Decemvir Sacris Faciundis","POMP0853",-204,-204);
addOffice("Decemvir Sacris Faciundis","AURE0870",-204,-200);
addOffice("Decemvir Sacris Faciundis","ACIL1063",-200,-190);
addOffice("Decemvir Sacris Faciundis","AEMI1024",-190,-173);
addOffice("Decemvir Sacris Faciundis","CLAU1229",-190,-170);
addOffice("Decemvir Sacris Faciundis","MARC1205",-180,-164);
addOffice("Decemvir Sacris Faciundis","POST1172",-175,-167);
addOffice("Decemvir Sacris Faciundis","SEMP1338",-174,-174);
addOffice("Decemvir Sacris Faciundis","CORN0985",-173,-173);
addOffice("Decemvir Sacris Faciundis","VALE1460",-172,-154);
addOffice("Decemvir Sacris Faciundis","VALE1201",-172,-172);
addOffice("Decemvir Sacris Faciundis","AEMI1024",-172,-172);
addOffice("Decemvir Sacris Faciundis","OCTA1356",-169,-162);
addOffice("Decemvir Sacris Faciundis","CLAU1229",-169,-169);
addOffice("Decemvir Sacris Faciundis","POST1420",-168,-145);
addOffice("Decemvir Sacris Faciundis","AEMI1471",-165,-144);
addOffice("Decemvir Sacris Faciundis","CORN1465",-160,-141);
addOffice("Decemvir Sacris Faciundis","OPIM1476",-154,-154);
addOffice("Decemvir Sacris Faciundis","AEMI1471",-143,-143);
addOffice("Decemvir Sacris Faciundis","CORN1465",-140,-130);
addOffice("Decemvir Sacris Faciundis","CORN1506",-140,-139);
addOffice("Decemvir Sacris Faciundis","CORN1746",-100,-87);
addOffice("Decemvir Sacris Faciundis","POMP1805",-95,-89);
addOffice("Decemvir Sacris Faciundis","COEL4647",-95,-81);
addOffice("Decemvir Sacris Faciundis","POMP1805",-88,-88);
addOffice("Decemvir Sacris Faciundis","COEL3127",-81,-81);
addOffice("Decemvir Sacris Faciundis","QUIN3291",-50,-50);
addOffice("Monetalis","AELI3480",-211,-211);
addOffice("Monetalis","QUIN3747",-211,-211);
addOffice("Monetalis","CORN0980",-211,-211);
addOffice("Monetalis","CORN0980",-210,-210);
addOffice("Monetalis","AELI3480",-210,-210);
addOffice("Monetalis","QUIN3747",-210,-210);
addOffice("Monetalis","CORN0980",-209,-209);
addOffice("Monetalis","AELI3480",-209,-209);
addOffice("Monetalis","TERE3485",-209,-209);
addOffice("Monetalis","AELI3487",-209,-209);
addOffice("Monetalis","AELI3480",-208,-208);
addOffice("Monetalis","TERE3485",-208,-208);
addOffice("Monetalis","AELI3487",-208,-208);
addOffice("Monetalis","LUTA3665",-206,-200);
addOffice("Monetalis","TERE3485",-206,-200);
addOffice("Monetalis","DURM3746",-199,-170);
addOffice("Monetalis","PL[A3544",-192,-192);
addOffice("Monetalis","CAEC3614",-192,-192);
addOffice("Monetalis","MAEN3639",-192,-192);
addOffice("Monetalis","BAEB3679",-192,-192);
addOffice("Monetalis","AURE3748",-192,-192);
addOffice("Monetalis","AUTR3482",-189,-180);
addOffice("Monetalis","CALP3530",-189,-180);
addOffice("Monetalis","MAMI3564",-189,-180);
addOffice("Monetalis","TITI3609",-189,-180);
addOffice("Monetalis","MARI3657",-189,-180);
addOffice("Monetalis","FURI3666",-189,-180);
addOffice("Monetalis","Q[UI3672",-189,-180);
addOffice("Monetalis","ANON3673",-189,-180);
addOffice("Monetalis","FURI1323",-189,-180);
addOffice("Monetalis","DOMI1366",-189,-180);
addOffice("Monetalis","MAEN1383",-189,-180);
addOffice("Monetalis","COEL1393",-189,-180);
addOffice("Monetalis","DECI1239",-184,-184);
addOffice("Monetalis","MATI3613",-179,-170);
addOffice("Monetalis","FURI3650",-179,-170);
addOffice("Monetalis","IUVE3678",-179,-170);
addOffice("Monetalis","ACIL3483",-169,-158);
addOffice("Monetalis","SAE[3516",-169,-158);
addOffice("Monetalis","CORN3528",-169,-158);
addOffice("Monetalis","LICI1520",-169,-158);
addOffice("Monetalis","OPEI3626",-169,-158);
addOffice("Monetalis","OPEI3627",-169,-158);
addOffice("Monetalis","AELI3646",-169,-158);
addOffice("Monetalis","FURI3651",-169,-158);
addOffice("Monetalis","CLUV3669",-169,-158);
addOffice("Monetalis","PAPI3683",-169,-158);
addOffice("Monetalis","VALE3684",-169,-158);
addOffice("Monetalis","TERE1537",-169,-158);
addOffice("Monetalis","CAEC1193",-169,-158);
addOffice("Monetalis","OPIM1476",-169,-158);
addOffice("Monetalis","CLUV3778",-169,-158);
addOffice("Monetalis","CORN1390",-169,-158);
addOffice("Monetalis","PINA3623",-155,-155);
addOffice("Monetalis","ATIL3668",-155,-155);
addOffice("Monetalis","CAEC1424",-155,-149);
addOffice("Monetalis","IUVE3521",-154,-154);
addOffice("Monetalis","SCRI1269",-154,-154);
addOffice("Monetalis","MAIA3503",-153,-153);
addOffice("Monetalis","SAUF3579",-152,-152);
addOffice("Monetalis","CORN3629",-151,-151);
addOffice("Monetalis","ANON3667",-150,-150);
addOffice("Monetalis","DECI5163",-150,-150);
addOffice("Monetalis","IUNI3502",-149,-149);
addOffice("Monetalis","ITIU3560",-149,-149);
addOffice("Monetalis","PINA3623",-149,-149);
addOffice("Monetalis","SEMP3580",-148,-148);
addOffice("Monetalis","ATIL3593",-148,-148);
addOffice("Monetalis","MARC3656",-148,-148);
addOffice("Monetalis","TERE3522",-147,-147);
addOffice("Monetalis","CUPI3556",-147,-147);
addOffice("Monetalis","ANTE3489",-146,-146);
addOffice("Monetalis","IUNI1534",-145,-145);
addOffice("Monetalis","ANNI1616",-144,-144);
addOffice("Monetalis","CURI3497",-142,-142);
addOffice("Monetalis","TITI3523",-141,-141);
addOffice("Monetalis","IULI1532",-141,-141);
addOffice("Monetalis","ATIL1669",-141,-141);
addOffice("Monetalis","VALE3524",-140,-140);
addOffice("Monetalis","AUFI3594",-140,-140);
addOffice("Monetalis","SPUR3479",-139,-139);
addOffice("Monetalis","AURE3595",-139,-139);
addOffice("Monetalis","RENI3515",-138,-138);
addOffice("Monetalis","GELL3533",-138,-138);
addOffice("Monetalis","AELI3628",-138,-138);
addOffice("Monetalis","BAEB3597",-137,-137);
addOffice("Monetalis","VETU3682",-137,-137);
addOffice("Monetalis","POMP1675",-137,-137);
addOffice("Monetalis","SERV3519",-136,-136);
addOffice("Monetalis","LUCR3534",-136,-136);
addOffice("Monetalis","ANTE3545",-136,-136);
addOffice("Monetalis","MINU3491",-135,-135);
addOffice("Monetalis","CURI3498",-135,-135);
addOffice("Monetalis","TREB3582",-135,-135);
addOffice("Monetalis","ABUR3486",-134,-134);
addOffice("Monetalis","MARC3605",-134,-134);
addOffice("Monetalis","MINU3681",-134,-134);
addOffice("Monetalis","NUMI3511",-133,-133);
addOffice("Monetalis","MINU3567",-133,-133);
addOffice("Monetalis","CALP3632",-133,-133);
addOffice("Monetalis","ABUR3589",-132,-132);
addOffice("Monetalis","FABR3601",-132,-132);
addOffice("Monetalis","MAEN3640",-132,-132);
addOffice("Monetalis","POST1800",-131,-131);
addOffice("Monetalis","OPIM1639",-131,-131);
addOffice("Monetalis","OPIM3126",-131,-131);
addOffice("Monetalis","ACIL3590",-130,-130);
addOffice("Monetalis","VARG3611",-130,-130);
addOffice("Monetalis","CAEC1787",-130,-130);
addOffice("Monetalis","CAEC1693",-130,-130);
addOffice("Monetalis","MARC3659",-129,-129);
addOffice("Monetalis","IULI1642",-129,-129);
addOffice("Monetalis","DOMI3532",-128,-128);
addOffice("Monetalis","CLOE3675",-128,-128);
addOffice("Monetalis","CAEC1649",-128,-128);
addOffice("Monetalis","CAEC1665",-128,-128);
addOffice("Monetalis","SERV3518",-127,-127);
addOffice("Monetalis","FABI1615",-127,-127);
addOffice("Monetalis","CAEC1677",-127,-127);
addOffice("Monetalis","CASS3492",-126,-126);
addOffice("Monetalis","FABI3622",-126,-126);
addOffice("Monetalis","QUIN3825",-126,-126);
addOffice("Monetalis","PORC3607",-125,-125);
addOffice("Monetalis","ACIL1680",-125,-125);
addOffice("Monetalis","CAEC1701",-125,-125);
addOffice("Monetalis","FABI2959",-124,-124);
addOffice("Monetalis","FANN3602",-123,-123);
addOffice("Monetalis","PORC1682",-123,-123);
addOffice("Monetalis","MINU1687",-122,-122);
addOffice("Monetalis","PAPI1696",-122,-122);
addOffice("Monetalis","PLUT3513",-121,-121);
addOffice("Monetalis","PAPI1689",-121,-121);
addOffice("Monetalis","TULL3610",-120,-120);
addOffice("Monetalis","FURI3603",-119,-119);
addOffice("Monetalis","MANL3476",-118,-118);
addOffice("Monetalis","MARC3655",-118,-118);
addOffice("Monetalis","ANON3786",-118,-118);
addOffice("Monetalis","ROSC3830",-118,-118);
addOffice("Monetalis","PUBL3505",-118,-118);
addOffice("Monetalis","CORN3531",-118,-107);
addOffice("Monetalis","POMP3573",-118,-118);
addOffice("Monetalis","PORC3574",-118,-118);
addOffice("Monetalis","CAEC1787",-117,-117);
addOffice("Monetalis","FULV3536",-117,-117);
addOffice("Monetalis","CALI3598",-117,-117);
addOffice("Monetalis","MANL3476",-117,-117);
addOffice("Monetalis","MARC3655",-117,-117);
addOffice("Monetalis","CAEC1693",-117,-117);
addOffice("Monetalis","ANON3786",-117,-117);
addOffice("Monetalis","ROSC3830",-117,-117);
addOffice("Monetalis","CAEC1693",-116,-116);
addOffice("Monetalis","SERG1834",-116,-116);
addOffice("Monetalis","FULV3536",-116,-116);
addOffice("Monetalis","CALI3598",-116,-116);
addOffice("Monetalis","CAEC1787",-116,-116);
addOffice("Monetalis","IUNI0885",-116,-116);
addOffice("Monetalis","IUNI0885",-115,-115);
addOffice("Monetalis","CORN3527",-115,-115);
addOffice("Monetalis","CIPI3600",-115,-115);
addOffice("Monetalis","SERG1834",-115,-115);
addOffice("Monetalis","FONT3500",-114,-114);
addOffice("Monetalis","AEMI3617",-114,-114);
addOffice("Monetalis","CORN3527",-114,-114);
addOffice("Monetalis","CIPI3600",-114,-114);
addOffice("Monetalis","LICI1760",-113,-113);
addOffice("Monetalis","DIDI1776",-113,-113);
addOffice("Monetalis","MANL1833",-113,-113);
addOffice("Monetalis","MARC3571",-113,-113);
addOffice("Monetalis","FONT3500",-113,-113);
addOffice("Monetalis","AEMI3617",-113,-113);
addOffice("Monetalis","CORN3529",-112,-112);
addOffice("Monetalis","CAES3549",-112,-112);
addOffice("Monetalis","Q[UI3680",-112,-112);
addOffice("Monetalis","MARC3571",-112,-112);
addOffice("Monetalis","DIDI1776",-112,-112);
addOffice("Monetalis","MANL1833",-112,-112);
addOffice("Monetalis","LICI1760",-112,-112);
addOffice("Monetalis","MANL1745",-111,-111);
addOffice("Monetalis","CLAU1807",-111,-111);
addOffice("Monetalis","CORN3529",-111,-111);
addOffice("Monetalis","CAES3549",-111,-111);
addOffice("Monetalis","Q[UI3680",-111,-111);
addOffice("Monetalis","PORC3638",-110,-110);
addOffice("Monetalis","MANL1745",-110,-110);
addOffice("Monetalis","CLAU1807",-110,-110);
addOffice("Monetalis","AQUI1757",-109,-109);
addOffice("Monetalis","FLAM2687",-109,-109);
addOffice("Monetalis","MEMM1714",-109,-109);
addOffice("Monetalis","PORC3638",-109,-109);
addOffice("Monetalis","LUTA1878",-109,-109);
addOffice("Monetalis","MEMM1714",-108,-108);
addOffice("Monetalis","VALE1815",-108,-108);
addOffice("Monetalis","HERE1819",-108,-108);
addOffice("Monetalis","LUTA1878",-108,-108);
addOffice("Monetalis","FONT3619",-108,-108);
addOffice("Monetalis","AQUI1757",-108,-108);
addOffice("Monetalis","FLAM2687",-108,-108);
addOffice("Monetalis","FONT3619",-107,-107);
addOffice("Monetalis","HERE1819",-107,-107);
addOffice("Monetalis","VALE1815",-107,-107);
addOffice("Monetalis","SULP3520",-106,-106);
addOffice("Monetalis","MEMM1714",-106,-106);
addOffice("Monetalis","CORN1882",-106,-106);
addOffice("Monetalis","AURE1774",-105,-105);
addOffice("Monetalis","HOST3559",-105,-105);
addOffice("Monetalis","THOR2034",-105,-105);
addOffice("Monetalis","COEL1744",-104,-104);
addOffice("Monetalis","IULI1825",-103,-103);
addOffice("Monetalis","MINU1901",-103,-103);
addOffice("Monetalis","FABI1964",-102,-102);
addOffice("Monetalis","FABI3499",-102,-102);
addOffice("Monetalis","CASS3550",-102,-102);
addOffice("Monetalis","IULI3561",-101,-101);
addOffice("Monetalis","LUCI3604",-101,-101);
addOffice("Monetalis","SENT3384",-101,-101);
addOffice("Monetalis","SERV3608",-100,-100);
addOffice("Monetalis","SERV3645",-100,-100);
addOffice("Monetalis","CORN3780",-100,-100);
addOffice("Monetalis","VETT3642",-99,-99);
addOffice("Monetalis","CLOE3676",-98,-98);
addOffice("Monetalis","POMP3572",-97,-97);
addOffice("Monetalis","EGNA3449",-97,-97);
addOffice("Monetalis","PUBL3504",-96,-96);
addOffice("Monetalis","CAEC2150",-96,-96);
addOffice("Monetalis","POST3391",-96,-96);
addOffice("Monetalis","ALLI3488",-92,-92);
addOffice("Monetalis","IUNI3538",-91,-91);
addOffice("Monetalis","VIBI3526",-90,-90);
addOffice("Monetalis","TITI3663",-90,-90);
addOffice("Monetalis","CALP1896",-90,-90);
addOffice("Monetalis","PORC3599",-89,-89);
addOffice("Monetalis","TITU2076",-89,-89);
addOffice("Monetalis","MARC1947",-88,-88);
addOffice("Monetalis","CORN2064",-88,-88);
addOffice("Monetalis","OPPI1892",-88,-88);
addOffice("Monetalis","FONT1965",-88,-88);
addOffice("Monetalis","MEMM2020",-87,-87);
addOffice("Monetalis","RUBR3576",-87,-87);
addOffice("Monetalis","MEMM1898",-87,-87);
addOffice("Monetalis","GARG3542",-86,-86);
addOffice("Monetalis","OGUL3625",-86,-86);
addOffice("Monetalis","VERG1942",-86,-86);
addOffice("Monetalis","IULI3562",-85,-85);
addOffice("Monetalis","FONT3620",-85,-85);
addOffice("Monetalis","CASS2050",-84,-84);
addOffice("Monetalis","LICI2103",-84,-84);
addOffice("Monetalis","FURI1987",-84,-84);
addOffice("Monetalis","LIVI2018",-84,-84);
addOffice("Monetalis","NORB3510",-83,-83);
addOffice("Monetalis","IUVE3587",-83,-83);
addOffice("Monetalis","FABI2013",-82,-82);
addOffice("Monetalis","TARQ2015",-82,-82);
addOffice("Monetalis","MAMI3506",-82,-82);
addOffice("Monetalis","MARC3552",-82,-82);
addOffice("Monetalis","CREP3635",-82,-82);
addOffice("Monetalis","POST3478",-81,-81);
addOffice("Monetalis","MARI3507",-81,-81);
addOffice("Monetalis","VOLU3586",-81,-81);
addOffice("Monetalis","CAEC1889",-81,-81);
addOffice("Monetalis","FABI2013",-81,-81);
addOffice("Monetalis","TARQ2015",-81,-81);
addOffice("Monetalis","MANL2014",-80,-80);
addOffice("Monetalis","PUBL2025",-80,-80);
addOffice("Monetalis","PROC2405",-80,-80);
addOffice("Monetalis","NAEV3509",-79,-79);
addOffice("Monetalis","PAPI3569",-79,-79);
addOffice("Monetalis","CLAU2248",-79,-79);
addOffice("Monetalis","CASS3551",-78,-78);
addOffice("Monetalis","VOLT3612",-78,-78);
addOffice("Monetalis","SATR3643",-77,-77);
addOffice("Monetalis","RUTI3256",-77,-77);
addOffice("Monetalis","LUCR3563",-76,-76);
addOffice("Monetalis","RUST3577",-76,-76);
addOffice("Monetalis","EGNA3176",-75,-75);
addOffice("Monetalis","FARS3557",-75,-75);
addOffice("Monetalis","COSS3554",-74,-74);
addOffice("Monetalis","POST3792",-74,-74);
addOffice("Monetalis","POMP3661",-73,-73);
addOffice("Monetalis","CREP3653",-72,-72);
addOffice("Monetalis","AXIU3547",-71,-71);
addOffice("Monetalis","AQUI3618",-71,-71);
addOffice("Monetalis","MUCI2191",-70,-70);
addOffice("Monetalis","FUFI2321",-70,-70);
addOffice("Monetalis","VETT2344",-70,-70);
addOffice("Monetalis","PLAE2169",-69,-69);
addOffice("Monetalis","CALP2366",-67,-67);
addOffice("Monetalis","POMP3660",-66,-66);
addOffice("Monetalis","MANL2198",-65,-65);
addOffice("Monetalis","ROSC2424",-64,-64);
addOffice("Monetalis","CASS2575",-63,-63);
addOffice("Monetalis","AEMI2350",-62,-62);
addOffice("Monetalis","SCRI3080",-62,-62);
addOffice("Monetalis","SCRI2518",-62,-62);
addOffice("Monetalis","AEMI2341",-61,-61);
addOffice("Monetalis","PUPI2661",-61,-61);
addOffice("Monetalis","PLAU2265",-60,-60);
addOffice("Monetalis","NONI2403",-59,-59);
addOffice("Monetalis","CONS3495",-57,-57);
addOffice("Monetalis","SERV3517",-57,-57);
addOffice("Monetalis","MARC2534",-56,-56);
addOffice("Monetalis","MEMM2439",-56,-56);
addOffice("Monetalis","CORN2300",-56,-56);
addOffice("Monetalis","FONT3636",-55,-55);
addOffice("Monetalis","PLAN2312",-55,-55);
addOffice("Monetalis","CASS2481",-55,-55);
addOffice("Monetalis","POMP2478",-54,-54);
addOffice("Monetalis","IUNI2459",-54,-54);
addOffice("Monetalis","VALE3615",-53,-53);
addOffice("Monetalis","VINI2496",-52,-52);
addOffice("Monetalis","SULP3671",-51,-51);
addOffice("Monetalis","COEL2524",-51,-51);
addOffice("Monetalis","CORN2572",-50,-50);
addOffice("Monetalis","ACIL3616",-49,-49);
addOffice("Monetalis","SICI3662",-49,-49);
addOffice("Monetalis","CORN2356",-49,-49);
addOffice("Monetalis","HOST2684",-48,-48);
addOffice("Monetalis","IUNI2489",-48,-48);
addOffice("Monetalis","LICI3474",-47,-47);
addOffice("Monetalis","ANTI3490",-47,-47);
addOffice("Monetalis","PLAU3775",-47,-47);
addOffice("Monetalis","CONS3496",-46,-46);
addOffice("Monetalis","PAPI3570",-45,-45);
addOffice("Monetalis","VALE3584",-45,-45);
addOffice("Monetalis","LOLL2890",-45,-45);
addOffice("Monetalis","SEPU3644",-44,-44);
addOffice("Monetalis","METT2367",-44,-44);
addOffice("Monetalis","CORN2394",-43,-43);
addOffice("Monetalis","ACCO3630",-43,-43);
addOffice("Monetalis","PETI3648",-43,-43);
addOffice("Monetalis","FLAM2687",-43,-43);
addOffice("Monetalis","AQUI2618",-42,-42);
addOffice("Monetalis","AQUI2618",-42,-42);
addOffice("Monetalis","CORN2394",-42,-42);
addOffice("Monetalis","NUMO3512",-41,-41);
addOffice("Monetalis","SERV3581",-41,-41);
addOffice("Monetalis","ARRI3592",-41,-41);
addOffice("Monetalis","CLOD3097",-41,-41);
addOffice("Monetalis","LABI2777",-40,-40);
addOffice("Monetalis","SEMP3052",-40,-40);
addOffice("Monetalis","VOCO3061",-39,-39);
addOffice("Monetalis","PINA3670",-31,-31);
addOffice("Monetalis","CALP2543",-31,-31);
addOffice("Praefectus Evocatorum","ANTO2503",-51,-51);
addOffice("Praefectus Aerario","CUSI2665",-45,-45);
addOffice("Augur","VALE0037",-495,-463);
addOffice("Augur","VERG0091",-463,-463);
addOffice("Augur","VALE0132",-463,-463);
addOffice("Augur","POST0126",-462,-462);
addOffice("Augur","POST0125",-462,-439);
addOffice("Augur","VETU0157",-453,-453);
addOffice("Augur","HORA0165",-453,-453);
addOffice("Augur","POST0258",-439,-439);
addOffice("Augur","SERV0244",-439,-390);
addOffice("Augur","SERV0342",-390,-386);
addOffice("Augur","FURI0338",-390,-390);
addOffice("Augur","PUBL0635",-300,-300);
addOffice("Augur","AELI0542",-300,-300);
addOffice("Augur","GENU0633",-300,-300);
addOffice("Augur","MARC0601",-300,-260);
addOffice("Augur","MINU0634",-300,-300);
addOffice("Augur","FABI0712",-265,-241);
addOffice("Augur","MAMI0740",-260,-260);
addOffice("Augur","MAMI0740",-259,-259);
addOffice("Augur","IULI4658",-255,-251);
addOffice("Augur","MAMI0778",-254,-254);
addOffice("Augur","FABI0712",-240,-203);
addOffice("Augur","POMP0853",-230,-205);
addOffice("Augur","AEMI0792",-230,-217);
addOffice("Augur","CARV0789",-230,-212);
addOffice("Augur","CLAU0810",-228,-225);
addOffice("Augur","FURI0814",-225,-215);
addOffice("Augur","CLAU0810",-224,-208);
addOffice("Augur","OTAC0856",-220,-212);
addOffice("Augur","ATIL0835",-220,-218);
addOffice("Augur","ATIL0835",-217,-216);
addOffice("Augur","AEMI0792",-216,-216);
addOffice("Augur","CORN0877",-215,-185);
addOffice("Augur","FURI0814",-214,-214);
addOffice("Augur","QUIN0977",-213,-170);
addOffice("Augur","OTAC0856",-211,-211);
addOffice("Augur","SERV0953",-211,-167);
addOffice("Augur","CARV0789",-211,-211);
addOffice("Augur","SEMP0976",-210,-174);
addOffice("Augur","AELI1006",-208,-174);
addOffice("Augur","POMP0853",-204,-204);
addOffice("Augur","SEMP1182",-204,-153);
addOffice("Augur","FABI1097",-203,-196);
addOffice("Augur","FABI1053",-203,-196);
addOffice("Augur","CLAU1125",-195,-167);
addOffice("Augur","AEMI1134",-192,-192);
addOffice("Augur","AEMI1134",-191,-160);
addOffice("Augur","POST1170",-184,-180);
addOffice("Augur","CORN0877",-184,-184);
addOffice("Augur","CORN1285",-180,-180);
addOffice("Augur","VETU1337",-174,-174);
addOffice("Augur","AELI1312",-174,-167);
addOffice("Augur","QUIN1449",-167,-150);
addOffice("Augur","CORN1504",-160,-141);
addOffice("Augur","SULP1417",-155,-131);
addOffice("Augur","AEMI1553",-155,-126);
addOffice("Augur","CAEC1424",-155,-141);
addOffice("Augur","PORC0907",-150,-149);
addOffice("Augur","LAEL1524",-150,-141);
addOffice("Augur","CLAU1452",-149,-130);
addOffice("Augur","SEMP1525",-145,-143);
addOffice("Augur","SEMP1525",-142,-133);
addOffice("Augur","CAEC1424",-140,-115);
addOffice("Augur","CORN1504",-140,-129);
addOffice("Augur","IUNI1565",-140,-130);
addOffice("Augur","LAEL1524",-140,-140);
addOffice("Augur","MUCI1613",-135,-130);
addOffice("Augur","FANN1523",-133,-133);
addOffice("Augur","FANN1523",-132,-122);
addOffice("Augur","MUCI1613",-129,-88);
addOffice("Augur","IUNI1565",-129,-129);
addOffice("Augur","AEMI1553",-125,-124);
addOffice("Augur","AEMI1645",-123,-88);
addOffice("Augur","AEMI1553",-123,-123);
addOffice("Augur","SERV2973",-120,-103);
addOffice("Augur","SULP1662",-115,-110);
addOffice("Augur","CAEC1693",-115,-115);
addOffice("Augur","SULP1662",-109,-109);
addOffice("Augur","LICI1679",-105,-92);
addOffice("Augur","SERV2973",-102,-99);
addOffice("Augur","SERV1779",-101,-101);
addOffice("Augur","ANTO1705",-100,-88);
addOffice("Augur","MARI1660",-98,-98);
addOffice("Augur","MARI1660",-97,-86);
addOffice("Augur","COEL4647",-95,-81);
addOffice("Augur","MARC1764",-95,-76);
addOffice("Augur","FONT1867",-91,-91);
addOffice("Augur","LICI1679",-91,-91);
addOffice("Augur","CORN1746",-88,-88);
addOffice("Augur","CORN1882",-88,-82);
addOffice("Augur","IULI2044",-88,-80);
addOffice("Augur","ANTO1705",-87,-87);
addOffice("Augur","CORN1746",-83,-78);
addOffice("Augur","CORN1746",-82,-82);
addOffice("Augur","CLAU2021",-81,-52);
addOffice("Augur","CORN1746",-81,-78);
addOffice("Augur","IULI2044",-79,-40);
addOffice("Augur","POMP1976",-77,-72);
addOffice("Augur","VALE2536",-77,-31);
addOffice("Augur","AURE2026",-77,-67);
addOffice("Augur","LICI1903",-77,-57);
addOffice("Augur","HORT1902",-75,-68);
addOffice("Augur","POMP1976",-71,-48);
addOffice("Augur","CAEC2040",-70,-64);
addOffice("Augur","HORT1902",-67,-50);
addOffice("Augur","SERV2433",-65,-47);
addOffice("Augur","CLAU2140",-65,-64);
addOffice("Augur","CAEC2040",-63,-59);
addOffice("Augur","CLAU2140",-63,-48);
addOffice("Augur","COEL3127",-62,-62);
addOffice("Augur","CORN2300",-60,-58);
addOffice("Augur","CORN2394",-57,-42);
addOffice("Augur","CORN2300",-57,-46);
addOffice("Augur","LICI1903",-56,-56);
addOffice("Augur","MARC2534",-56,-33);
addOffice("Augur","SULP2316",-55,-50);
addOffice("Augur","CASS2481",-55,-47);
addOffice("Augur","LICI2372",-55,-53);
addOffice("Augur","TULL2072",-53,-43);
addOffice("Augur","CLAU2021",-51,-51);
addOffice("Augur","MUCI2440",-50,-50);
addOffice("Augur","ANTO2392",-50,-31);
addOffice("Augur","MUCI2440",-49,-46);
addOffice("Augur","SULP2316",-49,-43);
addOffice("Augur","CORN2573",-48,-48);
addOffice("Augur","VATI2297",-47,-42);
addOffice("Augur","CORN2774",-47,-42);
addOffice("Augur","HIRT2449",-47,-47);
addOffice("Augur","IULI1957",-47,-44);
addOffice("Augur","SERV2433",-46,-41);
addOffice("Augur","CORN2573",-46,-42);
addOffice("Augur","HIRT2449",-46,-43);
addOffice("Augur","VIBI2495",-45,-44);
addOffice("Augur","APPU2639",-45,-45);
addOffice("Augur","VIBI2495",-43,-43);
addOffice("Augur","IULI2597",-43,-31);
addOffice("Augur","SEMP2823",-40,-31);
addOffice("Augur","STAT2822",-40,-31);
addOffice("Augur","POMP2254",-39,-38);
addOffice("Augur","UTTI2978",-39,-36);
addOffice("Augur","FONT2861",-39,-33);
addOffice("Augur","IUNI2747",-39,-34);
addOffice("Augur","POMP2254",-37,-35);
addOffice("Augur","VALE2758",-36,-31);
addOffice("Augur","AEMI2895",-35,-31);
addOffice("Augur","APPU2927",-35,-31);
addOffice("Augur","IUNI2929",-35,-31);
addOffice("Augur","IUNI2747",-33,-31);
addOffice("Augur","LICI2860",-31,-31);
addOffice("Augur","TERE2930",-31,-31);
addOffice("Augur","TULL2563",-31,-31);
addOffice("Augur","CLAU2952",-31,-31);
addOffice("Legatus Fisci Castrensis","EPPI2482",-46,-46);
addOffice("Scriba","CORN4703",-82,-82);
addOffice("Scriba","CORN4703",-81,-81);
addOffice("Scriba","VERS5107",-73,-73);
addOffice("Scriba","MAEC2148",-73,-73);
addOffice("Scriba","PAPI4577",-73,-71);
addOffice("Scriba","VERS5107",-72,-72);
addOffice("Scriba","MAEC2148",-72,-72);
addOffice("Praefectus Capuam Cumas","FULV3694",-120,-120);
addOffice("Praefectus Capuam Cumas","HERE3051",-87,-87);
addOffice("Praefectus Agris Dividundis","MEMM3015",-34,-34);
addOffice("Quattuorvir Capitalis","PAQU3458",-24,-24);
addOffice("Legatus Pro Praetore","ANON3116",-210,-210);
addOffice("Legatus Pro Praetore","BAEB1052",-203,-203);
addOffice("Legatus Pro Praetore","LUCI1785",-102,-102);
addOffice("Legatus Pro Praetore","LUCI1785",-101,-101);
addOffice("Legatus Pro Praetore","POPI3790",-99,-75);
addOffice("Legatus Pro Praetore","LICI1930",-87,-87);
addOffice("Legatus Pro Praetore","LICI1930",-86,-86);
addOffice("Legatus Pro Praetore","LICI1930",-85,-85);
addOffice("Legatus Pro Praetore","VALE2117",-77,-77);
addOffice("Legatus Pro Praetore","ATIL2246",-67,-67);
addOffice("Legatus Pro Praetore","CAEC2247",-67,-67);
addOffice("Legatus Pro Praetore","CLAU2248",-67,-67);
addOffice("Legatus Pro Praetore","CORN2064",-67,-67);
addOffice("Legatus Pro Praetore","CORN2082",-67,-67);
addOffice("Legatus Pro Praetore","CORN2035",-67,-67);
addOffice("Legatus Pro Praetore","GELL1822",-67,-67);
addOffice("Legatus Pro Praetore","LOLL2249",-67,-67);
addOffice("Legatus Pro Praetore","MANL2250",-67,-67);
addOffice("Legatus Pro Praetore","MANL2205",-67,-67);
addOffice("Legatus Pro Praetore","OCTA2243",-67,-67);
addOffice("Legatus Pro Praetore","PLAU2276",-67,-67);
addOffice("Legatus Pro Praetore","POMP2252",-67,-67);
addOffice("Legatus Pro Praetore","PUPI1974",-67,-67);
addOffice("Legatus Pro Praetore","TERE1963",-67,-67);
addOffice("Legatus Pro Praetore","GELL1822",-66,-66);
addOffice("Legatus Pro Praetore","ATIL2246",-66,-66);
addOffice("Legatus Pro Praetore","PLAU2276",-66,-66);
addOffice("Legatus Pro Praetore","CAEC2247",-66,-66);
addOffice("Legatus Pro Praetore","CLAU2248",-66,-66);
addOffice("Legatus Pro Praetore","CORN2064",-66,-66);
addOffice("Legatus Pro Praetore","CORN2082",-66,-66);
addOffice("Legatus Pro Praetore","POMP2252",-66,-66);
addOffice("Legatus Pro Praetore","OCTA2243",-66,-66);
addOffice("Legatus Pro Praetore","MANL2205",-66,-66);
addOffice("Legatus Pro Praetore","MANL2250",-66,-66);
addOffice("Legatus Pro Praetore","PUPI1974",-66,-66);
addOffice("Legatus Pro Praetore","TERE1963",-66,-66);
addOffice("Legatus Pro Praetore","LOLL2249",-66,-66);
addOffice("Legatus Pro Praetore","PLAU2276",-65,-65);
addOffice("Legatus Pro Praetore","GELL1822",-65,-65);
addOffice("Legatus Pro Praetore","ATIL2246",-65,-65);
addOffice("Legatus Pro Praetore","CLAU2248",-65,-65);
addOffice("Legatus Pro Praetore","CORN2064",-65,-65);
addOffice("Legatus Pro Praetore","CORN2082",-65,-65);
addOffice("Legatus Pro Praetore","POMP2252",-65,-65);
addOffice("Legatus Pro Praetore","OCTA2243",-65,-65);
addOffice("Legatus Pro Praetore","MANL2250",-65,-65);
addOffice("Legatus Pro Praetore","PUPI1974",-65,-65);
addOffice("Legatus Pro Praetore","TERE1963",-65,-65);
addOffice("Legatus Pro Praetore","GELL1822",-64,-64);
addOffice("Legatus Pro Praetore","GELL1822",-63,-63);
addOffice("Legatus Pro Praetore","ALFI3317",-50,-10);
addOffice("Legatus Pro Praetore","NUNN3753",-50,-10);
addOffice("Legatus Pro Praetore","POBL3801",-50,-50);
addOffice("Legatus Pro Praetore","SCRI2443",-49,-49);
addOffice("Legatus Pro Praetore","AMPI2291",-49,-49);
addOffice("Legatus Pro Praetore","CONS2359",-49,-49);
addOffice("Legatus Pro Praetore","CAEL3338",-49,-49);
addOffice("Legatus Pro Praetore","AMPI2291",-48,-48);
addOffice("Legatus Pro Praetore","CONS2359",-48,-48);
addOffice("Legatus Pro Praetore","CONS2359",-47,-47);
addOffice("Legatus Pro Praetore","LICI2456",-47,-47);
addOffice("Legatus Pro Praetore","CONS2359",-46,-46);
addOffice("Legatus Pro Praetore","IUNI2459",-46,-46);
addOffice("Legatus Pro Praetore","LICI2456",-46,-46);
addOffice("Legatus Pro Praetore","PUBL2623",-46,-46);
addOffice("Legatus Pro Praetore","IUNI2459",-45,-45);
addOffice("Legatus Pro Praetore","FLAV2744",-43,-43);
addOffice("Legatus Pro Praetore","FLAV2744",-42,-42);
addOffice("Legatus Pro Praetore","SEMP2823",-39,-39);
addOffice("Legatus Pro Praetore","PLAU2923",-31,-31);
addOffice("Legatus Pro Praetore","RESI3827",-31,-31);
addOffice("Centurio Primus Pilus","PULL5085",-89,-89);
addOffice("Centurio Primus Pilus","AEBU5086",-89,-89);
addOffice("Centurio Primus Pilus","SALV5087",-89,-89);
addOffice("Centurio Primus Pilus","OTAC5088",-89,-89);
addOffice("Centurio Primus Pilus","PACC5092",-49,-49);
addOffice("Centurio Primus Pilus","FURI5093",-49,-49);
addOffice("Centurio Primus Pilus","AMPI5094",-49,-49);
addOffice("Centurio Primus Pilus","FIRM3466",-43,-43);
addOffice("Moneyer","CORN0938",-211,-211);
addOffice("Moneyer","MANL0959",-210,-210);
addOffice("Moneyer","AURU0983",-209,-209);
addOffice("Moneyer","QUIN0999",-196,-196);
addOffice("Moneyer","LICI1679",-118,-118);
addOffice("Moneyer","DOMI1763",-118,-118);
addOffice("Moneyer","APPU1766",-104,-104);
addOffice("Moneyer","CALP1795",-100,-100);
addOffice("Moneyer","SERV1796",-100,-100);
addOffice("Moneyer","CRIT1971",-86,-86);
addOffice("Moneyer","FANN1972",-86,-86);
addOffice("Moneyer","CORN1746",-84,-84);
addOffice("Moneyer","CORN1746",-83,-83);
addOffice("Moneyer","ANTO1984",-83,-83);
addOffice("Moneyer","ANNI1740",-82,-82);
addOffice("Moneyer","VALE1821",-82,-82);
addOffice("Moneyer","ANTO1984",-82,-82);
addOffice("Moneyer","MANL2205",-82,-82);
addOffice("Moneyer","ANNI1740",-81,-81);
addOffice("Moneyer","PLAE2087",-74,-74);
addOffice("Moneyer","CORN2290",-74,-74);
addOffice("Moneyer","POMP1976",-71,-71);
addOffice("Moneyer","SULP2179",-69,-69);
addOffice("Moneyer","PLAE2169",-67,-67);
addOffice("Moneyer","CORN2082",-59,-59);
addOffice("Moneyer","AEMI2262",-58,-58);
addOffice("Moneyer","PLAU2265",-58,-58);
addOffice("Moneyer","PLAU2276",-55,-55);
addOffice("Moneyer","LICI2372",-55,-55);
addOffice("Moneyer","IULI1957",-49,-44);
addOffice("Moneyer","POMP1976",-49,-49);
addOffice("Moneyer","CLAU2397",-49,-49);
addOffice("Moneyer","COPO2537",-49,-49);
addOffice("Moneyer","NERI2541",-49,-49);
addOffice("Moneyer","CALP2543",-49,-49);
addOffice("Moneyer","TERE2544",-49,-49);
addOffice("Moneyer","VIBI2495",-48,-48);
addOffice("Moneyer","PORC2241",-47,-47);
addOffice("Moneyer","CAEC2347",-47,-47);
addOffice("Moneyer","LICI2456",-47,-47);
addOffice("Moneyer","ALLI2324",-47,-47);
addOffice("Moneyer","POMP2253",-46,-46);
addOffice("Moneyer","PUBL2623",-46,-46);
addOffice("Moneyer","PORC2241",-46,-46);
addOffice("Moneyer","CAEC2347",-46,-46);
addOffice("Moneyer","HIRT2449",-46,-46);
addOffice("Moneyer","LICI2456",-46,-46);
addOffice("Moneyer","POMP2254",-45,-45);
addOffice("Moneyer","MINA2613",-45,-45);
addOffice("Moneyer","POMP2253",-45,-45);
addOffice("Moneyer","MUNA2450",-45,-45);
addOffice("Moneyer","MINA2613",-45,-45);
addOffice("Moneyer","PUBL2623",-45,-45);
addOffice("Moneyer","CLOV2655",-45,-45);
addOffice("Moneyer","NASI2852",-44,-44);
addOffice("Moneyer","POMP2254",-44,-44);
addOffice("Moneyer","EPPI2482",-44,-44);
addOffice("Moneyer","IUNI3114",-43,-42);
addOffice("Moneyer","AEMI2341",-43,-43);
addOffice("Moneyer","CASS2458",-43,-43);
addOffice("Moneyer","SERV2719",-43,-43);
addOffice("Moneyer","SERV2720",-43,-43);
addOffice("Moneyer","SEST2729",-43,-43);
addOffice("Moneyer","FLAV2744",-43,-43);
addOffice("Moneyer","PEDA2751",-43,-43);
addOffice("Moneyer","PLAE2773",-43,-43);
addOffice("Moneyer","NORB2713",-43,-43);
addOffice("Moneyer","ANTO2392",-43,-31);
addOffice("Moneyer","IUNI2459",-43,-43);
addOffice("Moneyer","ANTO2497",-43,-43);
addOffice("Moneyer","IULI2597",-43,-36);
addOffice("Moneyer","CEST2710",-43,-43);
addOffice("Moneyer","NASI2852",-43,-43);
addOffice("Moneyer","POMP2254",-42,-42);
addOffice("Moneyer","IUNI2459",-42,-42);
addOffice("Moneyer","STAI2588",-42,-42);
addOffice("Moneyer","CORN2573",-42,-42);
addOffice("Moneyer","PEDA2751",-42,-42);
addOffice("Moneyer","AEMI2341",-42,-42);
addOffice("Moneyer","CASS2458",-42,-42);
addOffice("Moneyer","SERV2719",-42,-42);
addOffice("Moneyer","SERV2720",-42,-42);
addOffice("Moneyer","FLAV2744",-42,-42);
addOffice("Moneyer","PLAE2773",-42,-42);
addOffice("Moneyer","SEST2729",-42,-42);
addOffice("Moneyer","POMP2254",-41,-41);
addOffice("Moneyer","STAI2588",-41,-41);
addOffice("Moneyer","DOMI2699",-41,-41);
addOffice("Moneyer","BARB2800",-41,-41);
addOffice("Moneyer","GELL2802",-41,-41);
addOffice("Moneyer","COCC2806",-41,-41);
addOffice("Moneyer","CORN2819",-41,-41);
addOffice("Moneyer","MUNA2450",-40,-40);
addOffice("Moneyer","SALV2788",-40,-40);
addOffice("Moneyer","POMP2254",-40,-40);
addOffice("Moneyer","VENT2638",-39,-39);
addOffice("Moneyer","SEMP2823",-39,-39);
addOffice("Moneyer","DOMI2313",-39,-39);
addOffice("Moneyer","VIPS2808",-38,-38);
addOffice("Moneyer","POR-3791",-37,-37);
addOffice("Moneyer","LICI3837",-37,-37);
addOffice("Moneyer","TREB3859",-37,-37);
addOffice("Moneyer","POR-3791",-36,-36);
addOffice("Moneyer","LICI3837",-36,-36);
addOffice("Moneyer","TREB3859",-36,-36);
addOffice("Moneyer","LOLL2890",-35,-35);
addOffice("Moneyer","IUNI2747",-33,-33);
addOffice("Moneyer","TURU2692",-31,-31);
addOffice("Decurio Equitum","TEMP0277",-423,-423);
addOffice("Quattuorvir Monetalis","COSS3484",-44,-44);
addOffice("Quattuorvir Monetalis","AEMI3543",-44,-44);
addOffice("Tribunus Plebis Designatus","EQUI1803",-100,-100);
addOffice("Tribunus Plebis Designatus","SERV3056",-51,-51);
addOffice("Curator Denariorum Flandorum","COSC3553",-118,-118);
addOffice("Curator Denariorum Flandorum","AURE3596",-118,-118);
addOffice("Curator Denariorum Flandorum","CORN2082",-76,-76);
addOffice("Curator Denariorum Flandorum","CORN2082",-75,-75);
addOffice("Legatus Pro Quaestore","BRAI1839",-93,-93);
addOffice("Legatus Pro Quaestore","BRAI1839",-92,-92);
addOffice("Legatus Pro Quaestore","BRAI1839",-91,-91);
addOffice("Legatus Pro Quaestore","BRAI1839",-90,-90);
addOffice("Legatus Pro Quaestore","BRAI1839",-89,-89);
addOffice("Legatus Pro Quaestore","BRAI1839",-88,-88);
addOffice("Legatus Pro Quaestore","BRAI1839",-87,-87);
addOffice("Legatus Pro Quaestore","BRAI1839",-86,-86);
addOffice("Legatus Pro Quaestore","CORN2573",-46,-46);
//addOffice("Quaestor Pro Praetore","VEHI3844",-300,-31);
addOffice("Quaestor Pro Praetore","ANON3457",-125,-100);
addOffice("Quaestor Pro Praetore","CORN2071",-75,-75);
addOffice("Quaestor Pro Praetore","CORN2071",-74,-74);
addOffice("Quaestor Pro Praetore","CALP2274",-65,-65);
addOffice("Quaestor Pro Praetore","CALP2274",-64,-64);
addOffice("Quaestor Pro Praetore","CORN2573",-47,-47);
addOffice("Quaestor Pro Praetore","CORN2573",-46,-46);
addOffice("Quaestor Pro Praetore","ANTI2640",-44,-44);
addOffice("Quaestor Pro Praetore","ANTI2640",-43,-43);
addOffice("Quaestor Pro Praetore","LAEL2775",-42,-42);
addOffice("Quaestor Pro Praetore","PACC3764",-31,-10);
addOffice("Praetor Pro Consule","AURE3334",-100,-100);
addOffice("Praetor Pro Consule","PACC3767",-50,-10);
addOffice("Proquaestor","BAEB3099",-200,-101);
addOffice("Proquaestor","SEMP1598",-125,-125);
addOffice("Proquaestor","SEMP1598",-124,-124);
addOffice("Proquaestor","ANON1697",-114,-114);
addOffice("Proquaestor","ANON1697",-113,-113);
addOffice("Proquaestor","CORN1746",-106,-106);
addOffice("Proquaestor","ANON1832",-94,-94);
addOffice("Proquaestor","ANON1832",-92,-92);
addOffice("Proquaestor","LICI1903",-87,-87);
addOffice("Proquaestor","CLAU2021",-86,-86);
addOffice("Proquaestor","LICI1903",-86,-86);
addOffice("Proquaestor","LICI1903",-85,-85);
addOffice("Proquaestor","LICI1903",-84,-84);
addOffice("Proquaestor","AEMI2038",-84,-78);
addOffice("Proquaestor","MANL2205",-84,-84);
addOffice("Proquaestor","IUNI1966",-83,-83);
addOffice("Proquaestor","LICI1903",-83,-83);
addOffice("Proquaestor","VERR1967",-83,-83);
addOffice("Proquaestor","MANL2205",-83,-83);
addOffice("Proquaestor","IUNI1966",-82,-82);
addOffice("Proquaestor","LICI1903",-82,-82);
addOffice("Proquaestor","VERR1967",-82,-82);
addOffice("Proquaestor","MANL2205",-82,-82);
addOffice("Proquaestor","LICI1903",-81,-81);
addOffice("Proquaestor","LICI1903",-80,-80);
addOffice("Proquaestor","HIRT2033",-78,-78);
addOffice("Proquaestor","HIRT2033",-77,-77);
addOffice("Proquaestor","HIRT2033",-76,-76);
addOffice("Proquaestor","HIRT2033",-75,-75);
addOffice("Proquaestor","MEMM2020",-75,-75);
addOffice("Proquaestor","OPPI2086",-73,-73);
addOffice("Proquaestor","VALE1992",-70,-70);
addOffice("Proquaestor","VERG2267",-66,-66);
addOffice("Proquaestor","AEMI2262",-65,-65);
addOffice("Proquaestor","ANCH2110",-65,-65);
addOffice("Proquaestor","AEMI2262",-64,-64);
addOffice("Proquaestor","PLAU2265",-64,-64);
addOffice("Proquaestor","PLAU2265",-63,-63);
addOffice("Proquaestor","IUVE2308",-62,-62);
addOffice("Proquaestor","PLAU2265",-62,-62);
addOffice("Proquaestor","SEST2296",-62,-62);
addOffice("Proquaestor","PLAU2265",-61,-61);
addOffice("Proquaestor","SEST2296",-61,-61);
addOffice("Proquaestor","AEMI2350",-59,-59);
addOffice("Proquaestor","SCRI2443",-54,-54);
addOffice("Proquaestor","CASS2458",-54,-54);
addOffice("Proquaestor","IUNI2459",-53,-53);
addOffice("Proquaestor","LICI2328",-53,-53);
addOffice("Proquaestor","CASS2458",-53,-53);
addOffice("Proquaestor","FURF2498",-53,-53);
addOffice("Proquaestor","SCRI2443",-53,-53);
addOffice("Proquaestor","CASS2458",-52,-52);
addOffice("Proquaestor","FURF2498",-52,-52);
addOffice("Proquaestor","IUNI2459",-52,-52);
addOffice("Proquaestor","SCRI2443",-52,-52);
addOffice("Proquaestor","CASS2458",-51,-51);
addOffice("Proquaestor","FURF2498",-51,-51);
addOffice("Proquaestor","IUNI2459",-51,-51);
addOffice("Proquaestor","CANI3294",-50,-50);
addOffice("Proquaestor","FURF2498",-50,-50);
addOffice("Proquaestor","ANTI2522",-49,-49);
addOffice("Proquaestor","CALP2543",-49,-49);
addOffice("Proquaestor","COEL2524",-49,-49);
addOffice("Proquaestor","FURF2498",-49,-49);
addOffice("Proquaestor","TERE2544",-49,-49);
addOffice("Proquaestor","SERV4606",-48,-48);
addOffice("Proquaestor","APPU2612",-47,-47);
addOffice("Proquaestor","CLAU2571",-47,-47);
addOffice("Proquaestor","IULI2559",-47,-47);
addOffice("Proquaestor","APPU2612",-46,-46);
addOffice("Proquaestor","IULI2559",-46,-46);
addOffice("Proquaestor","MINA2613",-46,-46);
addOffice("Proquaestor","MINA2613",-45,-45);
addOffice("Proquaestor","APPU2639",-44,-44);
addOffice("Proquaestor","AEMI2726",-43,-43);
addOffice("Proquaestor","CORN2550",-43,-43);
addOffice("Proquaestor","LICI2727",-43,-43);
addOffice("Proquaestor","PATI2728",-43,-43);
addOffice("Proquaestor","SEST2729",-43,-43);
addOffice("Proquaestor","TURU2692",-43,-43);
addOffice("Proquaestor","AEMI2726",-42,-42);
addOffice("Proquaestor","ANTO2392",-42,-42);
addOffice("Proquaestor","CASS2723",-42,-42);
addOffice("Proquaestor","SEST2729",-42,-42);
addOffice("Proquaestor","PLAE2773",-42,-42);
addOffice("Proquaestor","DECI2801",-40,-40);
addOffice("Proquaestor","IUNI2747",-33,-33);
addOffice("Proquaestor","IUNI2747",-32,-32);
addOffice("Triumvir Agris Dividendis","ASIN2553",-41,-41);
addOffice("Triumvir Agris Dividendis","ALFE2766",-41,-41);
addOffice("Triumvir Agris Dividendis","CORN2816",-41,-41);
addOffice("Septemvir Agris Dividendis","ANTO2523",-44,-44);
addOffice("Septemvir Agris Dividendis","ANTO2392",-44,-44);
addOffice("Septemvir Agris Dividendis","CAES2701",-44,-44);
addOffice("Septemvir Agris Dividendis","CORN2515",-44,-44);
addOffice("Septemvir Agris Dividendis","NUMI2703",-44,-44);
addOffice("Septemvir Agris Dividendis","ANTO2497",-44,-44);
addOffice("Septemvir Agris Dividendis","DECI2679",-44,-44);
addOffice("Septemvir Agris Dividendis","ANON2705",-44,-44);
//addOffice("Curator - Unspecified","POPI3789",-300,-101);
addOffice("Proquaestor Pro Propraetore","SCRI3103",-200,-31);
addOffice("Proquaestor Pro Propraetore","PUBL3068",-100,-31);
addOffice("Proquaestor Pro Propraetore","AEMI2262",-63,-63);
addOffice("Proquaestor Pro Propraetore","AEMI2262",-62,-62);
addOffice("Proquaestor Pro Propraetore","AEMI2262",-61,-61);
addOffice("Proquaestor Pro Propraetore","PORC2241",-58,-58);
addOffice("Proquaestor Pro Propraetore","PORC2241",-57,-57);
addOffice("Proquaestor Pro Propraetore","PORC2241",-56,-56);
addOffice("Proquaestor Pro Propraetore","ANTO2523",-49,-49);
addOffice("Proquaestor Pro Propraetore","CORN2300",-49,-49);
addOffice("Proquaestor Pro Propraetore","CORN2300",-48,-48);
addOffice("Proquaestor Pro Propraetore","CORN2300",-47,-47);
addOffice("Proquaestor Pro Propraetore","IULI2374",-47,-47);
addOffice("Proquaestor Pro Propraetore","IULI2374",-46,-46);
addOffice("Proquaestor Pro Propraetore","CORN2394",-43,-43);
addOffice("Proquaestor Pro Propraetore","COCC2806",-41,-41);
addOffice("Proquaestor Pro Propraetore","ANTO2523",-40,-40);
addOffice("Quaestor Pro Consule","IUNI2747",-34,-34);
addOffice("Quaestor Pro Consule","PUPI3822",-30,-30);
addOffice("Quattuorvir Argento Publico Feriundo","VIBI3525",-42,-42);
addOffice("Quattuorvir Argento Publico Feriundo","MUSS3568",-42,-42);
addOffice("Quattuorvir Argento Publico Feriundo","CLOD3633",-42,-42);
addOffice("Quattuorvir Argento Publico Feriundo","LIVI2629",-42,-42);
addOffice("Propraetor","CORN0628",-295,-295);
addOffice("Propraetor","FULV0629",-295,-295);
addOffice("Propraetor","LIVI0624",-295,-295);
addOffice("Propraetor","POST0609",-295,-295);
addOffice("Propraetor","VALE0767",-241,-241);
addOffice("Propraetor","CENT0861",-217,-217);
addOffice("Propraetor","CORN0855",-216,-216);
addOffice("Propraetor","OTAC0856",-216,-216);
addOffice("Propraetor","MANL0787",-215,-215);
addOffice("Propraetor","OTAC0856",-215,-215);
addOffice("Propraetor","POMP0857",-215,-215);
addOffice("Propraetor","CLAU0858",-214,-214);
addOffice("Propraetor","MUCI0822",-214,-214);
addOffice("Propraetor","POMP0906",-214,-214);
addOffice("Propraetor","POMP0857",-214,-214);
addOffice("Propraetor","CLAU0858",-213,-213);
addOffice("Propraetor","CORN0903",-213,-213);
addOffice("Propraetor","MUCI0822",-213,-213);
addOffice("Propraetor","CORN0903",-212,-212);
addOffice("Propraetor","MUCI0822",-212,-212);
addOffice("Propraetor","CLAU0908",-211,-211);
addOffice("Propraetor","IUNI0925",-211,-211);
addOffice("Propraetor","CLAU0908",-210,-210);
addOffice("Propraetor","AURU0983",-208,-208);
addOffice("Propraetor","HOST0984",-208,-208);
addOffice("Propraetor","TERE0818",-208,-208);
addOffice("Propraetor","VETU0949",-208,-208);
addOffice("Propraetor","CLAU0994",-207,-207);
addOffice("Propraetor","HOST0984",-207,-207);
addOffice("Propraetor","TERE0818",-207,-207);
addOffice("Propraetor","CLAU0994",-206,-206);
addOffice("Propraetor","HOST0984",-206,-206);
addOffice("Propraetor","HOST0984",-205,-205);
addOffice("Propraetor","PLEM1026",-205,-205);
addOffice("Propraetor","QUIN0999",-205,-205);
addOffice("Propraetor","HOST0984",-204,-204);
addOffice("Propraetor","LUCR1020",-204,-204);
addOffice("Propraetor","OCTA0880",-204,-204);
addOffice("Propraetor","QUIN0999",-204,-204);
addOffice("Propraetor","LUCR1020",-203,-203);
addOffice("Propraetor","OCTA0880",-203,-203);
addOffice("Propraetor","POMP1010",-203,-203);
addOffice("Propraetor","CORN0986",-202,-202);
addOffice("Propraetor","LUCR1020",-202,-202);
addOffice("Propraetor","OCTA0880",-202,-202);
addOffice("Propraetor","POMP1010",-202,-202);
addOffice("Propraetor","VILL1034",-202,-202);
addOffice("Propraetor","AURE1054",-201,-201);
addOffice("Propraetor","OCTA0880",-201,-201);
addOffice("Propraetor","VALE0807",-201,-201);
addOffice("Propraetor","VALE1022",-200,-200);
addOffice("Propraetor","VALE0807",-200,-200);
addOffice("Propraetor","MINU1062",-199,-199);
addOffice("Propraetor","BAEB1163",-191,-191);
addOffice("Propraetor","VALE1133",-191,-191);
addOffice("Propraetor","CORN1169",-190,-190);
addOffice("Propraetor","AEMI1175",-189,-189);
addOffice("Propraetor","IUNI1132",-189,-189);
addOffice("Propraetor","TUCC1166",-189,-189);
addOffice("Propraetor","IUNI1132",-188,-188);
addOffice("Propraetor","SEMP1157",-188,-188);
addOffice("Propraetor","TUCC1166",-188,-188);
addOffice("Propraetor","ATIN1220",-187,-187);
addOffice("Propraetor","ATIN1220",-186,-186);
addOffice("Propraetor","DURO1262",-180,-180);
addOffice("Propraetor","FABI1263",-180,-180);
addOffice("Propraetor","AEBU1253",-177,-177);
addOffice("Propraetor","AEBU1253",-176,-176);
addOffice("Propraetor","ATIL1140",-172,-172);
addOffice("Propraetor","CICE1340",-172,-172);
addOffice("Propraetor","ANIC1408",-167,-167);
addOffice("Propraetor","OCTA1356",-167,-167);
addOffice("Propraetor","FABI1594",-123,-123);
addOffice("Propraetor","ANTO1705",-112,-112);
addOffice("Propraetor","AUFI1741",-106,-106);
addOffice("Propraetor","CORN1746",-105,-105);
addOffice("Propraetor","ALBU1750",-104,-104);
addOffice("Propraetor","LICI1759",-103,-103);
addOffice("Propraetor","CORN1746",-96,-96);
addOffice("Propraetor","CORN1746",-94,-94);
addOffice("Propraetor","CALP2951",-91,-91);
addOffice("Propraetor","LUCI1847",-90,-90);
addOffice("Propraetor","PORC1841",-90,-90);
addOffice("Propraetor","SERV1814",-89,-89);
addOffice("Propraetor","SERV1814",-88,-88);
addOffice("Propraetor","SEXT1895",-88,-88);
addOffice("Propraetor","SEXT1895",-87,-87);
addOffice("Propraetor","LICI1930",-84,-84);
addOffice("Propraetor","FABI1964",-84,-84);
addOffice("Propraetor","FABI1964",-83,-83);
addOffice("Propraetor","LICI1930",-83,-83);
addOffice("Propraetor","POMP1976",-83,-83);
addOffice("Propraetor","LICI1930",-82,-82);
addOffice("Propraetor","POMP1976",-82,-82);
addOffice("Propraetor","TERE1982",-82,-82);
addOffice("Propraetor","ANTO1984",-82,-82);
addOffice("Propraetor","LICI1930",-81,-81);
addOffice("Propraetor","POMP1976",-81,-81);
addOffice("Propraetor","AEMI1993",-80,-80);
addOffice("Propraetor","AURE1866",-80,-80);
addOffice("Propraetor","AURE2026",-80,-80);
addOffice("Propraetor","FUFI2008",-80,-80);
addOffice("Propraetor","MINU2009",-80,-80);
addOffice("Propraetor","POMP1976",-80,-80);
addOffice("Propraetor","POMP1976",-79,-79);
addOffice("Propraetor","CALI1812",-78,-78);
addOffice("Propraetor","PEDU2042",-76,-76);
addOffice("Propraetor","PEDU2042",-75,-75);
addOffice("Propraetor","FONT1965",-75,-75);
addOffice("Propraetor","FONT1965",-74,-74);
addOffice("Propraetor","LICI2067",-74,-74);
addOffice("Propraetor","FONT1965",-73,-73);
addOffice("Propraetor","OPPI2109",-73,-73);
addOffice("Propraetor","VERR1967",-73,-73);
addOffice("Propraetor","FONT1965",-72,-72);
addOffice("Propraetor","VERR1967",-72,-72);
addOffice("Propraetor","ARRI2098",-72,-72);
addOffice("Propraetor","VERR1967",-71,-71);
addOffice("Propraetor","ANTI2162",-69,-69);
addOffice("Propraetor","ANTI2162",-68,-68);
addOffice("Propraetor","SERG1998",-67,-67);
addOffice("Propraetor","SERG1998",-66,-66);
addOffice("Propraetor","ORBI2271",-64,-64);
addOffice("Propraetor","SERV2237",-63,-63);
addOffice("Propraetor","VALE1992",-62,-62);
addOffice("Propraetor","VERG2267",-61,-61);
addOffice("Propraetor","VERG2267",-60,-60);
addOffice("Propraetor","VERG2267",-59,-59);
addOffice("Propraetor","APPU2318",-58,-58);
addOffice("Propraetor","VERG2267",-58,-58);
addOffice("Propraetor","AEMI2262",-55,-55);
addOffice("Propraetor","MINU2131",-52,-52);
addOffice("Propraetor","MINU2131",-51,-51);
addOffice("Propraetor","SILI2360",-51,-51);
addOffice("Propraetor","MINU2131",-50,-50);
addOffice("Propraetor","SILI2360",-50,-50);
addOffice("Propraetor","CASS2481",-49,-49);
addOffice("Propraetor","CONS2435",-49,-49);
addOffice("Propraetor","FANN2340",-49,-49);
addOffice("Propraetor","MINU2131",-49,-49);
addOffice("Propraetor","SCRI2443",-49,-49);
addOffice("Propraetor","CASS2481",-48,-48);
addOffice("Propraetor","FANN2340",-48,-48);
addOffice("Propraetor","FAVO2352",-48,-48);
addOffice("Propraetor","MANL2198",-48,-48);
addOffice("Propraetor","RUTI2407",-48,-48);
addOffice("Propraetor","CASS2481",-47,-47);
addOffice("Propraetor","PORC2241",-47,-47);
addOffice("Propraetor","PORC2241",-46,-46);
addOffice("Propraetor","SERV2433",-46,-46);
addOffice("Propraetor","IULI2597",-43,-43);
addOffice("Propraetor","CLAU2571",-41,-41);
addOffice("Propraetor","CLAU2571",-40,-40);
addOffice("Propraetor","ARRU3094",-28,-28);
addOffice("Tribunus Plebis Pro Praetore","ANTO2392",-49,-49);
addOffice("Magister Societatis","SERV4584",-73,-71);
addOffice("Magister Societatis","VETT4157",-73,-71);
addOffice("Magister Societatis","VIBI4598",-73,-73);
addOffice("Magister Societatis","ANTI4568",-71,-71);
addOffice("Magister Societatis","TULL4586",-71,-71);
addOffice("Magister Societatis","CUSP4592",-56,-56);
addOffice("Magister Societatis","RUPI4583",-51,-51);
addOffice("Accusator","IUNI4046",-125,-76);
addOffice("Accusator","APPI4569",-92,-92);
addOffice("Accusator","ERUC4575",-81,-81);
addOffice("Accusator","COMI4573",-65,-65);
addOffice("Accusator","COMI4574",-65,-65);
addOffice("Publicanus","POMP0918",-215,-215);
addOffice("Publicanus","POST4224",-215,-212);
addOffice("Publicanus","CONS3169",-90,-90);
addOffice("Publicanus","CAEL4391",-61,-59);
addOffice("Publicanus","PAPI4590",-53,-53);
addOffice("Publicanus","TERE2611",-52,-43);
addOffice("Promagister","CARP4572",-73,-71);
addOffice("Divisor","HERE3972",-100,-76);
addOffice("Divisor","VERR4587",-74,-74);
addOffice("Divisor","PUBL4580",-70,-70);
addOffice("Redemptor","IUNI4144",-76,-76);
addOffice("Redemptor","RABO4581",-75,-75);
addOffice("Redemptor","TETT4585",-75,-75);
addOffice("Redemptor","TADI4595",-75,-75);
addOffice("Magister Scripturae","PERP4593",-60,-30);
addOffice("Legatus (Envoy)","MENE0018",-493,-493);
addOffice("Legatus (Envoy)","VALE0037",-493,-493);
addOffice("Legatus (Envoy)","SERV0033",-493,-493);
addOffice("Legatus (Envoy)","POST0015",-493,-493);
addOffice("Legatus (Envoy)","AEBU0025",-493,-493);
addOffice("Legatus (Envoy)","SULP0023",-493,-493);
addOffice("Legatus (Envoy)","POST0027",-493,-493);
addOffice("Legatus (Envoy)","VERG0035",-493,-493);
addOffice("Legatus (Envoy)","LARC0017",-493,-493);
addOffice("Legatus (Envoy)","DECI0046",-493,-493);
addOffice("Legatus (Envoy)","ICIL0047",-493,-493);
addOffice("Legatus (Envoy)","IUNI0040",-493,-493);
addOffice("Legatus (Envoy)","MINU0030",-488,-488);
addOffice("Legatus (Envoy)","COMI0021",-488,-488);
addOffice("Legatus (Envoy)","LARC0012",-488,-488);
addOffice("Legatus (Envoy)","PINA0057",-488,-488);
addOffice("Legatus (Envoy)","SULP0055",-488,-488);
addOffice("Legatus (Envoy)","TARP0158",-449,-449);
addOffice("Legatus (Envoy)","IULI0085",-449,-449);
addOffice("Legatus (Envoy)","SULP0138",-449,-449);
addOffice("Legatus (Envoy)","SULP0138",-449,-449);
addOffice("Legatus (Envoy)","CORN0565",-321,-321);
addOffice("Legatus (Envoy)","FABI0715",-264,-264);
addOffice("Legatus (Envoy)","QUIN0696",-264,-264);
addOffice("Legatus (Envoy)","BAEB0830",-219,-219);
addOffice("Legatus (Envoy)","VALE0805",-219,-219);
addOffice("Legatus (Envoy)","TERE0841",-218,-218);
addOffice("Legatus (Envoy)","ANTI0842",-218,-218);
addOffice("Legatus (Envoy)","ACIL0847",-218,-218);
addOffice("Legatus (Envoy)","HERE0848",-218,-218);
addOffice("Legatus (Envoy)","ANTI3290",-215,-215);
addOffice("Legatus (Envoy)","STAT0915",-213,-213);
addOffice("Legatus (Envoy)","LAET0869",-212,-212);
addOffice("Legatus (Envoy)","METI0859",-212,-212);
addOffice("Legatus (Envoy)","SERV0931",-212,-212);
addOffice("Legatus (Envoy)","AQUI0972",-210,-210);
addOffice("Legatus (Envoy)","OGUL0973",-210,-210);
addOffice("Legatus (Envoy)","LAEL0992",-209,-209);
addOffice("Legatus (Envoy)","IULI0995",-208,-208);
addOffice("Legatus (Envoy)","LICI1002",-208,-208);
addOffice("Legatus (Envoy)","CINC0957",-208,-208);
addOffice("Legatus (Envoy)","CORN1016",-207,-207);
addOffice("Legatus (Envoy)","FABI0879",-207,-207);
addOffice("Legatus (Envoy)","VETU0949",-207,-207);
addOffice("Legatus (Envoy)","LICI0960",-207,-207);
addOffice("Legatus (Envoy)","CAEC0891",-207,-207);
addOffice("Legatus (Envoy)","CORN1016",-206,-206);
addOffice("Legatus (Envoy)","LAEL0992",-206,-206);
addOffice("Legatus (Envoy)","CAEC0891",-204,-204);
addOffice("Legatus (Envoy)","LAEL0992",-204,-204);
addOffice("Legatus (Envoy)","BAEB1052",-203,-203);
addOffice("Legatus (Envoy)","SERG1049",-203,-203);
addOffice("Legatus (Envoy)","FABI1050",-203,-203);
addOffice("Legatus (Envoy)","FULV1051",-203,-203);
addOffice("Legatus (Envoy)","LAEL0992",-203,-203);
addOffice("Legatus (Envoy)","VETU0949",-202,-202);
addOffice("Legatus (Envoy)","MARC1033",-202,-202);
addOffice("Legatus (Envoy)","CORN1016",-202,-202);
addOffice("Legatus (Envoy)","FURI1081",-201,-201);
addOffice("Legatus (Envoy)","FURI0967",-199,-199);
addOffice("Legatus (Envoy)","CALP1096",-198,-198);
addOffice("Legatus (Envoy)","CLAU1095",-198,-198);
addOffice("Legatus (Envoy)","FABI1097",-198,-198);
addOffice("Legatus (Envoy)","FULV1194",-198,-198);
addOffice("Legatus (Envoy)","CORN1016",-191,-191);
addOffice("Legatus (Envoy)","ANTO1181",-190,-190);
addOffice("Legatus (Envoy)","SEMP1182",-190,-190);
addOffice("Legatus (Envoy)","TERE1183",-190,-190);
addOffice("Legatus (Envoy)","CLAU1184",-190,-190);
addOffice("Legatus (Envoy)","AURE1198",-189,-189);
addOffice("Legatus (Envoy)","PORC0907",-189,-189);
addOffice("Legatus (Envoy)","TERE1183",-189,-189);
addOffice("Legatus (Envoy)","MANL1100",-188,-188);
addOffice("Legatus (Envoy)","CORN0878",-184,-184);
addOffice("Legatus (Envoy)","IUVE1236",-184,-184);
addOffice("Legatus (Envoy)","QUIN1237",-184,-184);
addOffice("Legatus (Envoy)","AURE1260",-181,-181);
addOffice("Legatus (Envoy)","SULP1173",-181,-181);
addOffice("Legatus (Envoy)","MINU1259",-180,-180);
addOffice("Legatus (Envoy)","MAEN1225",-180,-180);
addOffice("Legatus (Envoy)","TERE1075",-180,-180);
addOffice("Legatus (Envoy)","AEBU1306",-178,-178);
addOffice("Legatus (Envoy)","MINU1259",-177,-177);
addOffice("Legatus (Envoy)","CARV1376",-171,-171);
addOffice("Legatus (Envoy)","CORN1377",-171,-171);
addOffice("Legatus (Envoy)","FULV1247",-171,-171);
addOffice("Legatus (Envoy)","FULV1378",-171,-171);
addOffice("Legatus (Envoy)","MARC1379",-171,-171);
addOffice("Legatus (Envoy)","FULV1247",-170,-170);
addOffice("Legatus (Envoy)","CANI1392",-170,-170);
addOffice("Legatus (Envoy)","POPI1328",-170,-170);
addOffice("Legatus (Envoy)","DOMI1366",-169,-169);
addOffice("Legatus (Envoy)","LICI1374",-169,-169);
addOffice("Legatus (Envoy)","BAEB1400",-169,-169);
addOffice("Legatus (Envoy)","POPI1328",-169,-169);
addOffice("Legatus (Envoy)","OCTA1356",-169,-169);
addOffice("Legatus (Envoy)","DOMI1366",-168,-168);
addOffice("Legatus (Envoy)","LICI1374",-168,-168);
addOffice("Legatus (Envoy)","BAEB1400",-168,-168);
addOffice("Legatus (Envoy)","CORN1362",-168,-168);
addOffice("Legatus (Envoy)","POST1172",-168,-168);
addOffice("Legatus (Envoy)","POST1420",-168,-168);
addOffice("Legatus (Envoy)","ANTO1421",-168,-168);
addOffice("Legatus (Envoy)","FABI1422",-168,-168);
addOffice("Legatus (Envoy)","CORN1423",-168,-168);
addOffice("Legatus (Envoy)","CAEC1424",-168,-168);
addOffice("Legatus (Envoy)","LICI1425",-168,-168);
addOffice("Legatus (Envoy)","DECI1405",-168,-168);
addOffice("Legatus (Envoy)","PERP1426",-168,-168);
addOffice("Legatus (Envoy)","PETI1427",-168,-168);
addOffice("Legatus (Envoy)","POMP1428",-168,-168);
addOffice("Legatus (Envoy)","CORN1504",-150,-150);
addOffice("Legatus (Envoy)","CORN1513",-148,-148);
addOffice("Legatus (Envoy)","PAPI1538",-146,-146);
addOffice("Legatus (Envoy)","POPI1563",-146,-146);
addOffice("Legatus (Envoy)","POPI1590",-146,-146);
addOffice("Legatus (Envoy)","GABI1541",-146,-146);
addOffice("Legatus (Envoy)","FANN3464",-146,-146);
addOffice("Legatus (Envoy)","SEMP1525",-137,-137);
addOffice("Legatus (Envoy)","CORN1620",-136,-136);
addOffice("Legatus (Envoy)","CAEC1544",-136,-136);
addOffice("Legatus (Envoy)","CORN1746",-106,-106);
addOffice("Legatus (Envoy)","MANL1747",-106,-106);
addOffice("Legatus (Envoy)","CORN1746",-105,-105);
addOffice("Legatus (Envoy)","MANL1747",-105,-105);
addOffice("Legatus (Envoy)","LUTA1731",-87,-87);
addOffice("Legatus (Envoy)","LUTA1949",-87,-87);
addOffice("Legatus (Envoy)","FLAV1946",-87,-87);
addOffice("Legatus (Envoy)","CAEC1889",-87,-87);
addOffice("Legatus (Envoy)","ANTO1705",-87,-87);
addOffice("Legatus (Envoy)","LICI1903",-86,-86);
addOffice("Legatus (Envoy)","RUTI3834",-85,-85);
addOffice("Legatus (Envoy)","CALI3420",-82,-82);
addOffice("Legatus (Envoy)","GABI1962",-81,-81);
addOffice("Legatus (Envoy)","IULI1957",-81,-81);
addOffice("Legatus (Envoy)","PACC2017",-81,-81);
addOffice("Legatus (Envoy)","PACC2017",-80,-80);
addOffice("Legatus (Envoy)","FANN2220",-76,-76);
addOffice("Legatus (Envoy)","MARI2053",-75,-75);
addOffice("Legatus (Envoy)","VOLS3841",-73,-73);
addOffice("Legatus (Envoy)","CLAU2140",-72,-72);
addOffice("Legatus (Envoy)","CLAU2140",-71,-71);
addOffice("Legatus (Envoy)","CLAU2140",-70,-70);
addOffice("Legatus (Envoy)","SEXT2186",-69,-69);
addOffice("Legatus (Envoy)","SEXT2186",-68,-68);
addOffice("Legatus (Envoy)","OCTA2243",-67,-67);
addOffice("Legatus (Envoy)","METT2367",-58,-58);
addOffice("Legatus (Envoy)","VALE2368",-58,-58);
addOffice("Legatus (Envoy)","SILI2411",-56,-56);
addOffice("Legatus (Envoy)","TERR2412",-56,-56);
addOffice("Legatus (Envoy)","TREB2413",-56,-56);
addOffice("Legatus (Envoy)","VELA2414",-56,-56);
addOffice("Legatus (Envoy)","ROSC3828",-53,-53);
addOffice("Legatus (Envoy)","ROSC3829",-53,-53);
addOffice("Legatus (Envoy)","ANTO2503",-51,-51);
addOffice("Legatus (Envoy)","HIRT2449",-50,-50);
addOffice("Legatus (Envoy)","CALP2168",-49,-49);
addOffice("Legatus (Envoy)","CORN2550",-49,-49);
addOffice("Legatus (Envoy)","IULI2559",-49,-49);
addOffice("Legatus (Envoy)","LAEL2438",-49,-49);
addOffice("Legatus (Envoy)","LUCI2457",-49,-49);
addOffice("Legatus (Envoy)","MAGI2552",-49,-49);
addOffice("Legatus (Envoy)","ROSC2424",-49,-49);
addOffice("Legatus (Envoy)","SCRI2443",-49,-49);
addOffice("Legatus (Envoy)","CLOD2577",-48,-48);
addOffice("Legatus (Envoy)","CORN2550",-48,-48);
addOffice("Legatus (Envoy)","LUCI2457",-48,-48);
addOffice("Legatus (Envoy)","PATI2578",-48,-48);
addOffice("Legatus (Envoy)","PLOT2579",-48,-48);
addOffice("Legatus (Envoy)","POST2580",-48,-48);
addOffice("Legatus (Envoy)","TERE2581",-48,-48);
addOffice("Legatus (Envoy)","TIBU2582",-48,-48);
addOffice("Legatus (Envoy)","VIBU2566",-48,-48);
addOffice("Legatus (Envoy)","CAEC2813",-44,-44);
addOffice("Legatus (Envoy)","SULP2088",-43,-43);
addOffice("Legatus (Envoy)","CALP2168",-43,-43);
addOffice("Legatus (Envoy)","MARC2303",-43,-43);
addOffice("Legatus (Envoy)","AEMI2350",-43,-43);
addOffice("Legatus (Envoy)","MINU2131",-43,-43);
addOffice("Legatus (Envoy)","FANN2340",-43,-43);
addOffice("Legatus (Envoy)","VARI2675",-43,-43);
addOffice("Legatus (Envoy)","CALP2168",-43,-43);
addOffice("Legatus (Envoy)","IULI2044",-43,-43);
addOffice("Legatus (Envoy)","TULL2072",-43,-43);
addOffice("Legatus (Envoy)","SERV2433",-43,-43);
addOffice("Legatus (Envoy)","FUFI2321",-43,-43);
addOffice("Legatus (Envoy)","CISP2626",-43,-43);
addOffice("Legatus (Envoy)","ANON2736",-43,-43);
addOffice("Legatus (Envoy)","SULP2316",-43,-43);
addOffice("Legatus (Envoy)","VOLU2737",-43,-43);
addOffice("Legatus (Envoy)","LUCC2225",-43,-43);
addOffice("Legatus (Envoy)","VIBI3284",-43,-43);
addOffice("Legatus (Envoy)","LABI2777",-42,-42);
addOffice("Legatus (Envoy)","PORC2754",-42,-42);
addOffice("Legatus (Envoy)","DELL2810",-41,-41);
addOffice("Legatus (Envoy)","MANI2811",-41,-41);
addOffice("Legatus (Envoy)","COCC2863",-41,-41);
addOffice("Legatus (Envoy)","CAEC2813",-41,-41);
addOffice("Legatus (Envoy)","FURN2521",-40,-40);
addOffice("Legatus (Envoy)","SCRI2518",-40,-40);
addOffice("Legatus (Envoy)","SENT3258",-40,-40);
addOffice("Legatus (Envoy)","DELL2810",-39,-39);
addOffice("Legatus (Envoy)","FURN2521",-39,-39);
addOffice("Legatus (Envoy)","MAEC2850",-38,-38);
addOffice("Legatus (Envoy)","FONT2861",-37,-37);
addOffice("Legatus (Envoy)","MAEC2850",-37,-37);
addOffice("Legatus (Envoy)","COCC2863",-37,-37);
addOffice("Legatus (Envoy)","CALP2739",-36,-36);
addOffice("Legatus (Envoy)","DELL2810",-35,-35);
addOffice("Legatus (Envoy)","DELL2810",-34,-34);
addOffice("Legatus (Envoy)","GEMI3701",-32,-32);
addOffice("Legatus (Envoy)","DELL2810",-31,-31);
addOffice("Legatus (Envoy)","ATIU2510",-31,-31);
addOffice("Centurio","SEPT2242",-67,-67);
addOffice("Propraetor Praefectus Classis","OPPI2869",-36,-36);
addOffice("Quaestor Designatus","GRAN2610",-47,-47);
addOffice("Quaestor Designatus","VIBI2848",-39,-39);
addOffice("Haruspex","AQUI4636",-387,-387);
addOffice("Haruspex","HERE4657",-121,-121);
addOffice("Haruspex","AEMI4634",-102,-102);
addOffice("Haruspex","COEL4646",-100,-49);
addOffice("Haruspex","POST4668",-90,-83);
addOffice("Haruspex","VOLC4678",-50,-45);
addOffice("Haruspex","SPUR4671",-46,-43);
addOffice("Haruspex","VOLC4678",-44,-44);
addOffice("Decemvir Sacris Faciundis - Magister","AEMI0785",-236,-211);
addOffice("Decemvir Sacris Faciundis - Magister","LIVI0786",-236,-236);
addOffice("Epulo","PORC1084",-196,-196);
addOffice("Epulo","LICI1114",-196,-196);
addOffice("Epulo","MANL1128",-196,-180);
addOffice("Epulo","PORC1084",-195,-164);
addOffice("Epulo","FULV1248",-180,-180);
addOffice("Epulo","FULV1286",-180,-136);
addOffice("Epulo","COEL3129",-81,-81);
addOffice("Epulo","CORN2082",-60,-57);
addOffice("Epulo","CORN2082",-56,-56);
addOffice("Epulo","AEMI2350",-55,-43);
addOffice("Epulo","MUNA2450",-45,-31);
addOffice("Epulo","CANI2821",-40,-37);
addOffice("Epulo","SCRI2518",-39,-31);
addOffice("Epulo","CLAU2867",-39,-31);
addOffice("Lupercus Iulianus - Magister","ANTO2392",-44,-44);
addOffice("Lupercus Iulianus","ANTO2392",-43,-43);
addOffice("Duovir Aedi Dedicandae","POST0126",-484,-484);
addOffice("Duovir Aedi Dedicandae","POST0125",-484,-484);
addOffice("Duovir Aedi Dedicandae","FABI0712",-240,-203);
addOffice("Duovir Aedi Dedicandae","ATIL0835",-217,-216);
addOffice("Duovir Aedi Dedicandae","ATIL0888",-216,-216);
addOffice("Duovir Aedi Dedicandae","ATIL0887",-216,-216);
addOffice("Duovir Aedi Dedicandae","OTAC0856",-215,-211);
addOffice("Duovir Aedi Dedicandae","SERV0931",-194,-194);
addOffice("Duovir Aedi Dedicandae","MARC1115",-194,-192);
addOffice("Duovir Aedi Dedicandae","LICI1114",-191,-191);
addOffice("Duovir Aedi Dedicandae","ACIL1270",-181,-181);
addOffice("Duovir Aedi Dedicandae","PORC1271",-181,-181);
addOffice("Duovir Aedi Dedicandae","POST1172",-175,-167);
addOffice("Special Commissioners","SERG0237",-428,-428);
addOffice("Special Commissioners","SERV0244",-428,-428);
addOffice("Special Commissioners","AEMI0203",-428,-428);
addOffice("Special Commissioners","CLAU1191",-185,-185);
addOffice("Special Commissioners","PORC0907",-171,-171);
addOffice("Special Commissioners","CORN1077",-171,-171);
addOffice("Special Commissioners","AEMI1134",-171,-171);
addOffice("Special Commissioners","SULP1173",-171,-171);
addOffice("Special Commissioners","IUNI1543",-146,-146);
addOffice("Special Commissioners","MINU1686",-117,-117);
addOffice("Special Commissioners","MINU1687",-117,-117);
addOffice("Special Commissioners","AEMI1645",-109,-109);
addOffice("Special Commissioners","AEMI1645",-104,-104);
addOffice("Special Commissioners","TERE1963",-45,-45);
addOffice("Special Commissioners","ANTO2392",-44,-44);
addOffice("Special Commissioners","CORN2515",-44,-44);
addOffice("Sacerdos Matris Magnae","BATT4637",-102,-102);
addOffice("Sacerdos Matris Magnae","GENU4656",-85,-78);
addOffice("Sacerdos Matris Magnae","GENU4656",-77,-77);
addOffice("Sacerdos Cereris Publicae","ANON4638",-96,-96);
addOffice("Sacerdos Cereris Publicae","CASP4641",-75,-75);
addOffice("Sacerdos Cereris Publicae","FAVO4651",-75,-75);
addOffice("Scriba (Pontifex Minor)","FLAV0616",-310,-304);
addOffice("Scriba (Pontifex Minor)","CANT0892",-220,-217);
addOffice("Scriba (Pontifex Minor)","CANT0892",-216,-216);
addOffice("Scriba (Pontifex Minor)","TERE4675",-190,-182);
addOffice("Scriba (Pontifex Minor)","TERE4675",-181,-181);
addOffice("Quaestor De Virginibus","CASS1583",-113,-113);
addOffice("Curator Restituendi Capitolii","CORN1746",-81,-81);
addOffice("Curator Restituendi Capitolii","CORN1746",-80,-78);
addOffice("Curator Restituendi Capitolii","LUTA1949",-77,-62);
addOffice("Aedituus Tellus-Tempel","FUND4653",-59,-56);
addOffice("Salius Magister","FURI0831",-275,-221);
addOffice("Aedituus Fortuna-Obsequens-Tempel","GENU4655",-75,-75);
addOffice("Sodalis Titii","IULI2597",-31,-31);
addOffice("Sacerdos Collegiorum Ignotorum","LICI4659",-150,-150);
addOffice("Curio","MAMI0982",-210,-210);
addOffice("Curio","SCRI1111",-200,-175);
addOffice("Vates","MANI4660",-325,-304);
addOffice("Vates","MARC4661",-300,-201);
addOffice("Triumvir Aed. Refic.","MEFU3472",-200,-151);
addOffice("Sodalis Sacris Idaeis Magnae Matris","PORC0907",-204,-149);
addOffice("Duovir Aedi Locandae","PUPI0864",-217,-217);
addOffice("Duovir Aedi Locandae","QUIN0865",-217,-217);
addOffice("Duovir Aedi Locandae","FABI0712",-215,-215);
addOffice("Duovir Sacris Faciundis","QUIN0415",-387,-387);
addOffice("Flamen Floralis","SERV0953",-210,-167);
addOffice("Virgo Vestalis","OPPI0084",-483,-483);
addOffice("Virgo Vestalis","ORBI0112",-472,-472);
addOffice("Virgo Vestalis","POST0291",-420,-420);
addOffice("Virgo Vestalis","MINU0545",-337,-337);
addOffice("Virgo Vestalis","SEXT0693",-285,-276);
addOffice("Virgo Vestalis","SEXT0693",-275,-274);
addOffice("Virgo Vestalis","CAPA4639",-275,-268);
addOffice("Virgo Vestalis","SEXT0693",-273,-273);
addOffice("Virgo Vestalis","CAPA4639",-267,-266);
addOffice("Virgo Vestalis","TUCC0802",-235,-231);
addOffice("Virgo Vestalis","TUCC0802",-230,-230);
addOffice("Virgo Vestalis","OPIM0894",-225,-217);
addOffice("Virgo Vestalis","FLOR0893",-225,-217);
addOffice("Virgo Vestalis","OPIM0894",-216,-216);
addOffice("Virgo Vestalis","FLOR0893",-216,-216);
addOffice("Virgo Vestalis","AEMI3132",-205,-178);
addOffice("Virgo Vestalis","AEMI4633",-205,-178);
addOffice("Virgo Vestalis","CLAU1560",-155,-144);
addOffice("Virgo Vestalis","CLAU1560",-143,-143);
addOffice("Virgo Vestalis","AEMI1698",-135,-116);
addOffice("Virgo Vestalis","LICI1646",-130,-124);
addOffice("Virgo Vestalis","MARC1700",-125,-116);
addOffice("Virgo Vestalis","LICI1646",-123,-113);
addOffice("Virgo Vestalis","AEMI1698",-115,-114);
addOffice("Virgo Vestalis","MARC1700",-115,-113);
addOffice("Virgo Vestalis","PERP2200",-100,-71);
addOffice("Virgo Vestalis","POPI2201",-100,-71);
addOffice("Virgo Vestalis","FONT2202",-95,-92);
addOffice("Virgo Vestalis","FONT2202",-91,-69);
addOffice("Virgo Vestalis","LICI2122",-85,-74);
addOffice("Virgo Vestalis","FABI2121",-80,-74);
addOffice("Virgo Vestalis","ARRU2199",-75,-71);
addOffice("Virgo Vestalis","FABI2121",-73,-58);
addOffice("Virgo Vestalis","LICI2122",-73,-63);
addOffice("Virgo Vestalis","PERP2200",-70,-70);
addOffice("Virgo Vestalis","POPI2201",-70,-70);
addOffice("Virgo Vestalis","ARRU2199",-70,-70);
addOffice("Virgo Vestalis","OCCI2857",-38,-31);
addOffice("Matrona Imagini Dedicandi","SULP4672",-275,-275);
addOffice("Sacerdos Isidis","SULP4674",-100,-75);
addOffice("Sacerdos Isidis","USIA4676",-50,-31);
addOffice("Haruspex Ex L","VINU4677",-50,-50);
addOffice("Repulsa (Cens.)","CORN1077",-189,-189);
addOffice("Repulsa (Cens.)","PORC0907",-189,-189);
addOffice("Repulsa (Cens.)","VALE0930",-189,-189);
addOffice("Repulsa (Cens.)","CORN1016",-184,-184);
addOffice("Repulsa (Cens.)","CORN1077",-184,-184);
addOffice("Repulsa (Cens.)","MANL1103",-184,-184);
addOffice("Repulsa (Cens.)","FULV1109",-184,-184);
addOffice("Repulsa (Cens.)","SEMP1157",-184,-184);
addOffice("Repulsa (Cens.)","FURI0967",-184,-184);
addOffice("Repulsa (Cens.)","SEMP0976",-184,-184);
addOffice("Repulsa (Cens.)","IUNI1131",-169,-169);
addOffice("Repulsa (Cens.)","VALE1200",-169,-169);
addOffice("Repulsa (Cens.)","POST1278",-169,-169);
addOffice("Repulsa (Cens.)","MUCI1288",-169,-169);
addOffice("Repulsa (Cens.)","CLAU1452",-141,-141);
addOffice("Repulsa (Cos.)","MARC4613",-491,-491);
addOffice("Repulsa (Cos.)","CLAU0032",-482,-482);
addOffice("Repulsa (Cos.)","ATIL0835",-216,-216);
addOffice("Repulsa (Cos.)","ACIL1063",-192,-192);
addOffice("Repulsa (Cos.)","CORN1077",-192,-192);
addOffice("Repulsa (Cos.)","MANL1103",-192,-192);
addOffice("Repulsa (Cos.)","LIVI0952",-192,-192);
addOffice("Repulsa (Cos.)","LAEL0992",-192,-192);
addOffice("Repulsa (Cos.)","CORN1016",-191,-191);
addOffice("Repulsa (Cos.)","MANL1103",-191,-191);
addOffice("Repulsa (Cos.)","PORC1154",-191,-191);
addOffice("Repulsa (Cos.)","PORC1154",-190,-190);
addOffice("Repulsa (Cos.)","AEMI1067",-189,-189);
addOffice("Repulsa (Cos.)","VALE1201",-189,-189);
addOffice("Repulsa (Cos.)","PORC1154",-189,-189);
addOffice("Repulsa (Cos.)","AEMI1067",-188,-188);
addOffice("Repulsa (Cos.)","PORC1154",-188,-188);
addOffice("Repulsa (Cos.)","PORC1154",-187,-187);
addOffice("Repulsa (Cos.)","AEMI1134",-186,-186);
addOffice("Repulsa (Cos.)","PORC1154",-186,-186);
addOffice("Repulsa (Cos.)","BAEB1035",-185,-185);
addOffice("Repulsa (Cos.)","FABI1117",-185,-185);
addOffice("Repulsa (Cos.)","AEMI1134",-185,-185);
addOffice("Repulsa (Cos.)","TERE1135",-185,-185);
addOffice("Repulsa (Cos.)","PORC1154",-185,-185);
addOffice("Repulsa (Cos.)","SULP1192",-185,-185);
addOffice("Repulsa (Cos.)","BAEB1035",-184,-184);
addOffice("Repulsa (Cos.)","FABI1117",-184,-184);
addOffice("Repulsa (Cos.)","AEMI1134",-184,-184);
addOffice("Repulsa (Cos.)","TERE1135",-184,-184);
addOffice("Repulsa (Cos.)","SULP1192",-184,-184);
addOffice("Repulsa (Cos.)","FULV1194",-183,-183);
addOffice("Repulsa (Cos.)","FULV1194",-182,-182);
addOffice("Repulsa (Cos.)","AEMI1134",-171,-171);
addOffice("Repulsa (Cos.)","CAEC1424",-145,-145);
addOffice("Repulsa (Cos.)","CAEC1424",-144,-144);
addOffice("Repulsa (Cos.)","LAEL1524",-141,-141);
addOffice("Repulsa (Cos.)","RUPI1602",-132,-132);
addOffice("Repulsa (Cos.)","RUPI1602",-131,-131);
addOffice("Repulsa (Cos.)","MARC1621",-130,-130);
addOffice("Repulsa (Cos.)","RUPI1602",-130,-130);
addOffice("Repulsa (Cos.)","RUPI1602",-129,-129);
addOffice("Repulsa (Cos.)","OPIM1639",-122,-122);
addOffice("Repulsa (Cos.)","AEMI1645",-116,-116);
addOffice("Repulsa (Cos.)","RUTI1596",-115,-115);
addOffice("Repulsa (Cos.)","CAEC1701",-114,-114);
addOffice("Repulsa (Cos.)","LUTA1731",-106,-106);
addOffice("Repulsa (Cos.)","LUTA1731",-105,-105);
addOffice("Repulsa (Cos.)","BILL1742",-104,-104);
addOffice("Repulsa (Cos.)","CAEC1693",-100,-100);
addOffice("Repulsa (Cos.)","VALE1821",-94,-94);
addOffice("Repulsa (Cos.)","MARC1764",-93,-93);
addOffice("Repulsa (Cos.)","SERV1814",-87,-87);
addOffice("Repulsa (Cos.)","AEMI1865",-78,-78);
addOffice("Repulsa (Cos.)","AURE2163",-65,-65);
addOffice("Repulsa (Cos.)","MANL2205",-65,-65);
addOffice("Repulsa (Cos.)","TURI2066",-64,-64);
addOffice("Repulsa (Cos.)","IUNI2120",-64,-64);
addOffice("Repulsa (Cos.)","SERG1998",-63,-63);
addOffice("Repulsa (Cos.)","LICI2067",-63,-63);
addOffice("Repulsa (Cos.)","SULP2179",-63,-63);
addOffice("Repulsa (Cos.)","CORN2181",-63,-63);
addOffice("Repulsa (Cos.)","CASS2257",-63,-63);
addOffice("Repulsa (Cos.)","SERG1998",-62,-62);
addOffice("Repulsa (Cos.)","SULP2088",-62,-62);
addOffice("Repulsa (Cos.)","LUCC2225",-59,-59);
addOffice("Repulsa (Cos.)","LUCC3816",-59,-59);
addOffice("Repulsa (Cos.)","CORN2196",-58,-58);
addOffice("Repulsa (Cos.)","PORC2241",-51,-51);
addOffice("Repulsa (Cos.)","CALI2375",-50,-50);
addOffice("Repulsa (Cos.)","SULP2316",-49,-49);
addOffice("Repulsa (Cos.)","CONS2359",-49,-49);
addOffice("Repulsa (Cos.)","CALI2375",-49,-49);
addOffice("Repulsa","QUIN0114",-450,-450);
addOffice("Repulsa","CLAU0141",-450,-450);
addOffice("Repulsa","QUIN0142",-450,-450);
addOffice("Repulsa","FULV0781",-212,-212);
addOffice("Repulsa","MANL0787",-212,-212);
addOffice("Repulsa","MARC1764",-106,-106);
addOffice("Repulsa","SERV1814",-63,-63);
addOffice("Repulsa","LUTA1949",-63,-63);
addOffice("Repulsa","CLAU2062",-58,-58);
addOffice("Repulsa","LUCI2457",-53,-53);
addOffice("Repulsa","LUCI2457",-52,-52);
addOffice("Repulsa","CORN2356",-51,-51);
addOffice("Repulsa","DOMI2264",-50,-50);
addOffice("Repulsa (Aed.)","POET4617",-304,-304);
addOffice("Repulsa (Aed.)","DOMI0638",-304,-304);
addOffice("Repulsa (Aed.)","CORN1513",-144,-144);
addOffice("Repulsa (Aed.)","MARI1660",-117,-117);
addOffice("Repulsa (Aed.)","IULI1825",-99,-99);
addOffice("Repulsa (Aed.)","CLAU1807",-95,-95);
addOffice("Repulsa (Aed.)","OCTA1873",-95,-95);
addOffice("Repulsa (Aed.)","CLAU1807",-94,-94);
addOffice("Repulsa (Aed.)","TULL2005",-86,-86);
addOffice("Repulsa (Aed.)","PUPI1974",-75,-75);
addOffice("Repulsa (Aed.)","VOLC2178",-71,-71);
addOffice("Repulsa (Aed.)","FAVO2352",-60,-60);
addOffice("Repulsa (Aed.)","FAVO2352",-59,-59);
addOffice("Repulsa (Aed.)","VATI2297",-56,-56);
addOffice("Repulsa (Aed.)","IUVE2308",-55,-55);
addOffice("Repulsa (Aed.)","PEDI2370",-55,-55);
addOffice("Repulsa (Aed.)","IUVE2308",-54,-54);
addOffice("Repulsa (Aed.)","COEL2408",-50,-50);
addOffice("Repulsa (Aed.)","LUCI2457",-50,-50);
addOffice("Repulsa (Aed.)","VALE3849",-35,-35);
addOffice("Repulsa (Tr. Pl.)","RUTI1596",-121,-121);
addOffice("Repulsa (Tr. Pl.)","SEMP1598",-121,-121);
addOffice("Repulsa (Tr. Pl.)","MARI1660",-120,-120);
addOffice("Repulsa (Tr. Pl.)","FLAV1743",-109,-109);
addOffice("Repulsa (Tr. Pl.)","CASS1801",-105,-105);
addOffice("Repulsa (Tr. Pl.)","NUNN4616",-99,-99);
addOffice("Repulsa (Tr. Pl.)","AURE1866",-90,-90);
addOffice("Repulsa (Tr. Pl.)","SERT1818",-88,-88);
addOffice("Repulsa (Tr. Pl.)","NONI2010",-88,-88);
addOffice("Repulsa (Tr. Pl.)","AUFI2032",-83,-83);
addOffice("Repulsa (Tr. Pl.)","CASS2050",-83,-83);
addOffice("Repulsa (Tr. Pl.)","FLAM2687",-44,-44);
addOffice("Repulsa (Tr. Pl.)","ANON3426",-44,-44);
addOffice("Repulsa (Pr.)","AELI1622",-128,-128);
addOffice("Repulsa (Pr.)","AELI1622",-127,-127);
addOffice("Repulsa (Pr.)","CORN1746",-98,-98);
addOffice("Repulsa (Pr.)","CORN1746",-96,-96);
addOffice("Repulsa (Pr.)","CAEC2078",-74,-74);
addOffice("Repulsa (Pr.)","CALP5166",-56,-56);
addOffice("Repulsa (Pr.)","ALFI2346",-56,-56);
addOffice("Repulsa (Pr.)","PORC2241",-55,-55);
addOffice("Repulsa (Pr.)","FAVO2352",-50,-50);
addOffice("Repulsa (Pr.)","FAVO2352",-49,-49);
addOffice("Repulsa (Pr.)","SEMP2972",-46,-46);
addOffice("Repulsa (Pr.)","VALE3849",-35,-35);
addOffice("Repulsa (Q.)","ANTI4614",-420,-420);
addOffice("Repulsa (Q.)","POMP4615",-420,-420);
addOffice("Repulsa (Q.)","LUTA1731",-111,-111);
addOffice("Repulsa (Q.)","LUTA1731",-107,-107);
addOffice("Promagistrate","CORN0817",-217,-217);
addOffice("Promagistrate","CORN0817",-216,-216);
addOffice("Promagistrate","CORN0817",-215,-215);
addOffice("Promagistrate","CORN0817",-214,-214);
addOffice("Promagistrate","VALE0807",-214,-214);
addOffice("Promagistrate","CORN0817",-213,-213);
addOffice("Promagistrate","OTAC0856",-213,-213);
addOffice("Promagistrate","VALE0807",-213,-213);
addOffice("Promagistrate","CORN0817",-212,-212);
addOffice("Promagistrate","OTAC0856",-212,-212);
addOffice("Promagistrate","SEMP0882",-212,-212);
addOffice("Promagistrate","VALE0807",-212,-212);
addOffice("Promagistrate","CORN0817",-211,-211);
addOffice("Promagistrate","OTAC0856",-211,-211);
addOffice("Promagistrate","SEMP0882",-211,-211);
addOffice("Promagistrate","VALE0807",-211,-211);
addOffice("Promagistrate","CALP0966",-210,-210);
addOffice("Promagistrate","CALP0966",-209,-209);
addOffice("Promagistrate","CINC0957",-209,-209);
addOffice("Promagistrate","CALP0966",-208,-208);
addOffice("Promagistrate","CINC0957",-208,-208);
addOffice("Promagistrate","MANL0958",-207,-207);
addOffice("Promagistrate","VALE0807",-205,-205);
addOffice("Promagistrate","MARC1033",-203,-203);
addOffice("Promagistrate","SERG1073",-199,-199);
addOffice("Promagistrate","MINU1064",-195,-195);
addOffice("Promagistrate","SEMP0976",-195,-195);
addOffice("Promagistrate","CORN1077",-193,-193);
addOffice("Promagistrate","DIGI1138",-193,-193);
addOffice("Promagistrate","SEMP0976",-193,-193);
addOffice("Promagistrate","FLAM0989",-192,-192);
addOffice("Promagistrate","MINU1064",-192,-192);
addOffice("Promagistrate","OPPI1105",-192,-192);
addOffice("Promagistrate","FLAM0989",-191,-191);
addOffice("Promagistrate","MINU1064",-191,-191);
addOffice("Promagistrate","AEMI1067",-190,-190);
addOffice("Promagistrate","CORN1077",-190,-190);
addOffice("Promagistrate","FLAM0989",-190,-190);
addOffice("Promagistrate","LIVI0952",-190,-190);
addOffice("Promagistrate","MINU1064",-190,-190);
addOffice("Promagistrate","OPPI1105",-190,-190);
addOffice("Promagistrate","OPPI1105",-189,-189);
addOffice("Promagistrate","FABI1117",-188,-188);
addOffice("Promagistrate","PLAU1190",-188,-188);
addOffice("Promagistrate","CALP1222",-185,-185);
addOffice("Promagistrate","QUIN1226",-185,-185);
addOffice("Promagistrate","CALP1222",-184,-184);
addOffice("Promagistrate","POST1231",-184,-184);
addOffice("Promagistrate","QUIN1226",-184,-184);
addOffice("Promagistrate","FABI1117",-182,-182);
addOffice("Promagistrate","MANL1128",-181,-181);
addOffice("Promagistrate","MANL1128",-180,-180);
addOffice("Promagistrate","CORN1326",-174,-174);
addOffice("Promagistrate","ATIL1329",-173,-173);
addOffice("Promagistrate","FURI1332",-173,-173);
addOffice("Promagistrate","SERV1291",-173,-173);
addOffice("Promagistrate","SICI1234",-173,-173);
addOffice("Promagistrate","FURI1332",-172,-172);
addOffice("Promagistrate","IUNI1353",-171,-171);
addOffice("Promagistrate","LUCR1355",-171,-171);
addOffice("Promagistrate","SICI1234",-171,-171);
addOffice("Promagistrate","CANU1334",-170,-170);
addOffice("Promagistrate","FONT1394",-168,-168);
addOffice("Promagistrate","SERV1291",-168,-168);
addOffice("Promagistrate","FONT1394",-167,-167);
addOffice("Promagistrate","MUMM1495",-152,-152);
addOffice("Promagistrate","IUVE1507",-148,-148);
addOffice("Promagistrate","CAEC1424",-147,-147);
addOffice("Promagistrate","CAEC1424",-146,-146);
addOffice("Promagistrate","MUMM1495",-145,-145);
addOffice("Promagistrate","LAEL1524",-144,-144);
addOffice("Promagistrate","MARC1550",-143,-143);
addOffice("Promagistrate","CAEC1424",-142,-142);
addOffice("Promagistrate","LICI1554",-142,-142);
addOffice("Promagistrate","POMP1551",-140,-140);
addOffice("Promagistrate","POMP1551",-139,-139);
addOffice("Promagistrate","COSC1589",-134,-134);
addOffice("Promagistrate","COSC1589",-133,-133);
addOffice("Promagistrate","CAEC1424",-133,-133);
addOffice("Promagistrate","SERV1552",-133,-133);
addOffice("Promagistrate","PERP1600",-132,-132);
addOffice("Promagistrate","COSC1589",-132,-132);
addOffice("Promagistrate","LATI1628",-129,-129);
addOffice("Promagistrate","VALE1888",-120,-120);
addOffice("Promagistrate","MARI1660",-114,-114);
addOffice("Promagistrate","CAEC1693",-111,-111);
addOffice("Promagistrate","SULP1718",-110,-110);
addOffice("Promagistrate","MARI1778",-101,-101);
addOffice("Promagistrate","FABI2960",-100,-1);
addOffice("Promagistrate","COEL1744",-98,-98);
addOffice("Promagistrate","PORC1831",-91,-91);
addOffice("Promagistrate","CLAU1753",-91,-91);
addOffice("Promagistrate","CAEL1868",-90,-90);
addOffice("Promagistrate","SULP1850",-90,-90);
addOffice("Promagistrate","MARI1660",-90,-90);
addOffice("Promagistrate","CORN1746",-89,-89);
addOffice("Promagistrate","NORB1777",-88,-88);
addOffice("Promagistrate","MARI1660",-88,-88);
addOffice("Promagistrate","CASS1801",-87,-87);
addOffice("Promagistrate","CLAU1807",-87,-87);
addOffice("Promagistrate","NORB1777",-87,-87);
addOffice("Promagistrate","MARI1660",-87,-87);
addOffice("Promagistrate","CORN1882",-85,-85);
addOffice("Promagistrate","VALE1802",-85,-85);
addOffice("Promagistrate","CORN1882",-84,-84);
addOffice("Promagistrate","DOMI1991",-82,-82);
addOffice("Promagistrate","NORB1777",-82,-82);
addOffice("Promagistrate","SERT1818",-82,-82);
addOffice("Promagistrate","DOMI1991",-81,-81);
addOffice("Promagistrate","SERT1818",-81,-81);
addOffice("Promagistrate","SERT1818",-80,-80);
addOffice("Promagistrate","SERT1818",-79,-79);
addOffice("Promagistrate","COEL3127",-79,-79);
addOffice("Promagistrate","SERT1818",-78,-78);
addOffice("Promagistrate","CORN2035",-77,-77);
addOffice("Promagistrate","LICI1903",-77,-77);
addOffice("Promagistrate","SERT1818",-77,-77);
addOffice("Promagistrate","TERE2037",-77,-77);
addOffice("Promagistrate","AUFI2032",-76,-76);
addOffice("Promagistrate","LICI1903",-76,-76);
addOffice("Promagistrate","SERT1818",-76,-76);
addOffice("Promagistrate","TREM2157",-76,-76);
addOffice("Promagistrate","SERT1818",-75,-75);
addOffice("Promagistrate","SERT1818",-74,-74);
addOffice("Promagistrate","SERT1818",-73,-73);
addOffice("Promagistrate","SERT1818",-72,-72);
addOffice("Promagistrate","CAES2138",-71,-71);
addOffice("Promagistrate","TREM2157",-71,-71);
addOffice("Promagistrate","CAEC2150",-70,-70);
addOffice("Promagistrate","MANL2165",-69,-69);
addOffice("Promagistrate","IULI1957",-68,-68);
addOffice("Promagistrate","LICI2103",-67,-67);
addOffice("Promagistrate","RUBR2206",-67,-67);
addOffice("Promagistrate","PLAE2169",-63,-63);
addOffice("Promagistrate","POMP2311",-62,-62);
addOffice("Promagistrate","IULI1957",-61,-61);
addOffice("Promagistrate","MARC2303",-61,-61);
addOffice("Promagistrate","PAPI2235",-61,-61);
addOffice("Promagistrate","POMP2311",-61,-61);
addOffice("Promagistrate","CORN2330",-61,-61);
addOffice("Promagistrate","CLOD2219",-60,-60);
addOffice("Promagistrate","IULI1957",-60,-60);
addOffice("Promagistrate","MARC2303",-60,-60);
addOffice("Promagistrate","PAPI2235",-60,-60);
addOffice("Promagistrate","POMP2311",-60,-60);
addOffice("Promagistrate","CORN2290",-59,-59);
addOffice("Promagistrate","PAPI2235",-59,-59);
addOffice("Promagistrate","POMP2311",-59,-59);
addOffice("Promagistrate","IULI1957",-58,-58);
addOffice("Promagistrate","POMP2311",-58,-58);
addOffice("Promagistrate","IULI1957",-57,-57);
addOffice("Promagistrate","MEMM2261",-57,-57);
addOffice("Promagistrate","POMP2311",-57,-57);
addOffice("Promagistrate","CAEC2320",-56,-56);
addOffice("Promagistrate","CLAU2140",-56,-56);
addOffice("Promagistrate","CORN2290",-56,-56);
addOffice("Promagistrate","IULI1957",-56,-56);
addOffice("Promagistrate","POMP2311",-56,-56);
addOffice("Promagistrate","CORN2290",-55,-55);
addOffice("Promagistrate","IULI1957",-55,-55);
addOffice("Promagistrate","POMP2311",-55,-55);
addOffice("Promagistrate","MEGA3100",-55,-55);
addOffice("Promagistrate","CORN2290",-54,-54);
addOffice("Promagistrate","IULI1957",-54,-54);
addOffice("Promagistrate","POMP2311",-54,-54);
addOffice("Promagistrate","CLAU2140",-53,-53);
addOffice("Promagistrate","CORN2290",-53,-53);
addOffice("Promagistrate","IULI1957",-53,-53);
addOffice("Promagistrate","ATTI2455",-53,-53);
addOffice("Promagistrate","CLAU2140",-52,-52);
addOffice("Promagistrate","CORN2290",-52,-52);
addOffice("Promagistrate","IULI1957",-52,-52);
addOffice("Promagistrate","CLAU2140",-51,-51);
addOffice("Promagistrate","CORN2290",-51,-51);
addOffice("Promagistrate","IULI1957",-51,-51);
addOffice("Promagistrate","NONI2403",-51,-51);
addOffice("Promagistrate","AURE2434",-50,-50);
addOffice("Promagistrate","IULI1957",-50,-50);
addOffice("Promagistrate","MESC2500",-50,-50);
addOffice("Promagistrate","NONI2403",-50,-50);
addOffice("Promagistrate","FURI2958",-50,-50);
addOffice("Promagistrate","AELI2325",-49,-49);
addOffice("Promagistrate","ATTI2455",-49,-49);
addOffice("Promagistrate","AURE2434",-49,-49);
addOffice("Promagistrate","CLAU2140",-49,-49);
addOffice("Promagistrate","IULI1957",-49,-49);
addOffice("Promagistrate","NONI2403",-49,-49);
addOffice("Promagistrate","PLAU2276",-49,-49);
addOffice("Promagistrate","PORC2241",-49,-49);
addOffice("Promagistrate","POST2436",-49,-49);
addOffice("Promagistrate","SEST2296",-49,-49);
addOffice("Promagistrate","VOCO2437",-49,-49);
addOffice("Promagistrate","ATTI2455",-48,-48);
addOffice("Promagistrate","CLAU2140",-48,-48);
addOffice("Promagistrate","COPO2537",-48,-48);
addOffice("Promagistrate","PEDU2426",-48,-48);
addOffice("Promagistrate","PLAU2276",-48,-48);
addOffice("Promagistrate","PORC2241",-48,-48);
addOffice("Promagistrate","SEST2296",-48,-48);
addOffice("Promagistrate","SULP2430",-47,-47);
addOffice("Promagistrate","MANL2198",-47,-47);
addOffice("Promagistrate","CORN2300",-46,-46);
addOffice("Promagistrate","IUNI2459",-46,-46);
addOffice("Promagistrate","MANL2198",-46,-46);
addOffice("Promagistrate","POMP2253",-46,-46);
addOffice("Promagistrate","SULP2430",-46,-46);
addOffice("Promagistrate","CALV2584",-45,-45);
addOffice("Promagistrate","CARR2608",-45,-45);
addOffice("Promagistrate","FABI2379",-45,-45);
addOffice("Promagistrate","POMP2253",-45,-45);
addOffice("Promagistrate","VOLC2609",-45,-45);
addOffice("Promagistrate","ASIN2553",-44,-44);
addOffice("Promagistrate","POMP2633",-44,-44);
addOffice("Promagistrate","POMP2254",-44,-44);
addOffice("Promagistrate","SEXT2468",-44,-44);
addOffice("Promagistrate","VOLC2609",-44,-44);
addOffice("Promagistrate","ASIN2553",-43,-43);
addOffice("Promagistrate","POMP2633",-43,-43);
addOffice("Promagistrate","SEXT2468",-43,-43);
addOffice("Promagistrate","DOMI2699",-42,-42);
addOffice("Promagistrate","LURI2776",-42,-42);
addOffice("Promagistrate","POMP2633",-42,-42);
addOffice("Promagistrate","SEXT2468",-42,-42);
addOffice("Promagistrate","VENT2638",-42,-42);
addOffice("Promagistrate","ASIN2553",-41,-41);
addOffice("Promagistrate","CANI2741",-41,-41);
addOffice("Promagistrate","CARR2608",-41,-41);
addOffice("Promagistrate","DOMI2699",-41,-41);
addOffice("Promagistrate","FUFI2807",-41,-41);
addOffice("Promagistrate","LURI2776",-41,-41);
addOffice("Promagistrate","SALV2788",-41,-41);
addOffice("Promagistrate","SEXT2468",-41,-41);
addOffice("Promagistrate","TURI2790",-41,-41);
addOffice("Promagistrate","VENT2638",-41,-41);
addOffice("Promagistrate","CORN2819",-41,-41);
addOffice("Promagistrate","ASIN2553",-40,-40);
addOffice("Promagistrate","CANI2741",-40,-40);
addOffice("Promagistrate","DOMI2699",-40,-40);
addOffice("Promagistrate","FUFI2807",-40,-40);
addOffice("Promagistrate","LURI2776",-40,-40);
addOffice("Promagistrate","SALV2788",-40,-40);
addOffice("Promagistrate","SEXT2468",-40,-40);
addOffice("Promagistrate","STAI2588",-40,-40);
addOffice("Promagistrate","VENT2638",-40,-40);
addOffice("Promagistrate","STAI2588",-39,-39);
addOffice("Promagistrate","COCC2767",-39,-39);
addOffice("Promagistrate","ATIU2849",-38,-38);
addOffice("Promagistrate","CALV2584",-38,-38);
addOffice("Promagistrate","COCC2767",-38,-38);
addOffice("Promagistrate","CALV2584",-37,-37);
addOffice("Promagistrate","CANI2741",-37,-37);
addOffice("Promagistrate","LICI2860",-37,-37);
addOffice("Promagistrate","COCC2767",-37,-37);
addOffice("Promagistrate","CALP2739",-36,-36);
addOffice("Promagistrate","CANI2741",-36,-36);
addOffice("Promagistrate","CARR2608",-36,-36);
addOffice("Promagistrate","CLAU2867",-36,-36);
addOffice("Promagistrate","FURN2521",-36,-36);
addOffice("Promagistrate","LICI2860",-36,-36);
addOffice("Promagistrate","SEMP2823",-36,-36);
addOffice("Promagistrate","VALE2758",-36,-36);
addOffice("Promagistrate","COCC2767",-36,-36);
addOffice("Promagistrate","ANTI2640",-35,-35);
addOffice("Promagistrate","CANI2741",-35,-35);
addOffice("Promagistrate","FUFI2888",-35,-35);
addOffice("Promagistrate","FURN2521",-35,-35);
addOffice("Promagistrate","ANON2889",-35,-35);
addOffice("Promagistrate","LICI2860",-35,-35);
addOffice("Promagistrate","LOLL2890",-35,-35);
addOffice("Promagistrate","COCC2767",-35,-35);
addOffice("Promagistrate","ANTI2640",-34,-34);
addOffice("Promagistrate","CALP2739",-34,-34);
addOffice("Promagistrate","CANI2741",-34,-34);
addOffice("Promagistrate","CLAU2867",-34,-34);
addOffice("Promagistrate","FUFI2888",-34,-34);
addOffice("Promagistrate","LOLL2890",-34,-34);
addOffice("Promagistrate","VALE2758",-34,-34);
addOffice("Promagistrate","CALP2739",-33,-33);
addOffice("Promagistrate","CANI2741",-33,-33);
addOffice("Promagistrate","CLAU2867",-33,-33);
addOffice("Promagistrate","VALE2758",-33,-33);
addOffice("Promagistrate","CALP2739",-32,-32);
addOffice("Promagistrate","CLAU2867",-32,-32);
addOffice("Promagistrate","ARRU2918",-31,-31);
addOffice("Promagistrate","CALV2584",-31,-31);
addOffice("Promagistrate","CANI2741",-31,-31);
addOffice("Promagistrate","DIDI2919",-31,-31);
addOffice("Promagistrate","DOMI2699",-31,-31);
addOffice("Promagistrate","GELL2802",-31,-31);
addOffice("Promagistrate","LURI2776",-31,-31);
addOffice("Promagistrate","OCTA2920",-31,-31);
addOffice("Promagistrate","PINA2795",-31,-31);
addOffice("Promagistrate","VALE2758",-31,-31);
addOffice("Promagistrate","FLAV3470",-28,-28);
addOffice("Praefectus Turmae","CORN1331",-190,-190);
addOffice("Praefectus Turmae","CORN1309",-190,-190);
addOffice("Praefectus Oppidi","AFRA5043",-169,-169);
addOffice("Praefectus Oppidi","CARV5044",-169,-169);
addOffice("Praefectus Oppidi","LICI5046",-114,-114);
addOffice("Praefectus Oppidi","ACIL1880",-90,-90);
addOffice("Praefectus Oppidi","CORN1882",-90,-90);
addOffice("Praefectus Oppidi","VALE5047",-74,-74);
addOffice("Navarchus Princeps","AMPI5094",-49,-49);
addOffice("Duovir - Unspecified","CONS5096",-83,-83);
addOffice("Duovir - Unspecified","SALT5101",-83,-83);
addOffice("Scriba Quaestoris","HORA2731",-41,-41);
addOffice("Praetor Designatus","SEXT2969",-82,-82);
addOffice("Praetor Designatus","PLIN2875",-35,-35);
addOffice("Praefectus Navium","CORN1331",-190,-190);
addOffice("Praefectus Navium","CORN1309",-190,-190);
addOffice("Triumvir Agro Dando","QUIN0114",-467,-467);
addOffice("Triumvir Agro Dando","VERG0122",-467,-467);
addOffice("Triumvir Agro Dando","FURI0110",-467,-467);
addOffice("Sacerdos Fortuna Muliebris","VALE0060",-488,-488);
addOffice("Curio Maximus","SULP0023",-463,-463);
addOffice("Curio Maximus","AEMI0981",-225,-211);
addOffice("Curio Maximus","AEMI0981",-210,-210);
addOffice("Curio Maximus","MAMI0982",-209,-174);
addOffice("Curio Maximus","SCRI1111",-174,-174);
addOffice("Curio Maximus","STAT2822",-31,-31);
addOffice("Curio Maximus","CALV2584",-31,-31);
addOffice("Flamen Quirinalis","CORN0076",-453,-453);
addOffice("Flamen Quirinalis","CLOE4644",-250,-225);
addOffice("Flamen Quirinalis","CORN0815",-224,-223);
addOffice("Flamen Quirinalis","FABI1188",-190,-167);
addOffice("Flamen Quirinalis","FABI4650",-167,-149);
addOffice("Flamen Quirinalis","SULP4673",-63,-63);
addOffice("Flamen Quirinalis","IULI2374",-60,-58);
addOffice("Flamen Quirinalis","IULI2374",-57,-46);
addOffice("Praefectus Annonae","MINU0147",-440,-440);
addOffice("Praefectus Annonae","MINU0147",-439,-439);
addOffice("Praefectus","LAEN3119",-509,-31);
addOffice("Praefectus","FURI0414",-389,-389);
addOffice("Praefectus","MANL0536",-340,-340);
addOffice("Praefectus","DASI0844",-218,-218);
addOffice("Praefectus","STAT0886",-216,-216);
addOffice("Praefectus","IUNI0925",-216,-216);
addOffice("Praefectus","ATIL0900",-215,-215);
addOffice("Praefectus","VALE0901",-215,-215);
addOffice("Praefectus","VALE0902",-215,-215);
addOffice("Praefectus","LIVI0909",-214,-214);
addOffice("Praefectus","LIVI0909",-213,-213);
addOffice("Praefectus","PINA0917",-213,-213);
addOffice("Praefectus","POMP0918",-213,-213);
addOffice("Praefectus","ATIN0935",-212,-212);
addOffice("Praefectus","LIVI0909",-212,-212);
addOffice("Praefectus","LIVI0909",-211,-211);
addOffice("Praefectus","PERS5042",-210,-210);
addOffice("Praefectus","LIVI0909",-210,-210);
addOffice("Praefectus","QUIN0974",-210,-210);
addOffice("Praefectus","VALE0808",-210,-210);
addOffice("Praefectus","LAEL0992",-209,-209);
addOffice("Praefectus","LIVI0909",-209,-209);
addOffice("Praefectus","VALE0808",-209,-209);
addOffice("Praefectus","ARRE1003",-208,-208);
addOffice("Praefectus","AULI1004",-208,-208);
addOffice("Praefectus","CLAU1018",-207,-207);
addOffice("Praefectus","LAEL0992",-205,-205);
addOffice("Praefectus","LAEL0992",-204,-204);
addOffice("Praefectus","AMPI1069",-201,-201);
addOffice("Praefectus","IUNI1123",-196,-196);
addOffice("Praefectus","SEMP1124",-196,-196);
addOffice("Praefectus","ATIN1145",-194,-194);
addOffice("Praefectus","SEMP1146",-194,-194);
addOffice("Praefectus","CINC1036",-193,-193);
addOffice("Praefectus","LIVI0952",-193,-193);
addOffice("Praefectus","ORFI1174",-191,-191);
addOffice("Praefectus","ORBI3761",-189,-189);
addOffice("Praefectus","SCRI1269",-181,-181);
addOffice("Praefectus","COMI1292",-179,-179);
addOffice("Praefectus","PORC1271",-172,-172);
addOffice("Praefectus","SALV1435",-168,-168);
addOffice("Praefectus","BAEB1450",-167,-167);
addOffice("Praefectus","GABI1451",-167,-167);
addOffice("Praefectus","TITI1612",-133,-133);
addOffice("Praefectus","AEMI1668",-120,-120);
addOffice("Praefectus","HORT1670",-120,-120);
addOffice("Praefectus","POST1671",-120,-120);
addOffice("Praefectus","MAGI3461",-112,-112);
addOffice("Praefectus","MAGI3461",-111,-111);
addOffice("Praefectus","ANNI1740",-108,-108);
addOffice("Praefectus","GRAT1786",-102,-102);
addOffice("Praefectus","CALP1797",-100,-100);
addOffice("Praefectus","AEFI3300",-100,-1);
addOffice("Praefectus","PETR4559",-87,-87);
addOffice("Praefectus","LUCR2003",-82,-82);
addOffice("Praefectus","INST2055",-77,-77);
addOffice("Praefectus","INST2059",-76,-76);
addOffice("Praefectus","ANTO2146",-72,-72);
addOffice("Praefectus","AUFI2147",-72,-72);
addOffice("Praefectus","FABI2013",-72,-72);
addOffice("Praefectus","MAEC2148",-72,-72);
addOffice("Praefectus","MANL2149",-72,-72);
addOffice("Praefectus","OCTA2057",-72,-72);
addOffice("Praefectus","PERP1986",-72,-72);
addOffice("Praefectus","TARQ2058",-72,-72);
addOffice("Praefectus","CORN3438",-72,-72);
addOffice("Praefectus","CORN3438",-71,-71);
addOffice("Praefectus","IUNI4145",-69,-69);
addOffice("Praefectus","IUNI2189",-69,-69);
addOffice("Praefectus","PETR2280",-64,-64);
addOffice("Praefectus","PEDU2317",-62,-62);
addOffice("Praefectus","SILI2411",-57,-57);
addOffice("Praefectus","IUNI2489",-56,-56);
addOffice("Praefectus","ATRI2453",-54,-54);
addOffice("Praefectus","ROSC3828",-53,-53);
addOffice("Praefectus","ROSC3829",-53,-53);
addOffice("Praefectus","COPO2537",-53,-53);
addOffice("Praefectus","EGNA2472",-53,-53);
addOffice("Praefectus","VOLC2474",-53,-53);
addOffice("Praefectus","IUNI2489",-52,-52);
addOffice("Praefectus","SCAP2490",-52,-52);
addOffice("Praefectus","VOLU2513",-51,-51);
addOffice("Praefectus","MATI4576",-51,-51);
addOffice("Praefectus","GAVI2529",-50,-50);
addOffice("Praefectus","SCAP2527",-50,-50);
addOffice("Praefectus","VOLU2513",-50,-50);
addOffice("Praefectus","CASS2458",-49,-49);
addOffice("Praefectus","ATTI2555",-49,-49);
addOffice("Praefectus","FLAM2557",-49,-49);
addOffice("Praefectus","GALL2558",-49,-49);
addOffice("Praefectus","LAEL2438",-49,-49);
addOffice("Praefectus","MINU2561",-49,-49);
addOffice("Praefectus","NASI2562",-49,-49);
addOffice("Praefectus","TULL2563",-49,-49);
addOffice("Praefectus","VIBI2565",-49,-49);
addOffice("Praefectus","VIBU2566",-49,-49);
addOffice("Praefectus","LUCR3808",-49,-49);
addOffice("Praefectus","ACCI4566",-49,-49);
addOffice("Praefectus","CASS2591",-48,-48);
addOffice("Praefectus","CASS2458",-48,-48);
addOffice("Praefectus","IULI2559",-48,-48);
addOffice("Praefectus","LAEL2438",-48,-48);
addOffice("Praefectus","MINU2561",-48,-48);
addOffice("Praefectus","OPIM2593",-48,-48);
addOffice("Praefectus","OTAC2594",-48,-48);
addOffice("Praefectus","POMP2595",-48,-48);
addOffice("Praefectus","STAB2596",-48,-48);
addOffice("Praefectus","TULL2563",-48,-48);
addOffice("Praefectus","IUST3743",-48,-48);
addOffice("Praefectus","NASI2562",-47,-47);
addOffice("Praefectus","TETT2606",-47,-47);
addOffice("Praefectus","RUFI3832",-47,-47);
addOffice("Praefectus","ANON2625",-46,-46);
addOffice("Praefectus","CORN2627",-46,-46);
addOffice("Praefectus","DECI2628",-46,-46);
addOffice("Praefectus","MINU2630",-46,-46);
addOffice("Praefectus","RUBR2631",-46,-46);
addOffice("Praefectus","CAUC2651",-45,-45);
addOffice("Praefectus","CLOD2652",-45,-45);
addOffice("Praefectus","MUNA2653",-45,-45);
addOffice("Praefectus","NONI2598",-45,-45);
addOffice("Praefectus","VIBI2654",-45,-45);
addOffice("Praefectus","RUTI2656",-45,-45);
addOffice("Praefectus","DOMI2699",-44,-44);
addOffice("Praefectus","CLOD2760",-43,-43);
addOffice("Praefectus","FABI2761",-43,-43);
addOffice("Praefectus","MARC2762",-43,-43);
addOffice("Praefectus","SEXT2763",-43,-43);
addOffice("Praefectus","TERE2365",-43,-43);
addOffice("Praefectus","TULL2563",-43,-43);
addOffice("Praefectus","VOLU2765",-43,-43);
addOffice("Praefectus","MEMM3015",-42,-42);
addOffice("Praefectus","CLOD2792",-42,-42);
addOffice("Praefectus","FABI2761",-42,-42);
addOffice("Praefectus","ANON2794",-42,-42);
addOffice("Praefectus","PINA2795",-42,-42);
addOffice("Praefectus","PORC2754",-42,-42);
addOffice("Praefectus","ROSC2797",-42,-42);
addOffice("Praefectus","TULL2563",-42,-42);
addOffice("Praefectus","CURT2817",-41,-41);
addOffice("Praefectus","SERV2835",-40,-40);
addOffice("Praefectus","IULI2843",-39,-39);
addOffice("Praefectus","MACH2856",-38,-38);
addOffice("Praefectus","MACH3459",-38,-38);
addOffice("Praefectus","ANON5051",-36,-36);
addOffice("Praefectus","MARI2881",-36,-36);
addOffice("Praefectus","MIND2882",-36,-36);
addOffice("Praefectus","CURI2892",-35,-35);
addOffice("Praefectus","POMP2832",-35,-35);
addOffice("Praefectus","HORT5052",-31,-31);
addOffice("Praefectus","PROC5053",-31,-31);
addOffice("Praefectus","IULI5055",-30,-30);
addOffice("Praefectus","ANON5051",-30,-30);
addOffice("Flamen Carmentalis","POPI0491",-359,-359);
addOffice("Quinquevir Mensarius","DUIL0514",-352,-352);
addOffice("Quinquevir Mensarius","DECI0515",-352,-352);
addOffice("Quinquevir Mensarius","PAPI0516",-352,-352);
addOffice("Quinquevir Mensarius","PUBL0517",-352,-352);
addOffice("Quinquevir Mensarius","AEMI0538",-352,-352);
addOffice("Fetialis","VALE0537",-340,-340);
addOffice("Fetialis","CORN0510",-320,-320);
addOffice("Duovir Navalis","CORN0606",-310,-310);
addOffice("Duovir Navalis","CORN0678",-282,-282);
addOffice("Duovir Navalis","VALE0679",-282,-282);
addOffice("Duovir Navalis","LUCR1272",-181,-181);
addOffice("Duovir Navalis","MATI1273",-181,-181);
addOffice("Duovir Navalis","CORN1282",-180,-180);
addOffice("Duovir Navalis","CORN1282",-179,-179);
addOffice("Duovir Navalis","CORN1282",-178,-178);
addOffice("Duovir Navalis","FURI1308",-178,-178);
addOffice("Duovir Aquae Perducendae","CURI0641",-270,-270);
addOffice("Duovir Aquae Perducendae","FULV0699",-270,-270);
addOffice("Flamen Dialis","CORN0752",-275,-251);
addOffice("Flamen Dialis","QUIN3824",-250,-250);
addOffice("Flamen Dialis","SULP0816",-230,-223);
addOffice("Flamen Dialis","CLAU4642",-220,-212);
addOffice("Flamen Dialis","CLAU4642",-211,-211);
addOffice("Flamen Dialis","VALE0993",-209,-183);
addOffice("Flamen Dialis","CORN3133",-175,-175);
addOffice("Flamen Dialis","CORN4649",-174,-174);
addOffice("Flamen Dialis","CORN1872",-105,-88);
addOffice("Flamen Dialis","IULI1957",-87,-87);
addOffice("Flamen Dialis","CORN1872",-87,-87);
addOffice("Flamen Dialis","IULI1957",-84,-81);
addOffice("Flamen Martialis","POST0766",-250,-244);
addOffice("Flamen Martialis","CLOE4644",-250,-225);
addOffice("Flamen Martialis","POST0766",-243,-234);
addOffice("Flamen Martialis","CORN0815",-224,-223);
addOffice("Flamen Martialis","AEMI0854",-220,-216);
addOffice("Flamen Martialis","AEMI0854",-215,-205);
addOffice("Flamen Martialis","VETU1031",-204,-204);
addOffice("Flamen Martialis","QUIN1041",-200,-170);
addOffice("Flamen Martialis","QUIN1041",-169,-169);
addOffice("Flamen Martialis","POST1406",-168,-154);
addOffice("Flamen Martialis","VALE1492",-153,-132);
addOffice("Flamen Martialis","VALE1492",-131,-131);
addOffice("Flamen Martialis","POST1800",-125,-110);
addOffice("Flamen Martialis","VALE1815",-105,-71);
addOffice("Flamen Martialis","CORN2196",-70,-56);
addOffice("Flamen Martialis","CORN2416",-56,-56);
addOffice("Triumvir Nocturnus","FLAV0616",-306,-306);
addOffice("Triumvir Nocturnus","MULV0772",-241,-241);
addOffice("Triumvir Nocturnus","LOLL0773",-241,-241);
addOffice("Triumvir Nocturnus","SEXT0774",-241,-241);
addOffice("Triumvir Nocturnus","VILL0950",-211,-211);
addOffice("Salius","FURI0831",-275,-220);
addOffice("Salius","FURI0828",-235,-221);
addOffice("Salius","CORN0878",-215,-212);
addOffice("Salius","CORN0878",-211,-183);
addOffice("Salius","CLAU1452",-170,-168);
addOffice("Salius","CLAU1452",-167,-130);
addOffice("Salius","IULI1957",-85,-44);
addOffice("Salius","CLAU2062",-80,-56);
addOffice("Triumvir Agris Dandis Assignandis","PAPI5170",-218,-218);
addOffice("Triumvir Agris Dandis Assignandis","LUTA0823",-218,-218);
addOffice("Triumvir Agris Dandis Assignandis","SERV0845",-218,-218);
addOffice("Triumvir Agris Dandis Assignandis","ANNI0846",-218,-218);
addOffice("Triumvir Agris Dandis Assignandis","ACIL0847",-218,-218);
addOffice("Triumvir Agris Dandis Assignandis","HERE0848",-218,-218);
addOffice("Triumvir Agris Dandis Assignandis","CORN0819",-218,-218);
addOffice("Triumvir Agris Dandis Assignandis","PAPI0849",-218,-218);
addOffice("Triumvir Agris Dandis Assignandis","CORN0851",-218,-218);
addOffice("Triumvir Agris Dandis Assignandis","SEMP1598",-128,-128);
addOffice("Triumvir Agris Dandis Assignandis","FULV1624",-128,-128);
addOffice("Triumvir Agris Dandis Assignandis","PAPI1623",-128,-128);
addOffice("Triumvir Agris Dandis Assignandis","SEMP1598",-127,-127);
addOffice("Triumvir Agris Dandis Assignandis","FULV1624",-127,-127);
addOffice("Triumvir Agris Dandis Assignandis","PAPI1623",-127,-127);
addOffice("Triumvir Agris Dandis Assignandis","SEMP1598",-125,-125);
addOffice("Triumvir Agris Dandis Assignandis","FULV1624",-125,-125);
addOffice("Triumvir Agris Dandis Assignandis","PAPI1623",-125,-125);
addOffice("Triumvir Agris Dandis Assignandis","SEMP1598",-124,-124);
addOffice("Triumvir Agris Dandis Assignandis","FULV1624",-124,-124);
addOffice("Triumvir Agris Dandis Assignandis","PAPI1623",-124,-124);
addOffice("Triumvir Agris Dandis Assignandis","SEMP1598",-123,-123);
addOffice("Triumvir Agris Dandis Assignandis","FULV1624",-123,-123);
addOffice("Triumvir Agris Dandis Assignandis","PAPI1623",-123,-123);
addOffice("Triumvir Agris Dandis Assignandis","SEMP1598",-122,-122);
addOffice("Triumvir Agris Dandis Assignandis","FULV1624",-122,-122);
addOffice("Triumvir Agris Dandis Assignandis","PAPI1623",-122,-122);
addOffice("Triumvir Agris Dandis Assignandis","PAPI1623",-120,-120);
addOffice("Triumvir Agris Dandis Assignandis","SULP1662",-120,-120);
addOffice("Triumvir Agris Dandis Assignandis","CALP1663",-120,-120);
addOffice("Triumvir Agris Dandis Assignandis","PAPI1623",-119,-119);
addOffice("Triumvir Mensarius","AEMI0812",-216,-216);
addOffice("Triumvir Mensarius","ATIL0806",-216,-216);
addOffice("Triumvir Mensarius","SCRI0874",-216,-216);
addOffice("Decemvir Agris Assignandis","SERV1070",-201,-201);
addOffice("Decemvir Agris Assignandis","CAEC0891",-201,-201);
addOffice("Decemvir Agris Assignandis","SERV0931",-201,-201);
addOffice("Decemvir Agris Assignandis","SERV0953",-201,-201);
addOffice("Decemvir Agris Assignandis","HOST1071",-201,-201);
addOffice("Decemvir Agris Assignandis","HOST1007",-201,-201);
addOffice("Decemvir Agris Assignandis","VILL1034",-201,-201);
addOffice("Decemvir Agris Assignandis","FULV1072",-201,-201);
addOffice("Decemvir Agris Assignandis","AELI1006",-201,-201);
addOffice("Decemvir Agris Assignandis","QUIN0999",-201,-201);
addOffice("Decemvir Agris Assignandis","SERV1070",-200,-200);
addOffice("Decemvir Agris Assignandis","CAEC0891",-200,-200);
addOffice("Decemvir Agris Assignandis","SERV0931",-200,-200);
addOffice("Decemvir Agris Assignandis","SERV0953",-200,-200);
addOffice("Decemvir Agris Assignandis","HOST1071",-200,-200);
addOffice("Decemvir Agris Assignandis","HOST1007",-200,-200);
addOffice("Decemvir Agris Assignandis","VILL1034",-200,-200);
addOffice("Decemvir Agris Assignandis","FULV1072",-200,-200);
addOffice("Decemvir Agris Assignandis","AELI1006",-200,-200);
addOffice("Decemvir Agris Assignandis","QUIN0999",-200,-200);
addOffice("Triumvir Ad Colonos Scribendos","AELI1006",-199,-199);
addOffice("Triumvir Ad Colonos Scribendos","AELI1074",-199,-199);
addOffice("Triumvir Ad Colonos Scribendos","CORN0877",-199,-199);
addOffice("Triumvir Coloniis Deducendis","MENE0292",-442,-442);
addOffice("Triumvir Coloniis Deducendis","CLOE0211",-442,-442);
addOffice("Triumvir Coloniis Deducendis","AEBU0218",-442,-442);
addOffice("Triumvir Coloniis Deducendis","DUIL0546",-334,-334);
addOffice("Triumvir Coloniis Deducendis","QUIN0483",-334,-334);
addOffice("Triumvir Coloniis Deducendis","FABI0498",-334,-334);
addOffice("Triumvir Coloniis Deducendis","FABI0524",-334,-334);
addOffice("Triumvir Coloniis Deducendis","VALE0522",-313,-313);
addOffice("Triumvir Coloniis Deducendis","IUNI0539",-313,-313);
addOffice("Triumvir Coloniis Deducendis","FULV0595",-313,-313);
addOffice("Triumvir Coloniis Deducendis","FLAV0616",-306,-306);
addOffice("Triumvir Coloniis Deducendis","TERE0818",-200,-200);
addOffice("Triumvir Coloniis Deducendis","QUIN0999",-200,-200);
addOffice("Triumvir Coloniis Deducendis","CORN1077",-200,-200);
addOffice("Triumvir Coloniis Deducendis","SERV0953",-197,-197);
addOffice("Triumvir Coloniis Deducendis","MINU1064",-197,-197);
addOffice("Triumvir Coloniis Deducendis","SEMP0976",-197,-197);
addOffice("Triumvir Coloniis Deducendis","CORN1091",-194,-194);
addOffice("Triumvir Coloniis Deducendis","ANON1147",-194,-194);
addOffice("Triumvir Coloniis Deducendis","SALO1148",-194,-194);
addOffice("Triumvir Coloniis Deducendis","IUNI1149",-194,-194);
addOffice("Triumvir Coloniis Deducendis","BAEB1163",-194,-194);
addOffice("Triumvir Coloniis Deducendis","HELV1093",-194,-194);
addOffice("Triumvir Coloniis Deducendis","MANL1151",-194,-194);
addOffice("Triumvir Coloniis Deducendis","AELI1152",-194,-194);
addOffice("Triumvir Coloniis Deducendis","APUS1088",-194,-194);
addOffice("Triumvir Coloniis Deducendis","NAEV1240",-194,-194);
addOffice("Triumvir Coloniis Deducendis","MINU1101",-194,-194);
addOffice("Triumvir Coloniis Deducendis","FURI1081",-194,-194);
addOffice("Triumvir Coloniis Deducendis","OCTA0880",-194,-194);
addOffice("Triumvir Coloniis Deducendis","AEMI1134",-194,-194);
addOffice("Triumvir Coloniis Deducendis","LAET0869",-194,-194);
addOffice("Triumvir Coloniis Deducendis","SERV0953",-194,-194);
addOffice("Triumvir Coloniis Deducendis","MINU1064",-194,-194);
addOffice("Triumvir Coloniis Deducendis","SEMP0976",-194,-194);
addOffice("Triumvir Coloniis Deducendis","MANL1151",-193,-193);
addOffice("Triumvir Coloniis Deducendis","APUS1088",-193,-193);
addOffice("Triumvir Coloniis Deducendis","AELI1152",-193,-193);
addOffice("Triumvir Coloniis Deducendis","MANL1151",-193,-193);
addOffice("Triumvir Coloniis Deducendis","AELI1152",-193,-193);
addOffice("Triumvir Coloniis Deducendis","APUS1088",-193,-193);
addOffice("Triumvir Coloniis Deducendis","NAEV1240",-193,-193);
addOffice("Triumvir Coloniis Deducendis","MINU1101",-193,-193);
addOffice("Triumvir Coloniis Deducendis","FURI1081",-193,-193);
addOffice("Triumvir Coloniis Deducendis","MANL1151",-192,-192);
addOffice("Triumvir Coloniis Deducendis","AELI1152",-192,-192);
addOffice("Triumvir Coloniis Deducendis","APUS1088",-192,-192);
addOffice("Triumvir Coloniis Deducendis","NAEV1240",-192,-192);
addOffice("Triumvir Coloniis Deducendis","MINU1101",-192,-192);
addOffice("Triumvir Coloniis Deducendis","FURI1081",-192,-192);
addOffice("Triumvir Coloniis Deducendis","ATIL1187",-190,-190);
addOffice("Triumvir Coloniis Deducendis","VALE0930",-190,-190);
addOffice("Triumvir Coloniis Deducendis","VALE1133",-190,-190);
addOffice("Triumvir Coloniis Deducendis","VALE0930",-189,-189);
addOffice("Triumvir Coloniis Deducendis","ATIL1187",-189,-189);
addOffice("Triumvir Coloniis Deducendis","VALE1133",-189,-189);
addOffice("Triumvir Coloniis Deducendis","SCRI1141",-186,-186);
addOffice("Triumvir Coloniis Deducendis","TUCC1166",-186,-186);
addOffice("Triumvir Coloniis Deducendis","BAEB1035",-186,-186);
addOffice("Triumvir Coloniis Deducendis","FABI1117",-184,-184);
addOffice("Triumvir Coloniis Deducendis","FULV1247",-184,-184);
addOffice("Triumvir Coloniis Deducendis","FULV1248",-184,-184);
addOffice("Triumvir Coloniis Deducendis","AEMI1067",-183,-183);
addOffice("Triumvir Coloniis Deducendis","AEBU1253",-183,-183);
addOffice("Triumvir Coloniis Deducendis","QUIN1226",-183,-183);
addOffice("Triumvir Coloniis Deducendis","CORN1077",-183,-183);
addOffice("Triumvir Coloniis Deducendis","FLAM0989",-183,-183);
addOffice("Triumvir Coloniis Deducendis","MANL1204",-183,-183);
addOffice("Triumvir Coloniis Deducendis","FABI1117",-183,-183);
addOffice("Triumvir Coloniis Deducendis","AFRA1227",-183,-183);
addOffice("Triumvir Coloniis Deducendis","SEMP1182",-183,-183);
addOffice("Triumvir Coloniis Deducendis","CALP1222",-181,-181);
addOffice("Triumvir Coloniis Deducendis","CLAU1191",-181,-181);
addOffice("Triumvir Coloniis Deducendis","TERE1256",-181,-181);
addOffice("Triumvir Coloniis Deducendis","CORN1077",-181,-181);
addOffice("Triumvir Coloniis Deducendis","FLAM0989",-181,-181);
addOffice("Triumvir Coloniis Deducendis","MANL1204",-181,-181);
addOffice("Triumvir Coloniis Deducendis","FABI1263",-180,-180);
addOffice("Triumvir Coloniis Deducendis","POPI1283",-180,-180);
addOffice("Triumvir Coloniis Deducendis","POPI1284",-180,-180);
addOffice("Triumvir Coloniis Deducendis","AELI1057",-177,-177);
addOffice("Triumvir Coloniis Deducendis","AEMI1067",-177,-177);
addOffice("Triumvir Coloniis Deducendis","SICI1234",-177,-177);
addOffice("Triumvir Coloniis Deducendis","ANNI1404",-169,-169);
addOffice("Triumvir Coloniis Deducendis","DECI1405",-169,-169);
addOffice("Triumvir Coloniis Deducendis","CORN1377",-169,-169);
addOffice("Triumvir Coloniis Deducendis","SEMP1598",-122,-122);
addOffice("Triumvir Coloniis Deducendis","SEMP1598",-121,-121);
addOffice("Triumvir Coloniis Deducendis","FULV1624",-121,-121);
addOffice("Triumvir Coloniis Deducendis","PAPI1623",-121,-121);
addOffice("Triumvir Coloniis Deducendis","SULP1662",-121,-121);
addOffice("Triumvir Coloniis Deducendis","PAPI1623",-121,-121);
addOffice("Triumvir Coloniis Deducendis","CALP1663",-121,-121);
addOffice("Triumvir Coloniis Deducendis","LICI1679",-118,-118);
addOffice("Triumvir Coloniis Deducendis","DOMI1763",-118,-118);
addOffice("Triumvir Coloniis Deducendis","CORN2028",-80,-80);
addOffice("Pontifex","HORA0005",-509,-508);
addOffice("Pontifex","PAPI0008",-509,-509);
addOffice("Pontifex","POST0126",-462,-462);
addOffice("Pontifex","POST0125",-462,-439);
addOffice("Pontifex","PAPI0194",-449,-449);
addOffice("Pontifex","SERV0244",-439,-390);
addOffice("Pontifex","CORN3782",-400,-301);
addOffice("Pontifex","FOLI0402",-390,-390);
addOffice("Pontifex","FABI0403",-390,-390);
addOffice("Pontifex","FURI0338",-390,-390);
addOffice("Pontifex","CORN0612",-304,-304);
addOffice("Pontifex","SEMP0603",-300,-296);
addOffice("Pontifex","CLAU0591",-300,-280);
addOffice("Pontifex","DECI0596",-300,-295);
addOffice("Pontifex","LIVI0624",-300,-295);
addOffice("Pontifex","MARC0601",-300,-260);
addOffice("Pontifex","CORU0683",-275,-255);
addOffice("Pontifex","PAPI4662",-270,-242);
addOffice("Pontifex","MAMI0778",-254,-254);
addOffice("Pontifex","MAMI0740",-254,-254);
addOffice("Pontifex","CAEC0751",-250,-244);
addOffice("Pontifex","CAEC0751",-243,-243);
addOffice("Pontifex","PAPI4662",-241,-241);
addOffice("Pontifex","FABI0712",-240,-203);
addOffice("Pontifex","PAPI4665",-235,-219);
addOffice("Pontifex","CORN0780",-235,-221);
addOffice("Pontifex","MANL0787",-235,-213);
addOffice("Pontifex","POMP0791",-230,-212);
addOffice("Pontifex","OTAC0856",-220,-212);
addOffice("Pontifex","SCAN0890",-220,-217);
addOffice("Pontifex","AELI0889",-220,-217);
addOffice("Pontifex","AEMI0826",-220,-217);
addOffice("Pontifex","PAPI4665",-218,-213);
addOffice("Pontifex","SCAN0890",-216,-216);
addOffice("Pontifex","AELI0889",-216,-216);
addOffice("Pontifex","AEMI0826",-216,-216);
addOffice("Pontifex","CAEC0891",-216,-179);
addOffice("Pontifex","FULV0781",-216,-205);
addOffice("Pontifex","LICI0926",-215,-213);
addOffice("Pontifex","SERV0919",-213,-174);
addOffice("Pontifex","CORN0815",-213,-196);
addOffice("Pontifex","LICI0926",-212,-212);
addOffice("Pontifex","MANL0787",-212,-202);
addOffice("Pontifex","OTAC0856",-211,-211);
addOffice("Pontifex","POMP0791",-211,-211);
addOffice("Pontifex","LIVI0952",-211,-170);
addOffice("Pontifex","SERV0931",-210,-183);
addOffice("Pontifex","SEMP1092",-204,-197);
addOffice("Pontifex","SULP0987",-203,-199);
addOffice("Pontifex","SULP1060",-202,-199);
addOffice("Pontifex","AEMI1067",-199,-152);
addOffice("Pontifex","CORN1090",-199,-176);
addOffice("Pontifex","SEMP1092",-196,-196);
addOffice("Pontifex","VALE0930",-196,-180);
addOffice("Pontifex","CLAU0997",-196,-177);
addOffice("Pontifex","SEMP1157",-183,-174);
addOffice("Pontifex","SERV0931",-180,-180);
addOffice("Pontifex","FABI1117",-180,-167);
addOffice("Pontifex","FULV1242",-180,-172);
addOffice("Pontifex","CLAU1318",-177,-148);
addOffice("Pontifex","FURI1323",-176,-170);
addOffice("Pontifex","SULP1336",-174,-171);
addOffice("Pontifex","DOMI1366",-172,-162);
addOffice("Pontifex","SERV1266",-170,-170);
addOffice("Pontifex","MANL1384",-170,-140);
addOffice("Pontifex","CORN1396",-165,-150);
addOffice("Pontifex","FABI1545",-150,-150);
addOffice("Pontifex","LICI1500",-145,-133);
addOffice("Pontifex","CORN1513",-141,-133);
addOffice("Pontifex","DOMI1630",-140,-115);
addOffice("Pontifex","IUNI1533",-140,-140);
addOffice("Pontifex","MUCI1567",-140,-131);
addOffice("Pontifex","LICI1500",-132,-132);
addOffice("Pontifex","SULP1718",-130,-100);
addOffice("Pontifex","CAEC1649",-130,-114);
addOffice("Pontifex","MUCI1567",-130,-130);
addOffice("Pontifex","AEMI1645",-123,-88);
addOffice("Pontifex","SERV1629",-120,-103);
addOffice("Pontifex","MUCI1692",-115,-83);
addOffice("Pontifex","IULI1798",-105,-100);
addOffice("Pontifex","DOMI1763",-104,-103);
addOffice("Pontifex","SERV1814",-103,-65);
addOffice("Pontifex","CAEC1889",-100,-82);
addOffice("Pontifex","LIVI1756",-100,-92);
addOffice("Pontifex","IULI1798",-99,-87);
addOffice("Pontifex","LIVI1756",-91,-91);
addOffice("Pontifex","LUTA1949",-90,-71);
addOffice("Pontifex","CORN1882",-88,-82);
addOffice("Pontifex","CORN1746",-88,-88);
addOffice("Pontifex","CORN1746",-83,-78);
addOffice("Pontifex","ACIL2119",-81,-54);
addOffice("Pontifex","AEMI1865",-81,-75);
addOffice("Pontifex","AURE1866",-81,-77);
addOffice("Pontifex","CAEC2078",-81,-58);
addOffice("Pontifex","CAEC1889",-81,-81);
addOffice("Pontifex","TERE1982",-77,-58);
addOffice("Pontifex","AURE1866",-76,-73);
addOffice("Pontifex","VALE2107",-75,-52);
addOffice("Pontifex","IUNI2120",-75,-71);
addOffice("Pontifex","AEMI1865",-74,-65);
addOffice("Pontifex","IULI1957",-73,-63);
addOffice("Pontifex","MUCI2191",-72,-71);
addOffice("Pontifex","MUCI2191",-70,-63);
addOffice("Pontifex","SULP2179",-70,-70);
addOffice("Pontifex","IUNI2120",-70,-57);
addOffice("Pontifex","LUTA1949",-70,-60);
addOffice("Pontifex","SULP2179",-69,-48);
addOffice("Pontifex","QUIN2192",-69,-60);
addOffice("Pontifex","SERV1814",-64,-44);
addOffice("Pontifex","CAEC2347",-63,-58);
addOffice("Pontifex","AEMI2341",-62,-58);
addOffice("Pontifex","FANN2340",-62,-58);
addOffice("Pontifex","SCRI1876",-60,-58);
addOffice("Pontifex","LICI1981",-60,-58);
addOffice("Pontifex","AEMI2262",-60,-58);
addOffice("Pontifex","CORN2290",-60,-58);
addOffice("Pontifex","LICI2328",-60,-58);
addOffice("Pontifex","PINA2373",-58,-56);
addOffice("Pontifex","SCRI1876",-57,-53);
addOffice("Pontifex","TERE1982",-57,-56);
addOffice("Pontifex","LICI1981",-57,-49);
addOffice("Pontifex","AEMI2262",-57,-52);
addOffice("Pontifex","AEMI2341",-57,-31);
addOffice("Pontifex","CAEC2078",-57,-54);
addOffice("Pontifex","CAEC2347",-57,-46);
addOffice("Pontifex","CORN2290",-57,-47);
addOffice("Pontifex","FANN2340",-57,-35);
addOffice("Pontifex","LICI2328",-57,-49);
addOffice("Pontifex","IUNI2459",-55,-51);
addOffice("Pontifex","IUNI2459",-54,-54);
addOffice("Pontifex","SCRI2443",-51,-49);
addOffice("Pontifex","IUNI2459",-50,-42);
addOffice("Pontifex","DOMI2264",-50,-50);
addOffice("Pontifex","DOMI2264",-49,-48);
addOffice("Pontifex","IULI2597",-48,-31);
addOffice("Pontifex","SULP2430",-47,-47);
addOffice("Pontifex","HIRT2449",-47,-47);
addOffice("Pontifex","SULP2430",-46,-45);
addOffice("Pontifex","CLAU2571",-46,-34);
addOffice("Pontifex","HIRT2449",-46,-43);
addOffice("Pontifex","ANTO2497",-45,-42);
addOffice("Pontifex","DOMI2313",-45,-31);
addOffice("Pontifex","VENT2638",-43,-38);
addOffice("Pontifex","CORN2550",-40,-40);
addOffice("Pontifex","CORN2550",-39,-31);
addOffice("Pontifex","TULL2563",-35,-31);
addOffice("Pontifex","TITI2834",-32,-32);
addOffice("Pontifex","TITI2834",-31,-31);
addOffice("A Committee Of Former Legates To The Peloponnese, Appointed By The Senate To Hear The Arguments Of Four Groups Of Lacedaemonian Envoys","QUIN0999",-183,-183);
addOffice("A Committee Of Former Legates To The Peloponnese, Appointed By The Senate To Hear The Arguments Of Four Groups Of Lacedaemonian Envoys","CAEC0891",-183,-183);
addOffice("A Committee Of Former Legates To The Peloponnese, Appointed By The Senate To Hear The Arguments Of Four Groups Of Lacedaemonian Envoys","CLAU1118",-183,-183);
addOffice("Decemvir Agris Dandis Assignandis","CAEC0751",-232,-232);
addOffice("Decemvir Agris Dandis Assignandis","AEMI1067",-173,-173);
addOffice("Decemvir Agris Dandis Assignandis","CASS1304",-173,-173);
addOffice("Decemvir Agris Dandis Assignandis","AEBU1253",-173,-173);
addOffice("Decemvir Agris Dandis Assignandis","TREM1345",-173,-173);
addOffice("Decemvir Agris Dandis Assignandis","CORN1212",-173,-173);
addOffice("Decemvir Agris Dandis Assignandis","APPU1346",-173,-173);
addOffice("Decemvir Agris Dandis Assignandis","APPU1347",-173,-173);
addOffice("Decemvir Agris Dandis Assignandis","CAEC1348",-173,-173);
addOffice("Decemvir Agris Dandis Assignandis","SALO1148",-173,-173);
addOffice("Decemvir Agris Dandis Assignandis","MUNA1350",-173,-173);
addOffice("Decemvir Agris Dandis Assignandis","LIVI1756",-91,-91);
addOffice("Decemvir Agris Dandis Assignandis","LICI1679",-91,-91);
addOffice("Decemvir Agris Dandis Assignandis","ALBI1667",-91,-91);
addOffice("Decemvir Agris Dandis Assignandis","SEMP1820",-91,-91);
addOffice("Decemvir Agris Dandis Assignandis","ANIC1860",-91,-91);
addOffice("Decemvir Agris Dandis Assignandis","DECI1861",-91,-91);
addOffice("Decemvir Agris Dandis Assignandis","MAMI1733",-91,-91);
addOffice("Decemvir Agris Dandis Assignandis","EGNA1863",-91,-91);
addOffice("Decemvir Agris Dandis Assignandis","ANON1864",-91,-91);
addOffice("Decemvir Agris Dandis Assignandis","SEMP1894",-91,-91);
addOffice("Quinquevir Finibus Cognoscendis Statuendisque","FABI1263",-168,-168);
addOffice("Quinquevir Finibus Cognoscendis Statuendisque","CORN1390",-168,-168);
addOffice("Quinquevir Finibus Cognoscendis Statuendisque","SEMP1436",-168,-168);
addOffice("Quinquevir Finibus Cognoscendis Statuendisque","NAEV1437",-168,-168);
addOffice("Quinquevir Finibus Cognoscendis Statuendisque","APPU1438",-168,-168);
addOffice("Flaminica Martialis","PUBL4669",-168,-155);
addOffice("Flaminica Martialis","PUBL4669",-154,-154);
addOffice("Flaminica Martialis","PUBL2197",-70,-70);
addOffice("Triumvir Capitalis","PESC1516",-150,-150);
addOffice("Triumvir Capitalis","AELI1622",-130,-130);
addOffice("Triumvir Capitalis","CALP3121",-100,-1);
addOffice("Triumvir Capitalis","TERE1963",-95,-90);
addOffice("Triumvir Capitalis","VENU2004",-82,-82);
addOffice("Triumvir Capitalis","MANL2049",-77,-77);
addOffice("Triumvir Capitalis","LUCI3120 ",-60,-30);

addOffice("Augustus", "IULI2597", -27, 14,);


function rateFigure(figure) {
  let score = 0;

  offices.forEach((office) => {
    if (office && office.personUid === figure.uid && office.startYear <= 342) {
      switch (office.officeName) {
        case "Consul":
          score += 15;
          break;
        case "Suffect Consul":
          score += 9;
          break;
        case "Quaestor":
          score += 3;
          break;
        case "Interrex":
          score += 3;
          break;
        case "Urban Prefect":
          score += 2;
          break;
        case "Rex Sacrorum":
          score += 1;
          break;
        case "Dictator":
          score += 30;
          break;
        case "Master of the Horse":
          score += 8;
          break;
        case "Tribune of the Plebs":
          score += 5;
          break;
        case "Plebeian Aedile":
        case "Curule Aedile":
        case "Aedile":
          score += 5;
          break;
        case "Decemvir":
        case "Consular Tribune":
          score += 8;
          break;
        case "Censor":
        case "Suffect Censor":
          score += 10;
          break;
        case "Praetor":
          score += 9;
          break;
        case "Suffect Praetor":
          score += 8;
          break;
        case "Suffect Master of the Horse":
          score += 7;
          break;
        case "Suffect Tribune of the Plebs":
          score += 4;
          break;
        case "Pontifex Maximus":
          score += 15;
          break;
        case "Princeps Senatus":
          score += 40;
          break;
        case "Triumph":
          score += 30;
          break;
        case "Naval":
          score += 22;
          break;
        case "Ovation":
          score += 15;
          break;
        case "Grass Crown":
          score += 50;
          break;
        default:
          // Add score 0 for "Senator" and "Proconsul" or unlisted offices
          break;
      }
    }
  });

  return score;
}

let ppl = Object.values(people); // Convert `people` object to array of figures

ppl.sort((a, b) => {
  const rankA = rateFigure(a);
  const rankB = rateFigure(b);
  return rankB - rankA; // Sort by descending rank
});

// Print the top 100 or fewer figures
const topCount = Math.min(200, ppl.length);

	  
const container2 = document.getElementById("constitution-container");

    // Add existing members to the grid, respecting maxPortraitsPerRow
    const maxPortraitsPerRow = 10;
    let rowContainer = document.createElement("div");
    rowContainer.classList.add("row-container");
    let portraitCount = 0;

for (let i = 0; i < topCount; i++) {
let figure = ppl[i];
      if (portraitCount >= maxPortraitsPerRow) {
        container2.appendChild(rowContainer);
        rowContainer = document.createElement("div");
        rowContainer.classList.add("row-container");
        portraitCount = 0;
      }

      const figureContainer = createFigureContainer(figure, -27);
      rowContainer.appendChild(figureContainer);
      portraitCount++;
    };

    // Add the last row if it has members
    if (rowContainer.childNodes.length > 0) {
     container2.appendChild(rowContainer);
    }

	  
	//return;

  // Function to find the closest year at the top of the viewport
  function getCurrentYear() {
    let currentYear = null;
    yearElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      // Check if the top of the element is near the top of the viewport (within 50 pixels)
      if (rect.top >= 0 && rect.top < 50) {
        currentYear = element.getAttribute('data-year');
      }
    });
    return currentYear;
  }

  // Function to format the year with AD or BC
  function formatYear(year) {
    return year < 0 ? `${Math.abs(year)} BC` : `${year} AD`;
  }

function renderGroup(groupData, currentYear, usedOffices = new Set()) {
  const groupContainer = document.createElement("div");
  groupContainer.classList.add("group-container");

  // Apply layout styles (row or column)
  if (groupData.layout === "row") {
    groupContainer.classList.add("row-container");
  } else if (groupData.layout === "column") {
    groupContainer.classList.add("column-container");
  }

  // Render the title for the group
  if (groupData.title) {
    const titleElem = document.createElement("div");
    titleElem.classList.add("group-title");
    titleElem.textContent = groupData.title;
    groupContainer.appendChild(titleElem);
  }

  // Render children groups or members
  if (groupData.children) {
    groupData.children.forEach((child) => {
      const childGroup = renderGroup(child, currentYear, usedOffices);
      if (childGroup) {
        groupContainer.appendChild(childGroup);
      }
    });
  } else if (groupData.members) {
    const grid = document.createElement("div");
    grid.classList.add("member-grid");

    let membersToRender = [];

    if (groupData.members.includes("Other")) {
      // Collect all unassigned offices for the "Other Offices" group
      offices
        .filter(
          (office) =>
            office.startYear <= currentYear &&
            office.endYear >= currentYear &&
            !usedOffices.has(office.officeName) // Exclude offices already used
        )
        .forEach((office) => {
          const person = people[office.personUid];
          if (person) {
            membersToRender.push({ ...person, officeName: office.officeName });
          }
        });

    } else {
      // Collect figures for the specified office titles
      groupData.members.forEach((title) => {
        usedOffices.add(title); // Mark this office as used
        const figures = findFiguresByOffice(title, currentYear);
        membersToRender = membersToRender.concat(figures);
      });
    }

    if (groupData.hideIfEmpty && membersToRender.length === 0) {
      return null;
    }

    // Filter for duplicates and sort members
    const uniqueFigures = new Map();
    membersToRender.forEach((figure) => {
      if (!uniqueFigures.has(figure.uid)) {
        uniqueFigures.set(figure.uid, figure);
      }
    });

    membersToRender = Array.from(uniqueFigures.values());


if (groupData.members.includes("Other")){
  membersToRender.sort((a, b) => a.officeName.localeCompare(b.officeName));

}
else{
    // Sort members
    // Sort senators by speaking order
membersToRender.sort((a, b) => {
  const rankA = getSpeakingRank(a, currentYear);
  const rankB = getSpeakingRank(b, currentYear);

if (rankA === rankB) {
  // Tiebreaker 1: Compare the most recent instance of the same office rank
  const aMostRecentOffice = getMostRecentOfficeAtRank(a, currentYear, rankA);
  const bMostRecentOffice = getMostRecentOfficeAtRank(b, currentYear, rankB);

  if (aMostRecentOffice && bMostRecentOffice) {
    const mostRecentComparison =
      bMostRecentOffice.endYear - aMostRecentOffice.endYear;
    if (mostRecentComparison !== 0) {
      return mostRecentComparison; // More recent service comes first
    }
  }

  // Tiebreaker 2: Patricians go first
  return b.isPatrician - a.isPatrician;
}

  return rankA - rankB;
});
}
    // Add members to the grid, respecting maxPortraitsPerRow
    const maxPortraitsPerRow = groupData.maxPortraitsPerRow || 1;
    let rowContainer = document.createElement("div");
    rowContainer.classList.add("row-container");
    let portraitCount = 0;

    membersToRender.forEach((figure) => {
      if (portraitCount >= maxPortraitsPerRow) {
        grid.appendChild(rowContainer);
        rowContainer = document.createElement("div");
        rowContainer.classList.add("row-container");
        portraitCount = 0;
      }

      const figureContainer = createFigureContainer(
        figure,
        currentYear,
        groupData.showTitles
      );
//console.log(groupData.title+" :  "+groupData.showTitles+". :  "+figure.officeName);
      rowContainer.appendChild(figureContainer);
      portraitCount++;
    });

    // Add the last row if it has members
    if (rowContainer.childNodes.length > 0) {
      grid.appendChild(rowContainer);
    }

    groupContainer.appendChild(grid);
  }

  return groupContainer;
}


function getMostRecentOfficeAtRank(person, currentYear, rank) {
  const officeHierarchy = [
    ["Princeps Senatus"], // Only applies if currently held
    ["Consul", "Suffect Consul", "Decemvir", "Consular Tribune"],
    ["Praetor", "Suffect Praetor", "Praetor Pro Consule"],
    ["Curule Aedile", "Plebeian Aedile", "Aedile"],
    ["Quaestor","Quaestor De Virginibus", "Quaestor Pro Consule", "Quaestor Pro Praetore"],
    ["Senator"], // Default rank if none of the above applies
  ];

  const officesAtRank = officeHierarchy[rank - 1]; // Convert rank to 0-based index
  if (!officesAtRank) {
    console.error(`Invalid rank: ${rank}`);
    return null; // Return null if the rank is invalid
  }

  return person.offices
    .filter(
      (office) =>
        officesAtRank.includes(office.officeName) &&
        office.endYear <= currentYear // Only consider offices ending before or during the current year
    )
    .sort((a, b) => b.endYear - a.endYear)[0]; // Return the most recent one
}


/**
 * Determine if a figure is eligible for Senate membership or another group.
 */
function determineEligibility(figure, currentYear, eligibilityCache) {

  // A figure is eligible if they held an office in a prior year and are not dead
  const isAlive = !deathDates[figure.name] || deathDates[figure.name] >= currentYear;
  const priorOfficeHeld = figure.startDate < currentYear;

  const isEligible = isAlive && priorOfficeHeld;

  return isEligible;
}


function hasHeldOffice(person, officeName, currentYear) {
  return person.offices.some(
    (office) =>
      office.officeName === officeName &&
      office.endYear < currentYear // Must have ended before the current year
  );
}

function holdsCurrentOffice(person, officeName, currentYear) {
  return person.offices.some(
    (office) =>
      office.officeName === officeName &&
      office.startYear <= currentYear &&
      office.endYear >= currentYear // Active during the current year
  );
}


function getSpeakingRank(person, currentYear) {
  const officeHierarchy = [
    ["Princeps Senatus"], // Only applies if currently held
    ["Consul", "Suffect Consul", "Decemvir", "Consular Tribune"],
    ["Praetor", "Suffect Praetor", "Praetor Pro Consule"],
    ["Curule Aedile", "Plebeian Aedile", "Aedile"],
    ["Quaestor", "Quaestor De Virginibus", "Quaestor Pro Consule", "Quaestor Pro Praetore"],
    ["Senator"], // Default rank if none of the above applies
  ];

  // Find the highest-ranking office the person currently holds or has held
  for (let rank = 0; rank < officeHierarchy.length; rank++) {
    const officesAtRank = officeHierarchy[rank];
    if (!officesAtRank) continue; // Skip invalid ranks

    // Current office check
    if (officesAtRank.some((officeName) => holdsCurrentOffice(person, officeName, currentYear))) {
      return rank + 1; // Return rank (lower is higher priority)
    }

    // Past office check (excluding Princeps Senatus)
    if (
      rank !== 0 && // Skip checking past offices for Princeps Senatus
      officesAtRank.some((officeName) => hasHeldOffice(person, officeName, currentYear))
    ) {
      return rank + 1; // Return rank (lower is higher priority)
    }
  }

  return 100; // Default rank for people with no qualifying offices
}




function renderConstitutionalDiagram(currentYear) {
  const container = document.getElementById("constitution-container");
  container.innerHTML = ""; // Clear previous structure

  const structure = stateStructures.find(
    (s) => currentYear >= s.startYear && currentYear <= s.endYear
  );

  if (!structure) return; // No structure for this year

  const diagram = renderGroup(structure.structure, currentYear); // Pass currentYear here
  container.appendChild(diagram);
}


function createFigureContainer(figure, currentYear, isOtherOfficeGroup = false) {
  const figureContainer = document.createElement("div");
  figureContainer.classList.add("figure-container");


  // Count the number of consul-related offices
  let nConsul = 0;
  figure.offices.forEach((office) => {
    if (
	office.startYear <= currentYear &&(
      office.officeName === "Consul" ||
      office.officeName === "Dictator")
    ) {
      nConsul++;
    }
    if (
	office.startYear <= currentYear &&(
		office.officeName === "Suffect Consul" ||
      office.officeName === "Consular Tribune" ||
      office.officeName === "Decemvir")
    ) {
      nConsul+=1;
    }
  });

if (nConsul > 0 && nConsul < 1){
nConsul = 1;
}


  const img = document.createElement("img");
  const nameElem = document.createElement("div");
  nameElem.classList.add("figure-name");

  img.src = `images/${figure.image}`; // Example: Use UID as image file name
img.classList.add("portrait-img"); // Add a specific class to the portrait image
  
  img.alt = figure.name;
  nameElem.textContent = figure.name;

  // Append portrait and name
  figureContainer.appendChild(img);

 if (isOtherOfficeGroup && figure.officeName) {
    const officeElem = document.createElement("div");
    officeElem.classList.add("figure-name");
    officeElem.style.color = "yellow"; // Office title in yellow
    officeElem.textContent = figure.officeName;
    figureContainer.appendChild(officeElem);
  }

  figureContainer.appendChild(nameElem);




  // Check for grass crown
  const hasGrassCrown = figure.offices.some(
    (office) =>
      office.officeName === "Grass Crown" &&
      currentYear >= office.startYear
  );

  if (hasGrassCrown) {
    const wreathIcon = document.createElement("img");
    wreathIcon.src = "images/GrassCrown.png"; // Path to laurel wreath icon
    wreathIcon.alt = "Triumph Wreath";
    wreathIcon.classList.add("grass-crown-icon");
    figureContainer.appendChild(wreathIcon);
  }
// Check for triumphs
const triumphCount = figure.offices.filter(
  (office) =>
    office.officeName === "Triumph" &&
    currentYear >= office.startYear
).length;

if (triumphCount > 0) {
  const wreathIcon = document.createElement("img");
if (triumphCount == 1){
wreathIcon.src = "images/laurel.png";
}
else if (triumphCount == 2){
wreathIcon.src = "images/goldlaurel.png" ;
}
else if (triumphCount == 3){
wreathIcon.src = "images/goldlaurel2.png" ;
}
else if (triumphCount >= 4){
wreathIcon.src = "images/goldlaurel3.png" ;
}
  wreathIcon.alt = "Triumph Wreath";
  wreathIcon.classList.add("triumph-icon");
  figureContainer.appendChild(wreathIcon);
} else {
  // Check for Naval Triumphs
  const hasNaval = figure.offices.some(
    (office) =>
      office.officeName === "Naval" &&
      currentYear >= office.startYear
  );

  if (hasNaval) {
    const wreathIcon = document.createElement("img");
    wreathIcon.src = "images/Naval.png"; // Path to naval triumph icon
    wreathIcon.alt = "Naval Wreath";
    wreathIcon.classList.add("triumph-icon");
    figureContainer.appendChild(wreathIcon);
  } else {
    // Check for Ovation
    const hasOvation = figure.offices.some(
      (office) =>
        office.officeName === "Ovation" &&
        currentYear >= office.startYear
    );

    if (hasOvation) {
      const wreathIcon = document.createElement("img");
      wreathIcon.src = "images/Ovation.png"; // Path to ovation icon
      wreathIcon.alt = "Ovation Wreath";
      wreathIcon.classList.add("triumph-icon");
      figureContainer.appendChild(wreathIcon);
    }
  }
}

 

// Check if the person died in the current year
  if (figure.deathYear == currentYear) {
    const deathIcon = document.createElement("img");
	if (!figure.violentDeath){
    deathIcon.src = "images/death.png"; // Path to death icon
	}
	else{
    deathIcon.src = "images/deathviolent.png"; // Path to death icon
	}
    deathIcon.alt = "Died this year";
    deathIcon.classList.add("death-icon");
    figureContainer.appendChild(deathIcon);
  }

const borderColor = getConsulBorderColor(nConsul);

  // Apply the border color
  img.style.border = `5px solid ${borderColor}`;


  return figureContainer;
}

// Helper function to get border color based on consulship count
function getConsulBorderColor(consulships) {
  if (consulships >= 5) return "gold"; // Gold
  if (consulships >= 3) return "darkorchid"; // Purple-red
  if (consulships === 2) return "darkred"; // Deep red
  if (consulships === 1) return "silver"; // Light red
  if (consulships === 0) return "black"; // White
  return "black"; // Neutral grey for 0 consulships
}


function getExpectedCount(expectedCountArray, currentYear) {
  if (!Array.isArray(expectedCountArray)) return expectedCountArray; // Handle static values
  let count = 0;
  for (const [year, value] of expectedCountArray) {
    if (currentYear >= year) count = value;
    else break;
  }
  return count;
}

// Helper to get CSS class for role-specific styling
function getRoleClass(title) {
  const roleClasses = {
    Consul: "role-consul",
    "Former Consul": "role-former-consul",
    "Former Aedile": "role-former-aedile",
    Senator: "role-senator",
    // Add more roles as needed
  };

  return roleClasses[title] || "role-default";
}


  // Function to update the year label
  function updateYearLabel(year) {
      const currentYearLabel = document.getElementById('current-year');
      const mapImage = document.getElementById('map-image');
    
      if (year) {
        currentYearLabel.textContent = `Year: ${formatYear(year)}`;
      } else {
        currentYearLabel.textContent = "Year: --";
        //mapImage.src = 'images/preroman.gif'; // Default to preroman map if no year is active
      }
    }

  // On scroll, check the closest year and update images and year label
  rightPanel.addEventListener('scroll', () => {
    const currentYear = getCurrentYear();
    if (currentYear) {
      //updateImages(currentYear);
      updateYearLabel(currentYear);
    renderConstitutionalDiagram(currentYear);
    }
  });

  // Initial check to display the correct year and images when the page loads
  const initialYear = 2024;
  if (initialYear) {
    //updateImages(initialYear);
    updateYearLabel(initialYear);
	
    renderConstitutionalDiagram(initialYear);
  }



// Set up Intersection Observer to observe each year element
const observerOptions = {
  root: rightPanel, // Observe within the scrollable right panel
  rootMargin: '-20% 0px -80% 0px', // Trigger when the element is 20% down from the top of the viewport
  threshold: 0 // Trigger as soon as any part of the element meets the 20% threshold
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const year = entry.target.getAttribute('data-year');
      updateYearLabel(year);
    renderConstitutionalDiagram(year);
      //updateImages(year);
      //updatePhotoBox(year);
    }
  });
}, observerOptions);

// Observe each year element
yearElements.forEach((yearElement) => {
  observer.observe(yearElement);
});



});
