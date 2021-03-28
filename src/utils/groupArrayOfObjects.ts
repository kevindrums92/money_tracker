export function groupArrayOfObjects(list: any, key: any) {
    return list.reduce(function (rv: any, x: any) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};
