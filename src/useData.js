import { useEffect, useState } from 'react';

const url_es = 'https://gist.githubusercontent.com/josejbocanegra/c55d86de9e0dae79e3308d95e78f997f/raw/d9eb0701f6b495dac63bbf59adc4614a9eb5fbc8/series-es.json';
const url_en = 'https://gist.githubusercontent.com/josejbocanegra/5dc69cb7feb7945ef58b9c3d84be2635/raw/64146e99e4416da3a8be2e2da4156cb87b3f6fd0/series-en.json';

export default function useData() {
    let url = url_en;
    if(navigator.language.startsWith('es')) {
        url = url_es;
    }
    const [data, setData] = useState();
    useEffect(() => {
        if(!navigator.onLine){
            if(localStorage.getItem("series") === null) {
                setData([]);
            } else {
                setData(JSON.parse(localStorage.getItem("series")));
            }
        } else {
            fetch(url).then(res=>res.json()).then(res=>{
                setData(res);
                localStorage.setItem("series", JSON.stringify(res));
            })
        }
    }, []);

    return [data];
}