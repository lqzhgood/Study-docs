export type NavItem = {
    icon: string;
    title: string;
    desc: string;
    link: string;
    tag?: string;
};

export type NavCategory = {
    title: string;
    items: NavItem[];
};
