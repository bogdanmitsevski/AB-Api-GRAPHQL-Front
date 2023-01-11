export interface ExperimentsResponse {
    totalDevicesByGroupA: number,
    totalDevicesByGroupB: number,
    totalDevicesByGroupC: number,
    allDevices: number,
    allExperiments: [{
        id: number,
        key: string,
        value: string,
    }]
}