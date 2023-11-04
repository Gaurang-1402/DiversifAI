import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export const ButtonPrimary = (
	props: DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	>
) => (
	<button
		{...props}
		className="btn py-2 px-3  bg-black disabled:bg-gray-500 text-white border-2 border-gray-700"
	>
		{props.children}
	</button>
);


export const ButtonPrimarySmall = (
	props: DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	>
) => (
	<button
		{...props}
		className="btn py-1 px-2  text-sm bg-black disabled:bg-gray-500 text-white border-2 border-gray-700"
	>
		{props.children}
	</button>
);



export const ButtonSecondary = (
	props: DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	>
) => (
	<button
		{...props}
		className="btn py-2 px-3  bg-sky-500 border-2 disabled:bg-gray-500 border-sky-700 text-white"
	>
		{props.children}
	</button>
);


export const ActionButton = (
	props: DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	>
) => (
	<button
		{...props}
		className="rounded md:py-4 px-6 py-2 uppercase font-bold tracking-wider cursor-pointer bg-black hover:bg-gray-700 w-64 text-white"
	>
		{props.children}
	</button>
);
