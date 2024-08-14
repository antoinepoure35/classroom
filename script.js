// Définir un tableau de classes (vous pouvez le remplacer par vos propres données)
let classes = [
    { name: "ClasseA", students: ["Alice", "Bob"] },
    { name: "ClasseB", students: ["Charlie", "David"] },
    // Ajoutez plus de classes ici...
];

// Fonction pour afficher la liste des classes
function displayClasses() {
    const classList = document.getElementById("class-list");
    classList.innerHTML = ""; // Effacer le contenu existant
	
	const classLink = document.createElement("a");
	classLink.textContent = "Retour";
	classLink.href = "#"; // Lien fictif pour l'instant
	classLink.addEventListener("click", () => displayMenu());
	classLink.style = 'margin-left: 20px;';
	classList.appendChild(classLink);

    classes.forEach((classe) => {
        const classLink = document.createElement("a");
        classLink.textContent = classe.name;
        classLink.href = "#ActiveClasse=" + classe.name; // Lien fictif pour l'instant
        classLink.addEventListener("click", () => displayStudents(classe.students));
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
        const studentInfo = document.createElement("div");
        studentInfo.className = "student-info";
        studentInfo.innerHTML = `
            <h2>${student}</h2>
            <button onclick="addWorkNotDone('${student}')">Travail non fait</button>
            <button onclick="addMisbehavior('${student}')">Comportement pénible</button>
            <button onclick="addForgottenItems('${student}')">Oubli d'affaires</button>
        `;
        studentsList.appendChild(studentInfo);
    });
}

// Fonction pour ajouter une classe
function addClass() {
    const className = prompt("Entrez le nom de la nouvelle classe :");
    if (className) {
        classes.push({ name: className, students: [] });
        displayClasses();
    }
}

// Fonction pour ajouter un élève
function addStudent() {
    const studentName = prompt("Entrez le nom de l'élève :");
    if (studentName) {
		var urlStr = window.location.href;
		var className = urlStr.split("ActiveClasse=")[1]
		const classe = classes.find((cls) => cls.name === className);
		if (classe) {
			classe.students.push(studentName);
		}
        displayStudents(classe.students)
    }
}

// Fonction pour ajouter une classe
function toggleClassDisplay(variable) {
	if (variable) {
		const addClasseButton = document.getElementById("newClasseButton");
		addClasseButton.style = "display: none";
		const addStudentButton = document.getElementById("newStudentButton");
		addStudentButton.style = "display: block; margin-left: 50px;";
		const studentListDiv = document.getElementById("students-list");
		studentListDiv.style = "display: block;";
	} else {
		const addClasseButton = document.getElementById("newClasseButton");
		addClasseButton.style = "display: block; margin-left: 50px;";
		const addStudentButton = document.getElementById("newStudentButton");
		addStudentButton.style = "display: none";
		const studentListDiv = document.getElementById("students-list");
		studentListDiv.style = "display: none;";
	}
}

// Fonctions pour ajouter des informations sur les élèves
function addWorkNotDone(student) {
    // À implémenter : ajouter le travail non fait pour l'élève
}

function addMisbehavior(student) {
    // À implémenter : ajouter le comportement pénible pour l'élève
}

function addForgottenItems(student) {
    // À implémenter : ajouter l'oubli d'affaires pour l'élève
}

// Appeler la fonction pour afficher les classes au chargement de la page
displayMenu();
displayClasses();