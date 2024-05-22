class ViewController {

    root;
    
    constructor() {
        console.log("constructor() has been called");
    }

    oncreate() {
        // console.log("oncreate(): root is: ", this.root);
        this.prepareViewSwitching();
        this.prepareFading();
        this.prepareListItemSelection();
    }

    prepareViewSwitching() {
        const switchTrigger = this.root.getElementsByTagName("header")[0];
        // console.log("switchElement: ", switchTrigger);
        const switchTarget = this.root;
        switchTrigger.onclick = () => {
            switchTarget.classList.toggle("myapp-tiles");
        }
    }

    prepareFading() {
        // const fadingTrigger = this.root.querySelector("footer #myapp-fadingTrigger");
        const fadingTrigger = document.getElementById("myapp-fadingTrigger");
        const fadingTarget = this.root.getElementsByTagName("main")[0];
        fadingTrigger.onclick = () => {
            fadingTarget.classList.toggle("myapp-faded");
            const onTransitionend = () => {
                fadingTarget.classList.toggle("myapp-faded");
                fadingTarget.removeEventListener("transitionend", onTransitionend);
            }
            fadingTarget.addEventListener("transitionend", onTransitionend);
        }
    }

    prepareListItemSelection() {
        const listItems = this.root.getElementsByTagName("li");
        for (let i = 0; i < listItems.length; i++) {
            let currentLi = listItems[i];
            currentLi.onclick = () => {
                alert("selected: " + currentLi.querySelector("h2").textContent);
            }
        }
    }

}

window.onload = () => {
    const vc = new ViewController();
    vc.root = document.body;
    vc.oncreate();
}