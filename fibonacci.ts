// JavaScript code to validate form

function main() {
    // Wait for the page to load before adding event listeners
    'use strict';
    window.addEventListener('load', function () {
        var form = document.querySelector('form') as HTMLFormElement;
        if (form) {
            form.addEventListener('submit', function (event) {
                event.preventDefault(); // Prevent form submission

                var fibonacciList = document.getElementById("fibonacci-list") as HTMLElement;
                var lengthInput = document.getElementById("fibonacci-length") as HTMLInputElement;
                if (fibonacciList) {
                    fibonacciList.innerHTML = ""; // Clear previous sequence
                }
                if (form.checkValidity() === false) {
                    event.stopPropagation();
                    return;
                }
                if (lengthInput) {
                    var fibLength = parseInt(lengthInput.value);
                    if (fibLength < 0) {
                        alert("Please enter a positive number");
                        return;
                    }
                    // Guts of the code. Generate Fibonacci sequence and display it
                    try {
                        const fibonacci = new Fibonacci(fibLength);
                        const fibonacciSequence = fibonacci.generateSequence();
                        for (var i = 0; i < fibLength; i++) {
                            var listItem = document.createElement("li");
                            listItem.textContent = fibonacciSequence[i].toString();
                            if (fibonacciList) {
                                fibonacciList.appendChild(listItem);
                            }
                        }
                    } catch (e) {
                        alert(e.message);
                    }
                }
                if (form) {
                    form.classList.add('was-validated');
                }
            }, false);
        }
    }, false);
}

// Fibonacci class to generate Fibonacci sequence of a given length
class Fibonacci {
    private n: number;

    constructor(n: number) {
        this.n = n;
    }

    // Recursive function to generate Fibonacci number
    generate(n: number): number {
        if (n < 0) {
            throw new Error("Invalid input");
        } else if (n <= 1) {
            return n;
        } else {
            return this.generate(n - 1) + this.generate(n - 2);
        }
    }

    // Generate Fibonacci sequence of length n
    generateSequence(): number[] {
        let sequence = [];
        for (let i = 0; i < this.n; i++) {
            sequence.push(this.generate(i));
        }
        return sequence;
    }
}

main();