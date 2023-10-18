if (!localStorage.getItem("username")) {
    window.stop();
    window.location.replace("../index.html");
}