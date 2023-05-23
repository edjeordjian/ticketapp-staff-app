
export default class StatsResponse {
    constructor(response) {
        this._response = response
    }

    _parseStats() {
        // Por ahora no sé si le hacemos algo
        return {
            labels: ["17:55", "", "", "17:56"],
            datasets: [
              {
                data: [
                  5,
                  6,
                  1,
                  0
                ]
              }
            ]
        }
        const stats = this._response;
        return stats;
    }

    stats() {
        return this._parseStats();
    }
}