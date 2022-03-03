import { scanForAPI } from '../functions/functions';
import dotenv from 'dotenv';
dotenv.config();

class ApiService {
    constructor() {
        this.key_config = 'sek-scorm-config';
    }
    apiUrl = process.env.REACT_APP_MULESOFT_API_URL;

    async createToken() {
        return new Promise(resolve => {
            if (window.location.href.match(/localhost/i)) resolve("marc.corbalan@elerniam.com");
            const api = scanForAPI(window);
            resolve(api.LearnerId)
            // resolve("marc.corbalan@elerniam.com");
        })
    }

    async getConfiguration() {
        return new Promise(async resolve => {
            await fetch(`configuration.json`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'                    
                }
            }).then((r) => r.json())
                .then((data) => {
                    if (window.location.href.match(/localhost/i)) {
                        let text = JSON.stringify(data).replace(/public\/img/ig, '/img');
                        data = JSON.parse(text);
                    }
                    this.setCachedConfiguration(data);
                    resolve(data);
                })
        })
    }

    getCachedConfiguration() {
        return JSON.parse(sessionStorage.getItem(this.key_config))
    }

    setCachedConfiguration(obj) {
        sessionStorage.setItem(this.key_config, JSON.stringify(obj))
    }

    getGroupAndScorm() {
        const paths = window.location.pathname.split('/').filter(p => !!p);
        const hostName = !!window.location.hostname.match(/blackboard/i) ? 'blackBoard' : 'cloud';
        const paramPosition = {
            blackBoard: { groupId: 2, scormId: 4 },
            cloud: { groupId: 3, scormId: 4 }
        }
        return {
            groupId: !paths.length ? 'UCJC_2019-20_PRUEBAS_CONTENIDOS08' : paths[paramPosition[hostName].groupId],
            scormId: process.env.REACT_APP_SCORM_ID
        }
    }
    
    getScorm(pages) {
        return new Promise(async resolve => {
        const url = `groups/${this.getGroupAndScorm().groupId}/scorms/${this.getGroupAndScorm().scormId}`;
        const data = {
            scormId: process.env.REACT_APP_SCORM_ID,
            numberOfPages: Number(process.env.REACT_APP_SCORM_PAGES),
            authors: (process.env.REACT_APP_SCORM_AUTHORS || '').split('|'),
            emails: (process.env.REACT_APP_SCORM_AUTHORS_EMAIL || '').split('|'),
            faculty: process.env.REACT_APP_SCORM_FACULTY,
            degree: process.env.REACT_APP_SCORM_DEGREE,
            scormName: process.env.REACT_APP_SCORM_NAME,
            scormVersion: process.env.REACT_APP_SCORM_VERSION
        }
        const result = await this.put(url, data, 'POST');
        sessionStorage.setItem('SCORMVISITID', result.visitId);
        resolve({...result, ...{ currentPage: result.lastPage || 1 } })
    })
    }

    getVisitId() {
        return sessionStorage.getItem('SCORMVISITID');
    }

    registerTime(time) {
        const url = `groups/${this.getGroupAndScorm().groupId}/scorms/${this.getGroupAndScorm().scormId}/page-times`;
        this.put(url, time, 'POST');
        //this.registerLastPage(time);
    }

    getTimeUrl() {
        return `groups/${this.getGroupAndScorm().groupId}/scorms/${this.getGroupAndScorm().scormId}/page-times`;
    }

    registerLastPage(time) {
        const url = `groups/${this.getGroupAndScorm().groupId}/scorms/${this.getGroupAndScorm().scormId}/exits`;
        this.put(url, {dateOut: time.dateOut, lastPage: time.pageIndex}, 'POST');
    }

    updateNote(note = {}) {
        return this.put(`groups/${this.getGroupAndScorm().groupId}/scorms/${this.getGroupAndScorm().scormId}/notes`, note);
    }

    updateValue(key, value) {
        return this.put(`groups/${this.getGroupAndScorm().groupId}/scorms/${this.getGroupAndScorm().scormId}/values`,
            { guid: key, value: String(value) });
    }

    saveEvaluation(result) {
        return this.put(`groups/${this.getGroupAndScorm().groupId}/scorms/${this.getGroupAndScorm().scormId}/self-evals`,
            result, 'POST');
    }

    updateHighlight(pageIndex, indexes) {
        return this.put(`groups/${this.getGroupAndScorm().groupId}/scorms/${this.getGroupAndScorm().scormId}/highlights`,
            { pageIndex: pageIndex, indexes: indexes, date: new Date() });
    }

    updateSurveys(key, score, comment) {
        return this.put(`groups/${this.getGroupAndScorm().groupId}/scorms/${this.getGroupAndScorm().scormId}/surveys`,
            { guid: key, score: score, comment: comment }, "POST");
    }

    async get(methodName, params) {
        return new Promise(async resolve => {
            var url = new URL(`${this.apiUrl}${methodName}`);
            url.search = new URLSearchParams(params);
            await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'username': `${await this.createToken()}`,
                    'visitId': `${this.getVisitId()}`,
                    'scormVersion': process.env.REACT_APP_SCORM_VERSION
                }
            }).then((r) => r.json())
                .then((data) => {
                    resolve(data);
                })
        })
    }

    async put(methodName, data = {}, method) {
        var url = new URL(`${this.apiUrl}${methodName}`);
        const response = await fetch(url, {
            method: method || 'PUT', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'username': `${await this.createToken()}`,
                'visitId': `${this.getVisitId()}`,
                'scormVersion': process.env.REACT_APP_SCORM_VERSION
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        console.log(response.statusText)
        return !!response.statusText.match(/(No Content|Created)/i)
            ? null
            : response.json(); // parses JSON response into native JavaScript objects
    }
}

export default ApiService;