type NavChildItem = {
    icon: string;
    title: string;
    desc?: string;
    link: string;
    tag?: string[];
    keys?: string[];
};
export type NavItem = {
    icon: string;
    title: string;
    desc: string;
    link?: string;
    tag?: string[];
    keys?: string[];
    items?: NavChildItem[];
};

export type NavCategory = {
    title: string;
    items: NavItem[];
};

export function filterNavItem(key: string, o: Partial<NavChildItem>) {
    const searchStr = Object.values(o)
        .map((v = '') => {
            return Array.isArray(v) ? v.join(' ') : v;
        })
        .join('__')
        .toLocaleLowerCase();

    return searchStr.includes(key.toLocaleLowerCase());
}
