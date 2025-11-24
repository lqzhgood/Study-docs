export type NavItem = {
    icon: string;
    title: string;
    desc: string;
    tag?: string;
    link?: string;
    items?: {
        title: string;
        desc?: string;
        link: string;
        icon?: string;
    }[];
};

export type NavCategory = {
    title: string;
    items: NavItem[];
};
