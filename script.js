// Définir un tableau de classes
// {"Nom": {},"Eleves": [{"Nom": {}, "Colles": [{ "Date": {}}], "Oublis": [{"Date": {}}],"Comportements": [{"Date": {}}], "Travaux": [{"Date": {}}]}]}
let classes = [
    { Nom: "ClasseA",  Eleves: [{ Nom: "P. Antoine", Colles: [{ Date: "15/08/2024 - 10:58"}, { Date: "15/08/2024 - 10:58"}], Oublis: [{ Date: "15/08/2024 - 10:58" }], Comportements: [{ Date: "15/08/2024 - 10:58" }], Travaux: [{ Date: "15/08/2024 - 10:58" }]}, { Nom: "P. Arthur", Colles: [{ Date: "15/08/2024 - 10:58"}, { Date: "15/08/2024 - 10:58"}], Oublis: [{ Date: "15/08/2024 - 10:58" }], Comportements: [{ Date: "15/08/2024 - 10:58" }], Travaux: [{ Date: "15/08/2024 - 10:58" }]}]},
    { Nom: "ClasseB",  Eleves: [{ Nom: "P. Alexandre", Colles: [{ Date: "15/08/2024 - 10:58"}, { Date: "15/08/2024 - 10:58"}], Oublis: [{ Date: "15/08/2024 - 10:58" }], Comportements: [{ Date: "15/08/2024 - 10:58" }], Travaux: [{ Date: "15/08/2024 - 10:58" }]}]},
];

// Fonction pour afficher la liste des classes
function displayClasses() {
    const classList = document.getElementById("class-list");
    classList.innerHTML = ""; // Effacer le contenu existant
	
	const classLink = document.createElement("a");
	classLink.textContent = "Menu";
	classLink.href = "#"; // Lien fictif pour l'instant
	classLink.addEventListener("click", () => displayMenu());
	classLink.style = 'margin-left: 20px;';
	classList.appendChild(classLink);

    classes.forEach((classe) => {
        const classLink = document.createElement("a");
        classLink.textContent = classe.Nom;
        classLink.href = "#ActiveClasse=" + classe.Nom; // Lien fictif pour l'instant
        classLink.addEventListener("click", () => displayStudents(classe.Eleves));
		classLink.style = 'margin-left: 20px;';
        classList.appendChild(classLink);
    });
}

// Fonction pour afficher le menu tout simple
function displayMenu() {
    const studentsList = document.getElementById("students-list");
    studentsList.innerHTML = ""; // Effacer le contenu existant
	toggleClassDisplay(false)
}

// Fonction pour afficher les élèves d'une classe
function displayStudents(students) {
	toggleClassDisplay(true)
	
    const studentsList = document.getElementById("students-list");
    studentsList.innerHTML = ""; // Effacer le contenu existant

    students.forEach((student) => {
		var colles = "";
		var collesCount = 0;
		var oublis = "";
		var oublisCount = 0;
		var comportements = "";
		var comportementsCount = 0;
		var travaux = "";
		var travauxCount = 0;
				
		student.Colles.forEach((colle) => {
			colles += colle.Date + `<button onclick="deleteEntry('${student.Nom}', '${colle.Date}', 'Colles')">Delete</button></br>`;
			collesCount += 1;
		});
		student.Oublis.forEach((oubli) => {
			oublis += oubli.Date + `<button onclick="deleteEntry('${student.Nom}', '${oubli.Date}', 'Oublis')">Delete</button></br>`;
			oublisCount += 1;
		});
		student.Comportements.forEach((comportement) => {
			comportements += comportement.Date + `<button onclick="deleteEntry('${student.Nom}', '${comportement.Date}', 'Comportements')">Delete</button></br>`;
			comportementsCount += 1;
		});
		student.Travaux.forEach((travail) => {
			travaux += travail.Date + `<button onclick="deleteEntry('${student.Nom}, '${travail.Date}', 'Travaux')">Delete</button></br>`;
			travauxCount += 1;
		});
		
        const studentInfo = document.createElement("div");
        studentInfo.className = "student-info";
        studentInfo.innerHTML = `
            <h2>${student.Nom} <button onclick="addColle('${student.Nom}')">+1 Colle</button> <button onclick="addComportement('${student.Nom}')">+1 Comportement</button> <button onclick="addTravail('${student.Nom}')">+1 Travail</button> <button onclick="addOubli('${student.Nom}')">+1 Oubli</button>  <button onclick="deleteEleve('${student.Nom}')">Delete</button></h2>
			<h3>Colles : ${collesCount}</h3>
			<h4>${colles}</h4>
			<h3>Comportements : ${comportementsCount}</h3>
			<h4>${comportements}</h4>
			<h3>Travaux non faits : ${travauxCount}</h3>
			<h4>${travaux}</h4>
			<h3>Oublis de matériel : ${oublisCount}</h3>
			<h4>${oublis}</h4>
        `;
        studentsList.appendChild(studentInfo);
    });
}

// Fonction pour ajouter une classe
function addClass() {
    const className = prompt("Entrez le nom de la nouvelle classe :");
    if (className) {
        classes.push({ Nom: className, Eleves: [] });
        displayClasses();
    }
	saveData();
}

// Fonction pour supprimer une classe
function deleteClass() {
	// Trouver la classe active
	const urlStr = window.location.href;
	const className = urlStr.split("ActiveClasse=")[1]
	result = confirm(`Voulez vous vraiment supprimer la classe ${className} ?`);
	if(result) {
		classes = classes.filter(classe => classe.Nom !== className);
		displayClasses();
		displayMenu();
		saveData();
	}
}

// Fonction pour importer une classe
function importClass() {
    const classinfo = prompt("Entrez le nom de la classe à importer, puis, la liste de tous les élèves.");
	
    if (classinfo) {
		const lines = classinfo.split('\n');
		const className = lines[0].trim();
		const Eleves = [];
		
		for (let i = 1; i < lines.length; i++) {
			const [prenom, nom] = lines[i].trim().split(' ');
			const fullName = `${prenom[0]}. ${nom}`;
			// Ajouter l'élève à la liste
			Eleves.push({
				Nom: fullName,
				Colles: [],
				Oublis: [],
				Comportements: [],
				Travaux: []
			});
		}
		classes.push({ Nom: className, Eleves: Eleves });
		displayClasses();
		saveData();
    }
}

// Fonction pour ajouter un élève
function addStudent() {
    const studentName = prompt("Entrez le nom de l'élève :");
    if (studentName) {
		const urlStr = window.location.href;
		const className = urlStr.split("ActiveClasse=")[1]
		const classe = classes.find((cls) => cls.Nom === className);
		if (classe) {
			classe.Eleves.push({ Nom : studentName, Colles : [], Oublis : [], Comportements : [], Travaux : []});
		}
        displayStudents(classe.Eleves)
		saveData();
    }
}

// Fonction pour supprimer un élève
function deleteEleve(eleve) {
	// Trouver la classe active
	const urlStr = window.location.href;
	const className = urlStr.split("ActiveClasse=")[1]
	result = confirm(`Voulez vous vraiment supprimer l'élève ${eleve} de la classe ${className} ?`);
	if(result) {
		let classe = classes.find(classe => classe.Nom === className);
		classe.Eleves = classe.Eleves.filter(Eleves => Eleves.Nom !== eleve);
		displayStudents(classe.Eleves);
		saveData();
		
	}
}

// Fonction pour toggle entre le menu et une classe
function toggleClassDisplay(variable) {
	if (variable) {
		//main menu
		const addClasseButton = document.getElementById("newClasseButton");
		addClasseButton.style = "display: none";
		const addClasseButton2 = document.getElementById("newClasseButton2");
		addClasseButton2.style = "display: none";
		const exportDataButton = document.getElementById("exportData");
		exportDataButton.style = "display: none";
		const importDataButton = document.getElementById("importData");
		importDataButton.style = "display: none";
		const resetDataButton = document.getElementById("resetData");
		resetDataButton.style = "display: none";

		//Classe
		const addStudentButton = document.getElementById("newStudentButton");
		addStudentButton.style = "display: initial; margin-left: 50px;";
		const deleteClasseButton = document.getElementById("deleteClasse");
		deleteClasseButton.style = "display: initial; margin-left: 50px;";
		const studentListDiv = document.getElementById("students-list");
		studentListDiv.style = "display: block;";
	} else {
		//main menu
		const addClasseButton = document.getElementById("newClasseButton");
		addClasseButton.style = "display: initial; margin-left: 50px;";
		const addClasseButton2 = document.getElementById("newClasseButton2");
		addClasseButton2.style = "display: initial; margin-left: 50px;";
		const exportDataButton = document.getElementById("exportData");
		exportDataButton.style = "display: initial; margin-left: 50px;";
		const importDataButton = document.getElementById("importData");
		importDataButton.style = "display: initial; margin-left: 50px;";
		const resetDataButton = document.getElementById("resetData");
		resetDataButton.style = "display: initial; margin-left: 50px;";

		//Classe
		const addStudentButton = document.getElementById("newStudentButton");
		addStudentButton.style = "display: none";
		const deleteClasseButton = document.getElementById("deleteClasse");
		deleteClasseButton.style = "display: none";
		const studentListDiv = document.getElementById("students-list");
		studentListDiv.style = "display: none;";
	}
}

// Fonctions pour ajouter des informations sur les élèves
function addColle(studentName) {
	// Trouver la classe active
	const urlStr = window.location.href;
	const className = urlStr.split("ActiveClasse=")[1]
	let classe = classes.find(classe => classe.Nom === className);
	
	// Trouver l'élève par son nom
	let eleve = classe.Eleves.find(eleve => eleve.Nom === studentName);

	// Ajouter la nouvelle date dans la catégorie concernée
	let dateActuelle = new Date();
	if (eleve) {
		eleve.Colles.push({ "Date": formatDate(dateActuelle) });
	} else {
		console.log("Élève non trouvé");
	}
	saveData();
	displayStudents(classe.Eleves);
}

function addOubli(studentName) {
	// Trouver la classe active
	const urlStr = window.location.href;
	const className = urlStr.split("ActiveClasse=")[1]
	let classe = classes.find(classe => classe.Nom === className);
	
	// Trouver l'élève par son nom
	let eleve = classe.Eleves.find(eleve => eleve.Nom === studentName);

	// Ajouter la nouvelle date dans la catégorie concernée
	let dateActuelle = new Date();
	if (eleve) {
		eleve.Oublis.push({ "Date": formatDate(dateActuelle) });
	} else {
		console.log("Élève non trouvé");
	}
	saveData();
	displayStudents(classe.Eleves);
}

function addTravail(studentName) {
	// Trouver la classe active
	const urlStr = window.location.href;
	const className = urlStr.split("ActiveClasse=")[1]
	let classe = classes.find(classe => classe.Nom === className);
	
	// Trouver l'élève par son nom
	let eleve = classe.Eleves.find(eleve => eleve.Nom === studentName);

	// Ajouter la nouvelle date dans la catégorie concernée
	let dateActuelle = new Date();
	if (eleve) {
		eleve.Travaux.push({ "Date": formatDate(dateActuelle) });
	} else {
		console.log("Élève non trouvé");
	}
	saveData();
	displayStudents(classe.Eleves);
}

function addComportement(studentName) {
	// Trouver la classe active
	const urlStr = window.location.href;
	const className = urlStr.split("ActiveClasse=")[1]
	let classe = classes.find(classe => classe.Nom === className);
	
	// Trouver l'élève par son nom
	let eleve = classe.Eleves.find(eleve => eleve.Nom === studentName);

	// Ajouter la nouvelle date dans la catégorie concernée
	let dateActuelle = new Date();
	if (eleve) {
		eleve.Comportements.push({ "Date": formatDate(dateActuelle) });
	} else {
		console.log("Élève non trouvé");
	}
	saveData();
	displayStudents(classe.Eleves);
}

function deleteEntry(studentName, entryDate, type) {
	// Trouver la classe active
	const urlStr = window.location.href;
	const className = urlStr.split("ActiveClasse=")[1]
	result = confirm(`Voulez vous vraiment retirer cette entrée : ${className} / ${studentName} / ${entryDate} / ${type} ?`);
	if(result) {
		// Trouver la classe
		let classe = classes.find(c => c.Nom === className);
		if (!classe) return;

		// Trouver l'élève
		let eleve = classe.Eleves.find(e => e.Nom === studentName);
		if (!eleve) return;

		// Filtrer les entry pour retirer ceux avec la date spécifiée
		if (type=='Comportements') {
			eleve.Comportements = eleve.Comportements.filter(c => c.Date !== entryDate);
		} else if (type=='Oublis') {
			eleve.Oublis = eleve.Oublis.filter(c => c.Date !== entryDate);
		} else if (type=='Travaux') {
			eleve.Travaux = eleve.Travaux.filter(c => c.Date !== entryDate);
		} else if (type=='Colles') {
			eleve.Colles = eleve.Colles.filter(c => c.Date !== entryDate);
		}
		saveData();
		displayStudents(classe.Eleves);
	}
}

// Formatage de date
function formatDate(date) {
	let jour = date.getDate().toString().padStart(2, '0');
	let mois = (date.getMonth() + 1).toString().padStart(2, '0'); // Les mois commencent à 0
	let annee = date.getFullYear();
	let heures = date.getHours().toString().padStart(2, '0');
	let minutes = date.getMinutes().toString().padStart(2, '0');

	return `${jour}/${mois}/${annee} - ${heures}:${minutes}`;
}

// Sauvegarde des données :
function saveData() {
    localStorage.setItem('Classes', JSON.stringify(classes));
}

// Chargement des données :
function loadData() {
    const savedData = localStorage.getItem('Classes');
    if (savedData) {
        classes = JSON.parse(savedData);
    }
}

function resetData() {
	result = confirm(`Voulez vous vraiment reset toutes les data ?`);
	if(result) {
		localStorage.setItem('Classes', []);
		classes = [
			{ Nom: "ClasseA",  Eleves: [{ Nom: "P. Antoine", Colles: [{ Date: "15/08/2024 - 10:58"}, { Date: "15/08/2024 - 10:58"}], Oublis: [{ Date: "15/08/2024 - 10:58" }], Comportements: [{ Date: "15/08/2024 - 10:58" }], Travaux: [{ Date: "15/08/2024 - 10:58" }]}, { Nom: "P. Arthur", Colles: [{ Date: "15/08/2024 - 10:58"}, { Date: "15/08/2024 - 10:58"}], Oublis: [{ Date: "15/08/2024 - 10:58" }], Comportements: [{ Date: "15/08/2024 - 10:58" }], Travaux: [{ Date: "15/08/2024 - 10:58" }]}]},
			{ Nom: "ClasseB",  Eleves: [{ Nom: "P. Alexandre", Colles: [{ Date: "15/08/2024 - 10:58"}, { Date: "15/08/2024 - 10:58"}], Oublis: [{ Date: "15/08/2024 - 10:58" }], Comportements: [{ Date: "15/08/2024 - 10:58" }], Travaux: [{ Date: "15/08/2024 - 10:58" }]}]},
		];
		displayMenu();
		displayClasses();
	}
}

function exportData() {
	alert(JSON.stringify(classes));
}

function importData() {
	const data = prompt("Entrez le string data à importer");
	classes = JSON.parse(data)
	displayMenu();
	displayClasses();
	saveData();
}

// Appeler la fonction pour afficher les classes au chargement de la page
loadData();
//resetData();
displayMenu();
displayClasses();