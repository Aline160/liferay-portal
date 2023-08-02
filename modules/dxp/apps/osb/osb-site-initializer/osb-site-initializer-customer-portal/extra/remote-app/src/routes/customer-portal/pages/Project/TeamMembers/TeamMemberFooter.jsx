/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {useModal} from '@clayui/core';
import ClayIcon from '@clayui/icon';
import {useState} from 'react';
import i18n from '../../../../../common/I18n';
import {useGetLiferayExperienceCloudEnvironments} from '../../../../../common/services/liferay/graphql/liferay-experience-cloud-environments/';
import IncidentContactsButton from './components/ManageProductUsers/components/IncidentContactsButton';
import OptionsColumn from './components/TeamMembersTable/components/columns/OptionsColumn/OptionsColumn';

const TeamMembersFooter = ({
	accountSubscriptionGroupsNames,
	koroneikiAccount,
}) => {
	const incidentContactStandart = 2;

	const {data} = useGetLiferayExperienceCloudEnvironments({
		filter: `accountKey eq '${koroneikiAccount?.accountKey}'`,
	});

	const [currentIndexEditing, setCurrentIndexEditing] = useState();
	const {observer} = useModal();

	const isLXCEnvironment = accountSubscriptionGroupsNames?.includes(
		'Liferay Experience Cloud'
	);

	const liferayExperienceCloudEnvironments =
		data?.c?.liferayExperienceCloudEnvironments?.items;

	const teste = {
		produtos: [
			{
				contact: 5555555555,
				description: 'Arya Stark',
				index: 1,
				name: 'arya@gmail.com',
			},
			{
				contact: '',
				description: 'Jon Snow',
				index: 2,
				name: 'snow@liferay.com',
			},
			{
				contact: 9198775634,
				description: 'Jaime Lannister',
				index: 3,
				name: 'jaime@liferay.com',
			},
		],
	};

	const isRemoveDisabled = teste.produtos.length === 1;

	const criticalIncidentContacts = teste.produtos.map(
		({contact, description, index, name}) => {
			const criticalIncidentContactsBody = (
				<div key={index}>
					<div className="customer-portal-card-lexicon d-flex">
						<h4>{description}</h4>

						<OptionsColumn
							editingFooter
							isRemoveDisabled={isRemoveDisabled}
							observer={observer}
							onEdit={() => setCurrentIndexEditing(index)}
							onRemove={() => {}}
						/>
					</div>

					<h5>{name}</h5>

					{contact ? (
						<h5>{contact}</h5>
					) : (
						<>
							<p className="text-warning">
								<ClayIcon symbol="warning-full" />
								&nbsp;
								{i18n.translate('phone-number-is-missing')}
							</p>
						</>
					)}
				</div>
			);

			return criticalIncidentContactsBody;
		}
	);

	return (
		<div
			className={`customer-portal-card-footer ${
				isLXCEnvironment
					? 'customer-portal-card-footer-style-lxc'
					: 'customer-portal-card-footer-style-ac'
			}`}
		>
			<div className="customer-portal-card-footer-title">
				<h1>{i18n.translate('incident-contacts')}</h1>
			</div>

			{!criticalIncidentContacts.length ? (
				<>
					<div className="customer-portal-card-footer-description">
						<p>
							{i18n.translate(
								'select-the-team-member-who-can-be-contacted-with-high-priority-messages.'
							)}
						</p>
					</div>
					<IncidentContactsButton
						title={i18n.translate('select-team-member')}
					/>
				</>
			) : (
				<>
					<div className="customer-portal-card-footer-description">
						<p>
							{i18n.translate(
								'team-members-who-can-be-contacted-with-high-priority-messages'
							)}
						</p>
					</div>

					<div className="w-100">
						<div className="customer-portal-card-title pt-2 row">
							<div
								className={`customer-portal-card-description ${
									isLXCEnvironment ? 'col-4' : 'col'
								}`}
							>
								<h3>
									{i18n.translate(
										'critical-incident-contacts'
									)}

									<ClayIcon symbol="pencil" />
								</h3>

								<div
									className={`${
										criticalIncidentContacts.length >
										incidentContactStandart
											? 'customer-portal-card-description-scroll scroller'
											: ''
									}`}
								>
									{criticalIncidentContacts}
								</div>
							</div>

							{isLXCEnvironment && (
								<>
									<div className="col customer-portal-card-description pl-4">
										<h3>
											{i18n.translate('security-breach')}

											<ClayIcon symbol="pencil" />
										</h3>

										<h4>Name</h4>

										<h5>Email</h5>

										<h5>Contact</h5>
									</div>
									<div className="col customer-portal-card-description pl-4">
										<h3>
											{i18n.translate('privacy-breach')}

											<ClayIcon symbol="pencil" />
										</h3>

										{liferayExperienceCloudEnvironments?.map(
											(item, index) => (
												<div key={index}>
													<h4>
														{
															item.incidentManagementFullName
														}
													</h4>

													<h5>
														{
															item.incidentManagementEmailAddress
														}
													</h5>
												</div>
											)
										)}

										<h5>Contact</h5>
									</div>
								</>
							)}
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default TeamMembersFooter;
