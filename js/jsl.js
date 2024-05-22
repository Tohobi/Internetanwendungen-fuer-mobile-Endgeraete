class ViewController {

    root;
    
    constructor() {
        console.log("constructor() has been called");
    }

    oncreate() {
        // console.log("oncreate(): root is: ", this.root);
        this.prepareViewSwitching();
        this.prepareFading();
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
        const fadingTarget = this.root;
        fadingTrigger.onclick = () => {
            
        }
    }

}

window.onload = () => {
    const vc = new ViewController();
    vc.root = document.body;
    vc.oncreate();
}