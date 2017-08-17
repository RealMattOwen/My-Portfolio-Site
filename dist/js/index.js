'use strict';

$(document).ready(function () {
    var _this = this;

    $(window).on('resize', function () {
        if (window.innerWidth > 767) {
            $('#header').css('height', '70px');
            $('.nav ul').css('display', 'block');
        } else {
            $('#header').css('height', '70px');
            $('.nav ul').css('display', 'none');
        }
    });

    $('#mobile-nav').click(function () {

        var navLinks = $('nav ul');

        if (navLinks.css('display') !== 'block') {
            $('#header').animate({ height: 240 }, 400);
            navLinks.slideDown();
        } else {
            $('#header').animate({ height: 70 }, 400);
            navLinks.slideUp();
        }
    });

    if (window.innerWidth < 768) {
        $('ul li a').click(function () {
            $('#header').animate({ height: 70 }, 400);
            $('nav ul').slideUp();
        });
    }

    function scrollToSection(element) {
        var scrollAnchor = element.attr('data-scroll'),
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

    $(window).on('scroll', function () {
        var navItems = $('ul li a');
        if ($(_this).scrollTop() >= $('div[data-anchor="home"]').offset().top - 71) {
            navItems.removeClass('active');
            navItems.eq(0).addClass('active');
        }
        if ($(_this).scrollTop() >= $('div[data-anchor="skills"]').offset().top - 71) {
            navItems.removeClass('active');
            navItems.eq(1).addClass('active');
        }
        if ($(_this).scrollTop() >= $('div[data-anchor="work"]').offset().top - 71) {
            navItems.removeClass('active');
            navItems.eq(2).addClass('active');
        }
        if ($(_this).scrollTop() >= $('div[data-anchor="contact"]').offset().top - 71) {
            navItems.removeClass('active');
            navItems.eq(3).addClass('active');
        }

        if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
            $('#scrollToTop').css('display', 'flex');
        } else {
            $('#scrollToTop').css('display', 'none');
        }
    });

    $('.filter-btn').click(function () {
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

    var projects = [{
        name: 'My Portfolio Site',
        image: 'images/My%20Portfolio.png',
        github: 'https://github.com/RealMattOwen/My-Portfolio-Site',
        live: 'https://www.realmattowen.com/',
        type: 'websites'
    }, {
        name: 'Project 2',
        image: 'images/test%20image.png',
        github: 'https://www.github.com/realmattowen',
        live: 'https://www.realmattowen.com/Project%202',
        type: 'websites'
    }, {
        name: 'Project 3',
        image: 'images/test%20image.png',
        github: 'https://www.github.com/realmattowen',
        live: 'https://www.realmattowen.com/Project%203',
        type: 'websites'
    }, {
        name: 'Project 4',
        image: 'images/test%20image.png',
        github: 'https://www.github.com/realmattowen',
        live: 'https://www.realmattowen.com/Project%204',
        type: 'websites'
    }
    // {
    //     name : 'Project 5',
    //     image : 'images/test%20image.png',
    //     github : 'https://www.github.com/realmattowen',
    //     live : 'https://www.realmattowen.com/Project%202',
    //     type : 'web apps'
    // },
    // {
    //     name : 'Project 6',
    //     image : 'images/test%20image.png',
    //     github : 'https://www.github.com/realmattowen',
    //     live : 'https://www.realmattowen.com/Project%203',
    //     type : 'other'
    // }
    ];

    var createProject = function createProject() {
        var projectName = projects[i].name;

        var projectImage = projects[i].image;

        var projectGithub = projects[i].github;

        var projectLive = projects[i].live;

        var newProject = '<div class="project">\n                        <img src="' + projectImage + '">\n                        <div class="overlay">\n                            <div class="inner-overlay">\n                                <a href="' + projectLive + '" target="_blank" title="' + projectName + '"><h2>' + projectName + '</h2></a>\n                                <a href="' + projectGithub + '" target="_blank" title="The GitHub repo for ' + projectName + '"><i class="icon-github-square"></i></a>\n                            </div>\n                        </div>\n                    </div>';

        $('#projects').append(newProject);
    };

    var i = 0;

    for (i; i < 4; i++) {
        createProject();

        if (i === projects.length - 1) {
            $('#load-more-projects').hide();
            $('#projects').css('margin', '15px auto 70px');
        }
    }

    var projectCreationAndDisplay = function projectCreationAndDisplay(iPlusX) {
        for (i; i < iPlusX; i++) {
            createProject();
            $('.project').eq(i).hide().fadeIn(1000);
        }
    };

    var loadMoreProjects = function loadMoreProjects(iPlus2) {
        if (iPlus2 > projects.length) {
            var iPlus1 = iPlus2 - 1;

            projectCreationAndDisplay(iPlus1);
        } else {
            projectCreationAndDisplay(iPlus2);
        }
    };

    $('#load-more-projects').click(function () {

        var iPlus2 = i + 2;

        loadMoreProjects(iPlus2);

        if (i === projects.length) {
            $('#load-more-projects').hide();
            $('#projects').css('margin', '15px auto 70px');
        }
    });

    var checkIfNoProjectsForFilter = function checkIfNoProjectsForFilter(projectsList) {
        var projects = Array.from(projectsList);

        var projectCheck = projects.every(function (project) {
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

    var projectFilter = function projectFilter(filter) {
        var projectsList = void 0,
            project = void 0,
            projectType = void 0,
            searchNumber = void 0;

        projectsList = document.getElementsByClassName('project');

        for (searchNumber = 0; searchNumber < projectsList.length; searchNumber++) {

            project = projectsList[searchNumber];

            projectType = projects[searchNumber].type;

            var loadMoreProjectsBtn = $('#load-more-projects');

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

    var nameValidationPass = false;
    var emailValidationPass = false;
    var messageValidationPass = false;

    var nameInput = document.getElementById("name");
    var emailInput = document.getElementById("email");
    var messageInput = document.getElementById("message");

    var blankInputCheck = '';
    var letters = /^[a-zA-Z\s]+$/;
    var emailCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    var nameCounter = 0;
    var emailCounter = 0;
    var messageCounter = 0;

    nameInput.oninput = function () {
        if (nameInput.value.match(letters) && nameInput.value !== blankInputCheck) {
            $(nameInput).css({ 'color': 'white', 'border': 'none' });
            nameValidationPass = true;
        } else {
            $(nameInput).css('color', '#ec5e6c');
            nameValidationPass = false;
        }
    };

    emailInput.oninput = function () {
        if (emailInput.value.match(emailCheck) && emailInput.value !== blankInputCheck) {
            $(emailInput).css({ 'color': 'white', 'border': 'none' });
            emailValidationPass = true;
        } else {
            $(emailInput).css('color', '#ec5e6c');
            emailValidationPass = false;
        }
    };

    messageInput.oninput = function () {
        if (messageInput.value !== blankInputCheck) {
            $(messageInput).css({ 'color': 'white', 'border': 'none' });
            messageValidationPass = true;
        } else {
            $(messageInput).css('color', '#ec5e6c');
            messageValidationPass = false;
        }
    };

    var formSubmitBtn = $('#contact-btn');
    var validation = $('#validation');

    var toggleContactBtnState = function toggleContactBtnState(state) {
        formSubmitBtn.attr('disabled', state);
    };

    var validations = ['Please enter a valid name <br>', 'Please enter a valid email <br>', 'Please enter a valid message <br>'];

    var nameValidationCheck = function nameValidationCheck() {
        if (nameValidationPass === false) {
            if (nameCounter <= 0) {
                validation.append(validations[0]);
                nameCounter++;
            }
            $('#name').css({ 'color': '#ec5e6c', 'border': '1px solid #ec5e6c' });
        } else {
            var currentValidation = validation.html();
            var updatedString = currentValidation.replace('Please enter a valid name <br>', '');
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
            $('#email').css({ 'color': '#ec5e6c', 'border': '1px solid #ec5e6c' });
        } else {
            var currentValidation = validation.html();
            var updatedString = currentValidation.replace('Please enter a valid email <br>', '');
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
            $('#message').css({ 'color': '#ec5e6c', 'border': '1px solid #ec5e6c' });
        } else {
            var currentValidation = validation.html();
            var updatedString = currentValidation.replace('Please enter a valid message <br>', '');
            validation.html(updatedString);
            messageCounter = 0;
        }
    }

    $(nameInput).blur(nameValidationCheck);
    $(emailInput).blur(emailValidationCheck);
    $(messageInput).blur(messageValidationCheck);

    var form = $('#contact-form');

    $(form).submit(function (e) {
        e.preventDefault();

        toggleContactBtnState(true);

        if (nameInput.value !== blankInputCheck && emailInput.value !== blankInputCheck && messageInput.value !== blankInputCheck) {

            var formData = $(form).serialize();

            $.ajax({
                type: 'POST',
                url: $(form).attr('action'),
                data: formData,
                success: function success() {
                    setTimeout(function () {
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
                error: function error() {
                    setTimeout(function () {
                        toggleContactBtnState(false);
                    }, 7000);
                    validation.css('color', 'red').text('Error please try again.');
                    setTimeout(function () {
                        validation.text('').css('color', '#fff');
                    }, 7000);
                }
            });
        } else {
            setTimeout(function () {
                toggleContactBtnState(false);
            }, 7000);
            validation.css('color', 'red').text('Please complete the form.');
            setTimeout(function () {
                validation.text('').css('color', '#fff');
            }, 7000);
        }
    });
});
//# sourceMappingURL=index.js.map