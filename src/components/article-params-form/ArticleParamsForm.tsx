import React, { useState, useRef, useEffect } from 'react';
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
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [formState, setFormState] = useState(articleState);
	const formRef = useRef<HTMLFormElement | null>(null);
	const handleApply = (e: React.FormEvent) => {
		e.preventDefault();
		setArticleState(formState);
		setIsFormOpen(false);
	};
	const handleReset = () => {
		setFormState(defaultArticleState);
		setArticleState(defaultArticleState);
		setIsFormOpen(false);
	};
	useEffect(() => {
		if (!isFormOpen) return;
		const handleClickOutside = (event: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				setIsFormOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isFormOpen]);
	return (
		<>
			<ArrowButton isOpen={isFormOpen} onClick={() => setIsFormOpen(!isFormOpen)} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}>
				<form
					ref={formRef}
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
