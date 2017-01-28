'use strict';
function PrintDirective() {

    let printSection = document.getElementById("printSection");

    function printElement(elem) {
        // clones the element you want to print
        let domClone = elem.cloneNode(true);
        if (!printSection) {
            printSection = document.createElement("div");
            printSection.id = "printSection";
            document.body.appendChild(printSection);
        } else {
            printSection.innerHTML = "";
        }
        printSection.appendChild(domClone);
    }

    function link(scope, element, attrs) {
        element.on("click", function () {
            let elemToPrint = document.getElementById(attrs.printElementId);
            if (elemToPrint) {
                printElement(elemToPrint);
                window.print();
            }
        });
    }

    return {
        link: link,
        restrict: "A"
    };
}

export default PrintDirective;