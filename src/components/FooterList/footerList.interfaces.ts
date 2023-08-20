interface FooterListItem {
    id: number;
    title: string;
}

export interface FooterListProps {
    title: string;
    links: FooterListItem[];
}
