// Définir un tableau de classes (vous pouvez le remplacer par vos propres données)
let classes = [
    { name: "Classe A", students: ["Alice", "Bob"] },
    { name: "Classe B", students: ["Charlie", "David"] },
    // Ajoutez plus de classes ici...
];

// Fonction pour afficher la liste des classes
function displayClasses() {
    const classList = document.getElementById("class-list");
    classList.innerHTML = ""; // Effacer le contenu existant

    classes.forEach((classe) => {
        const classLink = document.createElement("a");
        classLink.textContent = classe.name;
        classLink.href = "#"; // Lien fictif pour l'instant
        classLink.addEventListener("click", () => displayStudents(classe.students));
        classList.appendChild(classLink);
    });
}

// Fonction pour afficher les élèves d'une classe
function displayStudents(students) {
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
displayClasses();
