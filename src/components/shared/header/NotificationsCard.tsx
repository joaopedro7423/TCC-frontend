import { Text, Box } from "@chakra-ui/react";

interface INotifi {
  id: string;
  description: string;
}

export default function NotificationsCard({ id, description }: INotifi) {
  return (
    <>
      <Box maxW="96%" minW="96%" borderRadius="lg" p={4} bgColor="white">
        <Text fontWeight="semibold" textTransform="uppercase" fontSize="sm">
          {description}
        </Text>
      </Box>
    </>
  );
}
