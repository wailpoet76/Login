//******************************************************** */
//********          Form Toggle           **************** */
//******************************************************** */

function toggleLogin() {
    document.querySelector(".form.Login").classList.toggle("active");
    document.querySelector(".form.Registration").classList.toggle("active");
}
//******************************************************** */
//********          Login Form          ****************** */
//******************************************************** */
const loginform = document.querySelector(".form.Login.active");
const loguser = document.getElementById("userName_login");
const logpass = document.getElementById("password_login");
const logremember = document.getElementById("remember_me_login");
const logforget = document.querySelector(".get-login.forget");
const loginbtn = document.querySelector(".registerbtn.login");
let userdata = {
    name: "walid",
    pass: "12345678",
    forgetQ: "Group Name",
    forgetAnswer: "bucbuc",
}


window.onload = function () {

    if (window.localStorage.getItem("checked"))
        logremember.checked = true; else
        logremember.checked = false;
}

logpass.onfocus = function () {
    if (window.localStorage.getItem("checked") && loguser.value === window.localStorage.getItem("userName")) {
        logpass.value = window.localStorage.getItem("userPassword")
    }
}
loginbtn.onclick = function (element) {
    if (loguser.value === userdata.name && logpass.value === userdata.pass) {
        console.log("Welcome", loguser.value);
        if (logremember.checked) {
            window.localStorage.setItem("userName", userdata.name);
            window.localStorage.setItem("userPassword", userdata.pass);
            window.localStorage.setItem("userQuestion", userdata.forgetQ);
            window.localStorage.setItem("userAnswer", userdata.forgetAnswer);
            window.localStorage.setItem("checked", 1);
        } else {
            window.localStorage.removeItem("userName");
            window.localStorage.removeItem("userPassword");
            window.localStorage.removeItem("userQuestion");
            window.localStorage.removeItem("userAnswer");
            window.localStorage.removeItem("checked");

        }
    } else {
        alert("username or passowrd are wrong");
        element.preventDefault();
        loguser.value = "";
        logpass.value = "";
        loguser.focus();
    }
}

logforget.onclick = function (element) {
    let answer = prompt(userdata.forgetQ);
    if (answer === userdata.forgetAnswer) {
        alert(`Your password is: ${userdata.pass}`);
    }
}

//******************************************************** */
//******************************************************** */



//******************************************************** */
//********          Register Form       ****************** */
//******************************************************** */


//******************************************************** */
//********       Setup HTML items       ****************** */
//******************************************************** */

// Object to collect registery form items data
const regFormObj = {
    fName: "",
    fNameAr: "",
    email: "",
    userName: "",
    userPass: "",
    userPassStrength: "",
    userPassRepeat: "",
    forgetQ: "",
    forgetA: "",
};
const regFormObjTeach = {
    type: "",
    stage: "",
    subject: "",
    grade: "",
    lang: ""
};

//assign form items to variables not needed in object
const userRegForm = document.querySelector('.register');
const userLogForm = document.querySelector('.login');
const regBtn = document.getElementsByClassName('registerbtn')[0];
//assign form items to Object items
regFormObj.fName = document.getElementById('nameEn');
regFormObj.fNameAr = document.getElementById('nameAr');
regFormObj.email = document.getElementById('email');
regFormObj.userName = document.getElementById('userName');
regFormObj.userPass = document.getElementById('password');
regFormObj.userPassStrength = document.querySelector('.bar');
regFormObj.userPassRepeat = document.getElementById('repassword');
regFormObj.forgetQ = document.getElementById('forgetpassquestion');
regFormObj.forgetA = document.getElementById('forgetpassanswer');

//assign form Teaching items to Object items
// regFormObjTeach.type = document.querySelectorAll("select.type");
regFormObjTeach.type = document.getElementsByClassName('type');
regFormObjTeach.stage = document.getElementsByClassName('stage');
regFormObjTeach.subject = document.getElementsByClassName('subject');
regFormObjTeach.grade = document.getElementsByClassName('grade');
regFormObjTeach.lang = document.getElementsByClassName('lang');

//******************************************************** */
//******************************************************** */



//******************************************************** */
//********     Listen to inputs         ****************** */
//******************************************************** */
for (const key in regFormObj) {
    regFormObj[key].addEventListener('input', function (event) {
        if (this.value !== "") {
            regFormObj[key].dataset.state = "valid";
            document.querySelector(".inpData.info").style.display = "block";
        } else {
            regFormObj[key].dataset.state = "invalid";
            document.querySelector(".inpData.info").style.display = "none";
        }
    })

    regFormObj[key].addEventListener('focusout', function (event) {
        if (this.value !== "") {
            if (this.id === "password") {
                document.querySelector(".suggest").style.display = "none";
                document.getElementById("password").type = "password";
            }
        }
        if (this.value !== "") {
            let result;
            switch (this.type) {
                //check the text fields didn't contain special chars
                case "text":
                    regExp = /[~|!|@|#|$|%|^|&|*|(|)|_|-|>|<|=|\+|\\|?|\.|\"|'|;|،|ـ|\[|\]|\{|\}|ْ|~|0-9]/i;
                    // regExp = /[^a-z|^\s]/i;
                    // regExp = /\d\s\w{3}/ig;
                    if (this.id !== "userName") {
                        result = this.value.match(regExp) || [];
                        if (!result.length) {
                            this.classList.remove("wrong");
                        } else {
                            this.classList.add("wrong");
                        }
                    }
                    break;
                case "email":
                    emailRegExp = /^[^\.\s]\w+@\w+\.\w{2,}/ig;
                    result = this.value.match(emailRegExp) || [];
                    if (result.length) {
                        this.classList.remove("wrong");
                    } else {
                        this.classList.add("wrong");
                    }
                    break;
                case "password":
                    if (this.id === 'repassword') {
                        const alert = document.getElementsByClassName("inpData alert");
                        if (this.value === document.getElementById("password").value) {
                            this.classList.remove("wrong");
                            alert[0].style.display = "none";
                        } else {
                            this.classList.add("wrong");
                            alert[0].style.display = "block";

                        }
                    }
                    break;
                default:
                    break;
            }
        }
    });
}


document.getElementById("password").addEventListener('focus', function (event) {
    if (document.getElementById("password").value == "")
        document.querySelector(".suggest").style.display = "flex";
});

document.getElementById("password").addEventListener('input', function (event) {
    document.querySelector(".suggest").style.display = "none";
    let passCode = `~|!@#$%^&*()_-><=+?."';0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`;
    checkStrength(passCode, this.value);
});

//******************************************************** */
//******************************************************** */


//******************************************************** */
//********     Submit button click      ****************** */
//******************************************************** */
//Check before submit button
// regForm.onsubmit = function (e) {
regBtn.onclick = function (e) {

    for (const key in regFormObj) {
        if (regFormObj[key].dataset.state == "invalid") {
            regFormObj[key].focus();
            console.log("Not correct form");
            e.preventDefault();
            break;
        };
    }
    for (const key in regFormObjTeach) {
        if (regFormObjTeach[key][1].dataset.state == "invalid") {
            console.log("Not correct Teach");
            e.preventDefault();
            break;
        };
    }

}

//******************************************************** */
//******************************************************** */


//******************************************************** */
//********          Main Education Bar  ****************** */
//******************************************************** */

const eduContainer = document.querySelector(".wrapper");
let edu = document.querySelectorAll(".teaching");
document.onload = loaderBar();

//******************************************************** */
//******************************************************** */



//******************************************************** */
//******************************************************** */
//******************************************************** */
//******************************************************** */
//******************************************************** */
//********            Function Area         ************** */
//******************************************************** */
//******************************************************** */
//******************************************************** */
//******************************************************** */
//******************************************************** */
function loaderBar() {
    edu.forEach(ele => {
        //add or remove teaching type of education whole Bar
        ele.childNodes[1].childNodes[1].addEventListener("click", function () {
            if (ele.childNodes[1].classList.contains("active")) {
                ele.remove();
                edu = document.querySelectorAll(".teaching");
            } else {
                const itemCloner = ele.cloneNode(true);
                console.log(itemCloner);
                ele.childNodes[1].classList.add("active");//replace + with x
                itemCloner.childNodes[1].classList.remove("active");//replace x with + in the cloned item
                //disable all contents but create new and type of education
                // itemCloner.children[0].style.display = "none";// disable +
                // itemCloner.children[1].style.display = "none";// disable Type
                itemCloner.children[2].style.display = "none";// disable stage
                itemCloner.children[3].style.display = "none";// disable subject
                itemCloner.children[4].style.display = "none";// disable grade
                itemCloner.children[5].style.display = "none";//disable languages
                // title return to default in all childs
                itemCloner.children[1].children[1].children[0].children[0].disabled = false;
                itemCloner.children[1].children[1].children[0].children[0].selected = true;
                itemCloner.children[1].children[1].children[0].dataset.state = "invalid";
                itemCloner.children[2].children[1].children[0].children[0].disabled = false;
                itemCloner.children[2].children[1].children[0].children[0].selected = true;
                itemCloner.children[2].children[1].children[0].dataset.state = "invalid";
                itemCloner.children[3].children[1].children[0].children[0].disabled = false;
                itemCloner.children[3].children[1].children[0].children[0].selected = true;
                itemCloner.children[3].children[1].children[0].dataset.state = "invalid";
                itemCloner.children[4].children[1].children[0].children[0].disabled = false;
                itemCloner.children[4].children[1].children[0].children[0].selected = true;
                itemCloner.children[4].children[1].children[0].dataset.state = "invalid";
                // itemCloner.children[5].children[2].children[0].checked = false;

                // starting cloning
                eduContainer.appendChild(itemCloner);
                edu = document.querySelectorAll(".teaching");
                loaderBar();
            }
        }
        );

    });


    //******************************************************** */
    //********      Type of Education Bar   ****************** */
    //******************************************************** */
    edu.forEach((event) => {
        let mainDiv, type, stage;
        mainDiv = event;
        // event is all Teaching div(s)
        event.children[1].children[1].children[0].onchange = ((ele) => {
            //ele is Type of Education options
            ele.target.dataset.state = "valid";
            event.children[1].children[1].children[0].children[0].disabled = true; // title of type is disabled
            //Disable all choices but Stage
            event.children[2].style.display = "block";//enable Stage
            event.children[2].children[1].children[0].children[0].disabled = false;
            event.children[2].children[1].children[0].children[0].selected = true;
            event.children[3].style.display = "none";//disable subjects
            event.children[4].style.display = "none";//disable Grade
            event.children[5].style.display = "none";// disable lang
            // in case of STEM enable Senior only
            if (ele.target.value == '2') {
                event.children[2].children[1].children[0].children[1].style.display = "none"; // disable stage Ememantry
                event.children[2].children[1].children[0].children[2].style.display = "none"; // disable stage Middle
            } else {
                event.children[2].children[1].children[0].children[1].style.display = "block"; // enable stage Ememantry
                event.children[2].children[1].children[0].children[2].style.display = "block"; // enable stage Middle
            }
            type = ele;
        });
        // })

        //******************************************************** */


        // edu.forEach((event) => {
        //******************************************************** */
        //********              Stage          ****************** */
        //******************************************************** */
        // event is all Teaching div(s)
        event.children[2].children[1].children[0].onchange = ((ele) => {
            //ele is Stage options
            ele.target.dataset.state = "valid";
            event.children[2].children[1].children[0].children[0].disabled = true;
            event.children[3].style.display = "block";//Enable subjects
            event.children[3].children[1].children[0].children[0].disabled = false;
            event.children[3].children[1].children[0].children[0].selected = true;
            event.children[4].style.display = "none";//disable Grade
            event.children[5].style.display = "none";// disable lang
            stage = ele;
            subject = event.children[3].children[1].children[0];
            grade = event.children[4].children[1].children[0];
            // getSubjectItems(mainDiv, type, stage);
            getSubjectItems(stage, subject, grade);
        })
        //******************************************************** */


        //******************************************************** */
        //********              subject         ****************** */
        //******************************************************** */

        event.children[3].children[1].children[0].onchange = ((ele) => {
            //ele is Subject options
            ele.target.dataset.state = "valid";
            event.children[3].children[1].children[0].children[0].disabled = true;
            event.children[4].style.display = "block";//Enable Grade
            event.children[4].children[1].children[0].children[0].disabled = false;
            event.children[4].children[1].children[0].children[0].selected = true;
            event.children[5].style.display = "none";// disable lang
            subject = ele;
            // getSubjectItems(type, subject);
        })
        //******************************************************** */

        //******************************************************** */
        //********              Grade         ****************** */
        //******************************************************** */
        event.children[4].children[1].children[0].onchange = ((ele) => {
            ele.target.dataset.state = "valid";
            event.children[4].children[1].children[0].children[0].disabled = true;
            event.children[5].style.display = "block";// enable lang
        })
        //******************************************************** */

        //******************************************************** */
        //********              Lang            ****************** */
        //******************************************************** */
        event.children[5].children[1].children[0].onchange = ((ele) => {
            const checkbox = document.querySelectorAll("[type='checkbox']");
            let counter = 0;
            // event.children[5].style.display = "block";// enable lang
            for (let index = 0; index < checkbox.length; index++) {
                if (!checkbox[index].checked) {
                    counter++;
                }
            }
            if (counter === 3)
                event.children[5].children[1].children[0].dataset.state = "invalid";
            else
                event.children[5].children[1].children[0].dataset.state = "valid";
        })
        //******************************************************** */

    })
    //******************************************************** */
}



//******************************************************** */
//********      Function GetSubjects    ****************** */
//******************************************************** */

// adjust subject and grade for your stage selection
function getSubjectItems(stage, subject, grade) {
    //function to replace Stage and adjust subject andgrade items
    let SubjectList = {
        //elementary
        elementary:
        {
            0: "=== Select Subject ===",
            1: "Science",
            2: "Math's"
        },
        middle:
        {
            0: "=== Select Subject ===",
            1: "Science",
            2: "Math's"
        },
        senior:
        {
            0: "=== Select Subject ===",
            1: "Physics",
            2: "Chemistry",
            3: "Biology",
            4: "Geology",
            5: "Maths",
        }
    };
    let SubjectValues = {
        //elementary
        elementary:
        {
            0: "0",
            1: "SCI",
            2: "MAT"
        },
        middle:
        {
            0: "0",
            1: "SCI",
            2: "MAT"
        },
        senior:
        {
            0: "0",
            1: "PHY",
            2: "CHE",
            3: "BIO",
            4: "GEO",
            5: "MAT",
        }
    };
    let gradeList = {
        //elementary
        elementary:
        {
            0: "=== Select Grade ===",
            1: "Grade 1",
            2: "Grade 2",
            3: "Grade 3",
            4: "Grade 4",
            5: "Grade 5",
            6: "Grade 6",
        },
        middle:
        {
            0: "=== Select Grade ===",
            1: "Grade 7",
            2: "Grade 8",
            3: "Grade 9",
        },
        senior:
        {
            0: "=== Select Grade ===",
            1: "Grade 10",
            2: "Grade 11",
            3: "Grade 12",
        }
    };
    let gradeValues = {
        //elementary
        elementary:
        {
            0: "0",
            1: "G1",
            2: "G2",
            3: "G3",
            4: "G4",
            5: "G5",
            6: "G6",
        },
        middle:
        {
            0: "0",
            1: "G7",
            2: "G8",
            3: "G9",
        },
        senior:
        {
            0: "0",
            1: "G10",
            2: "G11",
            3: "G12",
        }
    };

    // according to choice from stage we switch itemes
    let X;
    switch (stage.target.value) {
        case '1':
            X = "elementary";
            break;
        case '2':
            X = "middle";
            break;
        case '3':
            X = "senior";
            break;
    }

    //remove all subject items
    while (subject.firstChild) {
        subject.removeChild(subject.firstChild);
    }
    // add new subject items according to your select
    for (i = 0; i < Object.keys(SubjectList[X]).length; i++) {
        var opt = document.createElement('option');
        opt.value = SubjectValues[X].i;
        opt.innerHTML = SubjectList[X][i];
        subject.appendChild(opt);
    }

    //remove all Grade items
    while (grade.firstChild) {
        grade.removeChild(grade.firstChild);
    }

    // add new Grade items according to your select
    for (i = 0; i < Object.keys(gradeList[X]).length; i++) {
        var opt = document.createElement('option');
        opt.value = gradeValues[X].i;
        opt.innerHTML = gradeList[X][i];
        grade.appendChild(opt);
    }

};

//******************************************************** */
//******************************************************** */


//********************************************************* */
//**********    HTML Specail Functions               ****** */
//********************************************************* */


//********************************************************* */
//**********    Suggest Strong Password               ****** */
//********************************************************* */
function suggestPass() {
    let newPass = "", passCode = `~|!@#$%^&*()_-><=+?."';0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`;
    for (i = 0; i < 16; i++) {
        newPass += passCode[Math.floor(Math.random() * passCode.length)];
        checkStrength(passCode, newPass);
    }
    document.getElementById("password").value = newPass;
    document.getElementById("password").dataset.state = "valid";
    document.getElementById("password").type = "text";
    document.querySelector(".suggest").style.display = "none";
    document.querySelector(".inpData.info").style.display = "block";
    document.getElementById("password").focus();
    checkStrength(passCode, newPass);
};

function closeSuggest() {
    document.querySelector(".suggest").style.display = "none";
};

//********************************************************* */
//**********    Strength Bar progress               ****** */
//********************************************************* */

function checkStrength(passCode, newPass) {
    let strength = 0;
    strength = checkBar(/[a-z]/g, newPass, strength);
    strength = checkBar(/[A-Z]/g, newPass, strength);
    strength = checkBar(/[0-9]/g, newPass, strength);
    strength = checkBar(/[~|!|@|#|$|%|^|&|*|(|)|_|-|>|<|=|\+|\\|?|\.|\"|'|;|،|ـ|\[|\]|\{|\}|ْ|~]/g, newPass, strength);

    if (strength > 16) strength = 16;
    doeffects(strength);
};


function checkBar(regExp, newPass, strength) {

    if (newPass.match(regExp)) {
        if (newPass.match(regExp).length < 5) {
            strength += newPass.match(regExp).length;
        } else if (newPass.match(regExp).length > 4) {//in case of suggestion
            strength += 4;
        }
    }
    return strength
}

function doeffects(strength) {
    const inpPass = document.getElementById("password");
    const toolTip = document.querySelector("p.info");
    const word = document.getElementById("strengthValue");
    const bars = document.getElementById("bar-color");
    if (inpPass.value.length >= 8) {
        toolTip.style.display = "none";
    } else {
        toolTip.style.display = "block";
    }
    if (strength < 5) {
        word.innerText = "Weak";
    } else
        if (strength < 9) {
            word.innerText = "Medium";
        } else
            if (strength < 13) {
                word.innerText = "Good";
            } else
                if (strength < 17) {
                    word.innerText = "Strong";
                }
    if (strength < 5) {
        bars.children.item(0).style.background = `linear-gradient(to right, red ${strength * 25}%,transparent ${strength * 25 * 1.25}%,transparent)`;
        bars.children.item(1).style.background = `linear-gradient(to right, transparent,transparent)`;
        bars.children.item(2).style.background = `linear-gradient(to right, transparent,transparent)`;
        bars.children.item(3).style.background = `linear-gradient(to right, transparent,transparent)`;
    } else if (strength < 9) {
        bars.children.item(0).style.background = `linear-gradient(to right, red ${100}%,transparent ${100}%,transparent)`;
        bars.children.item(1).style.background = `linear-gradient(to right, orange ${(strength - 4) * 25}%,transparent ${(strength - 4) * 25 * 1.25}%,transparent)`;
        bars.children.item(2).style.background = `linear-gradient(to right, transparent,transparent)`;
        bars.children.item(3).style.background = `linear-gradient(to right, transparent,transparent)`;
    } else if (strength < 13) {
        bars.children.item(0).style.background = `linear-gradient(to right, red ${100}%,transparent ${100}%,transparent)`;
        bars.children.item(1).style.background = `linear-gradient(to right, orange ${100}%,transparent ${100}%,transparent)`;
        bars.children.item(2).style.background = `linear-gradient(to right, yellow ${(strength - 8) * 25}%,transparent ${(strength - 8) * 25 * 1.25}%,transparent)`;
        bars.children.item(3).style.background = `linear-gradient(to right, transparent,transparent)`;
    } else if (strength < 17) {
        bars.children.item(0).style.background = `linear-gradient(to right, red ${100}%,transparent ${100}%,transparent)`;
        bars.children.item(1).style.background = `linear-gradient(to right, orange ${100}%,transparent ${100}%,transparent)`;
        bars.children.item(2).style.background = `linear-gradient(to right, yellow ${100}%,transparent ${100}%,transparent)`;
        bars.children.item(3).style.background = `linear-gradient(to right,green ${(strength - 12) * 25}%,transparent ${(strength - 12) * 25 * 1.25}%,transparent)`;
    }
}

//*********************************************************
// *********************************************************
