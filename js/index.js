$(document).ready(function() {
    $(window).on('resize', () => {
        if (window.innerWidth > 767) {
            $('#header').css('height', '70px');
            $('.nav ul').css('display', 'block');
        } else {
            $('#header').css('height', '70px');
            $('.nav ul').css('display', 'none');
        }

    });

    $('#mobile-nav').click(() => {

        let navLinks = $('nav ul');

        if(navLinks.css('display') !== 'block') {
            $('#header').animate({height : 240}, 400);
            navLinks.slideDown();
        } else {
            $('#header').animate({height : 70}, 400);
            navLinks.slideUp();
        }
    });

    if (window.innerWidth < 768) {
        $('ul li a').click(() => {
            $('#header').animate({height : 70}, 400);
            $('nav ul').slideUp();
        });
    }

    function scrollToSection (element) {
        let scrollAnchor = element.attr('data-scroll'),
            scrollPoint = $('div[data-anchor="' + scrollAnchor + '"]').offset().top - 70;

        $('body,html').animate({
            scrollTop: scrollPoint
        }, 500);
    }

    $('#logo').click(function () {
        scrollToSection($(this));
    });

    $('ul li a').click(function () {
        scrollToSection($(this));
    });

    $('#work-with-me').click(function () {
        scrollToSection($(this));
    });

    $('#scrollToTop').click(function () {
        scrollToSection($(this));
    });

    $(window).on('scroll', () => {
        let navItems = $('ul li a');
        if ($(this).scrollTop() >= $('div[data-anchor="home"]').offset().top - 71) {
            navItems.removeClass('active');
            navItems.eq(0).addClass('active');
        }
        if ($(this).scrollTop() >= $('div[data-anchor="work"]').offset().top - 71) {
            navItems.removeClass('active');
            navItems.eq(1).addClass('active');
        }
        if ($(this).scrollTop() >= $('div[data-anchor="about"]').offset().top - 71) {
            navItems.removeClass('active');
            navItems.eq(2).addClass('active');
        }
        if ($(this).scrollTop() >= $('div[data-anchor="contact"]').offset().top - 71) {
            navItems.removeClass('active');
            navItems.eq(3).addClass('active');
        }

        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
            $('#scrollToTop').css('display', 'flex');
        } else {
            $('#scrollToTop').css('display', 'none');
        }
    });

    $('.filter-btn').click(function() {
        $('.filter-btn').removeClass('active-filter');
        $(this).addClass('active-filter');
        if ($('#no-projects').length) {
            $('#no-projects').remove();
        }
        if (this.innerText !== 'ALL') {
            projectFilter(this.innerText);
        } else {
            $('.project').fadeIn();
            if (i !== projects.length) {
                $('#projects').css('margin', '15px auto 0');
                $('#load-more-projects').fadeIn();
            } else {
                $('#projects').css('margin', '15px auto 70px');
            }
        }
    });

    const projects = [
        {
            name : 'TMDB Movie Search',
            image : 'images/TMDB%20Movie%20Search.png',
            github : 'https://github.com/RealMattOwen/TMDB-Movie-Search',
            live : 'https://tmdb-movie-search.herokuapp.com/',
            type : 'web apps'
        },
        {
            name : 'Discord Role Bot',
            image : 'https://media.discordapp.net/attachments/331235961671385088/375788270786969600/bots.jpg',
            github : 'https://github.com/RealMattOwen/Discord-Role-Bot',
            live : '',
            type : 'other'
        }
    ];

    const createProject = () => {
        let projectName = projects[i].name;

        let projectImage = projects[i].image;

        let projectGithub = projects[i].github;

        let projectLive = projects[i].live;

        let newProject = `<div class="project">
                        <img src="${projectImage}">
                        <div class="overlay">
                            <div class="inner-overlay">
                                <a href="${projectLive}" target="_blank" title="Live version of: ${projectName}"><h2>${projectName}</h2></a>
                                <a href="${projectGithub}" target="_blank" title="The GitHub repo for ${projectName}"><i class="icon-github-square"></i></a>
                            </div>
                        </div>
                    </div>`;

        $('#projects').append(newProject);
    };

    let i = 0;

    for (i; i < 3; i++) {
        createProject();

        if (i === projects.length - 1) {
            $('#load-more-projects').hide();
            $('#projects').css('margin', '15px auto 70px');
        }
    }

    const projectCreationAndDisplay = iPlusX => {
        for (i; i < iPlusX; i++) {
            createProject();
            $('.project').eq(i).hide().fadeIn(1000);
        }
    };

    const loadMoreProjects = iPlus2 => {
        if (iPlus2 > projects.length) {
            let iPlus1 = iPlus2 - 1;

            projectCreationAndDisplay(iPlus1);
        } else {
            projectCreationAndDisplay(iPlus2);
        }
    };

    $('#load-more-projects').click(() => {

        let iPlus2 = i + 2;

        loadMoreProjects(iPlus2);

        if (i === projects.length) {
            $('#load-more-projects').hide();
            $('#projects').css('margin', '15px auto 70px');
        }
    });

    const checkIfNoProjectsForFilter = projectsList => {
        let projects = Array.from(projectsList);

        let projectCheck = projects.every(project => {
            return project.style.display === 'none';
        });

        if (projectCheck) {
            $('#projects').css('margin', '70px auto').append('<h2 id="no-projects">No projects match this filter currently.</h2>');
            $('#no-projects').css('font-size', '20px');
        } else {
            if (i === projects.length) {
                $('#projects').css('margin', '15px auto 70px');
            } else {
                $('#projects').css('margin', '15px auto 0');
            }
        }
    };

    const projectFilter = filter => {
        let projectsList, project, projectType, searchNumber;

        projectsList = document.getElementsByClassName('project');

        for (searchNumber = 0; searchNumber < projectsList.length; searchNumber++) {

            project = projectsList[searchNumber];

            projectType = projects[searchNumber].type;

            const loadMoreProjectsBtn = $('#load-more-projects');

            if (projectType.toUpperCase().indexOf(filter) > -1) {
                $(project).hide().fadeIn(1000);
                loadMoreProjectsBtn.hide();
            } else {
                $(project).hide();
                loadMoreProjectsBtn.hide();
            }
        }

        $('#projects').css('margin', '15px auto 70px');

        checkIfNoProjectsForFilter(projectsList);
    };

    let nameValidationPass = false;
    let emailValidationPass = false;
    let messageValidationPass = false;

    let nameInput = document.getElementById("name");
    let emailInput = document.getElementById("email");
    let messageInput = document.getElementById("message");

    let blankInputCheck = '';
    let letters = /^[a-zA-Z\s]+$/;
    let emailCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    let nameCounter = 0;
    let emailCounter = 0;
    let messageCounter = 0;

    nameInput.oninput = () => {
        if ((nameInput.value.match(letters)) && (nameInput.value !== blankInputCheck)){
            $(nameInput).css({'color' : 'white', 'border' : 'none'});
            nameValidationPass = true;
        } else {
            $(nameInput).css('color', '#ec5e6c');
            nameValidationPass = false;
        }
    };

    emailInput.oninput = () => {
        if ((emailInput.value.match(emailCheck)) && (emailInput.value !== blankInputCheck)){
            $(emailInput).css({'color' : 'white', 'border' : 'none'});
            emailValidationPass = true;
        } else {
            $(emailInput).css('color', '#ec5e6c');
            emailValidationPass = false;
        }
    };

    messageInput.oninput = () => {
        if (messageInput.value !== blankInputCheck) {
            $(messageInput).css({'color' : 'white', 'border' : 'none'});
            messageValidationPass = true;
        } else {
            $(messageInput).css('color', '#ec5e6c');
            messageValidationPass = false;
        }
    };

    const formSubmitBtn = $('#contact-btn');
    const validation = $('#validation');

    const toggleContactBtnState = state => {
        formSubmitBtn.attr('disabled', state);
    };

    const validations = ['Please enter a valid name <br>', 'Please enter a valid email <br>', 'Please enter a valid message <br>'];

    const nameValidationCheck = () => {
        if (nameValidationPass === false) {
            if (nameCounter <= 0) {
                validation.append(validations[0]);
                nameCounter++;
            }
            $('#name').css({'color' : '#ec5e6c','border' : '1px solid #ec5e6c'});
        } else {
            let currentValidation = validation.html();
            let updatedString = currentValidation.replace('Please enter a valid name <br>','');
            validation.html(updatedString);
            nameCounter = 0;
        }
    };

    function emailValidationCheck() {
        if (emailValidationPass === false) {
            if (emailCounter <= 0) {
                validation.append(validations[1]);
                emailCounter++;
            }
            $('#email').css({'color' : '#ec5e6c','border' : '1px solid #ec5e6c'});
        } else {
            let currentValidation = validation.html();
            let updatedString = currentValidation.replace('Please enter a valid email <br>','');
            validation.html(updatedString);
            emailCounter = 0;
        }
    }

    function messageValidationCheck() {
        if (messageValidationPass === false) {
            if (messageCounter <= 0) {
                validation.append(validations[2]);
                messageCounter++;
            }
            $('#message').css({'color' : '#ec5e6c','border' : '1px solid #ec5e6c'});
        } else {
            let currentValidation = validation.html();
            let updatedString = currentValidation.replace('Please enter a valid message <br>','');
            validation.html(updatedString);
            messageCounter = 0;
        }
    }

    $(nameInput).blur(nameValidationCheck);
    $(emailInput).blur(emailValidationCheck);
    $(messageInput).blur(messageValidationCheck);

    const form = $('#contact-form');

    $(form).submit(e => {
        e.preventDefault();

        toggleContactBtnState(true);

        if ((nameInput.value !== blankInputCheck) && (emailInput.value !== blankInputCheck) && (messageInput.value !== blankInputCheck)) {

            let formData = $(form).serialize();

            $.ajax({
                type: 'POST',
                url: $(form).attr('action'),
                data: formData,
                success: () => {
                    setTimeout(() => {
                        toggleContactBtnState(false);
                    }, 7000);
                    form.each(function () {
                        this.reset();
                    });
                    validation.css('color', '#00c853').text('Your message has been sent.');
                    setTimeout(function () {
                        validation.text('').css('color', '#fff');
                    }, 7000);
                    nameValidationPass = false;
                    emailValidationPass = false;
                    messageValidationPass = false;
                },
                error: () => {
                    setTimeout(() => {
                        toggleContactBtnState(false);
                    }, 7000);
                    validation.css('color', 'red').text('Error please try again.');
                    setTimeout(() => {
                        validation.text('').css('color', '#fff');
                    }, 7000);
                }
            });
        } else {
            setTimeout(() => {
                toggleContactBtnState(false);
            }, 7000);
            validation.css('color', 'red').text('Please complete the form.');
            setTimeout(() => {
                validation.text('').css('color', '#fff');
            }, 7000);
        }
    });
});