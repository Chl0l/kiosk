import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Taxonomy } from "../entities/Taxonomy";
import {
  SubTopicTitle,
  TaxonomyTree,
  TopicTitle,
} from "../entities/Taxonomy.args";

@Resolver()
export class TaxonomyResolver {
  @Query(() => [TopicTitle])
  async getAllTopics(): Promise<TopicTitle[]> {
    return Taxonomy.getAllTopics();
  }

  @Query(() => [SubTopicTitle])
  async getAllsubTopics(): Promise<SubTopicTitle[]> {
    return Taxonomy.getAllSubTopics();
  }

  @Query(() => [SubTopicTitle])
  async getSubTopicsByTopic(
    @Arg("topic") topic: string
  ): Promise<SubTopicTitle[]> {
    return Taxonomy.getSubTopicsByTopic(topic);
  }

  @Query(() => [TaxonomyTree])
  async getQuestions(
    @Arg("topic") topic: string,
    @Arg("subtopic") subtopic: string
  ): Promise<TaxonomyTree[]> {
    return Taxonomy.getQuestions(topic, subtopic);
  }

  @Mutation(() => Taxonomy)
  async addAnswer(
    @Arg("id") id: string,
    @Arg("answer") answer: string
  ): Promise<Taxonomy | null> {
    return Taxonomy.addAnswer(id, answer);
  }
}
