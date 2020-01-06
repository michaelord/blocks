import {CtaGroup} from 'components/content';
import {Heading, LinkItem, RichText} from 'components/editable';
import {Icon} from 'components/icon';
import * as Utils from 'components/libs';
import * as Types from 'components/types';
import React, {memo} from 'react';
import {ContainerQuery} from 'react-container-query';
import './Feature.scss';

type LinkGroup = LinkItem | Array<LinkItem>;

type FeatureProps = {
	title?: Types.Text;
	content?: Types.Text;
	href?: Types.Url;
	icon?: Types.Icon;
	layout?: 'side' | 'inline';
	align?: 'left' | 'center';
	theme?: Types.Theme;
	cta?: LinkGroup;
};

export const Feature = memo((props: FeatureProps) => {
	const base: string = 'feature';

	const query = {
		wide: {
			minWidth: 400,
		},
	};

	const {title, content, href, icon, layout = 'inline', align = 'left', theme = 'light', cta} = props;

	const atts = {
		href,
		'data-theme': theme,
	};

	const Component = href && !cta ? 'a' : 'div';

	const icn = icon ? (
		<div className={`${base}__icon`}>
			<Icon icon={icon} />
		</div>
	) : null;

	return (
		<ContainerQuery query={query}>
			{params => (
				<Component {...atts} className={Utils.getModifiers(base, {layout, align, ...params})}>
					<div className={`${base}__body`}>
						<div className={`${base}__main`}>
							{icn && layout === 'side' && icn}
							<div className={`${base}__content`}>
								<div className={`${base}__head`}>
									{icn && layout === 'inline' && icn}

									<Heading priority={4} title={title} className={`${base}__title`} />
								</div>
								<RichText content={content} className={`content ${base}__copy`} />
								<CtaGroup items={cta} className={`${base}__links`} />
							</div>
						</div>
					</div>
				</Component>
			)}
		</ContainerQuery>
	);
});
