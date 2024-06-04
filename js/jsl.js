class ViewController {

    root;
    
    constructor() {
        console.log("constructor() has been called");
    }

    oncreate() {
        // console.log("oncreate(): root is: ", this.root);
        this.prepareViewSwitching();
        // this.prepareFading();
        this.prepareListItemSelection();
        this.prepareAddingNewListItems();
        this.loadAndDisplayListItems();
        this.prepareReload();
    }

    prepareViewSwitching() {
        const switchTrigger = document.getElementById("myapp-switchingTrigger");
        // console.log("switchElement: ", switchTrigger);
        const switchTarget = this.root;
        const fadingTarget = this.root.getElementsByTagName("main")[0];
        switchTrigger.onclick = () => {
            fadingTarget.classList.toggle("myapp-faded");
            const onTransitionend = () => {
                fadingTarget.classList.toggle("myapp-faded");
                fadingTarget.removeEventListener("transitionend", onTransitionend);
            }
            fadingTarget.addEventListener("transitionend", onTransitionend);
            // hier muss eine Art sleep rein
            setTimeout(() => {
                switchTarget.classList.toggle("myapp-tiles");
                switchTrigger.classList.toggle("list-view");
            }, 2000);
        }
    }

    // prepareFading() {
        // const fadingTrigger = this.root.querySelector("footer #myapp-fadingTrigger");
        // const fadingTrigger = document.getElementById("myapp-fadingTrigger");
        // const fadingTarget = this.root.getElementsByTagName("main")[0];
        // fadingTrigger.onclick = () => {
        //     fadingTarget.classList.toggle("myapp-faded");
        //     const onTransitionend = () => {
        //         fadingTarget.classList.toggle("myapp-faded");
        //         fadingTarget.removeEventListener("transitionend", onTransitionend);
        //     }
        //     fadingTarget.addEventListener("transitionend", onTransitionend);
        // }
    // }

    prepareListItemSelection() {
        // const listItems = this.root.getElementsByTagName("li");
        const onclickListener = (evt) => {
            if (!evt.target.closest("button.myapp-img-tile")) {
                // console.log("evt: ", evt);
                alert("selected: " + evt.target.closest("li").querySelector("h2").textContent);
            } else {
                const liElement = evt.target.closest("li");
                const title = liElement.querySelector("h2").textContent;
                const src = liElement.querySelector("img").src;
                if (confirm(`Soll ${title} - ${src} entfernt werden?`)) {
                    liElement.remove();
                }
            }
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
            const owneroptions = ["owner1", "owner2", "owner3", "owner4", "owner5", "owner6", "owner7", "owner8", "owner9", "owner10"];
            const numoftagsoptions = Math.floor(Math.random() * 10);
            const addedoptions = new Date().toLocaleDateString();

            const selectedSrc = srcoptions[Date.now() % srcoptions.length];
            const selectedTitle = titleoptions[Date.now() % titleoptions.length];
            const selectedOwner = owneroptions[Date.now() % owneroptions.length];
            const selectedNumOfTags = numoftagsoptions;
            const selectedAdded = addedoptions;

            this.addNewListItem({src: "./data/img/" + selectedSrc, title: selectedTitle, owner: selectedOwner, numOfTags: selectedNumOfTags, added: selectedAdded});
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
        li.getElementById("owner").textContent = obj.owner;
        li.getElementById("tags").textContent = obj.numOfTags;
        li.getElementById("date").textContent = obj.added;

        this.listRoot.appendChild(li);
    }

    loadAndDisplayListItems() {
        const request = new XMLHttpRequest();
        request.open("GET", "data/listitems.json");
        request.send();
        request.onload = () => {
            const responseText = request.responseText;
            console.log("responseText: ", responseText);
            const responseItems = JSON.parse(responseText);
            console.log("responseItems: ", responseItems);
            responseItems.forEach(item => this.addNewListItem(item));
        }
    }

    prepareReload() {
        const reloadTrigger = document.getElementById("myapp-reloadTrigger");
        reloadTrigger.onclick = () => {
            while(this.listRoot.firstChild) {
                this.listRoot.removeChild(this.listRoot.firstChild);
            }
            this.loadAndDisplayListItems();
        }
    }

}

window.onload = () => {
    const vc = new ViewController();
    vc.root = document.body;
    vc.oncreate();
}
