import { useStream } from "@/common/stores/video";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { VideoComponent } from "@/components/vidoe/videoPlayer";

export const ParticepantsVideos = () => {
	const streams = useStream((state) => state.streams);
	return (
		<Carousel
			opts={{
				align: "center",
				axis: "y",
				containScroll: "trimSnaps",
			}}
			orientation="vertical"
			className="  flex   "
		>
			<div className="flex flex-col gap-10 max-h-[calc(100vh-8rem)] min-h-[calc(100vh-15rem)] h-[calc(100vh-8rem)]">
				<CarouselPrevious className="static" />
				<CarouselNext className="static" />
			</div>
			<div className="flex-1  ">
				<CarouselContent className=" max-h-[calc(100vh-8rem)] min-h-[calc(100vh-15rem)] h-[calc(100vh-8rem)]">
					{streams.map((stream, index) => (
						<CarouselItem key={index} className="md:basis-1/3 lg:basis-1/3">
							<div className="p-1 flex gap-2">
								<Card className="p-0">
									<CardContent className="flex aspect-[16/9] items-center justify-center p-1">
										<VideoComponent stream={stream} />
									</CardContent>
								</Card>
								<div className="flex flex-col">
									<Button variant="ghost">1</Button>
									<Button variant="ghost">2</Button>
									<Button variant="ghost">3</Button>
								</div>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
			</div>
		</Carousel>
	);
};
