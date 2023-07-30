interface ITheme {
    darkTheme: boolean;
}

interface Istate {
    theme: ITheme;
}

export const themeSelector = (state: Istate) => state.theme.darkTheme;
