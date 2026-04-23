import { useState } from 'react';
import clsx from 'clsx';
import { Select } from '../../ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	fontFamilyOptions,
	defaultArticleState,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from '../../constants/articleProps';
import { Text } from '../../ui/text';
import { ArrowButton } from '../../ui/arrow-button';
import { Button } from '../../ui/button';

import styles from './ArticleParamsForm.module.scss';

type Props = {
	articleState: typeof defaultArticleState;
	setArticleState: (state: typeof defaultArticleState) => void;
};

export const ArticleParamsForm = ({ articleState, setArticleState }: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState(articleState);
	const handleApply = (e: React.FormEvent) => {
		e.preventDefault();
		setArticleState(formState);
		setIsOpen(false);
	};
	const handleReset = () => {
		setFormState(defaultArticleState);
		setArticleState(defaultArticleState);
		setIsOpen(false);
	};
	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleApply}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase align='left'>
						ЗАДАЙТЕ ПАРАМЕТРЫ
					</Text>
					<Select
						title='ШРИФТ'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(value) =>
							setFormState({ ...formState, fontFamilyOption: value })
						}
					/>
					<RadioGroup
						name='fontSize'
						title='РАЗМЕР ШРИФТА'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(value) =>
							setFormState({ ...formState, fontSizeOption: value })
						}
					/>
					<Select
						title='ЦВЕТ ШРИФТА'
						selected={formState.fontColor}
						options={fontColors}
						onChange={(value) =>
							setFormState({ ...formState, fontColor: value })
						}
					/>
					<Separator />
					<Select
						title='ЦВЕТ ФОНА'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(value) =>
							setFormState({ ...formState, backgroundColor: value })
						}
					/>
					<Select
						title='ШИРИНА КОНТЕНТА'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(value) =>
							setFormState({ ...formState, contentWidth: value })
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
