
export default class StatsResponse {
    constructor(response) {
        this._response = response
    }

    _parseStats() {
        const stats = {
            labels: this._response.labels,
            data: this._response.data
        }

        return stats;
    }

    stats() {
        return this._parseStats();
    }
}
