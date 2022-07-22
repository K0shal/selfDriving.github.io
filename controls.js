class Controls {
    constructor() {
        this.forwd = false;
        this.backwd = false;
        this.right = false;
        this.left = false;
       this.addKeyboardListeners();
    }
    addKeyboardListeners() {
        document.addEventListener('keydown', (e) => {
      
            switch (e.key) {
                case "ArrowLeft":
                    this.left = true;
                    break;
                case "ArrowRight":
                    this.right = true;
                    break;
                case "ArrowUp":
                    this.forwd = true;
                    break;
                case "ArrowDown":
                   this.backwd = true;
                    break;
                default:break;
            }
            
        })
        
        document.addEventListener('keyup', (e) => {
            switch (e.key) {
                case "ArrowLeft":
                    this.left = false;
                    break;
                case "ArrowRight":
                    this.right = false;
                    break;
                case "ArrowUp":
                    this.forwd = false;
                    break;
                case "ArrowDown":
                   this.backwd = false;
                    break;
                default:break;
            }
            
        })
        
    }

}