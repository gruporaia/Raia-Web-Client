import { Box, Divider, Grid, Typography } from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { CTASection } from '../components/ui';
import EntityCard from '../components/ui/Card/EntityCard';
import { useTeamMembers } from '../data/teamData';
import { useLocalizedContent } from '../hooks/useLocalizedContent';
import { useScrollTo } from '../hooks/useScrollTo';
import BaseLayout from '../layouts/BaseLayout';
import ROUTES from '../routes';

const TeamDetails: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollToElement } = useScrollTo();
  const { getContent } = useLocalizedContent('screens', 'team');

  const pageDetails = {
    overline: getContent<string>('details.overline'),
    title: getContent<string>('details.title'),
    buttonText: getContent<string>('details.buttonText'),
    footer: getContent<string>('details.footer'),
  };

  const sections = {
    currentAdministration: getContent<string>('sections.currentAdministration'),
    advisors: getContent<string>('sections.advisors'),
  };

  const teamMembers = useTeamMembers();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const scrollToId = params.get('scrollTo');

    if (scrollToId) {
      scrollToElement(scrollToId);
    }
  }, [location.search, scrollToElement]);

  // Normalize members to ensure consistency
  const normalizedMembers = teamMembers.map((member) => ({
    ...member,
    // Set undefined for missing images to use placeholder
    image: member.image || undefined,
  }));

  // Split team members into current administration and advisors
  const { currentAdministration, advisors } = useMemo(() => {
    const advisorRoles = [
      'Advisor',
      'Conselheiro',
      'Conselheira',
      'Asesor',
      'Asesora',
      'Founder & Advisor',
      'Fundador e Conselheiro',
      'Fundador y Asesor',
      'Former Co-President & Advisor',
      'Ex-Co-Presidente e Conselheiro',
      'Ex Co-Presidente y Asesor',
      'Founder & Former Projects Director & Advisor',
      'Fundadora e Ex-Diretora de Projetos e Conselheira',
      'Fundadora y Ex-Directora de Proyectos y Asesora',
      'Former President (2025) & Advisor',
      'Ex-Presidente (2025) e Conselheiro',
      'Ex-Presidente (2025) y Asesor',
    ];

    const current = normalizedMembers.filter(
      (member) => !advisorRoles.includes(member.role)
    );
    const advisory = normalizedMembers.filter((member) =>
      advisorRoles.includes(member.role)
    );

    return {
      currentAdministration: current,
      advisors: advisory,
    };
  }, [normalizedMembers]);

  return (
    <BaseLayout>
      <CTASection
        id="team-details-section"
        overline={pageDetails.overline}
        title={pageDetails.title}
        buttonText={pageDetails.buttonText}
        onButtonClick={() => navigate(ROUTES.PUBLIC.TEAMJOIN.path)}
      >
        {/* Current Administration Section */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              mb: 4,
              fontWeight: 600,
              color: 'text.primary',
              textAlign: 'center',
            }}
          >
            {sections.currentAdministration}
          </Typography>
          <Grid container spacing={4}>
            {currentAdministration.map((member) => (
              <Grid
                size={{ xs: 12, sm: 6, md: 4 }}
                key={member.id || member.name}
              >
                <EntityCard
                  avatar={member.image || ''}
                  name={member.name}
                  subtitle={member.role}
                  description={member.bio}
                  links={{
                    linkedin: member.linkedin,
                    github: member.github,
                    website: member.website || member.contact,
                  }}
                  variant="member"
                  size="default"
                  forceAvatarLayout={true}
                  avatarSize={96}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Divider */}
        <Divider sx={{ my: 6 }} />

        {/* Advisors Section */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              mb: 4,
              fontWeight: 600,
              color: 'text.primary',
              textAlign: 'center',
            }}
          >
            {sections.advisors}
          </Typography>
          <Grid container spacing={4}>
            {advisors.map((member) => (
              <Grid
                size={{ xs: 12, sm: 6, md: 4 }}
                key={member.id || member.name}
              >
                <EntityCard
                  avatar={member.image || ''}
                  name={member.name}
                  subtitle={member.role}
                  description={member.bio}
                  links={{
                    linkedin: member.linkedin,
                    github: member.github,
                    website: member.website || member.contact,
                  }}
                  variant="member"
                  size="default"
                  forceAvatarLayout={true}
                  avatarSize={96}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 6 }}
        >
          {pageDetails.footer}
        </Typography>
      </CTASection>
    </BaseLayout>
  );
};

export default TeamDetails;
