/** @format */

import { FormHelperText } from "@mui/material";

// Відображення помилки
export default function ErrorMessage({ message }: { message?: string | null }) {
	return message ? (
		<FormHelperText
			error
			sx={{ position: "absolute", bottom: -20, fontSize: "0.65rem", m: 0 }}
		>
			{message}
		</FormHelperText>
	) : null;
}
