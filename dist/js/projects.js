let projectsOpen = document.querySelector('.intro__cta-text');
let projectsClose = document.querySelector('.projects__close');
let projects = document.querySelector('.projects');
let iconGithub = document.querySelector('.icon__github');
let projectsBox = document.querySelector('.projects__content');

const proxy = 'https://cors-anywhere.herokuapp.com/';
const user = 'Emox133';

let languageUsed = (language) => {
    return language == 'CSS' ? "./assets/images/css.png" :
    language == 'JavaScript' ? "./assets/images/js.png" : ''
};

let renderRepos = (repo) => {
    const markup = `
        <div class="project" data-id=${repo.id}>
            <img src="${languageUsed(repo.language)}" alt="language-used" class="project__image">
            <h2 class="project__name">${repo.name}</h2>
            <p class="project__description">${repo.description}</p>
            <a href=${repo.html_url} target="_blank"/><button class="project__how-to">Link to project</button></a>
        </div>
    `;
    
    projectsBox.insertAdjacentHTML('beforeend', markup);
};

let renderNavigation = () => {
    const markup = `
    <div class="projects__nav">
        <span class="projects__close">&times;</span>
        <div class="projects__avatar">
            <img src="./assets/images/avatar.jpg" alt="Portfolio creator" class="projects__avatar-img">
        </div>
    </div>
    `;
    projects.insertAdjacentHTML('afterBegin', markup);
};

let getRepos = () => {
    fetch(`${proxy}https://api.github.com/users/${user}/repos`)
    .then(res => res.json())
    .then(data => {
        data.forEach(repo => {
            renderRepos(repo);
        })    
    })
    .catch(err => console.log(err))
};

let removeProjectsFromDom = () => {
    let projectsNav = document.querySelector('.projects__nav');
    let projects = document.querySelectorAll('.project');

    if(projectsNav && projects) {
        projectsNav.parentNode.removeChild(projectsNav);
        projects.forEach(project => {
            project.parentNode.removeChild(project);
        })
    }
};

let addBackdropFilter = () => {
    projects.style.backdropFilter = 'blur(4px)';
};

let showProjects = () => {
    // ReRender nav and projects every time 
    getRepos();
    renderNavigation();

    projects.style.animation = 'projectsSlideIn 2s ease';
    projects.style.display = 'block';
    projects.style.transform = 'translateY(0)';
    projectsOpen.style.display = 'none';
    iconGithub.style.color = '#fff';

    // Add backdrop filter a litle bit latter 'cause of perfomance 
    // Reason - Backdrop filter uses GPU rendering
    setTimeout(() => {
        addBackdropFilter();
    }, 2000)
};

let closeProjects = () => {
    projects.style.animation = 'none';
    projects.style.transform = 'translateY(-100%)';
    projectsOpen.style.display = 'block';
    iconGithub.style.color = '#222';
    projects.style.animation = 'projectsSlideOut 2s ease';
    projects.style.backdropFilter = 'none';

    // Remove projects from DOM after specified ammount of time (remove unneccessary code)
    setTimeout(() => {
        removeProjectsFromDom();
    }, 1000);
};

// Event listeners
// 1. Show projects 
projectsOpen.addEventListener('click', showProjects);

// 2. Close projects
projects.addEventListener('click', e => {
    if (e.target.closest('.projects__close')) {
        closeProjects();
    }
});
