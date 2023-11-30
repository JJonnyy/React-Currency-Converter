// export const fetcher = (url) => fetch(url).then(r => r.json());

import axios from 'axios'

export const fetcher = url => axios.get(url).then(res => res.data);