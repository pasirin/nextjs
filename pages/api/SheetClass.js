import XLSX from 'xlsx-js-style'
import { chooseFontcolor } from './TableCellClass.js'
import { Subject } from './TableCellClass.js'

export class WorkSheet {
    constructor(Theme, Name) {
        this.Name = Name
        this.Theme = Theme
        this.SubjectList
        this.merge = []
        this.wsrows = [{ hpt: 14 }, { hpt: 40 }, { hpt: 40 }, { hpt: 40 }, { hpt: 40 }, { hpt: 40 }, { hpt: 40 }, { hpt: 40 }, { hpt: 40 }, { hpt: 40 }, { hpt: 40 }, { hpt: 40 }, { hpt: 40 }, { hpt: 40 }, { hpt: 40 }]
        this.wscols = [{ wch: 3 }, { wch: 13 }, { wch: 25 }, { wch: 25 }, { wch: 25 }, { wch: 25 }, { wch: 25 }, { wch: 25 }]
        this.TimelineColor = ['006FB4', '23AEA5', '53C8A9', 'B5E280', 'FBFF46', 'f5c32b', 'ff9900', 'FFA600', 'F5D335', 'AFC354', '226C71', '004977', '00243a', '001826']
        this.DateColor = ['E7E7E7', 'FDA963', '7EFF72', 'FAFF65', 'FFDFC9', '6E5EFF', 'FF3737']
        this.Sheet
    }

    setSubjectList(SubjectList) {
        this.SubjectList = SubjectList
    }

    FillDataFromJSON(SubjectList) {
        const newSubjectList = []
        SubjectList.forEach(element => {
            const currentSubject = new Subject(element.Name,element.ID,element.Date,element.time,element.where)
            currentSubject.setbgcolor(element.bgcolor)
            newSubjectList.push(currentSubject)
        })
        this.setSubjectList(newSubjectList)
    }

    getStartEnd(time) {
        return time.split(' - ')
    }

    initSheet() {
        if (this.Sheet != undefined) {
            console.log("Sheet is already defined.")
            return
        }
        this.Sheet = {
            "!ref": "A1:I15",
            '!cols': this.wscols,
            '!rows': this.wsrows,
            '!merges': this.merge,
        }
        const allBorder = { right: { style: "thin" }, top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" } }
        for (let row = 2; row < 16; row++) {
            this.Sheet['A' + row] = { t: "s", v: row - 1, s: { alignment: { vertical: "center", horizontal: "center" }, font: { bold: "true", color: { rgb: chooseFontcolor(this.TimelineColor[row - 2]) } }, border: allBorder, fill: { fgColor: { rgb: this.TimelineColor[row - 2] } } } };
            this.Sheet['B' + row] = { t: "s", v: (row + 5) + "h00' - " + (row + 5) + "h50'", s: { alignment: { vertical: "center", horizontal: "center" }, font: { bold: "true", color: { rgb: chooseFontcolor(this.TimelineColor[row - 2]) } }, border: allBorder, fill: { fgColor: { rgb: this.TimelineColor[row - 2] } } } }
        }
        for (let col = 3; col < 9; col++) {
            this.Sheet[String.fromCharCode(col + 64) + '1'] = { t: "s", v: "Thứ " + (col - 1), s: { alignment: { vertical: "center", horizontal: "center" }, border: allBorder, font: { bold: "true", color: { rgb: chooseFontcolor(this.DateColor[col - 3]) } }, border: allBorder, fill: { fgColor: { rgb: this.DateColor[col - 3] } } } }
        }
        this.Sheet['A1'] = { t: "s", v: "Tiết", s: { alignment: { vertical: "center", horizontal: "center" }, border: allBorder, font: { bold: "true" } } }
        this.Sheet['B1'] = { t: "s", v: "Thời gian học", s: { alignment: { vertical: "center", horizontal: "center" }, border: allBorder, font: { bold: "true" } } }
    }

    fillInSubject() {
        const allBorder = { right: { style: "thin" }, top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" } }
        if (this.Sheet == undefined) {
            console.log("Sheet wasn't init yet")
            return
        }
        if (this.SubjectList == undefined) {
            console.log("The Subject list is empty")
            return
        }
        this.SubjectList.forEach(element => {
            const temp = element.time
            for (let i = 0; i < element.time.length; i++) {
                let location
                let mergeRange
                const [start, end] = this.getStartEnd(temp[i])
                if (element.Date[i] == "CN") {
                    this.Sheet['I1'] = { t: "s", v: "CN", s: { alignment: { vertical: "center", horizontal: "center" }, border: allBorder, font: { bold: "true" } } }
                    this.wscols.push({ wch: 25 })
                    location = "I"
                    mergeRange = location + (Number(start) + 1) + ":" + location + (Number(end) + 1)
                }
                if (location == undefined) {
                    location = element.Date[i].substring(1)
                    location = String.fromCharCode(location.charCodeAt(0) + 17)
                    mergeRange = location + (Number(start) + 1) + ":" + location + (Number(end) + 1)
                }
                location += (Number(start) + 1)
                this.merge.push(XLSX.utils.decode_range(mergeRange))
                const text = element.Name + "\n" + element.ID + "\n" + element.where
                this.Sheet[location] = { t: "s", v: text, s: { alignment: { vertical: "center", horizontal: "center", wrapText: true }, font: { bold: "true", color: { rgb: element.font_color } }, fill: { fgColor: { rgb: element.bgcolor } } } }
            }
        });
    }
}