export class Subject {
    constructor(Name, ID, Date, time, where) {
        this.Name = Name
        this.ID = ID
        this.Date = Date
        this.time = time
        this.where = where
        this.bgcolor = Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')
        this.font_color = chooseFontcolor(this.bgcolor)
    }

    setbgcolor(color) {
        this.bgcolor = color
        this.font_color = this.chooseFontcolor()
    }

    returnText() {
        return this.Name + "\n" + this.ID + "\n" + this.where
    }

    returnDebugText() {
        return this.Name + " " + this.ID + " " + this.Date + " " + this.time + " " + this.where + "\n"
    }
}

export function chooseFontcolor(bgcolor) {
    let aRgb = [
        parseInt(bgcolor.substring(0, 2), 16) / 255,
        parseInt(bgcolor.substring(2, 4), 16) / 255,
        parseInt(bgcolor.substring(4), 16) / 255
    ]
    for(let i = 0; i < 3 ; i++){
        if (aRgb[i] <= 0.03928) {
            aRgb[i] /= 12.92
        } else {
            aRgb[i] = Math.pow((aRgb[i] + 0.055) / 1.055, 2.4)
        }
    }
    let l = 0.2126 * aRgb[0] + 0.7152 * aRgb[1] + 0.0722 * aRgb[2]
    if(l > 0.179) {
        return "000000"
    } else return "FFFFFF"
}