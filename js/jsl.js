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
        this.prepareAddingNewListItems();
    }

    prepareViewSwitching() {
        const switchTrigger = document.getElementById("myapp-switchingTrigger");
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
        const onclickListener = (evt) => {
            // console.log("evt: ", evt);
            alert("selected: " + evt.target.closest("li").querySelector("h2").textContent);
        };
        const listRoot = this.root.querySelector("ul");
        listRoot.onclick = onclickListener;
  
        // for (let i = 0; i < listItems.length; i++) {
        //     let currentLi = listItems[i];
        //     currentLi.onclick = (evt) => {
        //         // console.log("evt: ", evt);
        //         alert("selected: " + evt.target.querySelector("h2").textContent);
        //     }
        // }
    }

    prepareAddingNewListItems() {
        const addingTrigger = this.root.querySelector(".myapp-img-add");
        this.listRoot = this.root.querySelector("ul");

        this.dollyListElement = this.listRoot.querySelector("template");
        console.log("read li element, now called dolly: ", this.dollyListElement);
        // this.dollyListElement.parentNode.removeChild(this.dollyListElement);
        // this.dollyListElement.classList.remove("myapp-template");

        addingTrigger.onclick = (evt) => {
            evt.stopPropagation();
            // alert("add");
            const srcoptions = ["1.jpg", "2.jpg", "3.jpg"];
            const titleoptions = ["direm", "lopsum", "olor", "adispiscing", "elit", "consectetur"];

            const selectedSrc = srcoptions[Date.now() % srcoptions.length];
            const selectedTitle = titleoptions[Date.now() % titleoptions.length];

            this.addNewListItem({src: "./data/img/" + selectedSrc, title: selectedTitle});
        }
    }

    addNewListItem(obj) {
        // this.listRoot.innerHTML += "<li><img class=\"myapp-align-left\" src=\"" + src + "\" alt=\"\"><h2 class=\"myapp-align-left\">" + title + "</h2><button class=\"myapp-imgbutton myapp-img-edit myapp-align-right\">edit</button></li>";

        // const li = document.createElement("li");
        // const img = document.createElement("img");
        // li.appendChild(img);
        // const h2 = document.createElement("h2");
        // li.appendChild(h2);
        // const button = document.createElement("button");
        // li.appendChild(button);
        // img.src = obj.src;
        // img.classList.add("myapp-align-left");
        // h2.textContent = obj.title;
        // h2.classList.add("myapp-align-left");
        // button.setAttribute("class", "myapp-imgbutton myapp-img-edit myapp-align-right");

        // const li = this.dollyListElement.cloneNode(true);
        // li.querySelector("img").setAttribute("src", obj.src);
        // li.querySelector("h2").textContent = obj.title;

        const li = document.importNode(this.dollyListElement.content, true);
        li.querySelector("img").setAttribute("src", obj.src);
        li.querySelector("h2").textContent = obj.title;

        this.listRoot.appendChild(li);
    }

}

window.onload = () => {
    const vc = new ViewController();
    vc.root = document.body;
    vc.oncreate();
}
